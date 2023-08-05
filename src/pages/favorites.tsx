import { forwardRef } from 'react';
import View from '@/components/common/View';

const Favorites = (props: any, ref: any) => {
  return (
    <View ref={ref} key="favorites" className="favorites">
      <p>/favorites</p>
    </View>
  );
};

export default forwardRef(Favorites);
