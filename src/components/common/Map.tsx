import { useRef, useEffect, forwardRef, useImperativeHandle, DOMElement } from 'react';
import map from 'maplibre-gl';
import { DEFAULT_COORDS } from '@/store/map';
import 'maplibre-gl/src/css/maplibre-gl.css';
import { interpolateNumber } from 'd3-interpolate';
import { easing } from '@/constants/easing';

const STYLE_ROOT = 'https://api.maptiler.com/maps';
const STYLESHEET = '16409d26-7c6a-41bb-b829-7f99188410de/style.json';
const STYLE_KEY = 'K4p1IWWrJYEjxxY6LBW1';
const STYLES = `${STYLE_ROOT}/${STYLESHEET}?key=${STYLE_KEY}`;

export interface MapProps {
  center: [number, number];
  width: number;
  height: number;
  zoom: number;
  pitch: number;
  bearing: number;
  markers: any[];
  onUpdate?: Function;
  onMarkerClick?: Function;
}

const Map = (
  {
    center,
    width,
    height,
    zoom,
    pitch,
    bearing,
    markers: propMarkers,
    onMarkerClick,
    onUpdate,
    ...rest
  }: MapProps,
  ref: any
) => {
  const container: any = useRef();
  const instance: any = useRef();
  const markers: any = useRef([]);
  const markerElements: any = useRef([]);

  function init() {
    instance.current = new map.Map({
      container: container.current,
      style: STYLES,
      center: center || DEFAULT_COORDS,
      antialias: false,
      zoom,
      pitch,
      bearing,
    });

    instance.current.on('zoom', () => {
      onUpdate?.({
        key: 'zoom',
        value: instance.current.getZoom(),
      });
    });

    instance.current.on('pitch', () => {
      onUpdate?.({
        key: 'pitch',
        value: instance.current.getPitch(),
      });
    });

    instance.current.on('bearing', () => {
      onUpdate?.({
        key: 'bearing',
        value: instance.current.getBearing(),
      });
    });

    instance.current.on('rotate', () => {
      onUpdate?.({
        key: 'bearing',
        value: instance.current.getBearing(),
      });
    });

    instance.current.on('move', () => {
      const { lat, lng } = instance.current.getCenter();

      onUpdate?.({
        key: 'center',
        value: [lng, lat],
      });
    });
  }

  useEffect(() => {
    init();

    return () => instance.current?.remove?.();
  }, []);

  function clearMarkers() {
    markers.current.forEach((m: any) => m?.remove?.());
    markers.current = [];
  }

  function animateCenterTo([lng, lat]: [number, number]) {
    const from = instance.current.getCenter().toArray();
    const iLng = interpolateNumber(from[0], lng);
    const iLat = interpolateNumber(from[1], lat);
    const start = window.performance.now();
    const duration = 500;

    const tick = (now: DOMHighResTimeStamp) => {
      const elapsed = now - start;
      const progress = easing(Math.max(Math.min(1, elapsed / duration), 0));
      const lng = iLng(progress);
      const lat = iLat(progress);
      instance.current.setCenter([lng, lat]);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  function addMarker(m: any) {
    const marker = new map.Marker().setLngLat(m.coords).addTo(instance.current);
    markers.current.push(marker);
    const index = markers.current.indexOf(marker);
    const element = marker.getElement();
    const selector = 'svg g[fill="' + marker._color + '"]';
    element
      .querySelector(selector)
      ?.setAttribute?.('style', 'transition: var(--base-transition);');
    element.querySelector(selector)?.setAttribute('fill', 'var(--blue)');
    element.addEventListener('click', () => {
      onMarkerClick?.(m);
      animateCenterTo(marker._lngLat.toArray());
      setMarkerColor(index);
    });
    markerElements.current.push(element);
  }

  function resetMarkerColors() {
    markerElements.current.forEach((element: any) => {
      const selector = 'svg g[fill="var(--purple)"]';
      element.querySelector(selector)?.setAttribute('fill', 'var(--blue)');
    });
  }

  function setMarkerColor(index: number) {
    resetMarkerColors();
    const marker = markers.current[index];
    const element = markerElements.current[index];
    const [lng, lat] = marker._lngLat.toArray();
    animateCenterTo([lng, lat]);
    const selector = 'svg g[fill="var(--blue)"]';
    element.querySelector(selector)?.setAttribute('fill', 'var(--purple)');
  }

  useEffect(() => {
    clearMarkers();
    propMarkers.forEach(addMarker);
  }, [propMarkers]);

  useImperativeHandle(ref, () => {
    return {
      animateToMarker(house: any) {
        try {
          const index = propMarkers.indexOf(house);
          setMarkerColor(index);
        } catch (e) {
          console.log(e);
        }
      },
    };
  });

  return (
    <figure
      ref={container}
      style={{
        width: width + 'px',
        height: height + 'px',
      }}
      {...rest}
    />
  );
};

export default forwardRef(Map);
