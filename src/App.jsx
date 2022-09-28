import React from "react";
import "./style.css";

class Assignment extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.subject}</td>
                <td>{this.props.deadline}</td>
                <td>{this.props.priority}</td>
                <td>
                    <button onClick={this.deleteWrap(this)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }

    deleteWrap(etn) {
        return function () {
            etn.props.deleteClick(
                etn.props.title,
                etn.props.subject,
                etn.props.deadline,
                etn.props.priority
            );
        };
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {assignments: []};
        this.load();
        window.appState = this;
    }

    load() {
        fetch("/read", {method: "get", "no-cors": true})
            .then((response) => response.json())
            .then((json) => {
                this.setState({assignments: json});
            });
    }

    handleTitleChange = e => {
        this.setState({
            title: e.target.value
        });
    }

    handleSubjectChange = e => {
        this.setState({
            subject: e.target.value
        });
    }

    handleDeadlineChange = e => {
        this.setState({
            deadline: e.target.value
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Assignment Tracker</h1>
                <div class="flex-container">
                    <div style={{width: "60%"}}>
                        <table>
                            <thead>
                            <tr>
                                <th>Assignment</th>
                                <th>Subject</th>
                                <th>Deadline</th>
                                <th>Priority</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.assignments.map((assignment, i) => (
                                <Assignment
                                    key={i}
                                    title={assignment.title}
                                    subject={assignment.subject}
                                    deadline={assignment.deadline}
                                    priority={assignment.priority}
                                    deleteClick={this.delete}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{width: "40%"}}>
                        <form autocomplete={"off"} id="form">
                            <h2>Add Assignment</h2>
                            <div>
                                <label for={"title"} class={"Labels"}>
                                    Assignment: {" "}
                                </label>
                                <input
                                    type={"text"}
                                    id={"Assignment"}
                                    placeholder={"Title"}
                                    class={"Inputs"}
                                    onChange={this.handleTitleChange}
                                />
                            </div>
                            <div>
                                <label for={"subject"} class={"Labels"}>
                                    Subject: {" "}
                                </label>
                                <input
                                    type={"text"}
                                    id={"subject"}
                                    placeholder={"Subject"}
                                    class={"Inputs"}
                                    onChange={this.handleSubjectChange}
                                />
                            </div>
                            <div>
                                <label for={"deadline"} class={"Labels"}>
                                    Deadline: {" "}
                                </label>
                                <input
                                    type={"date"}
                                    id={"deadline"}
                                    placeholder={"Deadline"}
                                    class={"Inputs"}
                                    onChange={this.handleDeadlineChange}
                                />
                            </div>
                            <div>
                                <button onClick={(e) => this.add(e)}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    add(evt) {
        const form = document.querySelector("form").value;
        console.log(evt)
        fetch("/add", {
            method: "POST",
            body: JSON.stringify({
                title: this.state.title,
                subject: this.state.subject,
                deadline: this.state.deadline,
            }),
            headers: {"Content-Type": "application/json"},
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({assignments: json});
            });
    }

    delete(title, subject, deadline, priority) {
        const json = {
                title: title,
                subject: subject,
                deadline: deadline,
                priority: priority
            },
            body = JSON.stringify(json);
        fetch("/delete", {
            method: "POST",
            body,
            headers: {"Content-Type": "application/json"},
            "no-cors": true,
        })
            .then((response) => response.json())
            .then((body) => {
                console.log(json);
                window.appState.setState({assignments: body});
            });
    }

}

export default App;
