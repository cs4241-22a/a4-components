import React from "./_snowpack/pkg/react.js";
class Workout extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", null, this.props.exercise), /* @__PURE__ */ React.createElement("td", null, this.props.sets), /* @__PURE__ */ React.createElement("td", null, this.props.reps), /* @__PURE__ */ React.createElement("td", null, this.props.weight));
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
    }, /* @__PURE__ */ React.createElement("div", {
      clas: "row"
    }, /* @__PURE__ */ React.createElement("h1", {
      class: "text-center text-info"
    }, "Welcome to the Jim"), /* @__PURE__ */ React.createElement("hr", null)), /* @__PURE__ */ React.createElement("div", {
      class: "row"
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
    }, "Get Bigger"))), /* @__PURE__ */ React.createElement("div", {
      class: "row"
    }, /* @__PURE__ */ React.createElement("form", {
      id: "removeForm",
      class: "m-4 form-horizontal"
    }, /* @__PURE__ */ React.createElement("input", {
      id: "exerciseRemove",
      type: "text",
      maxlength: "100",
      placeholder: "Name of exercise"
    }), /* @__PURE__ */ React.createElement("button", {
      type: "submit",
      id: "removeWorkout",
      class: "btn btn-primary btn-sm active",
      onClick: (e) => this.remove(e)
    }, "Get Smaller"))), /* @__PURE__ */ React.createElement("div", {
      class: "row"
    }, /* @__PURE__ */ React.createElement("form", {
      id: "editForm",
      class: "m-4 form-horizontal"
    }, /* @__PURE__ */ React.createElement("input", {
      id: "index",
      type: "text",
      placeholder: "Table Row Number"
    }), /* @__PURE__ */ React.createElement("input", {
      id: "newExercise",
      type: "text",
      maxlength: "100",
      placeholder: "New Exercise Name"
    }), /* @__PURE__ */ React.createElement("input", {
      id: "newSets",
      type: "text",
      maxlength: "10",
      placeholder: "New Sets"
    }), /* @__PURE__ */ React.createElement("input", {
      id: "newReps",
      type: "text",
      maxlength: "10",
      placeholder: "New Reps"
    }), /* @__PURE__ */ React.createElement("input", {
      id: "newWeight",
      type: "text",
      maxlength: "10",
      placeholder: "New Weight"
    }), /* @__PURE__ */ React.createElement("button", {
      type: "submit",
      id: "updateWorkout",
      class: "btn btn-primary btn-sm active",
      onClick: (e) => this.update(e)
    }, "Update"))), /* @__PURE__ */ React.createElement("table", {
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
    if (exercise.value !== "" && sets.value !== "" && reps.value !== "" && weight.value !== "") {
      fetch("/add", {
        method: "POST",
        body: JSON.stringify({exercise: exercise.value, sets: sets.value, reps: reps.value, weight: weight.value}),
        headers: {"Content-Type": "application/json"}
      }).then((response) => response.json()).then((json) => {
        this.setState({workouts: json});
      });
    }
  }
  remove(evt) {
    const exercise = document.getElementById("exerciseRemove");
    fetch("/remove", {
      method: "POST",
      body: JSON.stringify({exercise: exercise.value}),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      this.setState({workouts: json});
    });
  }
  update(evt) {
    const index = document.getElementById("index");
    const exercise = document.getElementById("newExercise");
    const sets = document.getElementById("newSets");
    const reps = document.getElementById("newReps");
    const weight = document.getElementById("newWeight");
    if (index.value !== "" && exercise.value !== "" && sets.value !== "" && reps.value !== "" && weight.value !== "") {
      fetch("/update", {
        method: "POST",
        body: JSON.stringify({index: index.value - 1, exercise: exercise.value, sets: sets.value, reps: reps.value, weight: weight.value}),
        headers: {"Content-Type": "application/json"}
      }).then((response) => response.json()).then((json) => {
        this.setState({workouts: json});
      });
    }
  }
}
export default App;
