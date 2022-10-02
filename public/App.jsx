import React from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



// main component
class App extends React.Component {
    constructor( props ) {
        super( props )
        // initialize our state
        this.state = { todos:[] }
        this.load()
    }
    delete_row(index){
        fetch('/delete', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(this.state.todos[index])
        })
            .then( response => response.json())
            .then(json => this.setState({ todos:json }))


    }
    toggle( index ) {
        let task_val=document.getElementById("task_text"+index).value;
        let date_val=document.getElementById("date_text"+index).value;
        let priority_val=document.getElementById("priority_text"+index).value;

        document.getElementById("task_row"+index).innerHTML=task_val;
        document.getElementById("date_row"+index).innerHTML=date_val;
        document.getElementById("priority_row"+index).innerHTML=priority_val;

        document.getElementById("edit_button"+index).style.display="block";
        document.getElementById("save_button"+index).style.display="none";
        fetch( '/change', {
            method:'POST',
            body: JSON.stringify({Task:task_val,Date:date_val,Priority:priority_val}),
            headers: { 'Content-Type': 'application/json' }
        })
            .then( response => response.json())
            .then(json => this.setState({ todos:json }))
    }

    edit_row(index)
    {
        document.getElementById("edit_button"+index).style.display="none";
        document.getElementById("save_button"+index).style.display="block";


        let task=document.getElementById("task_row"+index);
        let date=document.getElementById("date_row"+index);
        let priority=document.getElementById("priority_row"+index);

        let task_data=task.innerHTML;
        let date_data=date.innerHTML;
        let priority_data=priority.innerHTML;

        task.innerHTML="<input type='text' id='task_text"+index+"' value='"+task_data+"'>";
        date.innerHTML="<input type='date' id='date_text"+index+"' value='"+date_data+"'>";
        priority.innerHTML="<select id='priority_text"+index+"''><option value='"+priority_data+"'>"+priority_data+"</option><option>High</option><option>Medium</option><option>Low</option></select>"
    }
    // add a new todo list item

    add( ) {
        const task = document.getElementById('to_do').value
        const date = document.querySelector('#date').value
        const priority = document.querySelector('#priority').value

        if (task === "" || date === "" || task === null || date === null || priority === "none" || priority === null){
            alert("Please fill out all fields")
            return true
        }
        else{
            fetch( '/add', {
                method:'POST',
                body: JSON.stringify({ Task:task,Date:date,Priority:priority}),
                headers: { 'Content-Type': 'application/json' }
            })
                .then( response => response.json() )
                .then( json => {
                    // changing state triggers reactive behaviors
                    this.setState({ todos:json })
                })
        }
    }
    // load in our data from the server
    load() {
        fetch( '/read', { method:'get', 'no-cors':true })
            .then( response => response.json() )
            .then( json => {
                this.setState({ todos:json })
            })
    }
    // render component HTML using JSX
    render() {
        return (
            <div className="App">
                <div className="container" style={{backgroundColor:"whitesmoke"}}>
                    <h1 id="page_title">TO DO</h1>
                    <div className="row" style={{alignSelf:"center"}}>
                        <div className="col-12">
                            <form action="/">
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" id="to_do" placeholder="add tasks"
                                               aria-label="Tasks"/>
                                    </div>
                                    <div className="col">
                                        <input className="form-control" type="date" id="date" aria-label="Date"/>
                                    </div>
                                    <div className="col">
                                        <select className="form-control" id="priority" aria-label="Priority">
                                            <option value="none" selected disabled hidden>Select</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <button className="btn" id="add" onClick={e=>this.add(e)}>ADD</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <table className="table table-responsive" id="results">
                        <thead>
                        <tr className="table table-striped table-bordered">
                            <th scope="col">Tasks</th>
                            <th scope="col">Date</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Modify</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.todos.map((todo, i) =>
                            <tr key={i}>
                                <td id={"task_row"+i}>{todo.Task}</td>
                                <td id={"date_row"+i}>{todo.Date}</td>
                                <td id={"priority_row"+i}>{todo.Priority}</td>
                                <td><input type='button' className='btn-primary' id={"edit_button" + i} value='Edit' className='edit' onClick={()=>this.edit_row(i)}/>
                                    <input type='button' className='btn-primary' id={"save_button" + i} value='Save' className='save' style={{display: "none"}} onClick={()=>this.toggle(i)}/>
                                    <input type='button' className='btn-primary' value='Delete' className='delete' onClick={()=>this.delete_row(i)}/>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default App;