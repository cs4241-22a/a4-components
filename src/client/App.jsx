import React from "react";
import axios from "axios";
import { response } from "express";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get("/api/scores")
      .then((response) => this.setState({ records: response.data }))
      .catch((error) => this.setState({ error }));
  }

  render() {
    return (
      <>
        <h1>Hello Darian</h1>
      </>
    );
  }
}

export default App;
