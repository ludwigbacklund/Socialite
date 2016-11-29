import React, {Component} from "react";
import {render} from "react-dom";
import Avatar from 'react-avatar';

export default class ChatMessage extends Component {

    render() {
        return (
            <div class="chat-message">
                <article class="media">
                    <figure class="media-left">
                        <Avatar name={this.props.author} size={40}/>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p id="user-message">
                                <strong>
                                    {this.props.author}
                                </strong>
                                <br/>
                                {this.props.text}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}