import React, {Component} from "react";
import {render} from "react-dom";

export default class AddFriendButton extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    handleClick(e) {
        this.context.router.push('add_friend/' + this.props.id);
    }

    render() {
        return (
            <div id="add-friend-button">
                <br/>
                <br/>
                <br/>
                <br/>
                <a class="button is-primary is-outlined add-friend-button" onClick={this.handleClick.bind(this)}>
                    Add friend
                </a>
            </div>
        );
    }
}