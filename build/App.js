import React from "./_snowpack/pkg/react.js";
class CalendarRow extends React.Component {
  render() {
    let label = "";
    if (this.props.time === 0)
      label = "12 AM";
    else if (this.props.time <= 12)
      label = "" + this.props.time + " AM";
    else
      label = "" + (this.props.time - 12) + " PM";
    let bgcolor = this.props.bgcolor;
    let color = this.props.color;
    let text = this.props.text;
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, label), /* @__PURE__ */ React.createElement("td", {
      bgcolor: bgcolor[0],
      color: color[0]
    }, text[0]), /* @__PURE__ */ React.createElement("td", {
      bgcolor: bgcolor[1],
      color: color[1]
    }, text[1]), /* @__PURE__ */ React.createElement("td", {
      bgcolor: bgcolor[2],
      color: color[2]
    }, text[2]), /* @__PURE__ */ React.createElement("td", {
      bgcolor: bgcolor[3],
      color: color[3]
    }, text[3]), /* @__PURE__ */ React.createElement("td", {
      bgcolor: bgcolor[4],
      color: color[4]
    }, text[4]), /* @__PURE__ */ React.createElement("td", {
      bgcolor: bgcolor[5],
      color: color[5]
    }, text[5]), /* @__PURE__ */ React.createElement("td", {
      bgcolor: bgcolor[6],
      color: color[6]
    }, text[6]));
  }
}
class Calendar extends React.Component {
  render() {
    let appdata = this.props.appdata;
    let textmatrix = [[]];
    let textcolormatrix = [[]];
    let bgcolormatrix = [[]];
    for (let i = 0; i < 24; i++) {
      textmatrix.push([]);
      textcolormatrix.push([]);
      bgcolormatrix.push([]);
      for (let j = 0; j < 7; j++) {
        textmatrix[i].push("");
        textcolormatrix[i].push("");
        bgcolormatrix[i].push("");
        for (let z = 0; z < appdata.length; z++) {
          const event = Object.values(appdata[z]);
          if (event.length < 3) {
            console.log(event);
            continue;
          }
          const name = event[0];
          const days = event[2];
          const start = event[3];
          const end = event[4];
          const color = event[6];
          const _days = "mtwrfsu";
          if (days.includes(_days.charAt(j))) {
            if (i < end && i >= start) {
              textmatrix[i][j] = name;
              textcolormatrix[i][j] = "white";
              bgcolormatrix[i][j] = color;
            }
          }
        }
      }
    }
    const rows = [];
    for (let i = 0; i < 24; i++) {
      rows.push(/* @__PURE__ */ React.createElement(CalendarRow, {
        key: i,
        time: i,
        text: textmatrix[i],
        color: textcolormatrix[i],
        bgcolor: bgcolormatrix[i]
      }));
    }
    console.log(rows[1]);
    return /* @__PURE__ */ React.createElement("tbody", null, rows);
  }
}
class TableRow extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.eventname), /* @__PURE__ */ React.createElement("td", null, this.props.location), /* @__PURE__ */ React.createElement("td", null, this.props.day), /* @__PURE__ */ React.createElement("td", null, this.props.time), /* @__PURE__ */ React.createElement("td", null, this.props.timeend), /* @__PURE__ */ React.createElement("td", null, this.props.duration), /* @__PURE__ */ React.createElement("td", null, this.props.color), /* @__PURE__ */ React.createElement("td", null, this.props.details));
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {appdata: []};
    this.updatedata.bind(this);
    window.appState = this;
    this.updatedata();
  }
  updatedata() {
    let outerthis = this;
    fetch("/getsch", {
      method: "GET"
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      outerthis.setState({appdata: data});
      console.log(outerthis.state);
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "wrapper"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "top"
    }, /* @__PURE__ */ React.createElement("h1", null, "Weekly Schedule App"), /* @__PURE__ */ React.createElement("details", {
      open: true,
      className: "top"
    }, /* @__PURE__ */ React.createElement("summary", null, "Calendar"), /* @__PURE__ */ React.createElement("table", {
      id: "calendarTable"
    }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Time"), /* @__PURE__ */ React.createElement("th", null, "Monday"), /* @__PURE__ */ React.createElement("th", null, "Tuesday"), /* @__PURE__ */ React.createElement("th", null, "Wednesday"), /* @__PURE__ */ React.createElement("th", null, "Thursday"), /* @__PURE__ */ React.createElement("th", null, "Friday"), /* @__PURE__ */ React.createElement("th", null, "Starurday"), /* @__PURE__ */ React.createElement("th", null, "Sunday")), /* @__PURE__ */ React.createElement(Calendar, {
      appdata: this.state.appdata
    }))), /* @__PURE__ */ React.createElement("br", null)), /* @__PURE__ */ React.createElement("details", {
      className: "mid"
    }, /* @__PURE__ */ React.createElement("summary", null, "Table View"), /* @__PURE__ */ React.createElement("table", {
      id: "tableViewTable"
    }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Event Name"), /* @__PURE__ */ React.createElement("th", null, "Location"), /* @__PURE__ */ React.createElement("th", null, "Day(s)"), /* @__PURE__ */ React.createElement("th", null, "Start Time (Military)"), /* @__PURE__ */ React.createElement("th", null, "End Time (Military)"), /* @__PURE__ */ React.createElement("th", null, "Duration (Hours)"), /* @__PURE__ */ React.createElement("th", null, "Color"), /* @__PURE__ */ React.createElement("th", null, "Details")), this.state.appdata.map((event) => /* @__PURE__ */ React.createElement(TableRow, {
      eventname: event.eventname,
      location: event.location,
      day: event.day,
      time: event.time,
      timeend: event.timeend,
      duration: event.duration,
      color: event.color,
      details: event.details
    })))), /* @__PURE__ */ React.createElement("details", {
      id: "neweventdetails",
      className: "botleft"
    }, /* @__PURE__ */ React.createElement("summary", null, "Add New Event..."), /* @__PURE__ */ React.createElement("form", {
      id: "EditForm",
      action: "none"
    }, /* @__PURE__ */ React.createElement("label", {
      for: "ename"
    }, "Event Name:"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "ename",
      name: "ename",
      required: true,
      onChange: this.handleValueChangeName
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      for: "eloc"
    }, "Location:"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "eloc",
      name: "eloc",
      onChange: this.handleValueChangeLoc
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      for: "m"
    }, "M:"), /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      id: "m",
      name: "m",
      onChange: this.handleValueChangeM
    }), /* @__PURE__ */ React.createElement("label", {
      for: "t"
    }, "T:"), /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      id: "t",
      name: "t",
      onChange: this.handleValueChangeT
    }), /* @__PURE__ */ React.createElement("label", {
      for: "w"
    }, "W:"), /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      id: "w",
      name: "w",
      onChange: this.handleValueChangeW
    }), /* @__PURE__ */ React.createElement("label", {
      for: "r"
    }, "R:"), /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      id: "r",
      name: "r",
      onChange: this.handleValueChangeR
    }), /* @__PURE__ */ React.createElement("label", {
      for: "f"
    }, "F:"), /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      id: "f",
      name: "f",
      onChange: this.handleValueChangeF
    }), /* @__PURE__ */ React.createElement("label", {
      for: "s"
    }, "S:"), /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      id: "s",
      name: "s",
      onChange: this.handleValueChangeS
    }), /* @__PURE__ */ React.createElement("label", {
      for: "u"
    }, "U:"), /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      id: "u",
      name: "u",
      onChange: this.handleValueChangeU
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      for: "etimestart"
    }, "Event Start Time (0 - 23):"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      id: "etimestart",
      name: "etimestart",
      onChange: this.handleValueChangeTime,
      required: true,
      min: "0",
      max: "23"
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      for: "etimeend"
    }, "Event End Time (0 - 23):"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      id: "etimeend",
      name: "etimeend",
      onChange: this.handleValueChangeTimeEnd,
      required: true,
      min: "0",
      max: "23"
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", null, "Duration: "), /* @__PURE__ */ React.createElement("label", {
      id: "eduration"
    }, "0"), /* @__PURE__ */ React.createElement("label", null, " hours"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      for: "ecolor"
    }, "Color:"), /* @__PURE__ */ React.createElement("input", {
      type: "color",
      id: "ecolor",
      name: "ecolor",
      onChange: this.handleValueChangeColor
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      for: "edetails"
    }, "Details:"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "edetails",
      name: "edetails",
      onChange: this.handleValueChangeDuration
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
      id: "ecancel",
      onClick: (e) => this.cancel(e)
    }, "Cancel"), /* @__PURE__ */ React.createElement("button", {
      id: "ereset",
      onClick: (e) => this.clear(e)
    }, "Clear"), /* @__PURE__ */ React.createElement("button", {
      id: "esubmit",
      onClick: (e) => this.add(e)
    }, "Submit"))), /* @__PURE__ */ React.createElement("details", {
      id: "deleventdetails",
      className: "botcent"
    }, /* @__PURE__ */ React.createElement("summary", null, "Delete an Event..."), /* @__PURE__ */ React.createElement("button", {
      id: "removeEvent",
      display: "block",
      onClick: (e) => this.remove(e)
    }, " Delete Event: "), " ", /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "delname",
      name: "delname",
      onChange: this.handleValueChangeDel
    })), /* @__PURE__ */ React.createElement("details", {
      id: "clreventdetails",
      className: "botrigt"
    }, /* @__PURE__ */ React.createElement("summary", null, "Delete all Events..."), /* @__PURE__ */ React.createElement("button", {
      id: "clearEvents",
      display: "block",
      onClick: (e) => this.removeall(e)
    }, "Delete all events"))));
  }
  add(e) {
    let outerthis = this;
    e.preventDefault();
    let Form = document.getElementById("EditForm");
    if (Form.checkValidity() == false) {
      let list = Form.querySelectorAll(":invalid");
      for (let item of list) {
        window.alert("Please enter valid value");
        item.focus();
        break;
      }
    } else {
      const input1 = this.state.name;
      let input2 = this.state.loc;
      if (!input2)
        input2 = "";
      let input3 = "";
      const days = "mtwrfsu";
      const states = [this.state.m, this.state.t, this.state.w, this.state.r, this.state.f, this.state.s, this.state.u];
      for (var i = 0; i < days.length; i++) {
        if (states[i] === "on")
          input3 += days.charAt(i);
      }
      const input4 = this.state.time;
      const input5 = this.state.timeend;
      let input6 = this.state.color;
      if (!input6)
        input6 = "";
      const input7 = this.state.details;
      const json = {eventname: input1, location: input2, day: input3, time: input4, timeend: input5, duration: input5 - input4, color: input6, details: input7};
      const body = JSON.stringify(json);
      fetch("/new", {
        method: "POST",
        body
      }).then(function(response) {
        outerthis.updatedata();
        document.getElementById("EditForm").reset();
        outerthis.setState({m: "off"});
        outerthis.setState({t: "off"});
        outerthis.setState({w: "off"});
        outerthis.setState({r: "off"});
        outerthis.setState({f: "off"});
        outerthis.setState({s: "off"});
        outerthis.setState({u: "off"});
      });
    }
    return false;
  }
  clear(e) {
    e.preventDefault();
    document.getElementById("EditForm").reset();
  }
  cancel(e) {
    e.preventDefault();
    document.getElementById("EditForm").reset();
    document.getElementById("neweventdetails").removeAttribute("open");
  }
  remove(e) {
    e.preventDefault();
    let outerthis = this;
    let str = this.state.del;
    if (str !== "" && str !== null) {
      let j = {name: str};
      let body = JSON.stringify(j);
      fetch("/del", {
        method: "POST",
        body
      }).then(function(response) {
        outerthis.updatedata();
        document.getElementById("delname").value = "";
      });
    }
  }
  removeall(e) {
    e.preventDefault();
    let outerthis = this;
    document.getElementById("clreventdetails").removeAttribute("open");
    let body = "";
    fetch("/clr", {
      method: "POST",
      body
    }).then(function(response) {
      outerthis.updatedata();
    });
  }
  handleValueChangeM = (e) => {
    this.setState({
      m: e.target.value
    });
  };
  handleValueChangeT = (e) => {
    this.setState({
      t: e.target.value
    });
  };
  handleValueChangeW = (e) => {
    this.setState({
      w: e.target.value
    });
  };
  handleValueChangeR = (e) => {
    this.setState({
      r: e.target.value
    });
  };
  handleValueChangeF = (e) => {
    this.setState({
      f: e.target.value
    });
  };
  handleValueChangeS = (e) => {
    this.setState({
      s: e.target.value
    });
  };
  handleValueChangeU = (e) => {
    this.setState({
      u: e.target.value
    });
  };
  handleValueChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  };
  handleValueChangeLoc = (e) => {
    this.setState({
      loc: e.target.value
    });
  };
  handleValueChangeTime = (e) => {
    this.setState({
      time: e.target.value
    });
  };
  handleValueChangeTimeEnd = (e) => {
    this.setState({
      timeend: e.target.value
    });
  };
  handleValueChangeColor = (e) => {
    this.setState({
      color: e.target.value
    });
  };
  handleValueChangeDetails = (e) => {
    this.setState({
      details: e.target.value
    });
  };
  handleValueChangeDel = (e) => {
    this.setState({
      del: e.target.value
    });
  };
}
export default App;
