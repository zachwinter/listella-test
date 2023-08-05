import styles from './Navigation.module.scss';
import Hamburger from '@/components/common/Hamburger';
import cn from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import GridBackground from '../common/GridBackground';
import { useGlobalState, useGlobalValue } from '@/store';
import { useRouter } from 'next/router';
import ChevronLeft from '../icons/ChevronLeft';

export default function () {
  const [active, setActive] = useGlobalState('ui.navigationVisible') as any;
  const mode = useGlobalValue('user.mode') as any;
  const grid: any = useRef();
  const router = useRouter();
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setShowBack(router.asPath.split('/').length > 2);
  }, [router.asPath]);

  function close() {
    setTimeout(() => setActive(false), 100);
  }

  useEffect(() => {}, [mode]);

  function onClick() {
    setActive(!active);
    grid.current?.setPattern?.();
  }

  return (
    <>
      <header
        className={cn({
          [styles.navigation]: true,
          [styles.back]: !active && showBack,
        })}
      >
        <img src="/svg/listella.svg" />
        <ChevronLeft onClick={() => router.back()} />
        <Hamburger active={active} onClick={onClick} />
      </header>

      <nav
        className={cn({ [styles.nav]: styles.nav, [styles.active]: active })}
      >
        <div className={cn({ [styles.links]: true })}>
          <Link href="/" onClick={close}>
            Home
          </Link>

          <Link href="/dashboard" onClick={close}>
            Dashboard
          </Link>
        </div>

        <GridBackground ref={grid} active={active} />
      </nav>
    </>
  );
}
