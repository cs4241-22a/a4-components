import React from "./_snowpack/pkg/react.js";
class Todo extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.taskname), /* @__PURE__ */ React.createElement("td", null, this.props.date), /* @__PURE__ */ React.createElement("td", null, this.props.timeleft));
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
    this.load();
  }
  load() {
    fetch("/read", {method: "get", "no-cors": true}).then((response) => response.json()).then((json) => {
      this.setState({todos: json});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "taskname"
    }), /* @__PURE__ */ React.createElement("input", {
      type: "date",
      id: "date"
    }), /* @__PURE__ */ React.createElement("button", {
      id: "add",
      onClick: (e) => this.add(e)
    }, "add"), /* @__PURE__ */ React.createElement("button", {
      id: "remove",
      onClick: (e) => this.remove(e)
    }, "remove"), /* @__PURE__ */ React.createElement("div", {
      class: "taskTableDiv"
    }, /* @__PURE__ */ React.createElement("table", {
      id: "taskTable"
    }, this.state.todos.map((todo, i) => /* @__PURE__ */ React.createElement(Todo, {
      key: i,
      taskname: todo.taskname,
      date: todo.date,
      timeleft: todo.timeleft
    })))));
  }
  add(evt) {
    const task = document.querySelector("#taskname"), date = document.querySelector("#date"), json = {
      taskname: task.value,
      date: date.value
    }, bodyToSend = JSON.stringify(json);
    if (json.taskname === "" || json.date === "") {
      alert("Cannot use empty task name or date");
    } else {
      fetch("/add", {
        method: "POST",
        body: bodyToSend,
        headers: {"Content-Type": "application/json"}
      }).then((response) => response.json()).then((json2) => {
        this.setState({todos: json2});
      });
    }
  }
  remove(evt) {
    evt.preventDefault();
    const task = document.querySelector("#taskname"), date = document.querySelector("#date"), json = {
      taskname: task.value,
      date: date.value
    }, body = JSON.stringify(json);
    if (json.taskname === "") {
      alert("Cannot use empty task name");
    } else {
      fetch("/remove", {
        method: "POST",
        body,
        headers: {"Content-Type": "application/json"}
      }).then((response) => response.json()).then((json2) => {
        this.setState({todos: json2});
      });
    }
  }
}
export default App;
