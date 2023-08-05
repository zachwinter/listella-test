import styles from './OverlayedImage.module.scss';
import classNames from 'classnames';

export default ({
  width,
  height,
  src,
  alt = '',
}: {
  width: number;
  height: number;
  src: string;
  alt?: string;
}) => (
  <div
    className={classNames({ [styles.image]: true, image: true })}
    style={{ width, height }}
  >
    <img className={styles.image} src={src} alt={alt} />
  </div>
);
