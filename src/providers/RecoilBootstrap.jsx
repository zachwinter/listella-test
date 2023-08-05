import { useGlobalSetters, useGlobalState } from '@/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default ({ children }) => {
  const router = useRouter();
  const [initialized, setInitialized] = useGlobalState('ui.initialized');
  const [setWidth, setHeight, setDpr, setMapVisible] = useGlobalSetters([
    'viewport.width',
    'viewport.height',
    'viewport.dpr',
    'map.visible',
  ]);

  function onResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setDpr(window.devicePixelRatio);
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
