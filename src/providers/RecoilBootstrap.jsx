import { useGlobalSetters, useGlobalState } from '@/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default ({ children }) => {
  const router = useRouter();
  const [initialized, setInitialized] = useGlobalState('ui.initialized');
  const [setWidth, setHeight, setDpr, setMapVisible, setOrientation] = useGlobalSetters([
    'viewport.width',
    'viewport.height',
    'viewport.dpr',
    'map.visible',
    'viewport.orientation'
  ]);

  function onResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setDpr(window.devicePixelRatio);
    setOrientation(window.innerWidth >= window.innerHeight ? 'LANDSCAPE' : 'PORTRAIT')
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);

    onResize();

    setInitialized(true);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setMapVisible(router.asPath === '/map');
  }, [router.asPath]);

  return initialized ? children : <></>;
};
