import styles from './Address.module.scss';

export default ({ children }: any) => (
  <address className={styles.address}>{children}</address>
);
