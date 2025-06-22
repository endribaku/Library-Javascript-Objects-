const myLibrary = [];

function Book(id, title, price, author) {
    this.read = false;
    this.id = id;
    this.title = title;
    this.price = price;
    this.author = author;
}

Book.prototype.isRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, price, author) {
    let id = crypto.randomUUID();
    myLibrary.push(new Book(id, title, price, author));
}

addBookToLibrary("1984", 9.99, "George Orwell");
addBookToLibrary("To Kill a Mockingbird", 12.5, "Harper Lee");
addBookToLibrary("The Great Gatsby", 8.75, "F. Scott Fitzgerald");
addBookToLibrary("The Catcher in the Rye", 10.0, "J.D. Salinger");

const container = document.querySelector(".card-container");


function renderLibrary() {
    container.innerHTML = "";
    for(let book of myLibrary) {
            const card = document.createElement("div");
            card.setAttribute("data-id", book.id);
            card.classList.add("card");

            let elements = [];

            const title = document.createElement("div");
            title.textContent = book.title;
            elements.push(title);
            const price = document.createElement("div");
            price.textContent = book.price;
            elements.push(price);
            const author = document.createElement("div");
            author.textContent = book.author;
            elements.push(author);
            const read = document.createElement("div");
            if(!book.read) {
                read.textContent = 'not read';
            } else {
                read.textContent = 'read';
            }
            elements.push(read);

            for(let element of elements) {
                card.appendChild(element);
            }

            container.appendChild(card);

            const button = document.createElement("button");
            button.textContent = "Read";
            button.addEventListener("click", function() {
                book.isRead();
                renderLibrary();
            })

            card.appendChild(button);

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", function() {
                const index = myLibrary.findIndex(item => item.id === book.id);
                if (index !== -1) {
                    myLibrary.splice(index, 1); 
                    renderLibrary(); 
                }
            })

            card.appendChild(removeButton);
        }  
}

renderLibrary();


document.getElementById("bookForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const price = document.getElementById('price').value;
    const author = document.getElementById('author').value.trim();

    if(title && author && !isNaN(price)) {
        addBookToLibrary(title, price, author);
        renderLibrary();

        e.target.reset();
    }
})
 

