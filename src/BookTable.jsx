import React from 'react';

const UserTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>Total Pages</th>
                    <th>Pages Read</th>
                  <th>Pages Left</th>
                  <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.books.length > 0 ? (
                    props.books.map(book => {
                        const {id, bookName, author, totalPages, pagesRead, pagesLeft} = book;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{bookName}</td>
                                <td>{author}</td>
                                <td>{totalPages}</td>  
                                <td>{pagesRead}</td>
                                <td>{pagesLeft}</td>  
                                <td>
                                    <button className="button-primary2" onClick={() => props.deleteBook(id)}>Delete</button>
                                    <button className="button-primary2" onClick={() => props.editBook(id, book)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No books on your bookshelf.</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default UserTable;