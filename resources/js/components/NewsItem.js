import React, { Component } from "react";
import axios from "axios";

class NewsItem extends Component {
    constructor(props) {
        super(props);
    }

    onPinClick(newsID) {
        axios
            .post("/api/save/", {
                key: newsID
            })
            .then(resp => {
                alert(resp.data.message);
                // save to state
            })
            .catch(function(error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
            });
    }

    render() {
        return (
            <>
                <li className="sectionWrap">
                    <h1>{this.props.category}</h1>
                    {this.props.item.map(newsItem => (
                        <div className="item" key={newsItem.key}>
                            <h2 className="title">
                                <a href={newsItem.link}>{newsItem.title}</a>
                            </h2>
                            <div className="meta">
                                <span>{newsItem.publicationDt}</span>
                                <span>{newsItem.section}</span>
                                <span className="provider">
                                    <button
                                        className="provider-thumbnail"
                                        onClick={() =>
                                            this.onPinClick(newsItem.key)
                                        }
                                    >
                                        Pin
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))}
                </li>
            </>
        );
    }
}

export default NewsItem;
