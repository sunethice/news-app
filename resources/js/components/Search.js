import React, { Component } from "react";

//components
import NewsItem from "./NewsItem";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: ""
        };
    }

    searchStr() {}

    render() {
        let list = [{ title: "title1" }, { title: "title2" }];
        const { query } = this.state;
        return (
            <>
                <div className="app">
                    <form onSubmit={this.searchStr}>
                        <input
                            autoFocus
                            value={query}
                            onChange={e =>
                                this.setState({ query: e.target.value })
                            }
                        />
                        <button>Search</button>
                    </form>

                    {!list ? null : list.length === 0 ? (
                        <p>
                            <i>No results</i>
                        </p>
                    ) : (
                        <ul>
                            {list.map((item, i) => (
                                <NewsItem key={i} item={item} />
                            ))}
                        </ul>
                    )}
                </div>
            </>
        );
    }
}

export default Search;
