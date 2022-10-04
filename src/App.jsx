import React from "react";

// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.

class Item extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return (
      <ul class="container">
        <li class="box" id="name-col">
          {this.props.name}
        </li>
        <li class="box" id="qty-col">
          {this.props.qty}
        </li>
        <li class="box" id="units-col">
          {this.props.units}
        </li>
        <li class="box" id="brand-col">
          {this.props.brand}
        </li>
      </ul>
    );
  }
  // call this method when the checkbox for this component is clicked
  change(e) {
    this.props.onclick(this.props.name, e.target.checked);
  }
}

// main component
class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize our state
    this.state = { items: [] };
    this.load();
  }

  // load in our data from the server
  load() {
    fetch("/read", { method: "get", "no-cors": true })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ items: json });
      });
  }

  // add a grocery list item
  add(evt) {
    let name = document.querySelector("#name").value;
    let qty = document.querySelector("#qty").value;
    let brand = document.querySelector("#brand").value;
    let units = "Ct";

    if (name == "Eggs" || name == "eggs" || name == "Ice cream") {
      units = "Carton";
    } else if (name == "Chicken" || name == "Pork" || name == "Beef") {
      units = "Lb";
    } else if (name == "Peanut butter" || name == "Jam" || name == "Jelly") {
      units = "Jar";
    } else {
      units = "Ct";
    }

    if (qty != "1" && units != "Ct") {
      units += "s";
    }
    // brand is optional, so to make sure any brands still display on the correct line we add a nbsp
    // if (brand == "") { brand = "&nbsp;"}

    let json = {
      name: name,
      qty: qty,
      units: units,
      brand: brand,
    };
    console.log(JSON.stringify(json));

    fetch("/add", {
      method: "POST",
      body: JSON.stringify(json),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        // changing state triggers reactive behaviors
        this.setState({ items: json }); // equivalent of refreshData from A2
      });
  }

  // // remove a grocery list item
  remove(evt) {
    const name = document.querySelector("#deleted-item").value;

    let json = {
      name: name,
      qty: "",
      units: "",
      brand: "",
    };

    fetch("/remove", {
      method: "POST",
      body: JSON.stringify(json),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        // changing state triggers reactive behaviors
        this.setState({ items: json }); // equivalent of refreshData from A2
      });
  }

  // render component HTML using JSX
  render() {
    return (
      <div className="App">
        <h2>Current List</h2>
        <div class="container">
          <p class="column-label" id="name-col">
            Item
          </p>
          <p class="column-label" id="qty-col">
            Quantity
          </p>
          <p class="column-label" id="units-col">
            Units
          </p>
          <p class="column-label" id="brand-col">
            Brand
          </p>
        </div>
        <div>
          {this.state.items.map((item, i) => (
            <Item
              key={i}
              name={item.name}
              qty={item.qty}
              units={item.units}
              brand={item.brand}
            />
          ))}
        </div>
        <br />

        <h2>Add to List</h2>
        <div class="add-form">
          <form>
            <table>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Brand</th>
              </tr>
              <tr>
                <td>
                  <input type="text" id="name" />
                </td>
                <td>
                  <input type="text" id="qty" />
                </td>
                <td>
                  <input type="text" id="brand" />
                </td>
              </tr>
            </table>
          </form>
        </div>
        <br />
        <div class="button-container">
          <button onClick={(e) => this.add(e)} id="add-button">
            Add
          </button>
        </div>
        <br />
        <br />

        <h2>Delete from List</h2>
        <div class="delete-form">
          <p>Name of item to be deleted: &nbsp;</p>
          <input type="text" id="deleted-item" /> &nbsp;
          <button onClick={(e) => this.remove(e)} id="delete-button">
            delete
          </button>
        </div>
      </div>
    );
  }
}

export default App;
