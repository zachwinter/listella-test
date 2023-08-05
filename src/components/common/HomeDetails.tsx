import styles from './HomeDetails.module.scss';

export default ({ children }: any) => (
  <div className={styles['home-details']}>
    { children }
  </div>
);
