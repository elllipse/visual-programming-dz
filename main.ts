interface User{
    id: number;
    name: string;
    email?: string;
    isActive: boolean;
}

function createUser(id: number, name: string, email: string, isActive: boolean): User{
    const Activity = isActive;
    return{
        id: id,
        name: name,
        email : email,
        isActive : Activity
    };
}

var user1 = createUser(1, 'Vasya Petrov', 'ivan@gmail.com', true);
console.log('Task1: ', user1);

var user2 = createUser(2, 'Maria Ivanova', 'maria@gmail.com', false);
console.log('task 1: ', user2);

type Genre = 'fiction' | 'non-fiction';

interface Book{
    title: string,
    author : string,
    year?: number,
    genre: Genre;
}

function createBook(book: Book): Book{
    return book
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



function Ploshad(shape: 'circle', radius: number): number;
function Ploshad(shape: 'square', side: number): number;
function Ploshad(shape: any, param: number): number{
    if(shape == 'circle'){
        return Math.PI * param * param;
    }else{
        return param * param;
    }
}
console.log('');
console.log('task 3: ', Ploshad('circle', 7));
console.log('task 3: ', Ploshad('square', 7));
type Status = 'active' | 'inactive' | 'new';

function Color(status: Status): string{
    if(status == 'active'){
        return 'green';
    }else if(status == 'inactive'){
        return 'red';
    }else{
        return 'yellow';
    }
}
console.log('');
console.log('Task 4: ', Color('active'));
console.log('Task 4: ', Color('inactive'));
console.log('Task 4: ', Color('new'));


type StringUp = (str: string, uppercase?: boolean) => string;

var PervayBukvaUp: StringUp = function(str: string): string{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var Deleteprobel: StringUp = function(str: string, uppercase?: boolean): string{
    var trim = str.trim();

    if(uppercase == true){
        return trim.toUpperCase();
    }else{
        return trim;
    }
};
console.log('');

console.log('task 5: ', PervayBukvaUp('slovo'));
console.log('task 5: ', Deleteprobel('   slovo   ', false));
console.log('task 5: ', Deleteprobel('   slovo   ', true));

function FirstEl(arr: any[]): any{
    if(arr && arr.length > 0){
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


interface HashId{
    id : number;
}

function findId(items: HashId[], id: number): HashId | undefined{
    for(var i = 0; i < items.length; i++){
        if(items[i].id == id){
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