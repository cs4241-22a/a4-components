
// import { response } from 'express';
import React from 'react';

class Workout extends React.Component {
  render() {
    return <tr>
      <td>{this.props.exercise}</td>
      <td>{this.props.sets}</td>
      <td>{this.props.reps}</td>
      <td>{this.props.weight}</td>
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
        <div clas="row">
          <h1 class="text-center text-info">Welcome to the Jim</h1><hr></hr>
        </div>
        <div class="row">
          <form id="addForm" class="m-4 form-horizontal">
            <input id="exercise" type="text" maxlength="100" placeholder="Name of exercise"/>
            <input id="sets" type="text" maxlength="10" placeholder="Sets"/>
            <input id="reps" type="text" maxlength="10" placeholder="Reps"/>
            <input id="weight" type="text" maxlength="10" placeholder="Weight"/>
            <button type="submit" id="addWorkout" class="btn btn-primary btn-sm active" onClick={ e => this.add( e )}>Get Bigger</button>
          </form>
        </div>
        <div class="row">
          <form id="removeForm" class="m-4 form-horizontal">
            <input id="exerciseRemove" type="text" maxlength="100" placeholder="Name of exercise"/>
            <button type="submit" id="removeWorkout" class="btn btn-primary btn-sm active" onClick={ e => this.remove( e )}>Get Smaller</button>
          </form>
        </div>
        <div class="row">
          <form id="editForm" class="m-4 form-horizontal">
            <input id="index" type="text" placeholder="Table Row Number"/>
            <input id="newExercise" type="text" maxlength="100" placeholder="New Exercise Name"/>
            <input id="newSets" type="text" maxlength="10" placeholder="New Sets"/>
            <input id="newReps" type="text" maxlength="10" placeholder="New Reps"/>
            <input id="newWeight" type="text" maxlength="10" placeholder="New Weight"/>
            <button type="submit" id="updateWorkout" class="btn btn-primary btn-sm active" onClick={( e => this.update( e ))}>Update</button>
          </form>
        </div>
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

    if(exercise.value !== '' && sets.value !== '' && reps.value !== '' && weight.value !== '') {
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
  }

  remove( evt ) {
    const exercise = document.getElementById("exerciseRemove")

    fetch( '/remove', { 
      method:'POST',
      body: JSON.stringify({ exercise: exercise.value }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
        // changing state triggers reactive behaviors
        this.setState({ workouts:json }) 
    })
  }

  update( evt ) {
    const index = document.getElementById("index")
    const exercise = document.getElementById("newExercise")
    const sets = document.getElementById("newSets")
    const reps = document.getElementById("newReps")
    const weight = document.getElementById("newWeight")

    if(index.value !== '' && exercise.value !== '' && sets.value !== '' && reps.value !== '' && weight.value !== '') {
      fetch( '/update', { 
        method:'POST',
        body: JSON.stringify({ index: index.value - 1, exercise: exercise.value, sets: sets.value, reps: reps.value, weight: weight.value }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then( response => response.json() )
      .then( json => {
          // changing state triggers reactive behaviors
          this.setState({ workouts:json }) 
      })
    }
  }
}

export default App;
