import React from "react";

class Log extends React.Component {
  render() {
    return React.createElement(
      "li",
      null,
      this.props.date,
      " ",
      this.props.time,
      " ",
      this.meters,
      ":",
      React.createElement(
        "button",
        { onClick: (e) => this.onDelete(e) },
        "delete"
      )
    );
  }

  onDelete(e) {
    this.props.delete(this.props.date, this.props.time, this.props.meters);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logs: [] };
    this.load();
  }

  load() {
    fetch("/read", { method: "get", "no-cors": true })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ logs: json });
      });
  }

  render() {
    return (
      React.createElement("div", { className: "App" }),
      React.createElement("h1", {}, "Ergometer Workout Log"),
      React.createElement("input", {
        type: "text",
        id: "date",
        onChange: this.props._change,
      }),
      React.createElement("input", {
        type: "text",
        id: "time",
        onChange: this.props._change,
      }),
      React.createElement("input", {
        type: "text",
        id: "meters",
        onChange: this.props._change,
      }),
      React.createElement("button", { onClick: (e) => this.add(e) }),
      React.createElement(
        "ul",
        null,
        this.state.logs.map((log, i) =>
          React.createElement(Log, {
            key: i,
            date: log.date,
            time: log.time,
            meters: log.meters,
            delete: (d, t, m) => this.Delete(d, t, m),
          })
        )
      )
    );
  }

  Delete(date, time, meters) {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ date, time, meters }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ logs: json });
      });
  }

  add(evt) {
    const date = document.querySelector("#date").value,
          time = document.querySelector("#time").value,
          meters = document.querySelector("#meters".value);

    fetch("/add", {
      method: "POST",
      body: JSON.stringify({date, time, meters}),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ logs: json });
      });
  }
}

export default App;
