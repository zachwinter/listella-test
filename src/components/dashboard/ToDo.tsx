import styles from './ToDo.module.scss';
import Toggle from '../common/Toggle';
import cn from 'classnames';
import Card from '../common/Card';
import CardItem from '@/components/common/CardItem';

export default ({ items, updateItem }: any) => {
  return (
    <Card title="To Do">
      <ul>
        {items.map((item:any, i:any) => (
          <CardItem
            className={cn({
              [styles.complete]: item.status === 'COMPLETE',
            })}
            key={item.text}
          >
            {item.text}
            <Toggle
              value={item.status === 'COMPLETE'}
              update={(e: any) => updateItem(i, e)}
            />
          </CardItem>
        ))}
      </ul>
    </Card>
  );
};
