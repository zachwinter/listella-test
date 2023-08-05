import styles from './Hamburger.module.scss';
import classNames from 'classnames';

interface Props {
  active?: boolean;
  onClick?: Function;
}

export default function Hamburger(props: Props) {
  const classes = classNames({
    [styles.hamburger]: true,
    [styles.active]: props.active,
  });

  return (
    <button className={classes} onClick={props.onClick as any}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
