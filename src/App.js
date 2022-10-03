import React, { setState } from "react";
import MyTable from "./Table";
import Form from "./Form";
import { Grid, Button } from "@mui/material";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { purchases: [] };
  }

  componentDidMount() {
    this.updatePurchases();
  }

  render() {
    return (
      <div>
        <Grid
          container
          spacing={1}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={3}>
            <Form onSubmit={this.updatePurchases.bind(this)} />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" href="/logout">
              Log Out
            </Button>
          </Grid>
          <Grid item xs={3}>
            <MyTable
              purchases={this.state.purchases}
              onDecrease={this.decreaseItem}
              updateTable={this.updatePurchases.bind(this)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  updatePurchases() {
    fetch("/data")
      .then((r) => r.json())
      .then((data) => {
        this.setState({ purchases: data });
      });
  }

  decreaseItem(itemID, updateMethod) {
    const json = {
      id: itemID,
    };
    const body = JSON.stringify(json);
    fetch("/decrease", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => updateMethod());
  }
}

export default App;
