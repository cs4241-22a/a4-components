import React, { useState } from "react";

// Import the Home page component
// import Home from "./pages/home.jsx";

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Import mock base data
import courseData from "./courseData.json";
import assignData from "./assignData.json";

const App = () => {
  const [courses, setCourses] = useState(courseData);
  const [assignments, setAssignments] = useState(assignData);

  const [addCourseData, setAddCourseData] = useState({
    cname: "",
    term: "a",
    weekly: "",
  });

  const [addAssignmentData, setAddAssignmentData] = useState({
    assignment: "",
    coursesel: "",
    due: "",
    priority: "low",
  });

  const handleAddCourseChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newCourseData = { ...addCourseData };
    newCourseData[fieldName] = fieldValue;

    setAddCourseData(newCourseData);
  };

  const handleAddCourseSubmit = (event) => {
    event.preventDefault();

    const newCourse = {
      cname: addCourseData.cname,
      term: addCourseData.term,
      weekly: addCourseData.weekly,
    };

    const newCourses = [...courses, newCourse];
    setCourses(newCourses);
  };

  const handleAddAssignmentChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newAssignmentData = { ...addAssignmentData };
    newAssignmentData[fieldName] = fieldValue;

    setAddAssignmentData(newAssignmentData);
  };

  const handleAddAssignmentSubmit = (event) => {
    event.preventDefault();

    const newAssignment = {
      assignment: addAssignmentData.assignment,
      coursesel: addAssignmentData.coursesel,
      due: addAssignmentData.due,
      priority: addAssignmentData.priority,
    };

    const newAssignments = [...assignments, newAssignment];
    setAssignments(newAssignments);
  };

  function getRemaining(data) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = new Date(mm + "/" + dd + "/" + yyyy);

    let termEnd = new Date();
    switch (data.term) {
      case "a":
        termEnd = new Date("10/14/2022");
        break;
      case "b":
        termEnd = new Date("12/17/2022");
        break;
      case "c":
        termEnd = new Date("03/04/2023");
        break;
      case "d":
        termEnd = new Date("05/04/2023");
        break;
      default:
        termEnd = new Date("00/00/0000");
    }

    let timeDiff = termEnd.getTime() - today.getTime();
    let dayDiff = timeDiff / (1000 * 3600 * 24);
    let remaining = (dayDiff / 7) * data.weekly;

    return <td>{Math.round(remaining)}</td>;
  }

  return (
    <div className="app-container">
      <div class="header">
        <h1>Assignment Tracker v03</h1>
        <h2>Developed by Cole Ouellette</h2>
      </div>

      <div>
        <form onSubmit={handleAddCourseSubmit}>
          <fieldset>
            <legend>Add a Course</legend>
            <ul>
              <li>
                <input
                  type="text"
                  id="cname"
                  name="cname"
                  placeholder="Untitled Course"
                  onChange={handleAddCourseChange}
                  required
                />
              </li>
              <li>
                <label for="term">Term </label>
                <select name="term" id="term" onChange={handleAddCourseChange}>
                  <option value="a">A</option>
                  <option value="b">B</option>
                  <option value="c">C</option>
                  <option value="d">D</option>
                </select>
              </li>
              <li>
                <label for="weekly">How many classes per week?</label>
                <input
                  type="number"
                  id="weekly"
                  name="weekly"
                  onChange={handleAddCourseChange}
                  required
                />
              </li>
              <li>
                <div class="buttons">
                  <button type="reset">Cancel</button>
                  <button type="submit">Submit</button>
                </div>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Classes Left</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr>
                <td>{course.cname}</td>
                {getRemaining(course)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <form onSubmit={handleAddAssignmentSubmit}>
          <fieldset>
            <legend>Add an Assignment</legend>
            <ul>
              <li>
                <label for="coursesel">Course</label>
                <select
                  name="coursesel"
                  id="coursesel"
                  onChange={handleAddAssignmentChange}
                  required
                >
                  <option value="" disabled selected>
                    Select a Course
                  </option>
                  {courses.map((course) => (
                    <option>{course.cname}</option>
                  ))}
                </select>
              </li>
              <li>
                <input
                  type="text"
                  id="assignment"
                  name="assignment"
                  placeholder="Untitled Assignment"
                  onChange={handleAddAssignmentChange}
                  required
                />
              </li>
              <li>
                <input
                  type="date"
                  id="due"
                  name="due"
                  onChange={handleAddAssignmentChange}
                  required
                />
              </li>
              <li>
                <select
                  name="priority"
                  id="priority"
                  onChange={handleAddAssignmentChange}
                >
                  <option value="low">Low</option>
                  <option value="med">Medium</option>
                  <option value="high">High</option>
                </select>
              </li>
              <li>
                <div class="buttons">
                  <button type="reset">Cancel</button>
                  <button type="submit">Submit</button>
                </div>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assign) => (
              <tr>
                <td>{assign.assignment}</td>
                <td>{assign.coursesel}</td>
                <td>{assign.due}</td>
                <td>{assign.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
