import React from 'react';

// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.

class Todo extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return <tr><td>{this.props.taskname}</td>
            <td>{this.props.date}</td>
            <td>{this.props.timeleft}</td></tr>
    /*
    return <li>{this.props.name} : 
      <input type="checkbox" defaultChecked={this.props.completed} onChange={ e => this.change(e) }/>
    </li>
    */
  }
  
  /*
  //call this method when the checkbox for this component is clicked
  change(e) {
    this.props.onclick( this.props.name, e.target.checked )
  }*/
  
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
    //console.log("loading data")
    fetch( '/read', { method:'get', 'no-cors':true })
      .then( response => response.json() )
      .then( json => {
         //console.log("data received")
         this.setState({ todos:json }) 
      })
  }
  
  // render component HTML using JSX 
  render() {
    return (
      <div className="App">
      <input type="text" id="taskname"/>
      <input type="date" id="date"/>
      <button id="add" onClick={ e => this.add( e )}>add</button>
      <button id="remove" onClick={ e => this.remove( e )}>remove</button>
        <div class="taskTableDiv">
          <table id="taskTable">
            { this.state.todos.map( (todo,i) => 
                                   <Todo key={i} 
                                     taskname={todo.taskname} 
                                     date={todo.date}
                                     timeleft={todo.timeleft} /> ) }
          </table> 
        </div>
      </div>
    )
  }
  
  /*
    // when an Todo is toggled, send data to server
  toggle( name, completed ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
  */
 
  // add a new todo list item
  add( evt ) {
    const task = document.querySelector( '#taskname' ),
          date = document.querySelector( '#date' ),
          json = { taskname: task.value,
                    date: date.value },
          bodyToSend = JSON.stringify( json )
    //console.log(task.value)
    //console.log(date.value)
    
    if((json.taskname === '') || (json.date === ''))
    {
        alert('Cannot use empty task name or date')
    }
    else
    {
      fetch( '/add', { 
        method:'POST',
        body : bodyToSend,
        headers: { 'Content-Type': 'application/json' }
      })
      .then( response => response.json() )
      .then( json => {
         // changing state triggers reactive behaviors
        this.setState({ todos:json }) 
      })
    }
    
  }
  
  // remove an existing todo list item
  remove( evt ) {
    evt.preventDefault()
    
    const task = document.querySelector( '#taskname' ),
          date = document.querySelector( '#date' ),
          json = { taskname: task.value,
                    date: date.value },
          body = JSON.stringify( json )
    if(json.taskname === '')
    {
        alert('Cannot use empty task name')
    }
    else
    {
      fetch( '/remove', { 
        method:'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
      })
      .then( response => response.json() )
      .then( json => {
         // changing state triggers reactive behaviors
        this.setState({ todos:json })
      })
    }
  }
}


export default App;