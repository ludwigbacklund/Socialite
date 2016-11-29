import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

export default class Login extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();

        FB.auth().signInWithEmailAndPassword(this.props.username, this.props.password).catch(err => {
            console.log("ERROR Couldn't sign in user in Firebase: ", err)
        });

        var authData = FB.auth().currentUser;

        if (authData) {
            console.log("Authenticated user with uid:", authData.uid);
        }
    }

    handleSignupRedirect() {
        this.context.router.push('/splash/sign_up');
        return true;
    }

    render() {
        var inputClass = "input";

        if (this.props.validEmail) {
            inputClass = "input is-success";
        } else if (this.props.validEmail == false) {
            inputClass = "input is-danger";
        }

        return (
            <div class="box" id="login-box">
                <p class="title is-1">Socialite</p>
                <p class="subtitle is-3">Socialize Your Way</p>
                <form id="login-form" onSubmit={this.handleSubmit.bind(this)}>
                    <p class="control">
                        <input class={inputClass} id="login-username" type="text" placeholder="E-mail"
                               onChange={this.props.handleUsername}/>
                    </p>
                    <p class="control">
                        <input class="input" id="login-password" type="password" placeholder="Password"
                               onChange={this.props.handlePassword}/>
                    </p>
                    <p class="control">
                        <input class="button" id="login-submit" type="submit" value="Log in"/>
                        <a class="button is-primary" id="login-signup" onClick={this.handleSignupRedirect.bind(this)}>Sign up</a>
                    </p>
                </form>
            </div>
        );
    }
}