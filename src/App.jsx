import React from 'react';

// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.

class Todo extends React.Component {
    // our .render() method creates a block of HTML using the .jsx format
    render() {
        console.log(this.props);
        // {this.props.name}:
        //<table id="table" className="c-table">
        return<tr>
            <td>{this.props.activity}</td>
            <td>{this.props.date}</td>
            <td>{this.props.startTime}</td>
            <td>{this.props.endTime}</td>
            <td>{this.props.description}</td>
            <td>{this.props.duration}</td>
            <td><button type = "button" >Delete</button></td>
            </tr>
                {/*<tr>*/}
                {/*    <th className="table_activity">Activity Done</th>*/}
                {/*    <th className="table_date">Date</th>*/}
                {/*    <th className="table_start">Time Started</th>*/}
                {/*    <th className="table_end">Time Ended</th>*/}
                {/*    <th className="table_description">Description</th>*/}
                {/*    <th className="table_duration">Duration</th>*/}
                {/*    <th className="table_buttons">Delete/Edit</th>*/}
                {/*</tr>*/}
            //</table>


            {/*<input type="checkbox" defaultChecked={this.props.completed} onChange={ e => this.change(e) }/>*/}
         {/*<li>{this.props.name} : </li>*/}
    }
    // call this method when the checkbox for this component is clicked
    // change(e) {
    //     this.props.onclick( this.props.name, e.target.checked )
    // }
}

// main component
class App extends React.Component {
    constructor( props ) {
        super( props )
        // initialize our state
        this.state = { todos:[] }
        this.load()
    }

    // load in our data from the server
    load() {
        fetch( '/read', { method:'get', 'no-cors':true })
            .then( response => response.json() )
            .then( json => {
                this.setState({ todos:json })
            })
    }

    // when an Todo is toggled, send data to server
    toggle( name, completed ) {
        fetch( '/change', {
            method:'POST',
            body: JSON.stringify({ name, completed }),
            headers: { 'Content-Type': 'application/json' }
        })
    }

// add a new todo list item
    add( evt ) {
        const activity = document.querySelector('#activity').value;
        console.log(activity);
        const date = document.querySelector('#date').value;
        console.log(date);
        const startTime = document.querySelector('#startTime').value;
        console.log(startTime);
        const endTime = document.querySelector('#endTime').value;
        const description = document.querySelector('#description').value;

        const json = {
            activity:activity,
            date: date,
            startTime: startTime,
            endTime: endTime,
            description: description
        }

        fetch( '/add', {
            method:'POST',
            body: JSON.stringify(json),
            headers: { 'Content-Type': 'application/json' }
        })
            .then( response => response.json() )
            .then( json => {
                // changing state triggers reactive behaviors
                this.setState({ todos:json })
            })
    }

    // render component HTML using JSX
    render() {
        return (
            <div className="App">
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
                <br/>
                <button id="formSubmit" onClick={ e => this.add( e )}>Submit</button>

                {/*<input type='text' /><button onClick={ e => this.add( e )}>add</button>*/}

                <table>
                    <tr>
                        <th className="table_activity">Activity Done</th>
                        <th className="table_date">Date</th>
                        <th className="table_start">Time Started</th>
                        <th className="table_end">Time Ended</th>
                        <th className="table_description">Description</th>
                        <th className="table_duration">Duration</th>
                        <th className="table_buttons">Delete/Edit</th>
                    </tr>
                        {this.state.todos.map((todo, i) => <Todo key={i} activity={todo.activity} date={todo.date} startTime={ todo.startTime} endTime={todo.endTime} description={todo.description} duration={todo.duration}/>)}

                </table>

            </div>
        )
    }
}



export default App;