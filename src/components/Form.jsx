import React from "react";

function Form({ set, toggle }) {
  async function submitForm(e) {
    e.preventDefault();

    const form = document.getElementById("form");
    const EXPECTED_FIELDS = 5;

    const data = new FormData(form),
      entries = Object.fromEntries(data.entries());

    if (Object.keys(entries).length !== EXPECTED_FIELDS) {
      return;
    } else {
      const response = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      });

      const json = await response.json();
      set(json);
    }
    toggle(false);
  }

  return (
    <div
      className="card rounded shadow w-100 mb-3"
      style={{ backgroundColor: "#343a40" }}
      id="empty-task"
    >
      <form className="card-body" id="form" onSubmit={submitForm}>
        <input readonly value="none" id="task-id" className="d-none" />
        <div>
          <input
            id="title-edit"
            type="text"
            name="title"
            className="card-title form-control bg-dark border-0 text-white"
            placeholder="Task name"
            aria-label="Task name"
          />
        </div>
        <div className="card-subtitle my-3 h6 row w-100 gx-1">
          <div className="col-md-2">
            <input
              id="deadline-edit"
              aria-label="deadline"
              name="deadline_date"
              type="date"
              className="form-control form-control-sm text-white border-0 bg-dark"
            />
          </div>
          <div className="col-md-2">
            <select
              id="type-edit"
              name="type"
              className="form-select form-select-sm text-white border-dark bg-dark"
            >
              <option selected disabled>
                Type
              </option>
              <option value="MQP">MQP</option>
              <option value="Academic">Academic</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              id="priority-edit"
              name="priority"
              className="form-select form-select-sm text-white border-dark bg-dark"
            >
              <option selected disabled>
                Priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <div className="card-text my-3">
          <textarea
            type="text"
            name="description"
            id="description-edit"
            className="form-control bg-dark border-0 text-white"
            placeholder="Description"
            aria-label="Description"
            style={{ height: "10rem" }}
          ></textarea>
        </div>
        <div>
          <button className="btn btn-danger me-2" onClick={() => toggle(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
