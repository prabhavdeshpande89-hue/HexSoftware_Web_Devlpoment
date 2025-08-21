const books = [
  { 
    title: "Malgudi Days", 
    author: "R.K. Narayan", 
    category: "fiction", 
    img: "Images/Image_1.webp" 
  },
  { 
    title: "Godan", 
    author: "Munshi Premchand", 
    category: "fiction", 
    img: "Images/Image_2.webp" 
  },
  { 
    title: "The Discovery of India", 
    author: "Jawaharlal Nehru", 
    category: "history", 
    img: "Images/Image_3.webp" 
  },
  { 
    title: "Wings of Fire", 
    author: "A.P.J. Abdul Kalam", 
    category: "autobiography", 
    img: "https://m.media-amazon.com/images/I/71KKZlVjbwL.jpg" 
  },
  { 
    title: "My Experiments with Truth", 
    author: "Mahatma Gandhi", 
    category: "autobiography", 
    img: "Images/Image_4.webp" 
  },
  { 
    title: "The Guide", 
    author: "R.K. Narayan", 
    category: "fiction", 
    img: "Images/Image_5.webp" 
  }
];

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const historyList = document.getElementById("historyList");

let borrowHistory = JSON.parse(localStorage.getItem("borrowHistory")) || [];
let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

function displayBooks(filteredBooks) {
  bookList.innerHTML = "";
  filteredBooks.forEach(book => {
    const isBorrowed = borrowedBooks.includes(book.title);
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
      <img src="${book.img}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Category: ${book.category}</p>
        <button onclick="${isBorrowed ? `returnBook('${book.title}')` : `borrowBook('${book.title}')`}">
          ${isBorrowed ? "Return" : "Borrow"}
        </button>
      </div>
    `;
    bookList.appendChild(bookCard);
  });
}

function filterBooks(category) {
  if (category === "all") {
    displayBooks(books);
  } else {
    displayBooks(books.filter(book => book.category === category));
  }
}

function borrowBook(title) {
  if (!borrowedBooks.includes(title)) {
    borrowedBooks.push(title);
    borrowHistory.push(`Borrowed: ${title} 📚`);
    saveData();
    loadHistory();
    displayBooks(books);
  }
}

function returnBook(title) {
  borrowedBooks = borrowedBooks.filter(b => b !== title);
  borrowHistory.push(`Returned: ${title} ✅`);
  saveData();
  loadHistory();
  displayBooks(books);
}

function saveData() {
  localStorage.setItem("borrowHistory", JSON.stringify(borrowHistory));
  localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
}

function loadHistory() {
  historyList.innerHTML = "";
  if (borrowHistory.length === 0) {
    historyList.innerHTML = "<li>No books borrowed yet.</li>";
  } else {
    borrowHistory.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = entry;
      historyList.appendChild(li);
    });
  }
}

searchInput.addEventListener("input", function() {
  const query = searchInput.value.toLowerCase();
  displayBooks(books.filter(book => book.title.toLowerCase().includes(query)));
});

// Initial load
displayBooks(books);
loadHistory();
