import { forwardRef, useEffect, useState } from 'react';
import View from '@/components/common/View';
import { useRouter } from 'next/router';
import { useGlobalValue } from '@/store';
import SlideShow from '@/components/common/SlideShow';
import Address from '@/components/common/Address';
import Bedroom from '@/components/icons/Bedroom';
import Bathroom from '@/components/icons/Bathroom';
import Map from '@/components/common/Map';
import HomeDetails from '@/components/common/HomeDetails'

const Home = (props, ref) => {
  const router = useRouter();
  const [id] = useState(parseInt(router.query.id, 10));
  const homes = useGlobalValue('map.markers');
  const width = useGlobalValue('viewport.width');

  return homes?.[id] ? (
    <View ref={ref} key="home" className="home">
      <SlideShow images={homes[id].images} />
      <Address>
        <strong>
          {homes[id].address[0]} <br />
        </strong>
        {homes[id].address[1]}, {homes[id].address[2]} {homes[id].address[3]}
      </Address>
      <HomeDetails>
        <div>
          <div>${new Intl.NumberFormat().format(homes[id].price)}</div>
          <div>
            3
            <Bedroom />
          </div>
          <div>
            2
            <Bathroom />
          </div>
        </div>

        <Map
          center={homes[id].coords}
          width={width}
          height={250}
          zoom={16}
          pitch={0}
          markers={[homes[id]]}
          bearing={0}
        />
        <p>( more awesome details here )</p>
      </HomeDetails>
    </View>
  ) : (
    <></>
  );
};
export default forwardRef(Home);
