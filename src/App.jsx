import React, { useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-date-picker";

// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.

class Todo extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return (
      <div
        class={
          this.props.completed
            ? "card w-25 col-sm-4 col-lg3 bg-secondary"
            : "card bg-light w-25 col-sm-4 col-lg3"
        }
      >
        <div class="card-body">
          <p class="h4 card-title">{this.props.name} : </p>
          <p class="h6 card-subtitle">{this.props.date}</p>
          <div>
            <button class="btn btn-primary" onClick={(e) => this.change(e)}>
              {this.props.completed ? "Not Completed" : "Completed"}
            </button>
            <button class="btn btn-warning" onClick={(e) => this.callDelete(e)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  // call this method when the checkbox for this component is clicked
  change(e) {
    this.props.completed = !(this.props.completed)
    this.props.onClick(this.props.id, this.props.completed);
  }
  callDelete(e) {
    this.props.onDelete(this.props.id);
  }
}

// main component
function App(props) {
  const [todos, changeTodos] = useState([]);

  fetch("/read", { method: "get", "no-cors": true })
    .then((response) => response.json())
    .then((json) => {
      changeTodos(json);
    });

  // when an Todo is toggled, send data to server
  const toggle = (id, completed) => {
    fetch("/change", {
      method: "POST",
      body: JSON.stringify({ id: id, completed: completed }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      window.location.reload(false);
    });
  };

  const deleteEntry = (id, completed) => {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ id, completed }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      window.location.reload(false);
    });
  };

  // add a new todo list item
  const add = (evt) => {
    const value = document.querySelector("[id='taskName']").value;
    const selectedDate = document.querySelector("[id='taskDate']").value;

    fetch("/add", {
      method: "POST",
      body: JSON.stringify({
        name: value,
        date: selectedDate,
        completed: false,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        // changing state triggers reactive behaviors
        changeTodos(json);
      });
  };

  // render component HTML using JSX
  return (
    <div className="App" class="m-auto mw-100" style={{ width: 95 + "%" }}>
      <p class="h3">Enter a new Task </p>
      <input type="text" id="taskName" />
      <p class="h5">Due-By Date</p>
      <input type="datetime-local" id="taskDate" />
      <button onClick={(e) => add(e)}>add</button>
      <p class="h3">To Do List</p>
      <section
        class="m-auto d-flex flex-row flex-wrap"
        style={{ width: 85 + "%" }}
      >
        {todos.map((todo, i) => (
          <Todo
            key={i}
            id={todo.id}
            onDelete={deleteEntry}
            name={todo.name}
            date={todo.date}
            completed={todo.completed}
            onClick={toggle}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
