import React from "./_snowpack/pkg/react.js";
import "./uikit-3.15.9/css/uikit.min.css.proxy.js";
import "./style.css.proxy.js";
import pikachu from "./images/pikachu.jpg.proxy.js";
import vaporeon from "./images/vaporeon.jpg.proxy.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemon: []};
    this.load();
  }
  load = () => {
    console.log("getting data");
    fetch("/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((json) => {
      this.setState({pokemon: json});
      console.log(this.state.pokemon);
    });
  };
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", {
      className: "uk-section-small"
    }, /* @__PURE__ */ React.createElement("header", {
      className: "uk-flex uk-flex-around"
    }, /* @__PURE__ */ React.createElement("img", {
      className: "uk-height-small uk-align-left",
      src: pikachu,
      alt: "Pikachu",
      "data-uk-img": true
    }), /* @__PURE__ */ React.createElement("h1", {
      className: "uk-heading-medium uk-heading-divider"
    }, "Create your own Pokemon!"), /* @__PURE__ */ React.createElement("img", {
      className: "uk-height-small uk-align-right",
      src: vaporeon,
      alt: "Vaporeon",
      "data-uk-img": true
    }))), /* @__PURE__ */ React.createElement("section", {
      className: "uk-section-small uk-width-large uk-align-center uk-margin-small"
    }, /* @__PURE__ */ React.createElement("h2", {
      className: "uk-modal-title"
    }, "How to use this application"), /* @__PURE__ */ React.createElement("p", null, "Create a pokemon by submitting the form below"), /* @__PURE__ */ React.createElement("p", null, "Edit a pokemon by submitting the form with the same name as the pokemon you want to edit"), /* @__PURE__ */ React.createElement("p", null, "Delete a pokemon by clicking it in the table below")), /* @__PURE__ */ React.createElement("section", {
      className: "uk-width-large uk-align-center uk-margin-small"
    }, /* @__PURE__ */ React.createElement(Form, {
      load: this.load
    })), /* @__PURE__ */ React.createElement("h2", null, "Pokemon List"), /* @__PURE__ */ React.createElement("table", {
      id: "table",
      className: "uk-table"
    }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", {
      className: "hrow"
    }, /* @__PURE__ */ React.createElement("th", null, "Name"), /* @__PURE__ */ React.createElement("th", null, "Description"), /* @__PURE__ */ React.createElement("th", null, "1st Type"), /* @__PURE__ */ React.createElement("th", null, "2nd Type"), /* @__PURE__ */ React.createElement("th", null, "Weaknesses"), /* @__PURE__ */ React.createElement("th", null, "Resistances"), /* @__PURE__ */ React.createElement("th", null, "Immunities"))), /* @__PURE__ */ React.createElement("tbody", null, this.state.pokemon.map((pokemon) => /* @__PURE__ */ React.createElement(Pokemon, {
      key: pokemon._id,
      name: pokemon.name,
      description: pokemon.description,
      type1: pokemon.type1,
      type2: pokemon.type2,
      weaknesses: pokemon.weaknesses,
      resistances: pokemon.resistances,
      immunities: pokemon.immunities,
      load: this.load
    })))));
  }
}
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      type1: "",
      type2: "None"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
    this.props.load();
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("form", {
      className: "uk-form-horizontal",
      id: "form",
      onSubmit: this.handleSubmit
    }, /* @__PURE__ */ React.createElement("label", {
      className: "uk-form-label",
      htmlFor: "name"
    }, "What is your Pokemon's name?"), /* @__PURE__ */ React.createElement("section", {
      className: "uk-margin uk-form-controls"
    }, /* @__PURE__ */ React.createElement("input", {
      value: this.state.name,
      onChange: this.handleChange,
      className: "uk-input",
      type: "text",
      name: "name",
      maxLength: "20",
      required: true
    })), /* @__PURE__ */ React.createElement("label", {
      className: "uk-form-label",
      htmlFor: "description"
    }, "Describe your Pokemon"), /* @__PURE__ */ React.createElement("section", {
      className: "uk-margin uk-form-controls"
    }, /* @__PURE__ */ React.createElement("textarea", {
      value: this.state.description,
      onChange: this.handleChange,
      className: "uk-textarea",
      name: "description"
    })), /* @__PURE__ */ React.createElement("label", {
      className: "uk-form-label"
    }, "Choose your Pokemon's types"), /* @__PURE__ */ React.createElement("section", {
      className: "uk-margin uk-form-controls"
    }, /* @__PURE__ */ React.createElement("select", {
      value: this.state.type1,
      onChange: this.handleChange,
      className: "uk-select",
      name: "type1",
      id: "type1",
      required: true
    }, /* @__PURE__ */ React.createElement("option", {
      value: ""
    }, "Choose a type"), /* @__PURE__ */ React.createElement("option", {
      value: "Normal"
    }, "Normal"), /* @__PURE__ */ React.createElement("option", {
      value: "Fighting"
    }, "Fighting"), /* @__PURE__ */ React.createElement("option", {
      value: "Flying"
    }, "Flying"), /* @__PURE__ */ React.createElement("option", {
      value: "Poison"
    }, "Poison"), /* @__PURE__ */ React.createElement("option", {
      value: "Ground"
    }, "Ground"), /* @__PURE__ */ React.createElement("option", {
      value: "Rock"
    }, "Rock"), /* @__PURE__ */ React.createElement("option", {
      value: "Bug"
    }, "Bug"), /* @__PURE__ */ React.createElement("option", {
      value: "Ghost"
    }, "Ghost"), /* @__PURE__ */ React.createElement("option", {
      value: "Steel"
    }, "Steel"), /* @__PURE__ */ React.createElement("option", {
      value: "Fire"
    }, "Fire"), /* @__PURE__ */ React.createElement("option", {
      value: "Water"
    }, "Water"), /* @__PURE__ */ React.createElement("option", {
      value: "Grass"
    }, "Grass"), /* @__PURE__ */ React.createElement("option", {
      value: "Electric"
    }, "Electric"), /* @__PURE__ */ React.createElement("option", {
      value: "Psychic"
    }, "Psychic"), /* @__PURE__ */ React.createElement("option", {
      value: "Ice"
    }, "Ice"), /* @__PURE__ */ React.createElement("option", {
      value: "Dragon"
    }, "Dragon"), /* @__PURE__ */ React.createElement("option", {
      value: "Dark"
    }, "Dark"), /* @__PURE__ */ React.createElement("option", {
      value: "Fairy"
    }, "Fairy")), /* @__PURE__ */ React.createElement("select", {
      value: this.state.type2,
      onChange: this.handleChange,
      className: "uk-select",
      name: "type2",
      id: "type2"
    }, /* @__PURE__ */ React.createElement("option", {
      value: "None"
    }, "None"), /* @__PURE__ */ React.createElement("option", {
      value: "Normal"
    }, "Normal"), /* @__PURE__ */ React.createElement("option", {
      value: "Fighting"
    }, "Fighting"), /* @__PURE__ */ React.createElement("option", {
      value: "Flying"
    }, "Flying"), /* @__PURE__ */ React.createElement("option", {
      value: "Poison"
    }, "Poison"), /* @__PURE__ */ React.createElement("option", {
      value: "Ground"
    }, "Ground"), /* @__PURE__ */ React.createElement("option", {
      value: "Rock"
    }, "Rock"), /* @__PURE__ */ React.createElement("option", {
      value: "Bug"
    }, "Bug"), /* @__PURE__ */ React.createElement("option", {
      value: "Ghost"
    }, "Ghost"), /* @__PURE__ */ React.createElement("option", {
      value: "Steel"
    }, "Steel"), /* @__PURE__ */ React.createElement("option", {
      value: "Fire"
    }, "Fire"), /* @__PURE__ */ React.createElement("option", {
      value: "Water"
    }, "Water"), /* @__PURE__ */ React.createElement("option", {
      value: "Grass"
    }, "Grass"), /* @__PURE__ */ React.createElement("option", {
      value: "Electric"
    }, "Electric"), /* @__PURE__ */ React.createElement("option", {
      value: "Psychic"
    }, "Psychic"), /* @__PURE__ */ React.createElement("option", {
      value: "Ice"
    }, "Ice"), /* @__PURE__ */ React.createElement("option", {
      value: "Dragon"
    }, "Dragon"), /* @__PURE__ */ React.createElement("option", {
      value: "Dark"
    }, "Dark"), /* @__PURE__ */ React.createElement("option", {
      value: "Fairy"
    }, "Fairy"))), /* @__PURE__ */ React.createElement("input", {
      className: "uk-button uk-button-primary uk-align-center",
      type: "submit"
    })));
  }
}
class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.props)
    });
    this.props.load();
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("tr", {
      onClick: this.handleDelete
    }, /* @__PURE__ */ React.createElement("td", null, this.props.name), /* @__PURE__ */ React.createElement("td", null, this.props.description), /* @__PURE__ */ React.createElement("td", null, this.props.type1), /* @__PURE__ */ React.createElement("td", null, this.props.type2), /* @__PURE__ */ React.createElement("td", null, this.props.weaknesses), /* @__PURE__ */ React.createElement("td", null, this.props.resistances), /* @__PURE__ */ React.createElement("td", null, this.props.immunities)));
  }
}
export default App;
