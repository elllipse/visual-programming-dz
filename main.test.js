"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const main_ts_1 = require("./main.ts");
(0, vitest_1.it)('createUser создает пользователя', () => {
    const user = (0, main_ts_1.createUser)(1, 'Vasya Petrov', 'ivan@gmail.com', true);
    (0, vitest_1.expect)(user.name).toBe('Vasya Petrov');
});
(0, vitest_1.it)('createBook создает книгу', () => {
    const book = (0, main_ts_1.createBook)({
        title: 'Война и мир',
        author: 'Лев Толстой',
        genre: 'fiction',
        year: 1869
    });
    (0, vitest_1.expect)(book.title).toBe('Война и мир');
});
(0, vitest_1.it)('Ploshad', () => {
    (0, vitest_1.expect)((0, main_ts_1.Ploshad)('circle', 7)).toBeCloseTo(153.93804002589985);
});
(0, vitest_1.it)('status is active', () => {
    (0, vitest_1.expect)((0, main_ts_1.Color)('active')).toBe('green');
});
(0, vitest_1.describe)('FirstEl', () => {
    (0, vitest_1.it)('первый элемент', () => {
        (0, vitest_1.expect)((0, main_ts_1.FirstEl)([688, 89, 34])).toBe(688);
    });
});
(0, vitest_1.describe)('findId', () => {
    const userId = [
        { id: 1, name: 'Alena' },
        { id: 2, name: 'Igor' },
        { id: 3, name: 'John' }
    ];
    (0, vitest_1.it)('undefined id', () => {
        (0, vitest_1.expect)((0, main_ts_1.findId)(userId, 99)).toBeUndefined();
    });
});
