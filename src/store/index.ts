import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import type { Join, PathsToProps } from '@/types/dot';
import viewport from './viewport';
import ui from './ui';
import user from './user';
import map from './map';

const STORE = {
  viewport,
  ui,
  user,
  map,
};

type Selector = Join<PathsToProps<typeof STORE>, '.'>;

export default STORE;

export function useGlobalState(selector: Selector) {
  const parsed = parseSelector(selector);
  return useRecoilState(parsed);
}

export function useGlobalValue(selector: Selector) {
  const parsed = parseSelector(selector);
  return useRecoilValue(parsed);
}

export function useGlobalSetter(selector: Selector) {
  const parsed = parseSelector(selector);
  return useSetRecoilState(parsed);
}

export function useGlobalValues(selectors: Selector[]) {
  return selectors.map((selector: Selector) => useGlobalValue(selector));
}

export function useGlobalStates(selectors: Selector[]) {
  return selectors.map((selector: Selector) => useGlobalState(selector));
}

export function useGlobalSetters(selectors: Selector[]) {
  return selectors.map((selector: Selector) => useGlobalSetter(selector));
}

function parseSelector(selector: Selector) {
  return selector.split('.').reduce((ref, key) => ref[key], STORE as any);
}
