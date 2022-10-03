import React from 'react';
import "./index.css";
import uuidv4 from 'uuidv4';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: "My TV show", seasons: 5, eps: 10, duration: 45, errors: "" };
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>
            <h1>TV Show Tracker</h1>

            <fieldset>
                <span className="formLabel">TV show name</span>
                <input type="text" key="show" id="show" value={this.state.show} onChange={this.showHandler} /><br />

                <span className="formLabel">Number of seasons</span>
                <input type="number" key="seasons" id="seasons" min="1" value={this.state.seasons} onChange={this.seasonsHandler} /><br />

                <span className="formLabel">Episodes per season</span>
                <input type="number" key="episodes" id="episodes" min="1" value={this.state.eps} onChange={this.epHandler} /><br />

                <span className="formLabel">Duration of an episode (minutes)</span>
                <input type="number" key="duration" id="duration" min="1" value={this.state.duration} onChange={this.durationHandler} /><br />

                <br /><span style={{ color: "red" }}>{this.state.errors}</span><br />
                <button id="submit" type="submit" key="submit">Submit</button>
            </fieldset>
        </form>);
    }

    showHandler = (event) => {
        this.setState(state => ({
            show: event.target.value,
            seasons: state.seasons,
            eps: state.eps,
            duration: state.duration
        }));
    }

    seasonsHandler = (event) => {
        this.setState(state => ({
            show: state.show,
            seasons: event.target.value,
            eps: state.eps,
            duration: state.duration
        }));
    }

    epHandler = (event) => {
        this.setState(state => ({
            show: state.show,
            seasons: state.seasons,
            eps: event.target.value,
            duration: state.duration
        }));
    }

    durationHandler = (event) => {
        this.setState(state => ({
            show: state.show,
            seasons: state.seasons,
            eps: state.eps,
            duration: event.target.value
        }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.show == "" || this.state.seasons == "" || this.state.eps == "" || this.state.duration == "") {
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
    }

    render() {
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
                        <td>{item.eps}</td>
                        <td>{item.duration}</td>
                        <td>{item.totalTime}</td>
                        <td><button onClick={() => this.props.remove(item.key)}>Remove Entry</button></td>
                    </tr>
                ))}
            </tbody>
        </table>);
    }
}


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shows: []
        };
        this.load();
    }

    add = (show, seasons, eps, duration) => {
        const json = {
            show: show,
            seasons: seasons,
            eps: eps,
            duration: duration,
            key: uuidv4(),
        };
        const body = JSON.stringify(json);
        fetch("/add", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body,
        }).then((response) => {
            let res = response.json();
            const checkPromise = () => {
                res.then((result) => {
                    this.setState({ shows: result });
                }).catch((err) => {
                    console.error("Error: " + err);
                });
            };
            checkPromise();
        });
    }

    remove = (entryId) => {
        let json = {};
        for (let i = 0; i < this.state.shows.length; i++) {
            if (this.state.shows[i].key === entryId) {
                json = this.state.shows[i];
            }
        }
        const body = JSON.stringify(json);

        fetch("/remove", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body,
        }).then((response) => {
            let res = response.json();
            const checkPromise = () => {
                res.then((result) => {
                    this.setState({ shows: result });
                }).catch((err) => {
                    console.error("Error: " + err);
                });
            };
            checkPromise();
        });
    }

    render() {
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