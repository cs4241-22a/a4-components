import React from "react";



class Name extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  
  render() {
    const name = this.props.name
    if(document.getElementById("ratname").value != ""){
      const rats = document.getElementById("youname");
    const adjes = ["funky", "furry", "spunky", "based", "wiggly", "rabid", "feral", "amphibious", "moist", "scrungy", "filthy", "bronchiatic", "clueless", "ditsy", "arthritic", "useless", "cute", "decorative", "assiduous", "gothic", "postmodern", "fully automatic", "scared", "skittish", "large", "tiny", "strategic", "colorblind", "gaslighting", "gatekeeping", "cringe", "sus", "rancid", "bedazzled", "confused", "sticky", "litigious", "stinky", "nutty"]
    let adje = adjes[Math.floor(Math.random()*adjes.length)];
    const nouns = ["fella", "friend", "pisser", "chef", "Charlie", "girlboss", "Bagungus", "ambassador", "microwave", "nurse", "spy", "loaf", "entertainer", "swifty", "garfhead", "furry", "guy", "professor", "hatrat", "mayor", "problem", "barrister", "mobster", "monster", "child", "Delta SkyPriority Gold Member", "Delta SkyPriority Silver Member", "credit card fraudster", "sinner", "snitch", "plumber", "rhat", "rat", "landlord", "vegetarian", "carnivore", "murderer", "true crime podcaster", "historian", "bandit", "smuggler", "morb", "amongus", "barista", "whippersnapper", "motivational speaker/juggler", "DJ", "game show host", "CS major", "singer", "puddle"] 
    let noun = nouns[Math.floor(Math.random() * nouns.length)];
    let html =
      `
        <h1>You named this ` +
      adje +
      ` little ` +
      noun +
      ` <span style="color:red">` +
      name +
      `</span></h1>`;
    
    rats.innerHTML = html
    }
    
    return <li>{name}</li>
  }
}




// main component
class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { names:[] }
    this.load()
  }

  // load in our data from the server
  load() {
    fetch( '/read', { method:'get', 'no-cors':true })
      .then( response => response.json() )
      .then( json => {
         this.setState({ names:json }) 
      })
  }

  // render component HTML using JSX
  render() {
    return (
      <div>
        <h1> Name this rat!</h1>
        <img src="https://cdn.glitch.global/52f17feb-e16b-457c-8290-455b85efab01/download.png?v=1664850939115" />
        <br />
        <input type="text" id="ratname" placeholder="Rat name here" />
        <button onClick={ e => this.add( e )} id="button">Submit</button>
        <h2 id="youname"></h2> 
        <p>Here's what other people named this rat:</p>
        <ul>
          { this.state.names.map( (name,i) => <Name key={i} name={name.name} /> ) }
        </ul> 
      </div>
    );
  }
 
  add( evt ) {
    const value = document.querySelector('input').value

    fetch( '/add', { 
      method:'POST',
      body: JSON.stringify({ name:value, completed:false }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
       // changing state triggers reactive behaviors
       this.setState({ names:json }) 
    })
  }
}

export default App;
