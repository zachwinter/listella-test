import { createModule } from '@/util/recoil';

const STATE = {
  navigationVisible: false,
  loading: true,
  initialized: false,
};

export default createModule('ui', STATE) as typeof STATE;
