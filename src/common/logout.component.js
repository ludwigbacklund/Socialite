import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

export default class Logout extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    redirect() {
        this.context.router.push('/');
    }

    componentDidMount() {
        FB.auth().signOut();
        this.redirect();
    }

    render() {
        return (
            <h1>You have been signed out, redirecting.</h1>
        );
    }

}