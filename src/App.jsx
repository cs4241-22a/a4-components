import React from "react";

// we could place this Todo component in a separate file, but it"s
// small enough to alternatively just include it in our App.js file.

class Todo extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return <li> { this.props.name } : 
      <input type="checkbox" defaultChecked={ this.props.completed } onChange={ e => this.change(e) }/>
      <button onClick={ e => this.remove(e) }>d</button>
    </li>
  }
  // call this method when the checkbox for this component is clicked
  change(e) {
    this.props.toggle(this.props.name, e.target.checked)
  }

  remove(e) {
    this.props.delete(this.props.name);
  }
}

// main component
class App extends React.Component {
  constructor(props) {
    super(props)
    // initialize our state
    this.state = { todos:[] }
    this.load()
  }

  // load in our data from the server
  load() {
    fetch("/read", { method:"get", "no-cors":true })
      .then(response => response.json())
      .then(json => {
         this.setState({ todos:json }) 
      })
  }

  // render component HTML using JSX 
  render() {
    return (
      <div className="App">
      <input type="text" /><button onClick={ e => this.add(e) }>add</button>
        <ul>
          { this.state.todos.map((todo, i) => 
          <Todo key={i} 
            name={todo.name} 
            completed={todo.completed} 
            toggle={ this.toggle } 
            delete={ this.delete }/> ) }
       </ul> 
      </div>
    )
  }

  // when an Todo is toggled, send data to server
  toggle(name, completed) {
    fetch( "/change", {
      method:"POST",
      body: JSON.stringify({ name, completed }),
      headers: { "Content-Type": "application/json" }
    })
  }
  
  // add a new todo list item
  add(evt) {
    const value = document.querySelector("input").value

    fetch( "/add", { 
      method:"POST",
      body: JSON.stringify({ name: value, completed: false }),
      headers: { "Content-Type": "application/json" }
    })
    .then( response => response.json() )
    .then( json => {
        // changing state triggers reactive behaviors
        this.setState({ todos: json }) 
    })
  }

  delete = (name) => {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json() )
    .then(json => {
      console.log(this);
      console.log(json)
        this.setState({ todos: json }) 
    })
  }
}

export default App;