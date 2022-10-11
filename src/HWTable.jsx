import React from 'react';

const UserTable = (props) => {
    return (
        
        <table>
            <thead>
                <tr>
                    <th>Assignment Number</th>
                    <th>Class Name</th>
                    <th>Assignment Name</th>
                    <th>Time (in hours) </th>
                    
                </tr>
            </thead>
            <tbody>
                { props.books.length > 0 ? (
                    props.books.map(book => {
                        const {id, bookName, author, totalPages} = book;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{bookName}</td>
                                <td>{author}</td>
                                <td>{totalPages}</td>  
                 
                                <td>
                                    <button className="button-52" onClick={() => props.deleteBook(id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>  .</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default UserTable;