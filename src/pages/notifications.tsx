import { forwardRef } from 'react';
import View from '@/components/common/View';

const Notifications = (props: any, ref: any) => {
  return (
    <View ref={ref} key="notifications">
      <p>/notifications</p>
    </View>
  );
};

export default forwardRef(Notifications);
