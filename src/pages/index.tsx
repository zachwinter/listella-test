import { forwardRef } from 'react';
import View from '@/components/common/View';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import { useGlobalValue } from '@/store';

const Home = (props: any, ref: any) => {
  return (
    <View ref={ref} key="home" className="home">
      <Hero />
      <About />
    </View>
  );
};

export default forwardRef(Home)