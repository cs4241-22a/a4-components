import React, {useState} from "react";
import MyTable from "./Table";
import Form from "./Form";
import {Grid} from "@mui/material";

export default function App(props) {
    const [purchases, setPurchases] = useState([
        {
            item_name: "Coke",
            item_quantity: 5,
            item_cost: 3.2,
            payment_method: "cash",
        },
    ]);

    return (
        <div>
            <Grid
                container
                spacing={0}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid item xs={3}>
                    <Form onSubmit={updatePurchases}/>
                </Grid>
                <Grid item xs={3}>
                    <MyTable purchases={purchases}/>
                </Grid>
            </Grid>
        </div>
    );

    function updatePurchases() {
        fetch("/data")
            .then(r => r.json())
            .then((data) => {
                console.log(purchases)
                setPurchases(data)
            })
    }
}
