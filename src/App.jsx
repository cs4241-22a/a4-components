import React from "react";
import './uikit-3.15.9/css/uikit.min.css'
import "./style.css"
import pikachu from './images/pikachu.jpg'
import vaporeon from './images/vaporeon.jpg'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pokemon:[] }
    this.load()
  }

  load = () => {
    console.log("getting data")
    fetch( '/data', {
      method:'GET',
      headers: {
          'Content-Type': 'application/json'
      }})
      .then(response => response.json())
      .then(json => {
        this.setState({pokemon:json})
        console.log(this.state.pokemon)
      })
  }

  render() {
    return (
      <>
        <section className="uk-section-small">
          <header className="uk-flex uk-flex-around">
            <img className="uk-height-small uk-align-left" src={pikachu} alt="Pikachu" data-uk-img></img>
            <h1 className="uk-heading-medium uk-heading-divider">Create your own Pokemon!</h1>
            <img className="uk-height-small uk-align-right" src={vaporeon} alt="Vaporeon" data-uk-img></img>
          </header>
        </section>

        <section className="uk-section-small uk-width-large uk-align-center uk-margin-small">
          <h2 className="uk-modal-title">How to use this application</h2>

          <p>Create a pokemon by submitting the form below</p>
          <p>Edit a pokemon by submitting the form with the same name as the pokemon you want to edit</p>
          <p>Delete a pokemon by clicking it in the table below</p>
        </section>

        <section className="uk-width-large uk-align-center uk-margin-small">
        <Form load={this.load}/>
        </section>

        <h2>Pokemon List</h2>
        <table id="table" className="uk-table">
          <thead>
            <tr className="hrow">
              <th>Name</th>
              <th>Description</th>
              <th>1st Type</th>
              <th>2nd Type</th>
              <th>Weaknesses</th>
              <th>Resistances</th>
              <th>Immunities</th>
            </tr>
          </thead>
          <tbody>
          { this.state.pokemon.map( (pokemon) => 
            <Pokemon key={pokemon._id} name={pokemon.name} description={pokemon.description} type1={pokemon.type1} type2={pokemon.type2} 
            weaknesses={pokemon.weaknesses} resistances={pokemon.resistances} immunities={pokemon.immunities} load={this.load}/> ) }
          </tbody>
        </table>
      </>
    );
  }
}

class Form extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      type1: '',
      type2: 'None'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value    
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
    fetch( '/submit', {
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    this.props.load()
  }

  render() {
    return (
      <>
          <form className="uk-form-horizontal" id="form" onSubmit={this.handleSubmit}>

            <label className="uk-form-label" htmlFor="name">What is your Pokemon's name?</label>     
            <section className="uk-margin uk-form-controls">
              <input value={this.state.name} onChange={this.handleChange} className="uk-input" type='text' name="name" maxLength="20" required/>
            </section>

            <label className="uk-form-label" htmlFor="description">Describe your Pokemon</label>       
            <section className="uk-margin uk-form-controls">
              <textarea value={this.state.description} onChange={this.handleChange} className="uk-textarea" name="description"></textarea> 
            </section>
      
            <label className="uk-form-label">Choose your Pokemon's types</label>
            <section className="uk-margin uk-form-controls">
              <select value={this.state.type1} onChange={this.handleChange} className="uk-select" name="type1" id="type1" required>
                <option value="">Choose a type</option>
                <option value="Normal">Normal</option>
                <option value="Fighting">Fighting</option>
                <option value="Flying">Flying</option>
                <option value="Poison">Poison</option>
                <option value="Ground">Ground</option>
                <option value="Rock">Rock</option>
                <option value="Bug">Bug</option>
                <option value="Ghost">Ghost</option>
                <option value="Steel">Steel</option>
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
                <option value="Grass">Grass</option>
                <option value="Electric">Electric</option>
                <option value="Psychic">Psychic</option>
                <option value="Ice">Ice</option>
                <option value="Dragon">Dragon</option>
                <option value="Dark">Dark</option>
                <option value="Fairy">Fairy</option>
              </select>
      
              <select value={this.state.type2} onChange={this.handleChange} className="uk-select" name="type2" id="type2" >
                <option value="None">None</option>
                <option value="Normal">Normal</option>
                <option value="Fighting">Fighting</option>
                <option value="Flying">Flying</option>
                <option value="Poison">Poison</option>
                <option value="Ground">Ground</option>
                <option value="Rock">Rock</option>
                <option value="Bug">Bug</option>
                <option value="Ghost">Ghost</option>
                <option value="Steel">Steel</option>
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
                <option value="Grass">Grass</option>
                <option value="Electric">Electric</option>
                <option value="Psychic">Psychic</option>
                <option value="Ice">Ice</option>
                <option value="Dragon">Dragon</option>
                <option value="Dark">Dark</option>
                <option value="Fairy">Fairy</option>
              </select>
            </section>
      
            <input className="uk-button uk-button-primary uk-align-center" type="submit"/>
          </form>
      </>
    )
  }
}

class Pokemon extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    fetch( '/delete', {
      method:'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props)
    })
    this.props.load()
  }

  render() {
    return (
      <>
        <tr onClick={this.handleDelete}>
          <td>{this.props.name}</td>
          <td>{this.props.description}</td>
          <td>{this.props.type1}</td>
          <td>{this.props.type2}</td>
          <td>{this.props.weaknesses}</td>
          <td>{this.props.resistances}</td>
          <td>{this.props.immunities}</td>
        </tr>
      </>
    )
  }
}

export default App;
