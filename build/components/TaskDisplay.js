import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import Task from "./Task.js";
import Form from "./Form.js";
function TaskDisplay() {
  const [data, setData] = useState([]);
  const [formActive, setFormActive] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch("/data");
      const json = await response.json();
      setData(json);
    })();
  }, []);
  useEffect(() => {
    console.log("[CONSOLE] Data has changed");
  }, [data]);
  return /* @__PURE__ */ React.createElement("main", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "d-flex justify-content-between align-items-end mb-4"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mt-5 d-inline-block mb-0 fw-bold"
  }, "Task Manager"), /* @__PURE__ */ React.createElement("button", {
    id: "add",
    type: "button",
    className: "btn btn-outline-light py-2 px-4",
    onClick: () => setFormActive(true)
  }, "Add")), /* @__PURE__ */ React.createElement("section", {
    id: "task-display"
  }, formActive ? /* @__PURE__ */ React.createElement(Form, {
    set: setData,
    toggle: setFormActive
  }) : null, data.map((task) => /* @__PURE__ */ React.createElement(Task, {
    task,
    set: setData
  }))));
}
export default TaskDisplay;
