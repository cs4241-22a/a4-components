import React from "./_snowpack/pkg/react.js";
class Workout extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.exercise), /* @__PURE__ */ React.createElement("td", null, this.props.sets), /* @__PURE__ */ React.createElement("td", null, this.props.reps), /* @__PURE__ */ React.createElement("td", null, this.props.weight), /* @__PURE__ */ React.createElement("button", {
      onClick: () => this.remove(this.props)
    }, "Remove"));
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {workouts: []};
    this.load();
  }
  load() {
    fetch("/read", {method: "get", "no-cors": true}).then((response) => response.json()).then((json) => {
      this.setState({workouts: json});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement("form", {
      id: "addForm",
      class: "m-4 form-horizontal"
    }, /* @__PURE__ */ React.createElement("input", {
      id: "exercise",
      type: "text",
      maxlength: "100",
      placeholder: "Name of exercise"
    }), /* @__PURE__ */ React.createElement("input", {
      id: "sets",
      type: "text",
      maxlength: "10",
      placeholder: "Sets"
    }), /* @__PURE__ */ React.createElement("input", {
      id: "reps",
      type: "text",
      maxlength: "10",
      placeholder: "Reps"
    }), /* @__PURE__ */ React.createElement("input", {
      id: "weight",
      type: "text",
      maxlength: "10",
      placeholder: "Weight"
    }), /* @__PURE__ */ React.createElement("button", {
      type: "submit",
      id: "addWorkout",
      class: "btn btn-primary btn-sm active",
      onClick: (e) => this.add(e)
    }, "Get Bigger")), /* @__PURE__ */ React.createElement("table", {
      class: "table table-hover"
    }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Exercise"), /* @__PURE__ */ React.createElement("th", null, "Sets"), /* @__PURE__ */ React.createElement("th", null, "Reps"), /* @__PURE__ */ React.createElement("th", null, "Weight"), /* @__PURE__ */ React.createElement("th", null), /* @__PURE__ */ React.createElement("th", null))), /* @__PURE__ */ React.createElement("tbody", null, this.state.workouts.map((workout, i) => /* @__PURE__ */ React.createElement(Workout, {
      key: i,
      exercise: workout.exercise,
      sets: workout.sets,
      reps: workout.reps,
      weight: workout.weight
    })))));
  }
  toggle(name, completed) {
    fetch("/change", {
      method: "POST",
      body: JSON.stringify({name, completed}),
      headers: {"Content-Type": "application/json"}
    });
  }
  add(evt) {
    const exercise = document.getElementById("exercise");
    const sets = document.getElementById("sets");
    const reps = document.getElementById("reps");
    const weight = document.getElementById("weight");
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({exercise: exercise.value, sets: sets.value, reps: reps.value, weight: weight.value}),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      this.setState({workouts: json});
    });
  }
  remove(props) {
    fetch("remove", {
      method: "POST",
      body: props,
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      this.setState({workouts: json});
    });
  }
}
export default App;
