import styles from './DashboardNavigation.module.scss';
import Heart from '../icons/Heart';
import Link from 'next/link';
import Home from '../icons/Home';
import Chat from '../icons/Chat';
import Notification from '../icons/Notification';
import Map from '../icons/Map';
import { useRouter } from 'next/router';
import cn from 'classnames';

export default () => {
  const router = useRouter();
  const visible = (() => {
    switch (router.asPath) {
      case '/':
        return false;
      default:
        return true;
    }
  })();

  return (
    <nav className={cn({ [styles.nav]: true, [styles.visible]: visible })}>
      <Link
        href="/favorites"
        className={cn({ [styles.active]: router.asPath === '/favorites' })}
      >
        <Heart className={styles.svg} />
      </Link>
      <Link
        href="/map"
        className={cn({ [styles.active]: router.asPath === '/map' })}
      >
        <Map className={styles.svg} />
      </Link>
      <Link
        href="/dashboard"
        className={cn({ [styles.active]: router.asPath === '/dashboard' })}
      >
        <Home className={styles.svg} />
      </Link>
      <Link
        href="/inbox"
        className={cn({ [styles.active]: router.asPath === '/inbox' })}
      >
        <Chat className={styles.svg} />
      </Link>
      <Link
        href="/notifications"
        className={cn({ [styles.active]: router.asPath === '/notifications' })}
      >
        <Notification className={styles.svg} />
      </Link>
    </nav>
  );
};
