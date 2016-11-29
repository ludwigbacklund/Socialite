import React, {Component} from "react";
import {render} from "react-dom";
import Message from "./chatmessage.component"

export default class ChatMessageList extends Component {

    componentDidUpdate() {
        this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
    }

    render() {
        return (
            <div ref="messages" class='messages'>
                {
                    this.props.messages.map((message, i) => {
                        return (
                            <Message
                                key={i}
                                text={message.text}
                                author={message.user}
                            />
                        );
                    })
                }
            </div>
        )
    }
}