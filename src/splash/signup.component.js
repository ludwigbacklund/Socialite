import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

export default class Signup extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();

        FB.auth().createUserWithEmailAndPassword(this.props.username, this.props.password).then(() => {
            var newUserRef = FB.database().ref('users/' + FB.auth().currentUser.uid);
            newUserRef.set({
                email: this.props.username,
                fname: this.props.fname,
                lname: this.props.lname
            }).catch(err => {
                console.log("ERROR Couldn't create user in Firebase: ", err)
            });

        });
    }

    handleLoginRedirect() {
        this.context.router.push('/splash');
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
            <div class="box" id="signup-box">
                <p class="title is-1">Socialite</p>
                <p class="subtitle is-3">Socialize Your Way</p>
                <form id="signup-form" onSubmit={this.handleSubmit.bind(this)}>
                    <p class="control">
                        <input class={inputClass} id="login-fname" type="text" placeholder="First Name"
                               onChange={this.props.handleFirstName} required/>
                    </p>
                    <p class="control">
                        <input class={inputClass} id="login-lname" type="text" placeholder="Last Name"
                               onChange={this.props.handleLastName} required/>
                    </p>
                    <p class="control">
                        <input class={inputClass} id="login-username" type="text" placeholder="E-mail"
                               onChange={this.props.handleUsername} required/>
                    </p>
                    <p class="control">
                        <input class="input" id="login-password" type="password" placeholder="Password"
                               onChange={this.props.handlePassword} required/>
                    </p>
                    <p class="control">
                        <input class="button is-primary" id="signup-submit" type="submit" value="Sign up"/>
                        <a class="button" id="signup-login" onClick={this.handleLoginRedirect.bind(this)}>Log in</a>
                    </p>
                </form>
            </div>
        );
    }
}