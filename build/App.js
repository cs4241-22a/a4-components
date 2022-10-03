import React from "./_snowpack/pkg/react.js";
import "./style.css.proxy.js";
class Assignment extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.title), /* @__PURE__ */ React.createElement("td", null, this.props.subject), /* @__PURE__ */ React.createElement("td", null, this.props.deadline), /* @__PURE__ */ React.createElement("td", null, this.props.priority), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", {
      onClick: this.deleteWrap(this)
    }, "Delete")));
  }
  deleteWrap(etn) {
    return function() {
      etn.props.deleteClick(etn.props.title, etn.props.subject, etn.props.deadline, etn.props.priority);
    };
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {assignments: []};
    this.load();
    window.appState = this;
  }
  load() {
    fetch("/read", {method: "get", "no-cors": true}).then((response) => response.json()).then((json) => {
      this.setState({assignments: json});
    });
  }
  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };
  handleSubjectChange = (e) => {
    this.setState({
      subject: e.target.value
    });
  };
  handleDeadlineChange = (e) => {
    this.setState({
      deadline: e.target.value
    });
  };
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement("h1", null, "Assignment Tracker"), /* @__PURE__ */ React.createElement("div", {
      class: "flex-container"
    }, /* @__PURE__ */ React.createElement("div", {
      style: {width: "60%"}
    }, /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Assignment"), /* @__PURE__ */ React.createElement("th", null, "Subject"), /* @__PURE__ */ React.createElement("th", null, "Deadline"), /* @__PURE__ */ React.createElement("th", null, "Priority"), /* @__PURE__ */ React.createElement("th", null, "Delete"))), /* @__PURE__ */ React.createElement("tbody", null, this.state.assignments.map((assignment, i) => /* @__PURE__ */ React.createElement(Assignment, {
      key: i,
      title: assignment.title,
      subject: assignment.subject,
      deadline: assignment.deadline,
      priority: assignment.priority,
      deleteClick: this.delete
    }))))), /* @__PURE__ */ React.createElement("div", {
      style: {width: "40%"}
    }, /* @__PURE__ */ React.createElement("form", {
      autocomplete: "off",
      id: "form"
    }, /* @__PURE__ */ React.createElement("h2", null, "Add Assignment"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", {
      for: "title",
      class: "Labels"
    }, "Assignment: ", " "), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "title",
      placeholder: "Title",
      class: "Inputs",
      onChange: this.handleTitleChange
    })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", {
      for: "subject",
      class: "Labels"
    }, "Subject: ", " "), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "subject",
      placeholder: "Subject",
      class: "Inputs",
      onChange: this.handleSubjectChange
    })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", {
      for: "deadline",
      class: "Labels"
    }, "Deadline: ", " "), /* @__PURE__ */ React.createElement("input", {
      type: "date",
      id: "deadline",
      placeholder: "Deadline",
      class: "Inputs",
      onChange: this.handleDeadlineChange
    })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.add(e)
    }, "Submit"))))));
  }
  add(evt) {
    const form = document.querySelector("form").value;
    console.log(evt);
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        subject: this.state.subject,
        deadline: this.state.deadline
      }),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      console.log(json);
      this.setState({assignments: json});
    });
  }
  delete(title, subject, deadline, priority) {
    const json = {
      title,
      subject,
      deadline,
      priority
    }, body = JSON.stringify(json);
    fetch("/delete", {
      method: "POST",
      body,
      headers: {"Content-Type": "application/json"},
      "no-cors": true
    }).then((response) => response.json()).then((body2) => {
      console.log(json);
      window.appState.setState({assignments: body2});
    });
  }
}
export default App;
