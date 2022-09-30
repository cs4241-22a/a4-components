import React from "./_snowpack/pkg/react.js";
class Todo extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.name), /* @__PURE__ */ React.createElement("td", null, this.props.length), /* @__PURE__ */ React.createElement("td", null, this.props.elevation), /* @__PURE__ */ React.createElement("td", null, this.props.totallength), /* @__PURE__ */ React.createElement("td", null, this.props.totalelevation));
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {appdata: []};
    this.load();
  }
  load() {
    fetch("/update", {method: "get", "no-cors": true}).then((response) => response.json()).then((json) => {
      this.setState({appdata: json});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement("div", {
      id: "userinput"
    }, /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("label", {
      htmlFor: "trailname"
    }, "Trail name:"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "trailname"
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "traillength"
    }, "Trail length (mi):"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      id: "traillength"
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "trailelevation"
    }, "Trail elevation change (ft):"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      id: "trailelevation"
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      id: "submitbutton",
      onClick: (e) => this.add(e)
    }, "submit"), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      id: "clearbutton",
      onClick: (e) => this.clear(e)
    }, "CLEAR DATA"))), /* @__PURE__ */ React.createElement("div", {
      id: "data"
    }, /* @__PURE__ */ React.createElement("table", {
      id: "datatable"
    }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Trail Name"), /* @__PURE__ */ React.createElement("th", null, "Trail Length (mi)"), /* @__PURE__ */ React.createElement("th", null, "Trail Elevation Gain (ft)"), /* @__PURE__ */ React.createElement("th", null, "Total Length (mi)"), /* @__PURE__ */ React.createElement("th", null, "Total Elevation Change (ft)")), this.state.appdata.map((todo, i) => /* @__PURE__ */ React.createElement(Todo, {
      key: i,
      name: todo.name,
      length: todo.length,
      elevation: todo.elevation,
      totallength: todo.totallength,
      totalelevation: todo.totalelevation
    })))));
  }
  add(evt) {
    const input = {
      name: document.querySelector("#trailname"),
      length: document.querySelector("#traillength"),
      elevation: document.querySelector("#trailelevation"),
      totallength: 0,
      totalelevation: 0
    };
    const json = {
      name: input.name.value,
      length: input.length.value,
      elevation: input.elevation.value,
      totallength: input.totallength.value,
      totalelevation: input.totalelevation.value
    };
    fetch("/add", {
      method: "POST",
      body: JSON.stringify(json),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json2) => {
      this.setState({appdata: json2});
    });
  }
  clear(evt) {
    fetch("/clear", {
      method: "POST"
    }).then((response) => response.json()).then((json) => {
      this.setState({appdata: json});
    });
  }
}
export default App;
