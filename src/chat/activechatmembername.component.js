import React, {Component} from "react";
import {render} from "react-dom";
import Avatar from 'react-avatar';

export default class ActiveChatMemberName extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };


    handleClick() {
        this.context.router.push('/profile/' + this.props.id);
        return true;
    }

    render() {
        return (
            <li>
                <a onClick={this.handleClick.bind(this)}>
                    <span class="icon is-medium member-avatar">
                        <Avatar name={this.props.name} size={24}/>
                    </span>
                    <span class="chat-member">{this.props.name}</span>
                </a>
            </li>
        )
    }
}