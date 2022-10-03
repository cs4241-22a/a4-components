import React from 'react';

// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.

class Todo extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return <li>{this.props.derive} : 
      <input type="checkbox" defaultChecked={this.props.completed} onChange={ e => this.change(e) }/>
    </li>
  }
  // call this method when the checkbox for this component is clicked
  change(e) {
    this.props.onclick( this.props.dest, e.target.checked )
  }
}

class Table extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return <tr>
      <td>{this.props.dest}</td> 
      <td>{this.props.dist}</td> 
      <td>{this.props.avr}</td> 
      <td>{this.props.derive}</td> 
      <td> <input type="radio" defaultChecked={this.props.completed} onChange={ e => this.change(e) }/> </td>
      <td> <input type="checkbox" defaultChecked={this.props.completed} onChange={ e => this.modify(e) }/> </td>
    </tr>
  }
  // call this method when the checkbox for this component is clicked
  change(e) {
    this.props.onclick( this.props.dest, e.target.checked )
  }
  modify(e) {
    this.props.onclickModify( this.props.dest, e.target.checked )
  }
}

// main component
class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { todos:[] }
    this.load()
  }

  //delete an entry
  delete(){

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
  toggle( dest, completed,dist,avr,derive ) {
    fetch( '/delete', {
      method:'POST',
      body: JSON.stringify({ dest, completed, dist, avr, derive }),
      headers: { 'Content-Type': 'application/json' }
    })
    //window.location.reload(false); //reload page to update table
    this.load();
  }

  modify( dest, completed,dist,avr,derive ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ dest, completed, dist, avr, derive }),
      headers: { 'Content-Type': 'application/json' }
    })
    this.toggle(dest, completed,dist,avr,derive);
    
    document.querySelector("#destination").setAttribute("value",dest);
    document.querySelector("#miles").setAttribute("value",dist);
    document.querySelector("#average").setAttribute("value",avr);
    document.querySelector("#btn").textContent = "modify";
    
  }

 

 
  // add a new todo list item
  add( evt ) {
        const input = document.querySelector("#destination").value;
        const input2 = document.querySelector("#miles").value;
        const input3 = document.querySelector("#average").value;
        console.log(input);
    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ dest:input, completed:false, dist: input2, avr: input3 }),
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
      <h1>Trip Planner</h1>
      <form>
          <label>destination</label>
          <input type='text' id="destination"/>
          <label>miles to destination</label>
          <input type='number' id="miles"/>
          <label>average speed (mph)</label>
          <input type="number" id="average"/>
          <button onClick={ e => this.add( e )} id="btn">add</button>
      </form>
       <table id="results">
          <tr>
            <th>Destination</th>
            <th>Distance to Destination</th>
            <th>Average Speed</th>
            <th>Time to Destination</th>
            <th>delete</th>
            <th>modify</th>
          </tr>
          {this.state.todos.map( (todo,i) => <Table key={i} derive={todo.derive} dist={todo.dist} avr={todo.avr} dest={todo.dest} completed={todo.completed} onclick={e => this.toggle(todo.dest,todo.completed,todo.dist,todo.avr,todo.derive)} onclickModify={e => this.modify(todo.dest,todo.completed,todo.dist,todo.avr,todo.derive) }/>)}
        </table>
      </div>
    )
  }
}



export default App;