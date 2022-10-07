import React, {useState} from 'react';

const FormTwo = (props) => {

    const initAppoint = {id: null, studentID: '', name: '', appointment: ''};

    const [appoint, setAppoint] = useState(initAppoint);

    const handleChange = e => {
        const {name, value} = e.target;
        setAppoint({...appoint, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (appoint.studentID && appoint.name && appoint.appointment) {
            handleChange(e, props.addAppoint(appoint));
        }
    }
    
    

    return (
        <form>
            <input className="u-full-width" type="text" placeholder="Enter Student ID" value={appoint.studentID} name="studentID" onChange={handleChange} />
            <input className="u-full-width1" type="text" placeholder="Enter Name" value={appoint.name} name="name" onChange={handleChange} />
            <input className="u-full-width2" type="text" placeholder="Enter Appointment Date" value={appoint.appointment} name="appointment" onChange={handleChange} />
            <button className="button-primary" type="submit" onClick={handleSubmit} >Add Appointment</button>
        </form>
    )
}

export default FormTwo;