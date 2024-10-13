function main() {
    renderBooksTable(gBooks);
}

function updateLocalStorage() {
    localStorage.removeItem("books");
    localStorage.setItem('books', JSON.stringify(gBooks));
}

function addBook(book) {
    console.log('adding book');
    gBooks.push(book);
    updateLocalStorage();
    renderBooksTable(gBooks);
}

function deleteBook(bookId) {
    gBooks = gBooks.filter(b => b.id!== bookId);
    updateLocalStorage();
    renderBooksTable(gBooks);
}

function updateBook(book) {
    deleteBook(book.id);
    gBooks.push(book);
    updateLocalStorage();
    renderBooksTable(gBooks);
}

main();

