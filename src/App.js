
import React from "react";
import { hot } from 'react-hot-loader/root';

let i = 0
let originalHTML = ''
let id = 0

class Todo extends React.Component {
  render() {
    return <tr>
      <td>{this.props.item}</td>
      <td>{this.props.date}</td>
      <td>{this.props.priority}</td>
      <td>{this.props.dueDate}</td>
      <td><button className="tableButtons" onClick={e => this.delete(e)}>Delete</button></td>
    </tr>
  }

  delete(e) {
    this.props.onclick( this.props.item, this.props.date, this.props.priority, this.props.dueDate )
  }
}

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
  
  // add a new todo list item
  add( evt ) {
    const item = document.querySelector('#item').value
    const date = document.querySelector('#date').value
    let priority = ""

    if (document.querySelector('#priority').checked) {
      priority = "Yes"
    } else {
      priority = "No"
    }

    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ item:item, date:date, priority:priority }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
        // changing state triggers reactive behaviors
        this.setState({ todos:json }) 
    })
  }

  delete = ( item, date, priority, dueDate ) => {
    fetch( '/delete', {
      method:'POST',
      body: JSON.stringify({ item:item, date:date, priority:priority, dueDate:dueDate }),
      headers: { 'Content-Type': 'application/json' }
    }) 
    .then( response => response.json() )
    .then( json => {
        // changing state triggers reactive behaviors
        this.setState({ todos:json }) 
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="child">To Do List Generator</h1>
        <form className="child">
          <label>Item:</label>
          <input type="text" id="item"></input>
          <label>Date Created:</label>
          <input type="date" id="date"></input>
          <label>Priority?</label>
          <input type="checkbox" id="priority" name="priority"></input>
          <button id="submit_button" onClick={ e => this.add(e)}>Submit</button>
        </form>
        <table className="child" id="list_table">
          <thead>
            <tr className="bold">
              <th>Item</th>
              <th>Creation Date</th>
              <th>Priority?</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          { this.state.todos.map( (todo,i) =>                  
          <Todo key={i} item={todo.item} date={todo.date} priority={todo.priority} dueDate={todo.dueDate} onclick={ this.delete } /> ) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default hot(App);
