import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

import Message from './message.component.js'

export default class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            id: this.props.id
        }
    }

    componentWillMount() {
        this.updateMessages();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id
        }, this.updateMessages());

    }

    updateMessages() {
        var newMessages = [];
        FB.database().ref('messages/' + this.state.id).on('child_added', messageData => {

            newMessages.push(<Message key={messageData.val().timestamp}
                                      submitterId={messageData.val().submitterId}
                                      messageText={messageData.val().text}
                                      timestamp={messageData.val().timestamp}/>);
            this.setState({
                messages: newMessages
            });
        });
    }

    render() {
        return(
            <div class="profile-messages">
                <h1 class="title">Messages</h1>
                <hr/>
                {this.state.messages}
            </div>
        );
    }
}