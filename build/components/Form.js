import React from "../_snowpack/pkg/react.js";
function Form({set, toggle}) {
  async function submitForm(e) {
    e.preventDefault();
    const form = document.getElementById("form");
    const EXPECTED_FIELDS = 5;
    const data = new FormData(form), entries = Object.fromEntries(data.entries());
    if (Object.keys(entries).length !== EXPECTED_FIELDS) {
      return;
    } else {
      const response = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entries)
      });
      const json = await response.json();
      set(json);
    }
    toggle(false);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "card rounded shadow w-100 mb-3",
    style: {backgroundColor: "#343a40"},
    id: "empty-task"
  }, /* @__PURE__ */ React.createElement("form", {
    className: "card-body",
    id: "form",
    onSubmit: submitForm
  }, /* @__PURE__ */ React.createElement("input", {
    readonly: true,
    value: "none",
    id: "task-id",
    className: "d-none"
  }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("input", {
    id: "title-edit",
    type: "text",
    name: "title",
    className: "card-title form-control bg-dark border-0 text-white",
    placeholder: "Task name",
    "aria-label": "Task name"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "card-subtitle my-3 h6 row w-100 gx-1"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "col-md-2"
  }, /* @__PURE__ */ React.createElement("input", {
    id: "deadline-edit",
    "aria-label": "deadline",
    name: "deadline_date",
    type: "date",
    className: "form-control form-control-sm text-white border-0 bg-dark"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "col-md-2"
  }, /* @__PURE__ */ React.createElement("select", {
    id: "type-edit",
    name: "type",
    className: "form-select form-select-sm text-white border-dark bg-dark"
  }, /* @__PURE__ */ React.createElement("option", {
    selected: true,
    disabled: true
  }, "Type"), /* @__PURE__ */ React.createElement("option", {
    value: "MQP"
  }, "MQP"), /* @__PURE__ */ React.createElement("option", {
    value: "Academic"
  }, "Academic"), /* @__PURE__ */ React.createElement("option", {
    value: "Work"
  }, "Work"), /* @__PURE__ */ React.createElement("option", {
    value: "Other"
  }, "Other"))), /* @__PURE__ */ React.createElement("div", {
    className: "col-md-2"
  }, /* @__PURE__ */ React.createElement("select", {
    id: "priority-edit",
    name: "priority",
    className: "form-select form-select-sm text-white border-dark bg-dark"
  }, /* @__PURE__ */ React.createElement("option", {
    selected: true,
    disabled: true
  }, "Priority"), /* @__PURE__ */ React.createElement("option", {
    value: "High"
  }, "High"), /* @__PURE__ */ React.createElement("option", {
    value: "Medium"
  }, "Medium"), /* @__PURE__ */ React.createElement("option", {
    value: "Low"
  }, "Low")))), /* @__PURE__ */ React.createElement("div", {
    className: "card-text my-3"
  }, /* @__PURE__ */ React.createElement("textarea", {
    type: "text",
    name: "description",
    id: "description-edit",
    className: "form-control bg-dark border-0 text-white",
    placeholder: "Description",
    "aria-label": "Description",
    style: {height: "10rem"}
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-danger me-2",
    onClick: () => toggle(false)
  }, "Cancel"), /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Submit"))));
}
export default Form;
