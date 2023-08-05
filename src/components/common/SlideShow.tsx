import styles from './SlideShow.module.scss';

export default ({ images }: any) => {
  return (
    <div className={styles['slide-show']}>
      <div>
        {images.map((image: any, i: number) => (
          <img key={`image-${i}`} src={`/images/house.0${image}.jpeg`} />
        ))}
      </div>
    </div>
  );
};
