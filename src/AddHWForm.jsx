import React, {useState} from 'react';

const AddUserForm = (props) => {

    const initBook = {id: null, bookName: '', author: '', totalPages: ''};

    const [book, setBook] = useState(initBook);

    const handleChange = e => {
        const {name, value} = e.target;
        setBook({...book, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (book.bookName && book.author && book.totalPages) {
            handleChange(e, props.addBook(book));
        }
    }

    return (
        <form>
            <input type="text" placeholder="class name" value={book.bookName} name="bookName" onChange={handleChange} />
            <br />
            <br />
            <input type="text" placeholder="assignment name" value={book.author} name="author" onChange={handleChange} />
            <br />
            <br />
            <input type="number" placeholder="Time estimate for assignment" value={book.totalPages} name="totalPages" onChange={handleChange} />
            <br />
            <br />
            <button className="button-52" type="submit" onClick={handleSubmit} >submit</button>
        </form>
    )
}

export default AddUserForm;