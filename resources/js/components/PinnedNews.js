import React, { Component } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

//components
import PinnedItem from "./PinnedItem";

class PinnedNews extends Component {
    async componentDidMount() {
        await axios.get("api/list_pinned").then(resp => {
            console.log(resp);
            this.setState({ pinnedItems: resp.data });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            pinnedItems: []
        };
    }

    renderPinnedNews() {
        const { pinnedItems } = this.state;
        let results = Object.keys(pinnedItems);
        return (
            <ul>
                {results.map(k => (
                    <PinnedItem key={k} item={pinnedItems[k]} category={k} />
                ))}
            </ul>
        );
    }

    render() {
        const { query, pinnedItems } = this.state;
        return (
            <>
                <div className="mt-5 pinnedWrap">
                    {isEmpty(pinnedItems) ? (
                        <p>
                            <i>No pinned items results</i>
                        </p>
                    ) : (
                        this.renderPinnedNews()
                    )}
                </div>
            </>
        );
    }
}

export default PinnedNews;
