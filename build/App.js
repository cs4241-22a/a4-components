import React from "./_snowpack/pkg/react.js";
class Todo extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("li", null, this.props.derive, " :", /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      defaultChecked: this.props.completed,
      onChange: (e) => this.change(e)
    }));
  }
  change(e) {
    this.props.onclick(this.props.dest, e.target.checked);
  }
}
class Table extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.dest), /* @__PURE__ */ React.createElement("td", null, this.props.dist), /* @__PURE__ */ React.createElement("td", null, this.props.avr), /* @__PURE__ */ React.createElement("td", null, this.props.derive), /* @__PURE__ */ React.createElement("td", null, " ", /* @__PURE__ */ React.createElement("input", {
      type: "radio",
      defaultChecked: this.props.completed,
      onChange: (e) => this.change(e)
    }), " "), /* @__PURE__ */ React.createElement("td", null, " ", /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      defaultChecked: this.props.completed,
      onChange: (e) => this.modify(e)
    }), " "));
  }
  change(e) {
    this.props.onclick(this.props.dest, e.target.checked);
  }
  modify(e) {
    this.props.onclickModify(this.props.dest, e.target.checked);
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
    this.load();
  }
  delete() {
  }
  load() {
    fetch("/read", {method: "get", "no-cors": true}).then((response) => response.json()).then((json) => {
      this.setState({todos: json});
    });
  }
  toggle(dest, completed, dist, avr, derive) {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({dest, completed, dist, avr, derive}),
      headers: {"Content-Type": "application/json"}
    });
    this.load();
  }
  modify(dest, completed, dist, avr, derive) {
    fetch("/change", {
      method: "POST",
      body: JSON.stringify({dest, completed, dist, avr, derive}),
      headers: {"Content-Type": "application/json"}
    });
    this.toggle(dest, completed, dist, avr, derive);
    document.querySelector("#destination").setAttribute("value", dest);
    document.querySelector("#miles").setAttribute("value", dist);
    document.querySelector("#average").setAttribute("value", avr);
    document.querySelector("#btn").textContent = "modify";
  }
  add(evt) {
    const input = document.querySelector("#destination").value;
    const input2 = document.querySelector("#miles").value;
    const input3 = document.querySelector("#average").value;
    console.log(input);
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({dest: input, completed: false, dist: input2, avr: input3}),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      this.setState({todos: json});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement("h1", null, "Trip Planner"), /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("label", null, "destination"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "destination"
    }), /* @__PURE__ */ React.createElement("label", null, "miles to destination"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      id: "miles"
    }), /* @__PURE__ */ React.createElement("label", null, "average speed (mph)"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      id: "average"
    }), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.add(e),
      id: "btn"
    }, "add")), /* @__PURE__ */ React.createElement("table", {
      id: "results"
    }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Destination"), /* @__PURE__ */ React.createElement("th", null, "Distance to Destination"), /* @__PURE__ */ React.createElement("th", null, "Average Speed"), /* @__PURE__ */ React.createElement("th", null, "Time to Destination"), /* @__PURE__ */ React.createElement("th", null, "delete"), /* @__PURE__ */ React.createElement("th", null, "modify")), this.state.todos.map((todo, i) => /* @__PURE__ */ React.createElement(Table, {
      key: i,
      derive: todo.derive,
      dist: todo.dist,
      avr: todo.avr,
      dest: todo.dest,
      completed: todo.completed,
      onclick: (e) => this.toggle(todo.dest, todo.completed, todo.dist, todo.avr, todo.derive),
      onclickModify: (e) => this.modify(todo.dest, todo.completed, todo.dist, todo.avr, todo.derive)
    }))));
  }
}
export default App;
