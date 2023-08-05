
import styles from './Hero.module.scss';
import HeroSVG from '@/components/svg/HeroSVG'

export default () => (
  <section className={styles.hero}>
    <header>
      <h1 className="cursive">
        For Sale By <span>You</span>
      </h1>

      <p>A simpler, faster way to buy or sell your home.</p>
    </header>

    <HeroSVG className={styles.svg} />
  </section>
);
