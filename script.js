const library = [new Book("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, true), new Book("The Lord of the Rings ", "J. R. R. Tolkien", 1077, false)];
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

    const openForm = document.querySelector("nav button.open-form");
    const form = document.querySelector("dialog");
    openForm.addEventListener("click", () => {
        if (!form.hasAttribute("open")) form.showModal();
    });

    const closeForm = document.querySelector("dialog form button.close-form");
    closeForm.addEventListener("click", () => form.close());

    const submitBtn = document.querySelector("dialog form button.submit-btn");
    submitBtn.addEventListener("click", () => {
        const title = document.querySelector("dialog form input#title");
        const author = document.querySelector("dialog form input#author");
        const numberOfPages = document.querySelector("dialog form input#pages");
        const read = document.querySelector("dialog form input#read");

        if (!title.value) alert("Title required.");
        else if (!author.value) alert("Author required.");
        else if (+numberOfPages.value <= 0) alert("Number of pages should be greater than 0.");
        else if (!(+numberOfPages.value)) alert("Number of pages required.");
        else {
            const newBook = new Book(title.value, author.value, +numberOfPages.value, read.checked);
            addToLibrary(newBook);

            form.close();
            title.value = "";
            author.value = "";
            numberOfPages.value = "";
            read.checked = false;

            update();
        }
    });
}

run();

// Extra.
function addRandomBooks(n = 1) {
    for (let i = 0; i < n; i++) {
        const newBook = new Book("Title", "Author", 100, false);
        addToLibrary(newBook);
        update();
    }
}