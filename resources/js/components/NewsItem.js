import React, { Component } from "react";

class NewsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>{this.props.item.title}</h1>
            </>
        );
    }
}

export default NewsItem;
