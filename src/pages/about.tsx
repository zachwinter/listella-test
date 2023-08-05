import { forwardRef } from 'react';
import View from '@/components/common/View';

const About = (props: any, ref: any) => {
  return (
    <View ref={ref} key="about" className="about">
      <p>/about</p>
    </View>
  );
};

export default forwardRef(About);
