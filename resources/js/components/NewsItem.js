import React, { Component } from "react";

class NewsItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.item.map(newsItem => (
                    <li className="item" key={newsItem.key}>
                        <h2 className="title">
                            <a href={newsItem.link}>{newsItem.title}</a>
                        </h2>
                        <div className="meta">
                            <span>{newsItem.publication_dt}</span>
                            <span>{newsItem.section}</span>
                        </div>
                    </li>
                ))}
            </>
        );
    }
}

export default NewsItem;
