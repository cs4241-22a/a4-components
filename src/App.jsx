import React from 'react';

class Todo extends React.Component {
    // our .render() method creates a block of HTML using the .jsx format
    render() {
        return <tr>
            <td>{this.props.name}</td>
            <td>{this.props.length}</td>
            <td>{this.props.elevation}</td>
            <td>{this.props.totallength}</td>
            <td>{this.props.totalelevation}</td>
        </tr>
    }
}

// main component
class App extends React.Component {
    constructor( props ) {
        super( props )
        // initialize our state
        this.state = { appdata:[] }
        this.load()
    }

    // load in our data from the server
    load() {
        fetch( '/update', { method:'get', 'no-cors':true })
            .then( response => response.json() )
            .then( json => {
                this.setState({ appdata:json })
            })
    }

    // render component HTML using JSX
    render() {
        return (
            <div className="App">
                <div id="userinput">
                    <form>
                        <label htmlFor="trailname">Trail name:</label><br></br>
                        <input type='text' id='trailname'></input><br></br>
                        <label htmlFor="traillength">Trail length (mi):</label><br></br>
                        <input type='number' id='traillength'></input><br></br>
                        <label htmlFor="trailelevation">Trail elevation change (ft):</label><br></br>
                        <input type='number' id='trailelevation'></input><br></br>
                        <button type="button" id="submitbutton" onClick={ e => this.add( e )}>submit</button>
                        <button type="button" id="clearbutton" onClick={ e => this.clear( e )}>CLEAR DATA</button>
                    </form>
                </div>
                <div id="data">
                <table id="datatable">
                    <tr>
                        <th>Trail Name</th>
                        <th>Trail Length (mi)</th>
                        <th>Trail Elevation Gain (ft)</th>
                        <th>Total Length (mi)</th>
                        <th>Total Elevation Change (ft)</th>
                    </tr>
                    { this.state.appdata.map( (todo,i) => <Todo key={i} name={todo.name} length={todo.length}
                        elevation={todo.elevation} totallength={todo.totallength} totalelevation={todo.totalelevation}/>
                    )}
                </table>
                </div>
            </div>
        )
    }

    // add hike
    add( evt ) {
        const input = {
            name: document.querySelector( '#trailname' ),
            length: document.querySelector( '#traillength' ),
            elevation: document.querySelector( '#trailelevation' ),
            //these fields will be derived and filled by the server
            totallength: 0,
            totalelevation: 0
        }

        const json = {
            name: input.name.value,
            length: input.length.value,
            elevation: input.elevation.value,
            totallength: input.totallength.value,
            totalelevation: input.totalelevation.value
        }

        fetch( '/add', {
            method:'POST',
            body: JSON.stringify(json),
            headers: { 'Content-Type': 'application/json' }
        })
            .then( response => response.json() )
            .then( json => {
                // changing state triggers reactive behaviors
                this.setState({ appdata:json })
            })
    }

    //clear hikes
    clear( evt ) {
        fetch( '/clear', {
            method:'POST',
        })
            .then( response => response.json() )
            .then( json => {
                // changing state triggers reactive behaviors
                this.setState({ appdata:json })
            })
    }
}

export default App;
