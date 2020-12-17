import React, { Component } from "react";
import axios from "axios";
import { debounce, isEmpty } from "lodash";

//components
import NewsItem from "./NewsItem";
import PinnedNews from "./PinnedNews";

class Search extends Component {
    componentDidMount() {
        this.searchStr = debounce(this.searchStr, 1000);
    }

    constructor() {
        super();
        this.state = {
            query: "",
            resultList: {},
            currentPage: 1,
            pageRequest: 1
        };
    }

    searchStr() {
        if (this.state.query !== "") {
            axios
                .get("/api/search/", {
                    params: {
                        searchStr: this.state.query,
                        page: this.state.pageRequest
                    }
                })
                .then(resp => {
                    // console.log(resp);
                    this.setState({
                        resultList: resp.data.resultList,
                        currentPage: resp.data.currentPage
                    });
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
    }

    renderNews() {
        const { resultList } = this.state;
        let results = Object.keys(resultList);
        return (
            <ul>
                {results.map(k => (
                    <NewsItem key={k} item={resultList[k]} category={k} />
                ))}
            </ul>
        );
    }

    render() {
        const { query, resultList } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 app">
                        <form>
                            <input
                                autoFocus
                                value={query}
                                onKeyUp={e => {
                                    this.searchStr();
                                }}
                                onChange={e => {
                                    this.setState({ query: e.target.value });
                                }}
                            />
                            <button>Search</button>
                        </form>

                        {isEmpty(resultList) ? (
                            <p>
                                <i>No results</i>
                            </p>
                        ) : (
                            this.renderNews()
                        )}
                    </div>
                    <div className="col-md-4">
                        <h1>Pinned Items</h1>
                        <PinnedNews></PinnedNews>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
