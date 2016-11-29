import React, {Component, cloneElement} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

export default class Splash extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            username: null,
            validEmail: null
        }
    }

    handleFirstName(e) {
        this.setState({fname: e.target.value});
    }

    handleLastName(e) {
        this.setState({lname: e.target.value});
    }

    handleUsername(e) {
        //Regex to check if the email is valid or not
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(e.target.value)) {
            this.setState({validEmail: true})
        } else if (e.target.value == "") {
            this.setState({validEmail: null})
        } else {
            this.setState({validEmail: false})
        }

        this.setState({username: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div id="sign-in-background">
                {cloneElement(this.props.children, {
                    handlePassword: this.handlePassword.bind(this),
                    handleUsername: this.handleUsername.bind(this),
                    handleFirstName: this.handleFirstName.bind(this),
                    handleLastName: this.handleLastName.bind(this),
                    fname: this.state.fname,
                    lname: this.state.lname,
                    password: this.state.password,
                    username: this.state.username,
                    validEmail: this.state.validEmail
                })
                }
            </div>
        );
    }
}