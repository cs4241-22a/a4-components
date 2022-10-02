import React from "react";

class App extends React.Component {
    render() {
        // const { name } = ;
        return (
            <>
                <button>Click Me</button>
                <h1>
                    Hello {this.props.name}
                </h1>
            </>
        );
    }
}

export default App;