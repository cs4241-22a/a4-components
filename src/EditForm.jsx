import React, {useState, useEffect} from 'react';

const FormOne = (props) => {

    useEffect(() => {
        setAppoint(props.currentAppoint)
    }, [props])

    const [appoint, setAppoint] = useState(props.currentAppoint);

    const handleChange = e => {
        const {name, value} = e.target;
        setAppoint({...appoint, [name]: value});
        }

    const handleSubmit = e => {
        e.preventDefault();
        if (appoint.studentID && appoint.name && appoint.appointment) props.updateAppoint(appoint);
    }

    return (
        <form>
            <input className="u-full-width" type="text" value={appoint.studentID} placeholder="Enter Student ID" name="studentID" onChange={handleChange} />
            <input className="u-full-width1" type="text" value={appoint.name} placeholder="Enter Name" name="name" onChange={handleChange} />
            <input className="u-full-width2" type="text" value={appoint.appointment}  placeholder="Enter Appointment Date" name="appointment" onChange={handleChange} />
            <button className="button-primary" type="submit" onClick={handleSubmit} >Edit appointment</button>
            <button type="submit" className="cancel" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
    )
}

export default FormOne;