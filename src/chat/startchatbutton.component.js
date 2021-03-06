import React, {Component} from "react";
import {render} from "react-dom";

export default class StartChatButton extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="button is-primary is-outlined is-medium" id="start-chat-button" onClick={this.props.onClick}>
                Start Chat
            </div>
        );
    }
}