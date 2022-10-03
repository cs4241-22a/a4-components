import React, { useState } from "react";
import { Box, Button, Input, MenuItem, TextField } from "@mui/material";

export default function Form(props) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const payment_methods = [
    {
      value: "cash",
      label: "Cash",
    },
    {
      value: "debit_card",
      label: "Debit Card",
    },
    {
      value: "credit_card",
      label: "Credit Card",
    },
  ];

  function submit(itemName, itemCost, itemQuantity, paymentMethod) {

      if (
        itemName === "" ||
        itemCost === "" ||
        itemQuantity === "" ||
        paymentMethod === ""
      )
        return false;

        

    

    const json = {
      item_name: itemName,
      item_cost: itemCost,
      item_quantity: itemQuantity,
      payment_method: paymentMethod,
    };

    const body = JSON.stringify(json);

    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then(function (response) {
      props.onSubmit();
    });
    

    setItemName("")
    setItemCost("")
    setItemQuantity("")

  }

  return (
    <>
      <Box
        component={"form"}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <div>
          <TextField
            placeholder={"Item Name"}
            required
            id={"item_name"}
            label={"Item Name"}
            value={itemName}
            onChange={(event) => handleChange(event, setItemName)}
          ></TextField>
          <TextField
            placeholder={"Item Cost"}
            required
            id={"item_cost"}
            label={"Item Cost"}
            value={itemCost}
            type="number"
            onChange={(event) => handleChange(event, setItemCost)}
          ></TextField>
        </div>
        <div>
          <TextField
            placeholder={"Item Quantity"}
            required
            id={"item_quantity"}
            label={"Item Quantity"}
            value={itemQuantity}
            onChange={(event) => handleChange(event, setItemQuantity)}
            type="number"
          ></TextField>
          <TextField
            id={"payment_method"}
            select
            label={"Payment Method"}
            value={paymentMethod}
            onChange={(event) => handleChange(event, setPaymentMethod)}
          >
            {payment_methods.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Box textAlign={"center"}>
          <Button
            variant={"contained"}
            onClick={() =>
              submit(itemName, itemCost, itemQuantity, paymentMethod)
            }
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
