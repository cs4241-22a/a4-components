import React from "../_snowpack/pkg/react.js";
function Task({
  set,
  task: {
    primary_key,
    title,
    description,
    creation_date,
    deadline_date,
    priority,
    type
  }
}) {
  async function deleteTask() {
    const response = await fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: `${primary_key}`
      })
    });
    const json = await response.json();
    set(json);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "card rounded shadow w-100 mb-3",
    style: {backgroundColor: "#343a40"}
  }, /* @__PURE__ */ React.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "d-flex justify-content-between align-items-end"
  }, /* @__PURE__ */ React.createElement("p", {
    id: "title-task",
    className: "card-title fw-bold h6"
  }, title), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "btn bi bi-x-lg",
    "aria-label": "Close",
    style: {color: "white", border: "none"},
    onClick: deleteTask
  }))), /* @__PURE__ */ React.createElement("p", {
    className: "card-subtitle my-2 h6"
  }, /* @__PURE__ */ React.createElement("span", {
    id: "deadline-task",
    className: "badge badge-lg bg-light text-black me-1"
  }, "Due on ", deadline_date), /* @__PURE__ */ React.createElement("span", {
    id: "type-task",
    className: "badge bg-primary me-1"
  }, type), /* @__PURE__ */ React.createElement("span", {
    id: "priority-task",
    className: "badge bg-danger"
  }, priority, " Urgency")), /* @__PURE__ */ React.createElement("p", {
    id: "description-task",
    className: "card-text my-3"
  }, description), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("div", {
    id: "deadline-task",
    className: "card-text"
  }, "Created on ", creation_date)));
}
export default Task;
