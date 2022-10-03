import React from 'react';
import "./index.css";

// this is going to be our Table component
// and instead of rendering a list item, it will include the JSON data in its props and just format that out onto the screen

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: "My TV show", seasons: 5, eps: 10, duration: 45, errors: "" };
    }

    render() {
        console.log("Rendering Form");
        return (<form onSubmit={this.handleSubmit}>
            <h1>TV Show Tracker</h1>

            <fieldset>
                <span className="formLabel">TV show name</span>
                <input type="text" key="show" value={this.state.show} onChange={this.showHandler} /><br />

                <span className="formLabel">Number of seasons</span>
                <input type="number" key="seasons" min="1" value={this.state.seasons} onChange={this.seasonsHandler} /><br />

                <span className="formLabel">Episodes per season</span>
                <input type="number" key="episodes" min="1" value={this.state.eps} onChange={this.epHandler} /><br />

                <span className="formLabel">Duration of an episode (minutes)</span>
                <input type="number" key="duration" min="1" value={this.state.duration} onChange={this.durationHandler} /><br />

                <br /><span style={{ color: "red" }}>{this.state.errors}</span><br />
                <button id="submit" type="submit" key="submit">Submit</button>
            </fieldset>
        </form>);
    }

    showHandler(event) {
        this.setState({ ...prevState, show: event.target.value });
    }

    seasonsHandler(event) {
        this.setState({ ...prevState, seasons: event.target.value });
    }

    epHandler(event) {
        this.setState({ ...prevState, eps: event.target.value });
    }

    durationHandler(event) {
        this.setState({ ...prevState, duration: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (document.querySelector('show').value == "" || document.querySelector('seasons').value == "" || document.querySelector('eps').value == "" || document.querySelector('duration').value == "") {
            setErrors("Form fields cannot be null");
        } else {
            this.props.add(this.state.show, this.state.seasons, this.state.eps, this.state.duration);
            this.setState({ show: "", seasons: "", eps: "", duration: "", errors: "" });
        }
    }
}


class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        console.log("Rendering Table");
        return (<table>
            <tbody>
                <tr>
                    <th>TV Show</th>
                    <th>Seasons</th>
                    <th>Episodes Per Season</th>
                    <th>Duration of an Episode (mins)</th>
                    <th>Time Needed to Binge-Watch Full Show</th>
                    <th></th>
                </tr>
                {this.props.shows.map((item) => (
                    <tr>
                        <td>{item.show}</td>
                        <td>{item.seasons}</td>
                        <td>{item.episodes}</td>
                        <td>{item.duration}</td>
                        <td>{item.totalTime}</td>
                        <td><button>Remove Entry</button></td>
                    </tr>
                ))}
            </tbody>
        </table>);
    }
}


class App extends React.Component {

    constructor(props) {
        console.log("App constructing");
        super(props);
        this.state = {
            shows: [
                {
                    show: "Dummy Show",
                    seasons: 5,
                    eps: 13,
                    duration: 45,
                    uuid: 'iAmAUniqueId',
                },
                {
                    show: "Dummy Show",
                    seasons: 7,
                    eps: 24,
                    duration: 60,
                    uuid: 'iAmAnotherUniqueId',
                }]
        };
        this.load();
    }

    add(evt) {
        const json = {
            show: document.querySelector('show').value,
            seasons: document.querySelector('seasons').value,
            eps: document.querySelector('eps').value,
            duration: document.querySelector('duration').value,
            key: uuidv4(),
        };
        const body = JSON.stringify(json);

        fetch("http://localhost:9000/add", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body,
        }).then(function (response) {
            let res = response.json();
            const checkPromise = () => {
                res.then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.error("Error: " + err);
                });
            };
            checkPromise();
        });
    }

    remove(entryId) {
        let json = null;
        for (let i = 0; i < showList.length; i++) {
            if (showList[i].key === entryId) {
                json = showList[i];
            }
        }
        const body = JSON.stringify(json);

        fetch("http://localhost:9000/remove", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body,
        }).then(function (response) {
            let res = response.json();
            const checkPromise = () => {
                res.then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.error("Error: " + err);
                });
            };
            checkPromise();
        });
        return false;
    }

    render() {
        console.log("Rendering App");
        return (
            <div className="App">
                <Form add={this.add} />
                <Table shows={this.state.shows} remove={this.remove} />
            </div>
        );
    }

    load() {
        fetch('/read', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ shows: json });
            });
    }
}

export default App;