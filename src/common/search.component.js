import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

import FriendSquare from '../friends/friendsquare.component.js'
import * as _ from 'lodash';

export default class Search extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            id: this.props.location.query.id
        }
    }

    componentWillMount() {
        console.log("YOU CALLED");
        this.retrieveSearch();
    }

    componentWillReceiveProps(nextProps) {
        console.log("HALLO",nextProps.location.query.id);
        this.setState({
            users: [],
            id: nextProps.location.query.id
        }, this.retrieveSearch(nextProps.location.query.id));
    }

    retrieveSearch(id = null) {
        var list = [];

        //After ElasticSearch pushes a search response to the database this function retrieves it and displays
        //the results
        console.log("LOLFACE ", this.state.id);
        var resId;
        // Used to prevent an occasional bug where the state Id would not properly update.
        if (id){
            resId = id;
        }
        else{
            resId = this.state.id;
        }
        FB.database().ref('Search/response/' + resId).on('child_added', function fn(snap) {
            console.log("FOUND SEARCH RESULTS WITH KEY",resId);
            if (snap.val() != null) {
                snap.ref.off('child_added', fn);
                snap.ref.remove();

                list.push(<FriendSquare key={snap.val().id}
                                        fname={snap.val().fname}
                                        lname={snap.val().lname}
                                        email={snap.val().email}
                                        userId={snap.val().id}/>);

                this.setState({
                    users: list
                });
            }
        }.bind(this));
    }

    render() {
        return (
            <div id="friends">
                <section class="hero is-primary">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <h1 class="title">
                                Search Results
                            </h1>
                        </div>
                    </div>
                </section>
                <div class="columns is-multiline friends">
                    {this.state.users}
                </div>
            </div>
        );
    }
}