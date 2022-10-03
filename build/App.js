import React from "./_snowpack/pkg/react.js";
class Todo extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("li", null, this.props.name, " :", /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      defaultChecked: this.props.completed,
      onChange: (e) => this.change(e)
    }));
  }
  change(e) {
    this.props.onclick(this.props.name, e.target.checked);
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
      type: "text"
    }), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.add(e)
    }, "add"), /* @__PURE__ */ React.createElement("ul", null, this.state.todos.map((todo, i) => /* @__PURE__ */ React.createElement(Todo, {
      key: i,
      name: todo.name,
      completed: todo.completed,
      onclick: this.toggle
    }))));
  }
  toggle(name, completed) {
    fetch("/change", {
      method: "POST",
      body: JSON.stringify({name, completed}),
      headers: {"Content-Type": "application/json"}
    });
  }
  add(evt) {
    const value = document.querySelector("input").value;
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({name: value, completed: false}),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      this.setState({todos: json});
    });
  }
}
export default App;
