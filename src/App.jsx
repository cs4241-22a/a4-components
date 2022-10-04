import React from 'react';
import './style.css';

//Main Component
class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = {add:0,remove:0}
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.add);
    event.preventDefault();
    fetch( '/add', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numToAdd: this.state.add}) 
    })
    .then( response => response.json() )
    .then( json => {
       let testData = !!document.getElementById("p");
       if(testData){
           document.getElementById("p").remove()
           document.getElementById("p").remove()
           //document.getElementById("p").remove()
       }
      json.forEach( item => {
        const p = document.createElement('p')
        p.id = "p"
        p.innerText = JSON.stringify( item )
        document.body.appendChild( p )
      })
    })
  }
  
  handleRemove(event){
    //console.log("removing");
    //alert('A number was removed: ' + this.state.remove);
    event.preventDefault();
    
    fetch( '/remove', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ indexToRemove: this.state.remove}) 
    })
    .then( response => response.json() )
    .then( json => {
       let testData = !!document.getElementById("p");
       if(testData){
           document.getElementById("p").remove()
           document.getElementById("p").remove()
           //document.getElementById("p").remove()
       }
      json.forEach( item => {
        const p = document.createElement('p')
        p.id = "p"
        p.innerText = JSON.stringify( item )
        document.body.appendChild( p )
      })
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Input a Number:
          <input name = "add" type="text" value={this.state.add} onChange={this.handleChange}/>
        </label>
           <input type="submit" value="Submit"/>
        </form>
                                                     
        <form onSubmit={(e) => this.handleRemove(e)}>
          <label>
            Remove an Index:
            <input name = "remove" type="text" value={this.state.remove} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Remove"/>
        </form>
      </div>
      
    );
  }
}

export default App;
