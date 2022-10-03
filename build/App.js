import React from "./_snowpack/pkg/react.js";
import Header from "./components/Header.js";
import TaskDisplay from "./components/TaskDisplay.js";
import "./styles/main.css.proxy.js";
function App() {
  console.log("Here");
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(TaskDisplay, null));
}
export default App;
