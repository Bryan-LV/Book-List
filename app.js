// Book Constructor
function Book(title, author, isbn) {
        this.title = title,
        this.author = author,
        this.isbn = isbn
}

// UI Constructor
function UI() {}


UI.prototype.addBookToList = function (book) {
    const list = document.querySelector('#book-list');
    // create table row
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="deleteItem">X</a></td>
    `;
    list.appendChild(row);
    
    //LS
    addToLS(book);
}

UI.prototype.removeItem = function(target){
    if(target.classList.contains('deleteItem')){
        clearFromLS(target);
        target.parentElement.parentElement.remove(); 
    }
}

function clearFromLS (target){
    let books;
    if(!localStorage.getItem('books')){
        books = [];
    } else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    console.log(books);
    books.forEach(function(book,index){
        let targetEl = target.parentElement.previousElementSibling.textContent;
        if( targetEl === book.isbn){
            books.splice(index,1);
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
}


UI.prototype.clearFields = function () {
    const title = document.querySelector('#title').value = '';
    const author = document.querySelector('#author').value = '';
    const isbn = document.querySelector('#isbn').value = '';
}

function addToLS(item){
    let books;
    if(!localStorage.getItem('books')){
        books = [];
    } else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(item);
    localStorage.setItem('books',JSON.stringify(books));
}

// form validation alert message
function alertMessage() {
    const div = document.createElement('div');
    div.classList.add('alert');

    const h2 = document.createElement('h2');
    h2.innerText = 'Looks like you missed an field!';
    div.appendChild(h2);

    const bookingform = document.querySelector('#book-form');
    bookingform.insertAdjacentElement("beforebegin", div);

    setTimeout(clearAlert, 2000);
}

// clear form validation alert
function clearAlert() {
    document.querySelector('.alert').remove();
}


//set up event listeners
document.querySelector('#submit').addEventListener('click', function (e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // if all input fields are filled out then proceed
    if (title && author && isbn) {
        const book = new Book(title, author, isbn);

        const ui = new UI();
        ui.addBookToList(book);
        ui.clearFields();
    } else {
        alertMessage();
    }
});

let bookList = document.querySelector('#book-list');
bookList.addEventListener('click',function(e){
    let ui = new UI();
    ui.removeItem(e.target);
})