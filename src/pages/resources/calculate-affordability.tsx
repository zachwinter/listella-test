import { forwardRef } from 'react';
import View from '@/components/common/View';

const Favorites = (props: any, ref: any) => {
  return (
    <View ref={ref} key="calculate-affodability" className="calculate-affordability">
      <p>/resources/calculate-affordability</p>
    </View>
  );
};

export default forwardRef(Favorites);
