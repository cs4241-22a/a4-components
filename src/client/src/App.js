import React from "react";
import axios from "axios";
import "./components/DataRow";
import DataRow from "./components/DataRow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      error: null,
      formPlayerName: "",
      formPlayerScore: "",
      formWinResult: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.modifyOnClick = this.modifyOnClick.bind(this);
  }

  updateRecordsState() {
    axios
      .get("api/scores")
      .then((res) => this.setState({ records: res.data }))
      .catch((error) => this.setState({ error }));
  }

  componentDidMount() {
    this.updateRecordsState();
  }

  handleFormChange(event) {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ [event.target.name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      formPlayerName: playerName,
      formPlayerScore: playerScore,
      formWinResult: winResult,
    } = this.state;
    axios
      .post("/api/score", { playerName, playerScore, winResult })
      .then(() =>
        this.setState({
          formPlayerName: "",
          formPlayerScore: "",
          formWinResult: false,
        })
      )
      .then(() => this.updateRecordsState())
      .catch((error) => this.setState({ error }));
  }

  modifyOnClick(record) {
    axios
      .put("/api/score", {
        objectId: record["_id"],
        newData: {
          playerName: this.state.formPlayerName,
          playerScore: this.state.formPlayerScore,
          winResult: this.state.formWinResult,
        },
      })
      .then(() => this.updateRecordsState())
      .catch((error) => this.setState({ error }));
  }

  deleteOnClick(record) {
    axios
      .delete("/api/score", { data: { objectId: record["_id"] } })
      .then((response) => this.updateRecordsState())
      .catch((error) => this.setState({ error }));
  }

  render() {
    return (
      <>
        <h1>Player Score Entry</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="formPlayerName"
            value={this.state.formPlayerName}
            onChange={this.handleFormChange}
          />
          <label> Player Name</label>
          <br />
          <input
            type="number"
            name="formPlayerScore"
            value={this.state.formPlayerScore}
            onChange={this.handleFormChange}
          />
          <label> Player Score</label>
          <br />
          <input
            type="checkbox"
            name="formWinResult"
            checked={this.state.formWinResult}
            onChange={this.handleFormChange}
          />
          <label> Did player win?</label>
          <br />
          <input type="submit" value="Add Entry" />
        </form>
        <br />
        <table id="resultsTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Win Result</th>
              <th>Modify?</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map((record, index) => {
              return (
                <DataRow
                  key={index}
                  record={record}
                  modifyOnClick={this.modifyOnClick}
                  deleteOnClick={this.deleteOnClick}
                />
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
