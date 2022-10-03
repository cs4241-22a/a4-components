import React, {useState} from "./_snowpack/pkg/react.js";
import {default as NewTable} from "./NewTable.js";
import "./_snowpack/pkg/bootstrap.js";
import "./_snowpack/pkg/bootstrap/dist/css/bootstrap.min.css.proxy.js";
const App = (props) => {
  const [entries, setEntries] = useState([]);
  const click = (event) => {
    const value = document.querySelector("#yourname").value;
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({name: value}),
      headers: {"Content-Type": "application/json"}
    });
    fetch("/read", {
      method: "GET"
    }).then(function(response) {
      return response.json();
    }).then(function(response) {
      setEntries(response);
    });
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    classNameName: "grid-container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "box1"
  }, /* @__PURE__ */ React.createElement("h1", {
    id: "textSection"
  }, "Assignment 4 By Sean McMillan")), /* @__PURE__ */ React.createElement("div", {
    className: "box2"
  }, /* @__PURE__ */ React.createElement("p", {
    id: "textSection"
  }, "Read the REAME.md to read about everything I did in this project! To add a row to the list, simply type your name into the box below.")), /* @__PURE__ */ React.createElement("div", {
    className: "box3"
  }, /* @__PURE__ */ React.createElement("body", {
    id: "nonTextSection"
  }, /* @__PURE__ */ React.createElement("form", {
    action: ""
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    id: "yourname",
    defaultValue: "your name here"
  }), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    id: "submitButton",
    onClick: click
  }, "submit")))), /* @__PURE__ */ React.createElement("div", {
    className: "box4"
  }, /* @__PURE__ */ React.createElement(NewTable, {
    rows: entries
  }))));
};
export default App;
