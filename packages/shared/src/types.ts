type Without<T, U> = T extends U ? never : T;

export type OneOfEach<
  U,
  T extends Array<U> = Array<U>,
  V = T extends [infer First, ...infer Rest]
    ? First extends U
      ? OneOfEach<U, Rest extends U[] ? Rest : never, Without<U, First>>
      : never
    : true,
> = V extends true ? T : never;

export type DeepPartial<T> = {
  // This is needed for functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]?: T[P] extends (...args: any[]) => any
    ? T[P]
    : T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
