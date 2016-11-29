import React, {Component} from "react";
import {render} from "react-dom";
import Avatar from 'react-avatar';

export default class FriendSquare extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    handleProfileClick() {
        this.context.router.push('/profile/' + this.props.userId);
        return true;
    }

    render() {
        return (
            <div class="column is-narrow">
                <div class="card" onClick={this.handleProfileClick.bind(this)}>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-32x32">
                                    <Avatar name={this.props.fname + " " + this.props.lname} size={32}/>
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-5">
                                    {this.props.fname + " " + this.props.lname}
                                </p>
                                <p class="subtitle is-6">{this.props.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}