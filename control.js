function main() {
    books = JSON.parse(localStorage.getItem("books")) || gDump;
    renderBooksTable(books);
}

function updateLocalStorage() {
    localStorage.removeItem("books");
    localStorage.setItem('books', JSON.stringify(gBooks));
}

function addBook(book) {
    gBooks.push(book);
    updateLocalStorage();
    renderBooksTable(gBooks);
}

function deleteBook(bookId) {
    gBooks = gBooks.filter(b => b.id!== bookId);
    updateLocalStorage();
    renderBooksTable(gBooks);
}

function updateBookModal(bookId) {
    const book = gBooks.find(b => b.id === bookId);
    renderUpdateBook(book);
}

function updateBook(book) { 
    const index = gBooks.findIndex(b => book.id === b.id);
    if (index !== -1) {
        gBooks[index] = book;
    }
    updateLocalStorage();
    renderBooksTable(gBooks);
    
}

function bookInDatabase(bookId) {
    return gBooks.some(b => b.id === bookId);
}

main();

