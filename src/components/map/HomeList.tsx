import { forwardRef } from 'react';
import styles from './HomeList.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import Bedroom from '../icons/Bedroom';
import Bathroom from '../icons/Bathroom';

const HomeList = ({ homes, selected, onSelect }: any, ref: any) => {
  return (
    <ul className={styles['home-list']} ref={ref}>
      {homes.map((home:any, i: number) => (
        <li
          className={cn({ [styles.active]: selected === home })}
          key={home.address[0]}
          onClick={() => onSelect?.(home, i)}
        >
          <section
            className={cn({
              [styles.info]: true,
              [styles.visible]: selected === home,
            })}
          >
            <div className={styles.column}>
              <span className={styles.price}>
                ${new Intl.NumberFormat().format(home.price)}
              </span>

              <span className={styles.beds}>
                <div>
                  3 <Bedroom />
                </div>
                <div>
                  2 <Bathroom />
                </div>
              </span>
            </div>
            <Link href={`/homes/${i}`}>View</Link>
          </section>
          <img
            className={styles.image}
            src={'/images/house.0' + home.images[0] + '.jpeg'}
          />
        </li>
      ))}
    </ul>
  );
};

export default forwardRef(HomeList);
