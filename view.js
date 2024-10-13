
const renderBookRow = (book) => {
    return `
        <div class="book-row">
            <div>${book.id}</div>
            <div>${book.name}</div>
            <div>${book.price}</div>
            <div class="clickable" onclick="openDetails(${book.id})">Read</div>
            <div class="clickable" onclick="renderUpdateBook(${book.id})">Update</div>
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
                        <div id="bookName" class="clickable" onclick="sortByName()">NAME ▲</div>
                        <div id="bookPrice" class="clickable" onclick="sortByPrice()">PRICE ▲</div>
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

function sortByName() {
    gBooks.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    if (gNameSort === 'UP') {
        console.log('Ascending');
        gNameSort = 'DOWN';
        document.getElementById("bookName").innerText = "NAME ▼";
        gBooks.reverse();
    } else {
        console.log('Descending');
        document.getElementById("bookName").innerText = "NAME ▲";
        gNameSort = 'UP';
    }
    renderBooksTable(gBooks);
}

function sortByPrice() {
    gBooks.sort((a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    });
    if (gPriceSort === 'UP') {
        gPriceSort = 'DOWN';
        document.getElementById('bookPrice').textContent = 'PRICE ▼';
        gBooks.reverse();
    } else {
        gPriceSort = 'UP';
        document.getElementById('bookPrice').textContent = 'PRICE ▲';
    }
    renderBooksTable(gBooks);
}


// Get the modal and the button
const modal = document.getElementById("bookModal");
const newBookButton = document.getElementById("newBookButton");
const closeBtn = document.querySelector(".close-btn");

// Show the modal when the button is clicked
newBookButton.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the close button is clicked
closeBtn.onclick = function() {
    modal.style.display = "none";
}


document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the form values
    const bookId = document.getElementById("modalBookId").value;
    const bookTitle = document.getElementById("modalBookTitle").value;
    const bookPrice = document.getElementById("modalBookPrice").value;
    const bookCoverUrl = document.getElementById("modalBookCoverUrl").value;

    // Create the book object
    const book = {
        id: Number(bookId),
        image: bookCoverUrl,
        name: bookTitle,
        price: Number(bookPrice)
    };
    
    if (bookInDatabase(book.id)) {
        console.log("Book already exists in the database.");
        updateBook(book);
    }
    else {
        console.log("Book added to the database.");
        addBook(book);
    }

    renderBooksTable(gBooks);
    modal.style.display = "none";
    document.querySelector("form").reset();
});

const renderUpdateBook = (bookId) => {
    const book = gBooks.find(b => b.id === bookId);
    const modalTitle = document.getElementById("modalTitle");
    const submitButton = document.getElementById("modalSubmit");

    document.getElementById("modalBookId").value = book.id;
    document.getElementById("modalBookTitle").value = book.name;
    document.getElementById("modalBookPrice").value = book.price;
    document.getElementById("modalBookCoverUrl").value = book.image;

    modalTitle.textContent = "Update Book"; // Change modal title
    submitButton.textContent = "Update"; // Change button text

    modal.style.display = "block";

}