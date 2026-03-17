import { describe, it, expect} from 'vitest';
import { createUser, createBook,Ploshad, Color, FirstEl, findId} from '../src/main.ts';



it('createUser создает пользователя', () => {
    const user = createUser(1, 'Vasya Petrov', 'ivan@gmail.com', true);
    expect(user.name).toBe('Vasya Petrov');
});


it('createBook создает книгу', () => {
    const book = createBook({
        title: 'Война и мир',
        author: 'Лев Толстой',
        genre: 'fiction',
        year: 1869
    });
    
    expect(book.title).toBe('Война и мир');
});


it('Ploshad', () => {
    expect(Ploshad('circle', 7)).toBeCloseTo(153.93804002589985);
});

it('status is active', () => {
    expect(Color('active')).toBe('green');
});

describe('FirstEl', () => {
    it('первый элемент', () => {
        expect(FirstEl([688, 89, 34])).toBe(688);
    });
});

describe('findId', () => {
    const userId = [
        { id: 1, name: 'Alena' },
        { id: 2, name: 'Igor' },
        { id: 3, name: 'John' }
    ];

  it('undefined id', () => {
        expect(findId(userId, 99)).toBeUndefined();
    });
    });