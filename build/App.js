import React from "./_snowpack/pkg/react.js";
class Log extends React.Component {
  render() {
    console.log(this.props.id);
    return /* @__PURE__ */ React.createElement("tr", {
      id: this.props.id
    }, /* @__PURE__ */ React.createElement("td", null, this.props.activity), /* @__PURE__ */ React.createElement("td", null, this.props.date), /* @__PURE__ */ React.createElement("td", null, this.props.startTime), /* @__PURE__ */ React.createElement("td", null, this.props.endTime), /* @__PURE__ */ React.createElement("td", null, this.props.description), /* @__PURE__ */ React.createElement("td", null, this.props.duration), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: (e) => this.delete(e)
    }, "Delete")));
  }
  delete(e) {
    this.props.onclick(this.props.activity, this.props.date, this.props.startTime, this.props.endTime, this.props.description, this.props.duration);
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logs: []};
    this.load();
  }
  load() {
    fetch("/read", {
      method: "GET",
      "no-cors": true
    }).then((response) => response.json()).then((json) => {
      this.setState({logs: json});
    });
  }
  delete(evt, activity, date, startTime, endTime, description, duration) {
    const json = {
      activity,
      date,
      startTime,
      endTime,
      description,
      duration
    };
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json2) => {
      console.log(json2);
      this.setState({logs: json2});
    });
  }
  add(evt) {
    const activity = document.querySelector("#activity").value;
    const date = document.querySelector("#date").value;
    const startTime = document.querySelector("#startTime").value;
    const endTime = document.querySelector("#endTime").value;
    const description = document.querySelector("#description").value;
    const json = {
      activity,
      date,
      startTime,
      endTime,
      description,
      duration: time_duration(startTime.toString(), endTime.toString())
    };
    fetch("/add", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json2) => {
      console.log(json2);
      this.setState({logs: json2});
    });
  }
  render() {
    let count = 0;
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement("h1", null, "Activity Logger"), /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("label", null, "Your very own event logger. This is meant to be the opposite of a calendar. Instead of schedule what you WANT to do, you would log in events that have already been done so you have an idea of what you have done throughout the day. Be sure to log all the events that you have done!"), /* @__PURE__ */ React.createElement("label", {
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
    }, " "), /* @__PURE__ */ React.createElement("button", {
      id: "formSubmit",
      onClick: (e) => this.add(e)
    }, "Submit")), /* @__PURE__ */ React.createElement("table", {
      id: "table"
    }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", {
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
    }, "Delete")), this.state.logs.map((log, i) => /* @__PURE__ */ React.createElement(Log, {
      key: i,
      activity: log.activity,
      date: log.date,
      startTime: log.startTime,
      endTime: log.endTime,
      description: log.description,
      duration: log.duration,
      id: (count++).toString(),
      onclick: (e) => this.delete(e, log.activity, log.date, log.startTime, log.endTime, log.description, log.duration)
    }))));
  }
}
function time_duration(start, end) {
  let start_hour = parseInt(start.split(":")[0]);
  let start_min = parseInt(start.split(":")[1]);
  let end_hour = parseInt(end.split(":")[0]);
  let end_min = parseInt(end.split(":")[1]);
  let dur_hour;
  let dur_min;
  if (end_hour > start_hour) {
    if (end_min >= start_min) {
      dur_min = end_min - start_min;
      dur_hour = end_hour - start_hour;
    } else {
      dur_hour = end_hour - start_hour - 1;
      dur_min = end_min + 60 - start_min;
    }
  } else if (end_hour == start_hour) {
    if (end_min >= start_min) {
      dur_min = end_min - start_min;
      dur_hour = 0;
    } else {
      dur_hour = 23;
      dur_min = end_min + 60 - start_min;
    }
  } else {
    if (end_min >= start_min) {
      dur_min = end_min - start_min;
      dur_hour = end_hour + 24 - start_hour;
    } else {
      dur_hour = end_hour + 24 - start_hour - 1;
      dur_min = end_min + 60 - start_min;
    }
  }
  return (dur_hour.toString() + " Hours  " + dur_min.toString() + " Minutes").toString();
}
export default App;
