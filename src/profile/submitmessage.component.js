import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import Avatar from 'react-avatar'

export default class SubmitMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ownAvatar: null,
            messageText: ""
        }
    }

    componentWillMount() {
        FB.database().ref('users/' + FB.auth().currentUser.uid).once('value').then(userData => {
            this.setState({
                ownAvatar: <Avatar name={userData.val().fname + " " + userData.val().lname} size={72}/>
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        var newMessageRef = FB.database().ref('messages/' + this.props.id).push();
        newMessageRef.set({
            submitterId: FB.auth().currentUser.uid,
            text: this.state.messageText,
            timestamp: Date.now()
        });
        this.setState({messageText: ""});
    }

    handleMessage(e) {
        this.setState({messageText: e.target.value});
    }

    render() {
        return (
            <div id="submit-message">
                <article class="media">
                    <figure class="media-left">
                        {this.state.ownAvatar}
                    </figure>
                    <div class="media-content">
                        <form id="submit-message-form" onSubmit={this.handleSubmit.bind(this)}>
                            <p class="control">
                                <textarea class="textarea"
                                          id="profile-message-area"
                                          placeholder="Add a comment..."
                                          value={this.state.messageText}
                                          onChange={this.handleMessage.bind(this)}
                                          required/>
                            </p>
                            <p class="control">
                                <input class="button" type="submit" value="Post Comment"></input>
                            </p>
                        </form>
                    </div>
                </article>
            </div>
        );
    }
}


