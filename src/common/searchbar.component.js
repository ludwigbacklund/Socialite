import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

export default class SearchBar extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var newMessageRef = FB.database().ref('Search/requests').push();
        newMessageRef.set({
            term: this.state.search
        }).catch(err => {
            console.log("ERROR Couldn't set new search request in Firebase: ", err)
        });
        this.setState({search: ""});
        this.context.router.push('/search?id=' + newMessageRef.key)
    }

    handleSearch(e) {
        this.setState({search: e.target.value});
    }

    render() {
        return (
            <div id="searchbar" class="nav-item">
                <form id="searchbar-form" onSubmit={this.handleSubmit.bind(this)}>
                    <input id="searchbar-input"
                           class="input"
                           type="text"
                           placeholder="Search"
                           onChange={this.handleSearch.bind(this)}
                           value={this.state.search}
                           required/>
                </form>
            </div>
        );
    }
}