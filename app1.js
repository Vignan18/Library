class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        //create rows
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    }

    showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },1000)
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('Author').value = '';
        document.getElementById('ISBN').value = '';
    }
}


class Store{
    
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
             books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }


    static displayBooks(){
        const books  = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            ui.addBookToList(book);
        })

    }

    static addBook(book){
        const books = Store.getBooks();
         books.push(book);
         localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
     
    }

}

 document.addEventListener('DOMContentLoaded',Store.displayBooks)

document.getElementById("book-form").addEventListener("submit",function(e){
    const title = document.getElementById('title').value,
            author = document.getElementById('Author').value,
            isbn = document.getElementById('ISBN').value;
    
    const book = new Book(title, author, isbn);
    const ui = new UI();

    //Validate 
    if(title === '' || author === '' || isbn === ''){
       ui.showAlert("Please fill all fields",'error');
    }
    //add book to list
    else{
    ui.addBookToList(book);
    //add to Store
    Store.addBook(book);

    ui.showAlert("Book Added",'success');
    //clear fields 
    ui.clearFields();
    }
    e.preventDefault();
})


//Event Listener for Delete
document.getElementById('book-list').addEventListener('click',(e)=>{
    const ui = new UI();
    ui.deleteBook(e.target);
    //remove from local storage 
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    ui.showAlert('Book removed','error');
    e.preventDefault();
})