// Book class: 代表一本書

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}


// UI class: 處理UI任務
class UI {
    static displayBooKs() {
        // const StoredBooks = [{
        //         title: 'Book One',
        //         author: 'John Doe',
        //         isbn: '3434434',
        //     },
        //     {
        //         title: 'Book Two',
        //         author: 'Jane Doe',
        //         isbn: '45545',
        //     }
        // ];

        //const books = StoredBooks;

        const books = Store.getBooks();


        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

}


// Store class: 處理storage(local storage 也就是browser 除非被刪除不然資料會存在那邊)
// 不能存object只能存string
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;


    }


    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removebook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });


        localStorage.setItem('books', JSON.stringify(books));

    }

}



// Event: 展示書本在list裡面

document.addEventListener('DOMContentLoaded', UI.displayBooKs);



// Event: 加入書本
document.querySelector('#book-form').addEventListener('submit', (e) => {

    //prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    //Valadate (資料驗證)
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        //instantiate book
        const book = new Book(title, author, isbn);


        //Add Book to UI
        UI.addBookToList(book);


        //Add book to store

        Store.addBook(book);

        //Show success message

        UI.showAlert('Book Added', 'success')


        //Clear fields
        UI.clearFields();
    }
})


// Event: 移除書本

document.querySelector('#book-list').addEventListener('click', (e) => {

    //remove books from UI 所以她重新整理後會跑回來
    UI.deleteBook(e.target)

    //remove book from store
    Store.removebook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed', 'success')
})