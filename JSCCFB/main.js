// var, let , const 

// let dcore;

// score = 10;

// console.log(score);

// //Data Type: String Numbers Boolean null undefined

// const name = 'John';
// const age = 30;
// // const rating = 4.5;
// // const isCool = true;
// // const x = null // 空的
// // const y = undefined;
// // let z; // undefined;

// console.log('my name is ' + name + ' and i am ' + age);

// console.log(`my name is ${name} and i am ${age}`);

// const hello = `my name is ${name} and i am ${age}`;

// console.log(hello);


// const s = 'technology, computers, it, code'

// console.log(s.split(','));


// Arrays - variables that hold mutiple values

// const fruits = ['apples', 'oranges', 'pears'];

// fruits[3] = 'grapes';

// fruits.push('mangos');

// fruits.unshift('strawberries');

// fruits.pop();

// console.log(Array.isArray(fruits))

// console.log(fruits.indexOf('oranges'))

// console.log(fruits);


// const person = {

//     firstName: 'John',
//     lastName: 'Doe',
//     age: 30,
//     hobbies: ['music', 'movies', 'sports'],
//     address: {
//         street: '50 main st',
//         city: 'Boston',
//         state: 'MA'
//     }
// }

// // const {
// //     firstName,
// //     lastName,
// //     address: {
// //         city
// //     }
// // } = person;


// // console.log(city);

// person.email = '1234@hotmail.com.tw'

// // // // console.log(person)


// // const todos = [{
// //         id: 1,
// //         text: 'take out trash',
// //         isCompeleted: true
// //     },
// //     {
// //         id: 2,
// //         text: 'Meeting with boss',
// //         isCompeleted: true
// //     },
// //     {
// //         id: 3,
// //         text: 'Dentist app',
// //         isCompeleted: false
// //     }
// // ]



// // //forEach, map, filter

// // const todoComplete = todos.filter(function (todo) {
// //     return todo.isCompeleted === true;
// // }).map(function (todo) {
// //     return todo.text;
// // })

// // console.log(todoComplete);




// const x = 21;

// const color = x > 10 ? 'red' : 'blue';

// switch (color) {
//     case 'red':
//         console.log('color is red');
//         break;
//     case 'blue':
//         console.log('color is blue');
//         break;
//     default:
//         console.loe('color is not red or blue')
//         break;
// }



// function addNums(num1 = 1, num2 = 2) {
//     return num1 + num2;
// }

// console.log(addNums(5, 5));


// const addNums = num1 => num1 + 5;


// console.log(addNums(5));

// function Person(firstName, lastName, dob) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.dob = new Date(dob);
// }

// Person.prototype.getFullName = function () {
//     return `${this.firstName} ${this.lastName}`
// }
// Person.prototype.getBirthYear = function () {
//     return this.dob.getFullYear();
// }



//class



// class Person {
//     constructor(firstName, lastName, dob) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.dob = new Date(dob);
//     }
//     getBirthYear() {
//         return this.dob.getFullYear();
//     }

//     getFullName() {
//         return `${this.firstName} ${this.lastName}`;
//     }
// }

// // Instantiate object

// const person1 = new Person('John', 'Doe', '4-3-1980');
// const person2 = new Person('Mary', 'Smith', '3-6-1970');

// console.log(person1.getBirthYear());
// console.log(person1);


// Single element 

// const form = document.getElementById('my-form');

// console.log(document.querySelector('h1'))


// //multiple element

// console.log(document.querySelectorAll('.item'))


// const items = document.querySelectorAll('.item');

// items.forEach((item) => console.log(item));

// const ul = document.querySelector('.items');

// ul.remove();

// ul.lastElementChild.remove();

// ul.firstElementChild.textContent = 'Hello'

// ul.children[1].innerHTML = 'Brad'

// ul.lastElementChild.innerHTML = '<h1>HELLO<h1>';



// const btn = document.querySelector('.btn');

// btn.addEventListener('mouseover', (e) => {
//     e.preventDefault();
//     document.querySelector('#my-form').style.background = '#ccc'

//     document.querySelector('body').classList.add('bg-dark')

//     document.querySelector('.items').lastElementChild.innerHTML = '<h1>hello</h1>'
// })


// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    console.log(nameInput.value);
}

function onSubmit(e) {
    e.preventDefault();

    if (nameInput.value === '' || emailInput.value === '') {
        // 下方的msg處理警告文字並且加入額外寫好的CSS
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // 計時3 秒鐘 移除警告
        setTimeout(() => msg.remove(), 3000);
    } else {
        // 如果不是上面的狀況則創造新的<li>元素
        const li = document.createElement('li');

        // 處理新的<li>裡面的文字內容
        li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

        // Add HTML
        // li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

        // 把剛剛新增的<li>加到userList裡面
        userList.appendChild(li);

        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
    }
}