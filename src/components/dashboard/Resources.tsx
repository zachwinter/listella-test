import Card from '../common/Card';
import CardItem from '../common/CardItem';
import styles from './Resources.module.scss';
import Link from 'next/link';

export default () => {
  return (
    <Card title="Resources" className={styles.resources}>
      <CardItem>
        <Link href="/resources/pre-approval">
          <span>Get Verified &amp; Pre-Approved</span>
        </Link>
      </CardItem>
      <CardItem>
        <Link href="/resources/calculate-affordability">
          <span>Calculate My Affordability</span>
        </Link>
      </CardItem>
      <CardItem>
        <Link href="/resources/true-market-value">
          <span>True Market Value Range</span>
        </Link>
      </CardItem>
    </Card>
  );
};
