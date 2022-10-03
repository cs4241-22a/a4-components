import React from "./_snowpack/pkg/react.js";
import "./index.css.proxy.js";
import uuidv4 from "./_snowpack/pkg/uuidv4.js";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: "My TV show", seasons: 5, eps: 10, duration: 45, errors: ""};
  }
  render() {
    return /* @__PURE__ */ React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /* @__PURE__ */ React.createElement("h1", null, "TV Show Tracker"), /* @__PURE__ */ React.createElement("fieldset", null, /* @__PURE__ */ React.createElement("span", {
      className: "formLabel"
    }, "TV show name"), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      key: "show",
      id: "show",
      value: this.state.show,
      onChange: this.showHandler
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "formLabel"
    }, "Number of seasons"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      key: "seasons",
      id: "seasons",
      min: "1",
      value: this.state.seasons,
      onChange: this.seasonsHandler
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "formLabel"
    }, "Episodes per season"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      key: "episodes",
      id: "episodes",
      min: "1",
      value: this.state.eps,
      onChange: this.epHandler
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
      className: "formLabel"
    }, "Duration of an episode (minutes)"), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      key: "duration",
      id: "duration",
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
  showHandler = (event) => {
    this.setState((state) => ({
      show: event.target.value,
      seasons: state.seasons,
      eps: state.eps,
      duration: state.duration
    }));
  };
  seasonsHandler = (event) => {
    this.setState((state) => ({
      show: state.show,
      seasons: event.target.value,
      eps: state.eps,
      duration: state.duration
    }));
  };
  epHandler = (event) => {
    this.setState((state) => ({
      show: state.show,
      seasons: state.seasons,
      eps: event.target.value,
      duration: state.duration
    }));
  };
  durationHandler = (event) => {
    this.setState((state) => ({
      show: state.show,
      seasons: state.seasons,
      eps: state.eps,
      duration: event.target.value
    }));
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.show == "" || this.state.seasons == "" || this.state.eps == "" || this.state.duration == "") {
      setErrors("Form fields cannot be null");
    } else {
      this.props.add(this.state.show, this.state.seasons, this.state.eps, this.state.duration);
      this.setState({show: "", seasons: "", eps: "", duration: "", errors: ""});
    }
  };
}
class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("Rendering table");
    console.log(this.props.shows);
    return /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "TV Show"), /* @__PURE__ */ React.createElement("th", null, "Seasons"), /* @__PURE__ */ React.createElement("th", null, "Episodes Per Season"), /* @__PURE__ */ React.createElement("th", null, "Duration of an Episode (mins)"), /* @__PURE__ */ React.createElement("th", null, "Time Needed to Binge-Watch Full Show"), /* @__PURE__ */ React.createElement("th", null)), this.props.shows.map((item) => /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, item.show), /* @__PURE__ */ React.createElement("td", null, item.seasons), /* @__PURE__ */ React.createElement("td", null, item.episodes), /* @__PURE__ */ React.createElement("td", null, item.duration), /* @__PURE__ */ React.createElement("td", null, item.totalTime), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("button", null, "Remove Entry"))))));
  }
  componentWillReceiveProps(props) {
    console.log("New props:");
    console.log(props);
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [
        {
          show: "Dummy Show",
          seasons: 5,
          eps: 13,
          duration: 45,
          key: "iAmAUniqueId"
        },
        {
          show: "Dummy Show",
          seasons: 7,
          eps: 24,
          duration: 60,
          key: "iAmAnotherUniqueId"
        }
      ]
    };
    this.load();
  }
  add = (show, seasons, eps, duration) => {
    console.log("Adding");
    const json = {
      show,
      seasons,
      eps,
      duration,
      key: uuidv4()
    };
    const body = JSON.stringify(json);
    console.log(body);
    fetch("/add", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body
    }).then((response) => {
      let res = response.json();
      const checkPromise = () => {
        res.then((result) => {
          console.log(result);
          console.log("Type of result " + typeof result);
          this.setState({shows: result});
          console.log("State has been set to:");
          console.log(this.state.shows);
        }).catch((err) => {
          console.error("Error: " + err);
        });
      };
      checkPromise();
    });
  };
  remove = (entryId) => {
    let json = null;
    for (let i = 0; i < this.state.shows.length; i++) {
      if (this.state.shows[i].key === entryId) {
        json = this.state.shows[i];
      }
    }
    const body = JSON.stringify(json);
    fetch("/remove", {
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
          this.setState({shows: result});
          console.log("State has been set to:");
          console.log(this.state.shows);
        }).catch((err) => {
          console.error("Error: " + err);
        });
      };
      checkPromise();
    });
    return false;
  };
  render() {
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
      this.setState({shows: json});
    });
  }
}
export default App;
