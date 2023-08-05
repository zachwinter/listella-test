import { forwardRef } from 'react';
import View from '@/components/common/View';

const Inbox = (props: any, ref: any) => {
  return (
    <View ref={ref} key="inbox" className="inbox">
      <p>/inbox</p>
    </View>
  );
};

export default forwardRef(Inbox);