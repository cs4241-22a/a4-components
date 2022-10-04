import React from "react";
import "./style.css"

class Date extends React.Component {
  render() {
    const year = this.props.year;
    const month = this.props.month;
    const day = this.props.day;
    const dateString = year + "-" + month + "-" + day;
    const yearsPast = getAge(dateString);
    return (
      <li>
        {month} {day}, {year} was {yearsPast} years ago
      </li>
    );
  }
}

// main component
class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize our state
    this.state = {
      months: [],
      days: [],
      years: [],
    };
    this.load();
  }

  // load in our data from the server
  load() {
    fetch("/read", { method: "get", "no-cors": true })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ months: json.month, days: json.day, years: json.year });
      });
  }

  // render component HTML using JSX
  render() {
    return (
      <div>
        <h1>Save the date!</h1>
        <br />
        <input type="text" id="month" placeholder="month" />
        <input type="text" id="day" placeholder="day" />
        <input type="text" id="year" placeholder="year" />
        <button onClick={(e) => this.add(e)} id="button">
          Submit
        </button>
        <p>Here are your dates:</p>
        <ul>
          {this.state.months?.map((month, i) => (
            <Date key={i} month={month.month} />
          ))}
        </ul>
      </div>
    );
  }

  add(evt) {
    const month = document.querySelector("#month").value;
    const day = document.querySelector("#day").value;
    const year = document.querySelector("#year").value;

    fetch("/add", {
      method: "POST",
      body: JSON.stringify({ month: month, day: day, year: year }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        // changing state triggers reactive behaviors
        this.setState({ months: json.months });
        this.setState({ days: json.day });
        this.setState({ years: json.year });
      });
  }
}

function getAge(dateString) {
  var ageInMS = new Date() - new Date(dateString);
  return Math.floor(ageInMS / 1000 / 60 / 60 / 24 / 365);
}

export default App;