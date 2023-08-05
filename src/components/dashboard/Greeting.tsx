import styles from './Greeting.module.scss'
import Avatar from '../common/Avatar';

export default () => (
  <div className={styles.greeting}>
    <Avatar src="/images/zach.jpg" size={60} />
    <h1 className={styles.h1}>
      Hi, <strong className={styles.name}> Zach</strong>!
    </h1>
  </div>
);
