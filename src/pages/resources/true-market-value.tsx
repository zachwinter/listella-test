import { forwardRef } from 'react';
import View from '@/components/common/View';

const Favorites = (props: any, ref: any) => {
  return (
    <View ref={ref} key="true-market-value" className="true-market-value">
      <p>/resources/true-market-value</p>
    </View>
  );
};

export default forwardRef(Favorites);
