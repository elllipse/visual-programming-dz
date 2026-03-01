"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.createBook = createBook;
exports.Ploshad = Ploshad;
exports.Color = Color;
exports.FirstEl = FirstEl;
exports.findId = findId;
function createUser(id, name, email, isActive) {
    var Activity = isActive;
    return {
        id: id,
        name: name,
        email: email,
        isActive: Activity
    };
}
var user1 = createUser(1, 'Vasya Petrov', 'ivan@gmail.com', true);
console.log('Task1: ', user1);
var user2 = createUser(2, 'Maria Ivanova', 'maria@gmail.com', false);
console.log('task 1: ', user2);
function createBook(book) {
    return book;
}
var book1 = createBook({
    title: 'На Дне',
    author: 'Максим Горький',
    genre: 'fiction',
    year: 1962
});
var book2 = createBook({
    title: 'Униженные и оскорбленные',
    author: 'Федор Достаевский',
    genre: 'non-fiction',
});
console.log('');
console.log('task 2 (year)', book1);
console.log('task 2 (no year)', book2);
function Ploshad(shape, param) {
    if (shape == 'circle') {
        return Math.PI * param * param;
    }
    else {
        return param * param;
    }
}
console.log('');
console.log('task 3: ', Ploshad('circle', 7));
console.log('task 3: ', Ploshad('square', 7));
function Color(status) {
    if (status == 'active') {
        return 'green';
    }
    else if (status == 'inactive') {
        return 'red';
    }
    else {
        return 'yellow';
    }
}
console.log('');
console.log('Task 4: ', Color('active'));
console.log('Task 4: ', Color('inactive'));
console.log('Task 4: ', Color('new'));
var PervayBukvaUp = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
var Deleteprobel = function (str, uppercase) {
    var trim = str.trim();
    if (uppercase == true) {
        return trim.toUpperCase();
    }
    else {
        return trim;
    }
};
console.log('');
console.log('task 5: ', PervayBukvaUp('slovo'));
console.log('task 5: ', Deleteprobel('   slovo   ', false));
console.log('task 5: ', Deleteprobel('   slovo   ', true));
function FirstEl(arr) {
    if (arr && arr.length > 0) {
        return arr[0];
    }
    return undefined;
}
var numbers = [688, 89, 34];
var strings = ['f', 'h'];
var empty = [];
console.log('');
console.log('task 6: ', FirstEl(numbers));
console.log('task 6: ', FirstEl(strings));
console.log('task 6: ', FirstEl(empty));
function findId(items, id) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            return items[i];
        }
    }
    return undefined;
}
var userId = [
    { id: 1, name: 'Alena' },
    { id: 2, name: 'Igor' },
    { id: 3, name: 'John' }
];
console.log('');
console.log('task 7: ', findId(userId, 2));
console.log('task 7: ', findId(userId, 99));
