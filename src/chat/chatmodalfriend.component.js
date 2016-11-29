import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import Avatar from 'react-avatar'

import ChatModal from './chatmodal.component.js'

export default class ChatModalFriend extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="modal-friend">
                <article class="media">
                    <figure class="media-left">
                        <Avatar name={this.props.fname + " " + this.props.lname} size={32}/>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="control">
                                <label type="checkbox">
                                    <input class="modal-checkbox"
                                           type="checkbox"
                                           id={this.props.userId}
                                           value={this.props.userId}
                                           onClick={this.props.addUser}/>
                                    {this.props.fname + " " + this.props.lname}
                                </label>
                            </p>
                        </div>
                    </div>
                </article>
                <hr/>
            </div>
        );
    }
}