import React from "./_snowpack/pkg/react.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: []
    };
    this.load();
  }
  load() {
    fetch("/read", {
      method: "GET",
      "no-cors": true
    }).then((res) => res.json()).then((json) => this.setState({groceryList: json}));
  }
  toggleCheck(idx, isCompleted) {
    fetch("/change", {
      method: "POST",
      body: JSON.stringify({
        idx,
        isCompleted
      }),
      headers: {"Content-Type": "application/json"}
    });
  }
  add(e) {
    const quantity = document.getElementById("quantity").value;
    const itemName = document.getElementById("itemName").value;
    const priority = document.getElementById("priority").value;
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({
        quantity,
        itemName,
        priority,
        completed: false
      }),
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => this.setState({todos: json})).then(() => this.load());
  }
  removeCompleted(e) {
    fetch("/removeCompleted", {
      method: "POST"
    }).then((response) => response.json()).then((json) => this.setState({todos: json})).then(() => window.location.reload());
  }
  clearAll(e) {
    fetch("/clearAll", {
      method: "POST"
    }).then((response) => response.json()).then((json) => this.setState({todos: json})).then(() => this.load());
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Grocery List"), /* @__PURE__ */ React.createElement("p", null, "Keep track of your groceries by adding and completing items."), /* @__PURE__ */ React.createElement("form", {
      action: ""
    }, /* @__PURE__ */ React.createElement("label", {
      htmlFor: "quantity"
    }, "Quantity: "), /* @__PURE__ */ React.createElement("input", {
      type: "number",
      id: "quantity",
      min: "1"
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "itemName"
    }, "Item Name: "), /* @__PURE__ */ React.createElement("input", {
      type: "text",
      id: "itemName"
    }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("label", {
      htmlFor: "priority"
    }, "Priority: "), /* @__PURE__ */ React.createElement("select", {
      id: "priority",
      placeholder: ""
    }, /* @__PURE__ */ React.createElement("option", null, "Need"), /* @__PURE__ */ React.createElement("option", null, "Want"), /* @__PURE__ */ React.createElement("option", null, "Maybe buy")), /* @__PURE__ */ React.createElement("br", null)), /* @__PURE__ */ React.createElement("div", {
      id: "buttons"
    }, /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.add(e)
    }, "Add Item"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.removeCompleted(e)
    }, "Clear Completed"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => this.clearAll(e)
    }, "Clear All")), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("table", {
      id: "dataTable"
    }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Quantity"), /* @__PURE__ */ React.createElement("th", null, "Item Name"), /* @__PURE__ */ React.createElement("th", null, "Priority"), /* @__PURE__ */ React.createElement("th", null, "Completed")), this.state.groceryList.map((item, i) => /* @__PURE__ */ React.createElement("tr", {
      key: i
    }, /* @__PURE__ */ React.createElement("td", null, item.quantity), /* @__PURE__ */ React.createElement("td", null, item.itemName), /* @__PURE__ */ React.createElement("td", null, item.priority), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", {
      type: "checkbox",
      defaultChecked: item.completed,
      onChange: (e) => this.toggleCheck(i, !item.completed)
    })))))));
  }
}
export default App;
