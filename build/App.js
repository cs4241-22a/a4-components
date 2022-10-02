import React from "./_snowpack/pkg/react.js";
class Todo extends React.Component {
  render() {
    console.log(this.props);
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.activity), /* @__PURE__ */ React.createElement("td", null, this.props.date), /* @__PURE__ */ React.createElement("td", null, this.props.startTime), /* @__PURE__ */ React.createElement("td", null, this.props.endTime), /* @__PURE__ */ React.createElement("td", null, this.props.description), /* @__PURE__ */ React.createElement("td", null, this.props.duration), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", {
      type: "button"
    }, "Delete")));
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
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
  toggle(name, completed) {
    fetch("/change", {
      method: "POST",
      body: JSON.stringify({name, completed}),
      headers: {"Content-Type": "application/json"}
    });
  }
  add(evt) {
    const activity = document.querySelector("#activity").value;
    console.log(activity);
    const date = document.querySelector("#date").value;
    console.log(date);
    const startTime = document.querySelector("#startTime").value;
    console.log(startTime);
    const endTime = document.querySelector("#endTime").value;
    const description = document.querySelector("#description").value;
    const json = {
      activity,
      date,
      startTime,
      endTime,
      description
    };
    fetch("/add", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json2) => {
      this.setState({todos: json2});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement("label", {
      className: "grid_item",
      htmlFor: "activity"
    }, "Type of Activity Done"), /* @__PURE__ */ React.createElement("select", {
      id: "activity",
      name: "Type of activity done"
    }, /* @__PURE__ */ React.createElement("option", {
      value: "Sleep"
    }, "Sleep"), /* @__PURE__ */ React.createElement("option", {
      value: "Food"
    }, "Food"), /* @__PURE__ */ React.createElement("option", {
      value: "School"
    }, "School"), /* @__PURE__ */ React.createElement("option", {
      value: "Work"
    }, "Work"), /* @__PURE__ */ React.createElement("option", {
      value: "Fun"
    }, "Fun")), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "date"
    }, "Date"), /* @__PURE__ */ React.createElement("input", {
      type: "date",
      id: "date",
      name: "date",
      required: true
    }), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "startTime"
    }, "Time Started"), /* @__PURE__ */ React.createElement("input", {
      type: "time",
      id: "startTime",
      name: "startTime",
      required: true
    }), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "endTime"
    }, "Time Ended"), /* @__PURE__ */ React.createElement("input", {
      type: "time",
      id: "endTime",
      name: "endTime",
      required: true
    }), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "description"
    }, "Description"), /* @__PURE__ */ React.createElement("textarea", {
      type: "text",
      id: "description",
      name: "description",
      required: true
    }, " "), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
      id: "formSubmit",
      onClick: (e) => this.add(e)
    }, "Submit"), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", {
      className: "table_activity"
    }, "Activity Done"), /* @__PURE__ */ React.createElement("th", {
      className: "table_date"
    }, "Date"), /* @__PURE__ */ React.createElement("th", {
      className: "table_start"
    }, "Time Started"), /* @__PURE__ */ React.createElement("th", {
      className: "table_end"
    }, "Time Ended"), /* @__PURE__ */ React.createElement("th", {
      className: "table_description"
    }, "Description"), /* @__PURE__ */ React.createElement("th", {
      className: "table_duration"
    }, "Duration"), /* @__PURE__ */ React.createElement("th", {
      className: "table_buttons"
    }, "Delete/Edit")), this.state.todos.map((todo, i) => /* @__PURE__ */ React.createElement(Todo, {
      key: i,
      activity: todo.activity,
      date: todo.date,
      startTime: todo.startTime,
      endTime: todo.endTime,
      description: todo.description,
      duration: todo.duration
    }))));
  }
}
export default App;
