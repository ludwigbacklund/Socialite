import React, {Component} from "react";
import {render} from "react-dom";

import ChatModal from './chatmodal.component.js'
import StartChatButton from './startchatbutton.component.js'

export default class StartChat extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="start-chat">
                <StartChatButton onClick={this.props.toggleStartChat}/>
                <ChatModal isActive={this.props.isActive} createRoom={this.props.createRoom}
                           addUser={this.props.addUser} toggleStartChat={this.props.toggleStartChat}/>
            </div>
        );
    }
}