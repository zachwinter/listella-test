import { createModule } from '@/util/recoil';
import homes from '@/mock/homes.json'

const HOMES = homes.map(home => {
  return {
    ...home,
    images: new Array(5).fill(0).map(() => 1 + Math.floor(Math.random() * 9)),
  };
});

export const DEFAULT_COORDS = [-122.4394, 37.7349];

const STATE = {
  center: DEFAULT_COORDS,
  zoom: 11,
  pitch: 0,
  bearing: 0,
  loading: true,
  visible: false,
  markers: HOMES,
  selectedMarker: null
};

export default createModule('map', STATE) as typeof STATE;
