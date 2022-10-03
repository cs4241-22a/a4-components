import React from 'react';

// we could place this Log component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.

class Log extends React.Component {
    // our .render() method creates a block of HTML using the .jsx format
    render() {
        console.log(this.props.id);
        return <tr id ={this.props.id} >
            <td>{this.props.activity}</td>
            <td>{this.props.date}</td>
            <td>{this.props.startTime}</td>
            <td>{this.props.endTime}</td>
            <td>{this.props.description}</td>
            <td>{this.props.duration}</td>
            <td><button type="button" onClick={ e => this.delete((e))}>Delete</button></td>
        </tr>


    }
    delete(e) {
        this.props.onclick(this.props.activity, this.props.date, this.props.startTime, this.props.endTime, this.props.description, this.props.duration);
    }
}

// main component
class App extends React.Component {
    constructor( props ) {
        super( props )
        // initialize our state
        this.state = { logs:[] }
        this.load()
    }

    // load in our data from the server
    load() {
        fetch( '/read', {
            method:'GET',
            'no-cors':true })
            .then( response => response.json() )
            .then( json => {
                this.setState({ logs:json })
            })
    }

    // when an Log is deleted, send data to server
    delete( evt, activity, date, startTime, endTime, description, duration ) {

        const json = {
            activity:activity,
            date: date,
            startTime: startTime,
            endTime: endTime,
            description: description,
            duration: duration
        }
        fetch( '/delete', {
            method:'POST',
            body: JSON.stringify(json),
            headers: { 'Content-Type': 'application/json' }
        })
            .then( response => response.json() )
            .then( json => {
                console.log(json);
                // changing state triggers reactive behaviors
                this.setState({ logs:json })
            })
    }

// add a new log list item
    add( evt ) {

        const activity = document.querySelector('#activity').value;
        const date = document.querySelector('#date').value;
        const startTime = document.querySelector('#startTime').value;
        const endTime = document.querySelector('#endTime').value;
        const description = document.querySelector('#description').value;

        const json = {
            activity:activity,
            date: date,
            startTime: startTime,
            endTime: endTime,
            description: description,
            duration: time_duration(startTime.toString(), endTime.toString())
        }

        fetch( '/add', {
            method:'POST',
            body: JSON.stringify(json),
            headers: { 'Content-Type': 'application/json' }
        })
            .then( response => response.json() )
            .then( json => {
                console.log(json)
                // changing state triggers reactive behaviors
                this.setState({ logs:json })
            })
    }

    // render component HTML using JSX
    render() {
        let count = 0;

        return (
            <div className="App">
                <h1>Activity Logger</h1>
                <form>
                    <label>Your very own event logger. This is meant to be the opposite of a calendar. Instead of
                        schedule what you WANT to do, you would log in events that have already been done so you have an idea of what you have done throughout the day.
                        Be sure to log all the events that you have done!</label>
                <label className="grid_item" htmlFor="activity">Type of Activity Done</label>
                <select id="activity" name="Type of activity done">
                    <option value="Sleep">Sleep</option>
                    <option value="Food">Food</option>
                    <option value="School">School</option>
                    <option value="Work">Work</option>
                    <option value="Fun">Fun</option>
                </select>

                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" required/>

                <label htmlFor="startTime">Time Started</label>
                <input type="time" id="startTime" name="startTime" required/>


                <label htmlFor="endTime">Time Ended</label>
                <input type="time" id="endTime" name="endTime" required/>

                <label htmlFor="description">Description</label>
                <textarea type="text" id="description" name="description" required> </textarea>

                <button id="formSubmit" onClick={ e => this.add( e )}>Submit</button>
                </form>
                <table id = "table">
                    <tr>
                        <th className="table_activity">Activity Done</th>
                        <th className="table_date">Date</th>
                        <th className="table_start">Time Started</th>
                        <th className="table_end">Time Ended</th>
                        <th className="table_description">Description</th>
                        <th className="table_duration">Duration</th>
                        <th className="table_buttons">Delete</th>
                    </tr>
                    {this.state.logs.map((log, i) => <Log key={i} activity={log.activity} date={log.date} startTime={ log.startTime} endTime={log.endTime} description={log.description} duration={log.duration} id = {(count++).toString()} onclick = { e => this.delete(e, log.activity, log.date, log.startTime, log.endTime, log.description, log.duration)} />)}

                </table>

            </div>
    )
    }
}

// Function that calculates the duration of the event logged automatically
function time_duration(start, end) {
    // Parse the inputs into their hours and minutes
    let start_hour = parseInt(start.split(":")[0]);
    let start_min = parseInt(start.split(":")[1]);

    let end_hour = parseInt(end.split(":")[0]);
    let end_min = parseInt(end.split(":")[1]);

    let dur_hour;
    let dur_min;

    // Find the hours and minutes of duration
    if (end_hour > start_hour) {
        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = end_hour - start_hour;
        } else {
            dur_hour = end_hour - start_hour - 1;
            dur_min = end_min + 60 - start_min;
        }
    } else if (end_hour == start_hour) {
        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = 0;
        } else {
            dur_hour = 23;
            dur_min = end_min + 60 - start_min;
        }
    } else {
        if (end_min >= start_min) {
            dur_min = end_min - start_min;
            dur_hour = end_hour + 24 - start_hour;
        } else {
            dur_hour = end_hour + 24 - start_hour - 1;
            dur_min = end_min + 60 - start_min;
        }

    }
    // Return
    return (
        dur_hour.toString() +
        " Hours  " +
        dur_min.toString() +
        " Minutes"
    ).toString();
}



export default App;