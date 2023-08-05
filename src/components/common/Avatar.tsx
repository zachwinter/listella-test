import styles from './Avatar.module.scss';

export default ({
  size,
  src,
  alt,
}: {
  size?: number;
  src: string;
  alt?: string;
}) => (
  <img
    className={styles.avatar}
    src={src}
    alt={alt || ''}
    width={size || 60}
    height={size || 60}
  />
);
