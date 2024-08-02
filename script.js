const library = [new Book("Harry Potter", "J. K. Rowling", 312, false), new Book("Naruto", "Masashi Kishimoto", 700, true)];
const books = document.querySelector(".books");

function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

function addToLibrary(book) {
    library.push(book);
}

function clearBooks() {
    while (books.lastChild) {
        books.removeChild(books.lastChild);
    }
}

function displayBooks() {
    let index = 0;
    for (const book of library) {
        // If book was deleted.
        if (!book) {
            index++
            continue;
        }

        // Book Card.
        const card = document.createElement("div");
        card.setAttribute("index", index);
        card.classList.add("book");
        
        // Book Title.
        const title = document.createElement("h4");
        title.textContent = book.title;
        title.classList.add("title");
        card.appendChild(title);

        // Author.
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = book.author;
        card.appendChild(author);

        // Number of Pages.
        const numberOfPages = document.createElement("p");
        numberOfPages.classList.add("number-of-pages");
        numberOfPages.textContent = book.numberOfPages;
        card.appendChild(numberOfPages);

        // Read Toggler.
        const readToggler = document.createElement("button");
        readToggler.setAttribute("type", "button");
        readToggler.setAttribute("read", book.read);
        readToggler.classList.add("read");
        readToggler.textContent = (book.read) ? "Read" : "Not read";
        readToggler.addEventListener("click", (event) => {
            const libraryIndex = event.target.parentNode.attributes.index.value;
            library[libraryIndex].read = !library[libraryIndex].read;
            update();
        })
        card.appendChild(readToggler);
        
        // Delete Button.
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", event => {
            const libraryIndex = event.target.parentNode.attributes.index.value;
            delete library[libraryIndex];
            update();
        });
        card.appendChild(deleteBtn);

        books.appendChild(card);
        index++;
    }
}

function update() {
    clearBooks();
    displayBooks();
}

function run() {
    displayBooks();
}

run();