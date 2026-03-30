type StateWhere = 'where';
type StateGroupBy = 'groupBy';
type Group<T, K> = { key: K; items: T[] };
type StateHaving = 'having';
type StateSort = 'sort';

interface QueryBuilder<T, State> {
    where<K extends keyof T>(key: K, value: T[K]): QueryBuilder<T, StateWhere>;
    groupBy<K extends keyof T>(key: K): QueryBuilder<T, StateGroupBy>;
    having(predicate: (group: Group<T, any>) => boolean): QueryBuilder<T, StateHaving>;
    sort<K extends keyof T>(key: K, order?: 'asc' | 'desc'): QueryBuilder<T, StateSort>;
    execute(): T[];
}

class QueryBuilderImpl<T, State> implements QueryBuilder<T, State> {
    private data: T[];
    private steps: Array<(data: any[]) => any[]> = [];
    private last: string = '';

    constructor(data: T[]) {
        this.data = [...data];
    }

    where<K extends keyof T>(key: K, value: T[K]): QueryBuilder<T, StateWhere> {
        this.steps.push((data: any[]) =>
            data.filter(item => item[key] === value)
        );
        this.last = 'where';
        return this as any;
    }

    groupBy<K extends keyof T>(key: K): QueryBuilder<T, StateGroupBy> {
        this.steps.push((data: any[]) => {
            const groups: Record<string, Group<T, any>> = {};
            for (const item of data) {
                const k = String(item[key]);
                if (!groups[k]) groups[k] = { key: item[key], items: [] };
                groups[k].items.push(item);
            }
            return Object.keys(groups).map(k => groups[k]);
        });
        this.last = 'groupBy';
        return this as any;
    }

    having(predicate: (group: Group<T, any>) => boolean): QueryBuilder<T, StateHaving> {
        this.steps.push((data: any[]) =>
            data.filter(predicate)
        );
        this.last = 'having';
        return this as any;
    }

    sort<K extends keyof T>(key: K, order: 'asc' | 'desc' = 'asc'): QueryBuilder<T, StateSort> {
        this.steps.push((data: any[]) =>
            [...data].sort((a, b) => {
                const av = a[key], bv = b[key];
                const compare = av < bv ? -1 : av > bv ? 1 : 0;
                return order === 'asc' ? compare : -compare;
            })
        );
        this.last = 'sort';
        return this as any;
    }

    execute(): T[] {
        let result: any = this.data;
        for (const step of this.steps) {
            result = step(result);
        }
        return result;
    }
}

function query<T>(data: T[]): QueryBuilder<T, never> {
    return new QueryBuilderImpl<T, never>(data);
}

export { query };
export type { QueryBuilder, Group };