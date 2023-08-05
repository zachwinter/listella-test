type P = string | number | boolean | unknown[] | null | Date

export type PathsToProps<T> = T extends P
  ? []
  : {
      [K in Extract<keyof T, P>]: [K, ...PathsToProps<T[K]>];
    }[Extract<keyof T, P>];

export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;
