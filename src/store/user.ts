import { createModule } from '@/util/recoil';
import { DEFAULT_COORDS } from './map';

const STATE = {
  mode: 'BUY',
  location: DEFAULT_COORDS,
};

export default createModule('user', STATE) as typeof STATE;
