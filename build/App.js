import React from "./_snowpack/pkg/react.js";
class Birthday extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", {
      className: "results"
    }, /* @__PURE__ */ React.createElement("td", null, this.props.firstName), /* @__PURE__ */ React.createElement("td", null, this.props.lastName), /* @__PURE__ */ React.createElement("td", null, this.props.birthday), /* @__PURE__ */ React.createElement("td", null, this.props.daysUntil), /* @__PURE__ */ React.createElement("td", null, this.props.giftIdea), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", {
      id: this.props.submitTime
    }, "Delete")));
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {birthdays: []};
    this.load();
  }
  load() {
    fetch("/birthdays", {method: "get", "no-cors": true}).then((response) => response.json()).then((json) => {
      this.setState({birthdays: json});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h1", null, "Welcome to Birthday Tracker"), /* @__PURE__ */ React.createElement("form", {
      action: ""
    }, /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("label", {
      for: "firstName"
    }, "First Name: ")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "firstName",
      placeholder: "First Name",
      required: true
    }))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("label", {
      for: "lastName"
    }, "Last Name: ")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "lastName",
      placeholder: "Last Name",
      required: true
    }))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("label", {
      for: "birthday"
    }, "Birthday: ")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", {
      type: "date",
      id: "birthday",
      required: true
    }))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("label", {
      for: "giftIdea"
    }, "Gift Idea: ")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "giftIdea",
      placeholder: "Gift Idea",
      required: true
    })))), /* @__PURE__ */ React.createElement("button", {
      id: "submit",
      onClick: this.addBirthday
    }, "Submit")), /* @__PURE__ */ React.createElement("h2", null, "Your List of Saved Birthdays"), /* @__PURE__ */ React.createElement("div", {
      className: "resultsContainer"
    }, /* @__PURE__ */ React.createElement("table", {
      className: "results"
    }, /* @__PURE__ */ React.createElement("tr", {
      className: "results"
    }, /* @__PURE__ */ React.createElement("th", null, "First Name"), /* @__PURE__ */ React.createElement("th", null, "Last Name"), /* @__PURE__ */ React.createElement("th", null, "Birthday"), /* @__PURE__ */ React.createElement("th", null, "Days Until Next Birthday"), /* @__PURE__ */ React.createElement("th", null, "Gift Idea"), /* @__PURE__ */ React.createElement("th", {
      style: {backgroundColor: "black"}
    })), this.state.birthdays.map((birthday, i) => /* @__PURE__ */ React.createElement(Birthday, {
      firstName: birthday.firstName,
      lastName: birthday.lastName,
      birthday: birthday.birthday,
      daysUntil: birthday.daysUntil,
      giftIdea: birthday.giftIdea,
      submitTime: birthday.submitTime
    })))));
  }
  addBirthday(event) {
    event.preventDefault();
    let form = document.querySelector("form");
    if (checkFrmValid()) {
      let submission = getForm();
      form.reset();
      fetch("/submit", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(submission)
      }).then((response) => response.json()).then((json) => {
        this.setState({birthdays: json});
      });
    } else {
      alert("All fields are required. Please fill out all fields before clicking submit.");
    }
  }
  deleteBirthday(event) {
  }
}
function convertToObj(a, b) {
  if (a.length != b.length || a.length == 0 || b.length == 0) {
    return null;
  }
  let obj = {};
  let json = a.forEach((k, i) => {
    obj[k] = b[i];
  });
  return obj;
}
function getForm() {
  let inputIDs = ["#firstName", "#lastName", "#birthday", "#giftIdea"];
  let formLabels = [];
  let formInputs = [];
  for (let index = 0; index < inputIDs.length; index++) {
    let ID = inputIDs[index];
    let input = document.querySelector(`input${ID}`);
    let fieldName = ID.slice(1);
    formLabels.push(fieldName);
    formInputs.push(input.value);
  }
  let table = document.querySelector("table");
  table.focus();
  let json = convertToObj(formLabels, formInputs);
  return json;
}
function checkFrmValid() {
  let inputIDs = ["#firstName", "#lastName", "#birthday", "#giftIdea"];
  let valid = [];
  for (let index = 0; index < inputIDs.length; index++) {
    let ID = inputIDs[index];
    let input = document.querySelector(ID);
    if (input.value === "") {
      valid.push(false);
    } else {
      valid.push(true);
    }
  }
  if (valid.every((value) => value === true)) {
    return true;
  } else {
    return false;
  }
}
export default App;
