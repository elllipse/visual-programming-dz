
import { query } from './lab5.ts';

type User = {
    id: number;
    name: string;
    age: number;
    city: string;
};

const users: User[] = [
    { id: 1, name: "John", age: 34, city: "NY" },
    { id: 2, name: "John", age: 33, city: "NY" },
    { id: 3, name: "Mike", age: 35, city: "LA" },
    { id: 4, name: "Mike", age: 28, city: "LA" }
];


console.log("Проверка where");
const result1 = query(users)
    .where('city', 'NY')
    .execute();
console.log("where('city', 'NY'):", result1);


console.log("\n Проверка where + sort ");
const result2 = query(users)
    .where('city', 'NY')
    .sort('age', 'asc')
    .execute();
console.log("Отсортировано по возрасту:", result2);


console.log("\n Проверка groupBy");
const result3 = query(users)
    .groupBy('city')
    .execute();
console.log("groupBy('city'):", result3);


console.log("\n Проверка groupBy + having");
const result4 = query(users)
    .groupBy('city')
    .having(group => group.items.length > 1)
    .execute();
console.log("Группы с >1 элементом:", result4);

console.log("\n Полная проверка");
const result5 = query(users)
    .where('city', 'NY')
    .groupBy('name')
    .having(group => group.items.length > 1)
// .sort('key', 'asc')
    .execute();
console.log("Полный запрос:", result5); 