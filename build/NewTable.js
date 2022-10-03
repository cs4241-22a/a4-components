import React from "./_snowpack/pkg/react.js";
const NewTable = (props) => {
  console.log(props);
  return /* @__PURE__ */ React.createElement("table", {
    class: "box4",
    id: "table"
  }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Name"), /* @__PURE__ */ React.createElement("th", null, "Num Chars"), /* @__PURE__ */ React.createElement("th", null, "Timestamp")), props.rows.map((row) => {
    return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, row.name), /* @__PURE__ */ React.createElement("th", null, row.numChars), /* @__PURE__ */ React.createElement("th", null, row.timestamp));
  }));
};
export default NewTable;
