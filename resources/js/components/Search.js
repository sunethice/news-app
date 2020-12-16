import React, { Component } from "react";
import axio from "axios";
import { debounce, isEmpty } from "lodash";

//components
import NewsItem from "./NewsItem";

class Search extends Component {
    componentDidMount() {
        this.searchStr = debounce(this.searchStr, 1000);
    }

    constructor() {
        super();
        this.state = {
            query: "",
            resultList: {},
            currentPage: 1
        };
    }

    searchStr() {
        axio.get("/api/search/", {
            params: {
                searchStr: this.state.query
            }
        }).then(resp => {
            this.setState({
                resultList: resp.data.resultList,
                currentPage: resp.data.currentPage
            });
        });
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
            <>
                <div className="app">
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
            </>
        );
    }
}

export default Search;
