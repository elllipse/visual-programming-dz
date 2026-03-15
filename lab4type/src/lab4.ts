type Transform<T> = (data: T[]) => T[];

type Where<T> = <K extends keyof T>(key: K, value: T[K]) => Transform<T>;


type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;

type Group<T, K> = { key: K; items: T[] };

type GroupBy<T> = <K extends keyof T>(key: K) => Transform<Group<T, T[K]>>;

type Having<T> = <K extends keyof T>(
  predicate: (group: Group<T, T[K]>) => boolean
) => Transform<Group<T, T[K]>>;


function query<T>(...steps: Transform<any>[]): Transform<any> {
  return (data: T[]) => {
    return steps.reduce((result, step) => step(result), data as any) as any;
  };
}


export const where: Where<any> = (key: PropertyKey, value: any) => 
  (data: any[]) => data.filter(item => item[key] === value);

export const sort: Sort<any> = (key: PropertyKey) => 
  (data: any[]) => [...data].sort((a, b) => {
    const av = a[key], bv = b[key];
    return av < bv ? -1 : av > bv ? 1 : 0;
  });

export const groupBy: GroupBy<any> = (key: PropertyKey) => 
  (data: any[]) => {
    const groups: Record<string, Group<any, any>> = {};
    for (const item of data) {
      const k = String(item[key]);
      if (!groups[k]) groups[k] = { key: item[key], items: [] };
      groups[k].items.push(item);
    }
    return Object.keys(groups).map(k => groups[k]);
  };

export const having: Having<any> = (predicate: (group: any) => boolean) => 
  (data: any[]) => data.filter(predicate);

export { query };
export type { Transform, Where, Sort, GroupBy, Having, Group };
