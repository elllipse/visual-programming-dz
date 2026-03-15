import { describe, it, expect } from 'vitest';
import { where, sort, groupBy, having, query, type Group } from '../src/lab4';

type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
};

const users: User[] = [
  { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
  { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
  { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
  { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
];

describe('TypeScript Pipeline - Lab4', () => {
  
  it('фильтрация и сортировка (пример 1 из ТЗ)', () => {
    const search = query(
      where('name', 'John'),
      where('surname', 'Doe'),
      sort('age')
    );
    
    const result = search(users);
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({ id: 2, age: 33 });
    expect(result[1]).toMatchObject({ id: 1, age: 34 });
    expect(result[2]).toMatchObject({ id: 3, age: 35 });
  });

  it('группировка и фильтр по группам (пример 2 из ТЗ)', () => {
    const groupAndFilter = query(
      groupBy('city'),
      having((group: Group<User, any>) => group.items.length > 1)
    );
    
    const result = groupAndFilter(users) as Group<User, any>[];
    expect(result).toHaveLength(2);
    expect(result[0].key).toBe('NY');
    expect(result[1].key).toBe('LA');
    expect(result[0].items).toHaveLength(2);
    expect(result[1].items).toHaveLength(2);
  });

  it('комбинированный конвейер (пример 3 из ТЗ)', () => {
    const pipeline = query(
      where('surname', 'Doe'),
      groupBy('city'),
      having((group: Group<User, any>) => 
        group.items.some((u: User) => u.age > 34)
      )
    );
    
    const result = pipeline(users) as Group<User, any>[];
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('LA');
    expect(result[0].items).toHaveLength(2);
  });

  it('пустой конвейер возвращает исходные данные', () => {
    const emptyPipeline = query<User>();
    expect(emptyPipeline(users)).toEqual(users);
  });
});
