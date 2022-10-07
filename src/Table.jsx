import React from 'react';

const UserTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Student ID #</th>
                    <th>Name</th>
                    <th>Appointment Date</th>
                  <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.appoints.length > 0 ? (
                    props.appoints.map(appoint => {
                        const {id, studentID, name, appointment} = appoint;
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{studentID}</td>
                                <td>{name}</td>
                                <td>{appointment}</td>  
                                <td>
                                    <button className="button-primary2" onClick={() => props.deleteAppoint(id)}>Delete</button>
                                    <button className="button-primary2" onClick={() => props.editAppoint(id, appoint)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No appointments made.</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default UserTable;