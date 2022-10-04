import React, { useState, useEffect } from "react";
import UserTable from "./BookTable.jsx";
import './styles/styles.css';
import AddUserForm from "./AddBookForm.jsx";
import EditUserForm from "./EditBookForm.jsx";

const App = () => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      return JSON.parse(savedBooks);
    } else {
      return [];
    }
  });
  
    useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);
  
  const addBook = (book) => {
    var max = 0;
    for(let i = 0; i < books.length;  i++){
      if(books[i].id > max){
        max = books[i].id;
      }
    }
    book.id = max + 1;
    setBooks([...books, book]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const [editing, setEditing] = useState(false);

  const initialBook = { id: null, bookName: "", author: "", totalPages: "" ,pagesRead: "", pagesLeft:"" };

  const [currentBook, setCurrentBook] = useState(initialBook);

  const editBook = (id, book) => {
    setEditing(true);
    setCurrentBook(book);
  };

  const updateBook = (newBook) => {
    setBooks(
      books.map((book) => (book.id === currentBook.id ? newBook : book))
    );
    setCurrentBook(initialBook);
    setEditing(false);
  };

  return (
    <div className="container">
      <div class="header">
      </div>
      <img src="https://cdn.glitch.global/853df0d5-2f4b-473e-8b63-34f080880c96/books.png?v=1664849945241" alt="" />
      <h1>Bookshelf</h1>
      <div className="row">
        <div className="five columns">
          {editing ? (
            <div>
              <h2>Use the form below to edit the selected book ⤵</h2>
              <EditUserForm
                currentBook={currentBook}
                setEditing={setEditing}
                updateBook={updateBook}
              />
            </div>
          ) : (
            <div>
              <h2>Use the form below to add a book ⤵</h2>
              <AddUserForm addBook={addBook} />
            </div>
          )}
        </div>
        <div className="seven columns">
          <UserTable
            books={books}
            deleteBook={deleteBook}
            editBook={editBook}
          />
        </div>
      </div>
    </div>
  );
};

export default App;