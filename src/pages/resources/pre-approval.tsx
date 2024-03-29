import { forwardRef } from 'react';
import View from '@/components/common/View';

const Favorites = (props: any, ref: any) => {
  return (
    <View ref={ref} key="pre-approval" className="pre-approval">
      <p>/resources/pre-approval</p>
    </View>
  );
};

export default forwardRef(Favorites);
