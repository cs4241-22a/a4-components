import React from "./_snowpack/pkg/react.js";
class Todo extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("li", null, " ", this.props.name, " :", /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      defaultChecked: this.props.completed,
      onChange: (e) => this.change(e)
    }), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.remove(e)
    }, "d"));
  }
  change(e) {
    this.props.toggle(this.props.name, e.target.checked);
  }
  remove(e) {
    this.props.delete(this.props.name);
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
      toggle: this.toggle,
      delete: this.delete
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
  delete = (name) => {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({name}),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      console.log(this);
      console.log(json);
      this.setState({todos: json});
    });
  };
}
export default App;
