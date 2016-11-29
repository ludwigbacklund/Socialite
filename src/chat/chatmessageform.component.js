import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

export default class ChatMessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleSubmit(e) {
        //If Enter has been pressed, submit form to DB
        if (e.which == 13) {
            e.preventDefault();
            if (this.state.text != '') {
                FB.database().ref('users/' + FB.auth().currentUser.uid).once('value', userData => {
                    var name = userData.val().fname + " " + userData.val().lname;

                    var message = {
                        text: this.state.text,
                        user: name
                    };

                    this.props.onMessageSubmit(message);
                    this.setState({text: ''});
                }).catch(err => {
                    console.log("ERROR Couldn't access current user data in Firebase: ", err)
                });
            }
        }
    }

    changeHandler(e) {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <div id='active-chat-submit'>
                <form id="active-chat-form" onSubmit={this.handleSubmit.bind(this)} ref="formSubmit">
                    <textarea
                        id="chat-field-textarea"
                        onChange={this.changeHandler.bind(this)}
                        value={this.state.text}
                        class="textarea chat-message-textarea"
                        placeholder="Type your message here..."
                        onKeyDown={this.handleSubmit.bind(this)}
                    />
                </form>
            </div>
        );
    }
};

