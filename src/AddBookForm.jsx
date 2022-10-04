import React, {useState} from 'react';

const AddUserForm = (props) => {

    const initBook = {id: null, bookName: '', author: '', totalPages: '', pagesRead: '', pagesLeft: ''};

    const [book, setBook] = useState(initBook);

    const handleChange = e => {
        const {name, value} = e.target;
        setBook({...book, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        book.pagesLeft = book.totalPages - book.pagesRead;
        if (book.bookName && book.author && book.totalPages && book.pagesRead && book.pagesLeft) {
            handleChange(e, props.addBook(book));
        }
    }

    return (
        <form>
            <input className="u-full-width" type="text" placeholder="Enter Book Name" value={book.bookName} name="bookName" onChange={handleChange} />
            <input className="u-full-width1" type="text" placeholder="Enter Author Name" value={book.author} name="author" onChange={handleChange} />
            <input className="u-full-width2" type="number" placeholder="Enter Total Pages" value={book.totalPages} name="totalPages" onChange={handleChange} />
            <input className="u-full-width3" type="number" placeholder="Enter Pages Read" value={book.pagesRead} name="pagesRead" onChange={handleChange} />
            <button className="button-primary" type="submit" onClick={handleSubmit} >Add Book</button>
        </form>
    )
}

export default AddUserForm;