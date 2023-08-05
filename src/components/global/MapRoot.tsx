import Map from '@/components/common/Map';
import { useGlobalValues, useGlobalStates } from '@/store';
import styles from './MapRoot.module.scss';
import cn from 'classnames';
import HomeList from '@/components/map/HomeList';
import { useRef } from 'react';
import { interpolateNumber } from 'd3-interpolate';
import { easing } from '@/constants/easing';

export default () => {
  const list = useRef();
  const map: any = useRef();

  const [
    [center, setCenter],
    [bearing, setBearing],
    [pitch, setPitch],
    [zoom, setZoom],
    [selectedMarker, setSelectedMarker],
  ] = useGlobalStates([
    'map.center',
    'map.pitch',
    'map.bearing',
    'map.zoom',
    'map.selectedMarker',
  ]) as any;

  const [width, height, visible, initialized, markers, orientation] =
    useGlobalValues([
      'viewport.width',
      'viewport.height',
      'map.visible',
      'ui.initialized',
      'map.markers',
      'viewport.orientation',
    ]) as any;

  function onUpdate({
    key,
    value,
  }: {
    key: 'center' | 'pitch' | 'zoom' | 'bearing';
    value: any;
  }) {
    switch (key) {
      case 'center':
        setCenter(value);
        break;
      case 'pitch':
        setPitch(value);
        break;
      case 'zoom':
        setZoom(value);
      case 'bearing':
        setBearing(value);
        break;
      default:
        return;
    }
  }

  function scrollHomeIntoView(home: any, index = markers.indexOf(home)) {
    if (!list.current) return;

    setSelectedMarker(home);

    const el = list.current as any;
    const target = el.querySelector(`li:nth-child(${index + 1})`);
    const {
      top,
      left,
      width: targetWidth,
      height: targetHeight,
    } = target.getBoundingClientRect();
    const from = orientation === 'PORTRAIT' ? el.scrollLeft : el.scrollTop;
    const to =
      orientation === 'PORTRAIT'
        ? from + left - (width - targetWidth) / 2
        : from + top - (height - targetHeight) / 2;
    const iScroll = interpolateNumber(from, to);
    const start = window.performance.now();
    const duration = 500;

    const tick = (now: DOMHighResTimeStamp) => {
      const elapsed = now - start;
      const progress = easing(Math.max(Math.min(1, elapsed / duration), 0));
      el[orientation === 'PORTRAIT' ? 'scrollLeft' : 'scrollTop'] =
        iScroll(progress);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  return (
    initialized && (
      <div className={cn({ [styles.map]: true, [styles.visible]: visible })}>
        <Map
          ref={map}
          center={center}
          width={width}
          height={height}
          pitch={pitch}
          zoom={zoom}
          bearing={bearing}
          onUpdate={onUpdate}
          markers={markers}
          onMarkerClick={scrollHomeIntoView}
        />

        <HomeList
          ref={list}
          homes={markers}
          selected={selectedMarker}
          onSelect={(home: any) => {
            map.current?.animateToMarker?.(home);
            scrollHomeIntoView(home);
          }}
        />
      </div>
    )
  );
};
