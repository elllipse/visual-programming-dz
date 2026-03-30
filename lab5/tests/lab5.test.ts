import { it, expect } from 'vitest';
import { query, type Group } from '../src/lab5';

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
  { id: 5, name: "Mike", surname: "Smith", age: 28, city: "NY" },
];



it('where фильтрует по одному условию', () => {
  const result = query(users)
    .where('city', 'NY')
    .execute();
  
  expect(result).toHaveLength(3);
  expect(result[0].city).toBe('NY');
});

it('where можно добавлять несколько условий', () => {
  const result = query(users)
    .where('name', 'John')
    .where('surname', 'Doe')
    .execute();
  
  expect(result).toHaveLength(3);
});



it('сортирует по возрастанию', () => {
  const result = query(users)
    .sort('age', 'asc')
    .execute();
  expect(result[0].age).toBe(28);
  expect(result[result.length - 1].age).toBe(35);
});

it('сортирует по убыванию', () => {
  const result = query(users)
    .sort('age', 'desc')
    .execute();
  
  expect(result[0].age).toBe(35);
  expect(result[result.length - 1].age).toBe(28);
});


it('groupBy группирует по ключу', () => {
  const result = query(users)
    .groupBy('city')
    .execute();
  
  const groups = result as unknown as Group<User, string>[];
  
  expect(groups).toHaveLength(2);
  expect(groups[0].key).toBe('NY');
  expect(groups[0].items).toHaveLength(3);
  expect(groups[1].key).toBe('LA');
  expect(groups[1].items).toHaveLength(2);
});



it('having фильтрует группы по условию', () => {
  const result = query(users)
    .groupBy('city')
    .having(group => group.items.length > 2)
    .execute();
  
  const groups = result as unknown as Group<User, string>[];
  
  expect(groups).toHaveLength(1);
  expect(groups[0].key).toBe('NY');
});


it('полная цепочка: where → groupBy → having → sort', () => {
  const result = query(users)
    .where('surname', 'Doe')
    .groupBy('city')
    .having(group => group.items.some(u => u.age > 34))
    .sort('key' as any, 'asc')
    .execute();
  
  const groups = result as unknown as Group<User, string>[];
  
  expect(groups).toHaveLength(1);
  expect(groups[0].key).toBe('LA');
  expect(groups[0].items).toHaveLength(2);
});

it('пустой запрос возвращает все данные', () => {
  const result = query(users).execute();
  expect(result).toEqual(users);
});