import React from "react";
import {Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, Button, Grid} from "@mui/material";
import Form from "./Form";

class MyTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            purchases: []
        }
    }


    componentDidMount() {
        this.setState({
            purchases: [{
                item_name: "Coke",
                item_cost: 3,
                item_quantity: 5,
                payment_method: "credit_card",
                _id: "1"
            }]
        })
    }

    render() {
        return (
            <>
                <Grid item xs={3}>
                    <Form onSubmit={this.updateTable}/>
                </Grid>
                <Grid item xs={3}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Item Cost</TableCell>
                                    <TableCell>Item Quantity</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.purchases.map(p => (
                                    <TableRow key={p.item_name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">{p.item_name}</TableCell>
                                        <TableCell component="th" scope="row">{p.item_cost}</TableCell>
                                        <TableCell component="th" scope="row">{p.item_quantity} <Button
                                            variant={"contained"}
                                            onClick={() => this.decrease(this, p._id)}>Decrease</Button></TableCell>
                                        <TableCell component="th" scope="row">{p.payment_method}</TableCell>
                                        <TableCell component="th" scope="row">{p.item_cost * p.item_quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </>
        )
    }


    updateTable() {
        fetch("/data").then(data => data.json)
            .then(data => {
                this.setState({purchases: data})
            })
    }


    decrease(table, item_id) {
        console.log(item_id)
        /*
        const json = {
            id: item_id,
        };
        const body = JSON.stringify(json);
        fetch("/decrease", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            table.updateTable()
        });*/
    }
}


export default MyTable
