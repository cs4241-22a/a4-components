import React, {useState, useEffect} from 'react';

const EditUserForm = (props) => {

    useEffect(() => {
        setBook(props.currentBook)
    }, [props])

    const [book, setBook] = useState(props.currentBook);

    const handleChange = e => {
        const {name, value} = e.target;
        setBook({...book, [name]: value});
        }

    const handleSubmit = e => {
        e.preventDefault();
        book.pagesLeft = book.totalPages - book.pagesRead;
        if (book.bookName && book.author && book.totalPages && book.pagesRead && book.pagesLeft) props.updateBook(book);
    }

    return (
        <form>
            <input className="u-full-width" type="text" value={book.bookName} placeholder="Enter Book Name" name="bookName" onChange={handleChange} />
            <input className="u-full-width1" type="text" value={book.author} placeholder="Enter Author Name" name="author" onChange={handleChange} />
            <input className="u-full-width2" type="number" value={book.totalPages}  placeholder="Enter Total Pages" name="totalPages" onChange={handleChange} />
            <input className="u-full-width3" type="number" value={book.pagesRead}  placeholder="Enter Pages Read" name="pagesRead" onChange={handleChange} />
            <button className="button-primary" type="submit" onClick={handleSubmit} >Edit book</button>
            <button type="submit" className="cancel" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
    )
}

export default EditUserForm;