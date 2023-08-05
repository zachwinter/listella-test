import styles from './Toggle.module.scss';

export default ({ value, update }: any) => (
  <div className={styles.toggle}>
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={value}
      onChange={() => update(!value)}
    />

    <i className={styles.circle} />
  </div>
);
