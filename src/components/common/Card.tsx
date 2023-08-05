import styles from './Card.module.scss';
import cn from 'classnames';

export default ({ title, children, ...rest }: any) => {
  return (
    <section
      {...rest}
      className={cn({ [styles.card]: true, [rest.className || '']: true })}
    >
      <h3 className={styles.title}>{title}</h3>
      {children}
    </section>
  );
};
