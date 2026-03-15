// 9. Функция query
export function query(...steps) {
    return (data) => {
        let currentData = data;
        let isGroupStage = false;
        for (const step of steps) {
            if (!isGroupStage) {
                // Пытаемся применить как Transform<T>
                try {
                    currentData = step(currentData);
                }
                catch (_a) {
                    // Если не получилось, значит это GroupTransform
                    isGroupStage = true;
                    currentData = step(currentData);
                }
            }
            else {
                // Применяем GroupTransform
                currentData = step(currentData);
            }
        }
        return currentData;
    };
}
// Реализация where
export function where() {
    return (key, value) => {
        return (data) => {
            return data.filter(item => item[key] === value);
        };
    };
}
// Реализация sort
export function sort() {
    return (key) => {
        return (data) => {
            return [...data].sort((a, b) => {
                if (a[key] < b[key])
                    return -1;
                if (a[key] > b[key])
                    return 1;
                return 0;
            });
        };
    };
}
// Реализация groupBy
export function groupBy() {
    return (key) => {
        return (data) => {
            const groups = new Map();
            for (const item of data) {
                const groupKey = item[key];
                if (!groups.has(groupKey)) {
                    groups.set(groupKey, []);
                }
                groups.get(groupKey).push(item);
            }
            const result = [];
            groups.forEach((items, key) => {
                result.push({ key, items });
            });
            return result;
        };
    };
}
// Реализация having
export function having() {
    return (predicate) => {
        return (groups) => {
            return groups.filter(predicate);
        };
    };
}
// Тестовые данные
const users = [
    { id: 1, name: 'Alice', age: 30, city: 'Moscow' },
    { id: 2, name: 'Bob', age: 25, city: 'SPb' },
    { id: 3, name: 'Charlie', age: 35, city: 'Moscow' },
    { id: 4, name: 'David', age: 25, city: 'SPb' },
    { id: 5, name: 'Eve', age: 30, city: 'Moscow' }
];
// Пример 1: Фильтрация и сортировка
const filterAndSort = query(where()('city', 'Moscow'), sort()('age'));
console.log('Фильтрация по Москве и сортировка по возрасту:');
console.log(filterAndSort(users));
// Пример 2: Группировка и фильтрация групп
const groupAndFilter = query(groupBy()('city'), having()(group => group.items.length > 1));
console.log('\nГруппировка по городу и фильтрация групп с более чем 1 элементом:');
console.log(groupAndFilter(users));
