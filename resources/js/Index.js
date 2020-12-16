import React, { Component } from "react";
import ReactDOM from "react-dom";

class Index extends Component {
    render() {
        return (
            <>
                <h1>React Works</h1>
            </>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("app"));
