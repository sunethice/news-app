import React, { Component } from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/lib/integration/react";
// import { configureStore } from "./store";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "../css/app.css";

//components
import Search from "./components/Search";

class Index extends Component {
    render() {
        return (
            <>
                <Router>
                    <Route exact path="/" component={Search}></Route>
                </Router>
            </>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("app"));
