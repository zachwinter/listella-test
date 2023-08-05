import { RecoilRoot } from 'recoil';
import RecoilBootstrap from './RecoilBootstrap';

export default ({ children }) => (
  <RecoilRoot>
    <RecoilBootstrap>{children}</RecoilBootstrap>
  </RecoilRoot>
);
