import React from "react";
import MyTable from "./Table";
import Form from "./Form";
import {Grid} from "@mui/material";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.setState({
            purchases: []
        })
    }

    componentDidMount() {
        this.setState({
            purchases: {
                item_name: "Coke", item_quantity: 5, item_cost: 3.20, payment_method: "cash"
            }
        })
    }

    render() {
        return (
            <div>
                <Grid container spacing={0} direction={"column"} alignItems={"center"} justifyContent={"center"}>
                    <Grid item xs={3}>
                        <Form onSubmit={this.updatePurchases}/>
                    </Grid>
                    <Grid item xs={3}>
                        <MyTable purchases={this.props.purchases}/>
                    </Grid>
                </Grid>
            </div>
        );
    }

    updatePurchases() {
        fetch("/data").then(data => data.json)
            .then(data => {
                this.setState({purchases: data})
            })
    }

    decrease() {
        fetch("/data").then(data => data.json)
            .then(data => {
                this.setState({purchases: data})
            })
    }
}


export default App;
