import React from "react";
import Table from "./table.jsx";
import Form from "./form.jsx";

// main component
class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize our state
    this.state = { studentData: [] };
    this.load();
  }

  load() {
    fetch("/read", {
      method: "GET",
    })
      .then((x) => x.json())
      .then((response) => {
        console.log(response);
        this.setState({ studentData: response });
      });
  }

  // render component HTML using JSX
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col align-self-center">
            <Form onSubmit={this.load.bind(this)}> </Form>
          </div>
        </div>
        <div class="row">
          <div class="col align-self-center">
            <Table data={this.state.studentData}></Table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
