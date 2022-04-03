//Book Constructor
function Book(title, author,ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
}


//UI Constructor
function UI(){

}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create rows
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.ISBN}</td>
    <td><a href="#" class="delete">X</a></td>`;
    


    list.appendChild(row);
}




UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message,className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div,form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
}





UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('Author').value = '';
    document.getElementById('ISBN').value = '';
}


//Event Listener 
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
    ui.showAlert('Book removed','error');
    e.preventDefault();
})