import React from "./_snowpack/pkg/react.js";
import "./index.css.proxy.js";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: "My TV show", seasons: 5, eps: 10, duration: 45, errors: ""};
  }
  render() {
    console.log("Rendering Form");
    return /* @__PURE__ */ React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /* @__PURE__ */ React.createElement("h1", null, "TV Show Tracker"), /* @__PURE__ */ React.createElement("fieldset", null, /* @__PURE__ */ React.createElement("span", {
      className: "formLabel"
    }, "TV show name"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      key: "show",
      value: this.state.show,
      onChange: this.showHandler
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "formLabel"
    }, "Number of seasons"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      key: "seasons",
      min: "1",
      value: this.state.seasons,
      onChange: this.seasonsHandler
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "formLabel"
    }, "Episodes per season"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      key: "episodes",
      min: "1",
      value: this.state.eps,
      onChange: this.epHandler
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "formLabel"
    }, "Duration of an episode (minutes)"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      key: "duration",
      min: "1",
      value: this.state.duration,
      onChange: this.durationHandler
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      style: {color: "red"}
    }, this.state.errors), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
      id: "submit",
      type: "submit",
      key: "submit"
    }, "Submit")));
  }
  showHandler(event) {
    this.setState({...prevState, show: event.target.value});
  }
  seasonsHandler(event) {
    this.setState({...prevState, seasons: event.target.value});
  }
  epHandler(event) {
    this.setState({...prevState, eps: event.target.value});
  }
  durationHandler(event) {
    this.setState({...prevState, duration: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    if (document.querySelector("show").value == "" || document.querySelector("seasons").value == "" || document.querySelector("eps").value == "" || document.querySelector("duration").value == "") {
      setErrors("Form fields cannot be null");
    } else {
      this.props.add(this.state.show, this.state.seasons, this.state.eps, this.state.duration);
      this.setState({show: "", seasons: "", eps: "", duration: "", errors: ""});
    }
  }
}
class Table extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    console.log("Rendering Table");
    return /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "TV Show"), /* @__PURE__ */ React.createElement("th", null, "Seasons"), /* @__PURE__ */ React.createElement("th", null, "Episodes Per Season"), /* @__PURE__ */ React.createElement("th", null, "Duration of an Episode (mins)"), /* @__PURE__ */ React.createElement("th", null, "Time Needed to Binge-Watch Full Show"), /* @__PURE__ */ React.createElement("th", null)), this.props.shows.map((item) => /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, item.show), /* @__PURE__ */ React.createElement("td", null, item.seasons), /* @__PURE__ */ React.createElement("td", null, item.episodes), /* @__PURE__ */ React.createElement("td", null, item.duration), /* @__PURE__ */ React.createElement("td", null, item.totalTime), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", null, "Remove Entry"))))));
  }
}
class App extends React.Component {
  constructor(props) {
    console.log("App constructing");
    super(props);
    this.state = {
      shows: [
        {
          show: "Dummy Show",
          seasons: 5,
          eps: 13,
          duration: 45,
          uuid: "iAmAUniqueId"
        },
        {
          show: "Dummy Show",
          seasons: 7,
          eps: 24,
          duration: 60,
          uuid: "iAmAnotherUniqueId"
        }
      ]
    };
    this.load();
  }
  add(evt) {
    const json = {
      show: document.querySelector("show").value,
      seasons: document.querySelector("seasons").value,
      eps: document.querySelector("eps").value,
      duration: document.querySelector("duration").value,
      key: uuidv4()
    };
    const body = JSON.stringify(json);
    fetch("http://localhost:9000/add", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body
    }).then(function(response) {
      let res = response.json();
      const checkPromise = () => {
        res.then((result) => {
          console.log(result);
        }).catch((err) => {
          console.error("Error: " + err);
        });
      };
      checkPromise();
    });
  }
  remove(entryId) {
    let json = null;
    for (let i = 0; i < showList.length; i++) {
      if (showList[i].key === entryId) {
        json = showList[i];
      }
    }
    const body = JSON.stringify(json);
    fetch("http://localhost:9000/remove", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body
    }).then(function(response) {
      let res = response.json();
      const checkPromise = () => {
        res.then((result) => {
          console.log(result);
        }).catch((err) => {
          console.error("Error: " + err);
        });
      };
      checkPromise();
    });
    return false;
  }
  render() {
    console.log("Rendering App");
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement(Form, {
      add: this.add
    }), /* @__PURE__ */ React.createElement(Table, {
      shows: this.state.shows,
      remove: this.remove
    }));
  }
  load() {
    fetch("/read", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((json) => {
      console.log("Data received");
      this.setState({shows: json});
    });
  }
}
export default App;
