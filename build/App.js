import React, {useState} from "./_snowpack/pkg/react.js";
import "./_snowpack/pkg/bootstrap.js";
import "./_snowpack/pkg/bootstrap/dist/css/bootstrap.min.css.proxy.js";
import DatePicker from "./_snowpack/pkg/react-date-picker.js";
class Todo extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      class: this.props.completed ? "card w-25 col-sm-4 col-lg3 bg-secondary" : "card bg-light w-25 col-sm-4 col-lg3"
    }, /* @__PURE__ */ React.createElement("div", {
      class: "card-body"
    }, /* @__PURE__ */ React.createElement("p", {
      class: "h4 card-title"
    }, this.props.name, " : "), /* @__PURE__ */ React.createElement("p", {
      class: "h6 card-subtitle"
    }, this.props.date), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
      class: "btn btn-primary",
      onClick: (e) => this.change(e)
    }, this.props.completed ? "Not Completed" : "Completed"), /* @__PURE__ */ React.createElement("button", {
      class: "btn btn-warning",
      onClick: (e) => this.callDelete(e)
    }, "Delete"))));
  }
  change(e) {
    this.props.completed = !this.props.completed;
    this.props.onClick(this.props.id, this.props.completed);
  }
  callDelete(e) {
    this.props.onDelete(this.props.id);
  }
}
function App(props) {
  const [todos, changeTodos] = useState([]);
  fetch("/read", {method: "get", "no-cors": true}).then((response) => response.json()).then((json) => {
    changeTodos(json);
  });
  const toggle = (id, completed) => {
    fetch("/change", {
      method: "POST",
      body: JSON.stringify({id, completed}),
      headers: {"Content-Type": "application/json"}
    }).then(() => {
      window.location.reload(false);
    });
  };
  const deleteEntry = (id, completed) => {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({id, completed}),
      headers: {"Content-Type": "application/json"}
    }).then(() => {
      changeTodos(() => {
        const i = todos.findIndex((v) => v.id === req.body.id);
        var copyTodos = [...todos];
        copyTodos.splice(i, 1);
        return copyTodos;
      });
    });
  };
  const add = (evt) => {
    const value = document.querySelector("[id='taskName']").value;
    const selectedDate = document.querySelector("[id='taskDate']").value;
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({
        name: value,
        date: selectedDate,
        completed: false
      }),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      changeTodos(json);
    });
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "App",
    class: "m-auto mw-100",
    style: {width: 95 + "%"}
  }, /* @__PURE__ */ React.createElement("p", {
    class: "h3"
  }, "Enter a new Task "), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    id: "taskName"
  }), /* @__PURE__ */ React.createElement("p", {
    class: "h5"
  }, "Due-By Date"), /* @__PURE__ */ React.createElement("input", {
    type: "datetime-local",
    id: "taskDate"
  }), /* @__PURE__ */ React.createElement("button", {
    onClick: (e) => add(e)
  }, "add"), /* @__PURE__ */ React.createElement("p", {
    class: "h3"
  }, "To Do List"), /* @__PURE__ */ React.createElement("section", {
    class: "m-auto d-flex flex-row flex-wrap",
    style: {width: 85 + "%"}
  }, todos.map((todo, i) => /* @__PURE__ */ React.createElement(Todo, {
    key: i,
    id: todo.id,
    onDelete: deleteEntry,
    name: todo.name,
    date: todo.date,
    completed: todo.completed,
    onClick: toggle
  }))));
}
export default App;
