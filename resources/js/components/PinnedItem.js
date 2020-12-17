import React, { Component } from "react";
import axios from "axios";

class PinnedItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <li className="sectionWrap">
                    <div className="item" key={this.props.item.id}>
                        <h2 className="title">
                            <a href={this.props.item.link}>
                                {this.props.item.title}
                            </a>
                        </h2>
                        <div className="meta">
                            <span>{this.props.item.publicationDt}</span>
                            <span>{this.props.item.section}</span>
                        </div>
                    </div>
                </li>
            </>
        );
    }
}

export default PinnedItem;
