import React, { useEffect, useState } from "react";
import Task from "./Task";
import Form from "./Form";

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

  return (
    <main className="container">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <h1 className="mt-5 d-inline-block mb-0 fw-bold">Task Manager</h1>
        <button
          id="add"
          type="button"
          className="btn btn-outline-light py-2 px-4"
          onClick={() => setFormActive(true)}
        >
          Add
        </button>
      </div>
      <section id="task-display">
        {formActive ? <Form set={setData} toggle={setFormActive} /> : null}
        {data.map((task) => (
          <Task task={task} set={setData} />
        ))}
      </section>
    </main>
  );
}

export default TaskDisplay;
