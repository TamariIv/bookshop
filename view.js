
const renderBookRow = (book) => {
    return `
        <div class="book-row">
            <div>${book.id}</div>
            <div>${book.name}</div>
            <div>${book.price}</div>
            <div class="clickable" onclick="openDetails(${book.id})">Read</div>
            <div class="clickable" onclick="updateBook(${book.id})">Update</div>
            <div class="clickable" onclick="deleteBook(${book.id})">Delete</div>
        </div> `
}

const renderBooksTable = (books) => {
    let tableStr = '';
    for (const book of books) {
        tableStr += renderBookRow(book)
    }
    const topRow = `<div class="book-row top-row">
                        <div>ID</div>
                        <div>NAME</div>
                        <div>PRICE</div>
                        <div>ACTION</div>
                        <div>UPDATE</div>
                        <div>DELETE</div>
                    </div>`
    const bottomRow = `<div class="bottom-row">
                            <div><</div>
                            <div class="page-number">1</div>
                            <div>></div>
                        </div>`    

    document.getElementById("bookTable").innerHTML = topRow + tableStr + bottomRow;
    return tableStr;
}

const openDetails = (bookId) => {
    const book = gBooks.find(b => b.id === bookId);
    let rate = localStorage.getItem('rate-' + bookId);
    if (!rate) {
        localStorage.setItem('rate-' + bookId, 0);
        rate = 0;
    }

    document.getElementById("bookDetailsContainer").innerHTML = `
        <div id="bookDetails">
            <h1 class="book-title">${book.name}</h1>
            <div class="wrap-content">
                <div class="book-image"><img src=${book.image} alt="Book Image"></div>
                <div>
                    <p>Price: ${book.price}$</p>
                    <div class="wrap-content">
                        <div>Rate: </div>
                        <div class="rate-controls">
                            <button class="rate-button" onclick="decreaseRate(${book.id})">-</button>
                            <span id="rate-${book.id}">${rate}</span>
                            <button class="rate-button" onclick="increaseRate(${book.id})">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

const increaseRate = (bookId) => {
    let rate = parseInt(localStorage.getItem('rate-' + bookId));
    if (rate < 10)
        rate++;
    localStorage.setItem('rate-' + bookId, rate);
    document.getElementById("rate-" + bookId).innerText = rate;
}

const decreaseRate = (bookId) => {
    let rate = parseInt(localStorage.getItem('rate-' + bookId));
    if (rate > 0) {
        rate--;
        localStorage.setItem('rate-' + bookId, rate);
        document.getElementById("rate-" + bookId).innerText = rate;
    }
}









