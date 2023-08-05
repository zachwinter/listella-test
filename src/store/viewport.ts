import { createModule } from '@/util/recoil';

const STATE = {
  width: 1,
  height: 1,
  dpr: 1,
  transition: 'FADE',
  orientation: 'PORTRAIT'
} 

export default createModule('viewport', STATE) as typeof STATE;
