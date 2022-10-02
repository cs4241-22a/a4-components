import React from 'react';

// this is going to be our Table component
// and instead of rendering a list item, it will include the JSON data in its props and just format that out onto the screen
class Todo extends React.Component {
    render() {
        return <li>{this.props.name} :
            <input type="checkbox" defaultChecked={this.props.completed} onChange={e => this.change(e)} />
        </li>
    }
    // call this method when the checkbox for this component is clicked
    change(e) {
        this.props.onclick(this.props.name, e.target.checked);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
        this.load();
    }

    load() {
        fetch('/read', { method: 'get', 'no-cors': true })
            .then(response => response.json())
            .then(json => {
                this.setState({ todos: json })
            });
    }

    render() {
        return (
            <div className="App">
                <input type='text' /><button onClick={e => this.add(e)}>add</button>
                <ul>
                    {this.state.todos.map((todo, i) => <Todo key={i} name={todo.name} completed={todo.completed} onclick={this.toggle} />)}
                </ul>
            </div>
        );
    }

    // when an Todo is toggled, send data to server
    toggle(name, completed) {
        fetch('/change', {
            method: 'POST',
            body: JSON.stringify({ name, completed }),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // add a new todo list item
    add(evt) {
        const value = document.querySelector('input').value

        fetch('/add', {
            method: 'POST',
            body: JSON.stringify({ name: value, completed: false }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(json => {
                // changing state triggers reactive behaviors
                this.setState({ todos: json });
            });
    }
}

export default App;