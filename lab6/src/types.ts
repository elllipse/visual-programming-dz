
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};


export type PickedByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};


type KebabToCamelCase<S extends string> = 
  S extends `${infer P}-${infer Q}`
    ? `${P}${Capitalize<KebabToCamelCase<Q>>}`
    : S;


export type EventHandler<T extends Record<string, any>> = {
  [K in keyof T as `on${Capitalize<KebabToCamelCase<string & K>>}`]: (event: T[K]) => void;
};