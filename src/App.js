import React from "react";
import { hot } from 'react-hot-loader/root';

class Todo extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.task}</td>
        <td>{this.props.category}</td>
        <td>{this.props.priority}</td>
        <td>{this.props.deadline}</td>
        <td>
          <button className="action" onClick={e => this.remove(e)}>Remove</button>
        </td>
      </tr>
    )
  }

  remove(e) {
    this.props.onclick( this.props.id )
  }
}

class Form extends React.Component {
  render() {
    return (
      <form>
          <input className="user-input" type="text" id="task" placeholder="Task" />
          <input className="user-input" type="text" id="category" placeholder="Category" />
          <select className="user-input" id="priority" defaultValue="Priority">
              <option value="Priority" disabled="disabled">Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
          </select>
          <button className="action" id="add-button" onClick={ e => this.add( e )}>Add</button>
      </form>
    )
  }

  add(e) {
    this.props.onclick( e )
  }
}

class App extends React.Component {
  constructor( props ) {
    super( props )
    this.state = { todos: [] }
    this.load()
  }

  load() {
    fetch( '/read', { method: 'get', 'no-cors': true })
    .then( response => response.json() )
    .then( json => {
      this.setState({ todos: json })
    })
  }

  add( evt ) {
    const task = document.querySelector('#task').value
    const category = document.querySelector('#category').value
    const priority = document.querySelector('#priority').value

    fetch( '/add', { 
      method: 'POST',
      body: JSON.stringify({ task: task, category: category, priority: priority }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      this.setState({ todos: json })
    })
  }

  remove( evt, id ) {
    fetch( '/delete', {
      method:'POST',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      this.setState({ todos: json })
    })
  }

  getHiddenValue() {
    if (this.state.todos.length === 0) {
      return "hidden"
    }
  }

  render() {
    return (
      <div className="App">
        <h1>To Do</h1>
        <Form onclick={ e => this.add( e )} />
        <table id="todo-table" hidden={ this.getHiddenValue() }>
          <thead>
            <tr>
              <th>Task</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          { this.state.todos.map( (todo, i) => <Todo key={i} id={i} task={todo.task} category={todo.category} priority={todo.priority} deadline={todo.deadline} onclick={ e => this.remove( e, i ) } /> ) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default hot(App);
