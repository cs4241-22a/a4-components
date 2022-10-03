import React from "react";

const NewTable = (props) => {
    console.log(props);

    return (
        <table className = "box4" id = "table">
            <tr>
                <th>Name</th>
                <th>Num Chars</th>
                <th>Timestamp</th>
            </tr>
            {props.rows.map(row => {
                return (
                    <tr>
                        <th>{row.name}</th>
                        <th>{row.numChars}</th>
                        <th>{row.timestamp}</th>
                    </tr>
                );
            })}
        </table>
    );
}

export default NewTable;
