import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Button,
  Grid,
} from "@mui/material";

export default function MyTable(props) {
  function decrease(id) {
    props.onDecrease(id, props.updateTable);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {props.purchases.map((p) => (
            <TableRow
              key={p.item_name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {p.item_name}
              </TableCell>
              <TableCell component="th" scope="row">
                ${p.item_cost}
              </TableCell>
              <TableCell component="th" scope="row">
                {p.item_quantity}{" "}
                <Button variant={"contained"} onClick={() => decrease(p._id)}>
                  Decrease
                </Button>
              </TableCell>
              <TableCell component="th" scope="row">
                {p.payment_method}
              </TableCell>
              <TableCell component="th" scope="row">
                ${(p.item_cost * p.item_quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
