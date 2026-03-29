type StateWhere = 'where';
type StateGroupBy = 'groupBy';
type Group<T, K> = {key: K; items: T[]};
type StateHaving = 'having';
type StateSort = 'sort';


interface QueryBuider<T, State> {
    where<K extends keyof T>(key: K, value: T[K]): QueryBuider<T, StateWhere>;
    groupBy<K extends keyof T>(key: K): QueryBuider<T, StateGroupBy>;
    having(predicate: (group: Group<T, any>) => boolean): QueryBuider<T, StateHaving>;
    sort<K extends keyof T>(key: K, order: 'asc' | 'desc'): QueryBuider<T, StateSort>;
    execute(): T[];
}

class Query_Build_Implement<T, State> implements QueryBuider<T, State> {
    private data: T[];
    private steps: Array<(data: any[]) => any[]> = [];
    private last: string = '';

    constructor(data: T[]){
        this.data = [...data];
    }
    where<K extends keyof T>(key: K, value: T[K]): QueryBuilder<T, StateWhere> {
        this.steps.push((data: any[]) =>
            this.data.filter(item => item[key] === value)
    );
    this.last = 'where';
    return this as any;
    }

    groupBy<K extends keyof T>(key: K): QueryBuider<T, StateGroupBy> {
        this.steps.push((data: any[]) =>{
            const groups: Record<string, Group<T, any>> = {};
            for(const item of data){
                const k = String(item[key]);
                if(!groups[k]) groups[k] = {key: item[key], items: []};
                groups[k].items.push(item);
            }
            return Object.keys(groups).map(k => groups[k]);
        }
    );
    this.last = 'groupBy';
    return this as any;
    }

    having(predicate: (group: Group<T, any>) => boolean): QueryBuider<T, StateHaving>{
        this.steps.push((data: any[]) => 
        this.data.filter(predicate)
        );
        this.last = 'having';
        return this as any;
    }
    
}