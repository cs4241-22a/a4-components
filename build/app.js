import React from "./_snowpack/pkg/react.js";
import "./style.css.proxy.js";
class Date extends React.Component {
  render() {
    const year = this.props.year;
    const month = this.props.month;
    const day = this.props.day;
    const dateString = year + "-" + month + "-" + day;
    const yearsPast = getAge(dateString);
    return /* @__PURE__ */ React.createElement("li", null, month, " ", day, ", ", year, " was ", yearsPast, " years ago");
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      months: [],
      days: [],
      years: []
    };
    this.load();
  }
  load() {
    fetch("/read", {method: "get", "no-cors": true}).then((response) => response.json()).then((json) => {
      this.setState({months: json.month, days: json.day, years: json.year});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Save the date!"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "month",
      placeholder: "month"
    }), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "day",
      placeholder: "day"
    }), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "year",
      placeholder: "year"
    }), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.add(e),
      id: "button"
    }, "Submit"), /* @__PURE__ */ React.createElement("p", null, "Here are your dates:"), /* @__PURE__ */ React.createElement("ul", null, this.state.months?.map((month, i) => /* @__PURE__ */ React.createElement(Date, {
      key: i,
      month: month.month
    }))));
  }
  add(evt) {
    const month = document.querySelector("#month").value;
    const day = document.querySelector("#day").value;
    const year = document.querySelector("#year").value;
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({month, day, year}),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      this.setState({months: json.months});
      this.setState({days: json.day});
      this.setState({years: json.year});
    });
  }
}
function getAge(dateString) {
  var ageInMS = new Date() - new Date(dateString);
  return Math.floor(ageInMS / 1e3 / 60 / 60 / 24 / 365);
}
export default App;
