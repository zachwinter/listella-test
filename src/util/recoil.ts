import { atom } from 'recoil';

/**
 * @function createModule() - Creates a namespaced module of Atoms from a state object.
 * @param namespace
 * @param initialState
 * @returns Store
 */
export function createModule(
  namespace: string,
  initialState: any
): typeof initialState {
  return Object.keys(initialState).reduce((atoms: any, key: string) => {
    atoms[key] = atom({
      key: `${namespace}.${key}`,
      default: initialState[key],
    });
    return atoms;
  }, {}) as typeof initialState;
}
