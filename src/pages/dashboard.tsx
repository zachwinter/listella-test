import { forwardRef, useState } from 'react';
import View from '@/components/common/View';
import ToDo from '@/components/dashboard/ToDo';
import Resources from '@/components/dashboard/Resources';
import todo from '@/mock/to-do.json';

const Dashboard = (props: any, ref: any) => {
  const [items, setItems] = useState(todo);

  function updateItem(i: number, val: boolean) {
    const next = [...items];
    next[i].status = val ? 'COMPLETE' : 'INCOMPLETE';
    setItems(next);
  }

  return (
    <View ref={ref} key="dashboard">
      <ToDo items={items} updateItem={updateItem} />
      <Resources />
    </View>
  );
};

export default forwardRef(Dashboard);
