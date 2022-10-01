import React from "react";
import MyTable from "./Table";
import Form from "./Form";
import {Grid} from "@mui/material";

class App extends React.Component {
    render() {
        return (
            <div>
                <Grid container spacing={0} direction={"column"} alignItems={"center"} justifyContent={"center"}>

                        <MyTable />

                </Grid>
            </div>
        );
    }
}


export default App;
