
// import { response } from 'express';
import React from 'react';

// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.

// class Todo extends React.Component {
//   // our .render() method creates a block of HTML using the .jsx format
//   render() {
//     return <li>{this.props.name} : 
//       <input type="checkbox" defaultChecked={this.props.completed} onChange={ e => this.change(e) }/>
//     </li>
//   }
//   // call this method when the checkbox for this component is clicked
//   change(e) {
//     this.props.onclick( this.props.name, e.target.checked )
//   }
// }

class Workout extends React.Component {
  render() {
    return <tr>
      <td>{this.props.exercise}</td>
      <td>{this.props.sets}</td>
      <td>{this.props.reps}</td>
      <td>{this.props.weight}</td>
      <button onClick={ () => remove(this.props)}>Remove</button>
    </tr>
  }
}

// main component
class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { workouts:[] }
    this.load()
  }

  // load in our data from the server
  load() {
    fetch( '/read', { method:'get', 'no-cors':true })
      .then( response => response.json() )
      .then( json => {
         this.setState({ workouts:json }) 
      })
  }

  // render component HTML using JSX 
  render() {
    return (
      <div className="App">
        <form id="addForm" class="m-4 form-horizontal">
          <input id="exercise" type="text" maxlength="100" placeholder="Name of exercise"/>
          <input id="sets" type="text" maxlength="10" placeholder="Sets"/>
          <input id="reps" type="text" maxlength="10" placeholder="Reps"/>
          <input id="weight" type="text" maxlength="10" placeholder="Weight"/>
          <button type="submit" id="addWorkout" class="btn btn-primary btn-sm active" onClick={ e => this.add( e )}>Get Bigger</button>
        </form>
        <table class="table table-hover">
          <thead>
            <tr><th>Exercise</th><th>Sets</th><th>Reps</th><th>Weight</th><th></th><th></th></tr>
          </thead>
          <tbody>
            { this.state.workouts.map( (workout,i) => <Workout key={i} exercise={workout.exercise} sets={workout.sets} reps={workout.reps} weight={workout.weight} /> ) }
          </tbody>
        </table>
      </div>
    ) 
  }

  // when a Todo is toggled, send data to server
  toggle( name, completed ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // add a new todo list item
  add( evt ) {
    const exercise = document.getElementById("exercise")
    const sets = document.getElementById("sets")
    const reps = document.getElementById("reps")
    const weight = document.getElementById("weight")

    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ exercise: exercise.value, sets: sets.value, reps: reps.value, weight: weight.value }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
        // changing state triggers reactive behaviors
        this.setState({ workouts:json }) 
    })
  }

  remove( props ) {
    fetch( 'remove', {
      method:'POST',
      body: props,
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      this.setState({ workouts:json })
    })
  }
}

export default App;
