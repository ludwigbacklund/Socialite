import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

import ChatModalFriend from './chatmodalfriend.component.js';
import CreateRoomButton from './createroombutton.component';

export default class ChatModal extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }
    }

    componentWillMount() {
        FB.database().ref('users/' + FB.auth().currentUser.uid + '/friends').once('value').then(friendsData => {
            var friendsKeys = _.keys(friendsData.val());
            var friendsValues = _.values(friendsData.val());

            for (var i = 0; i < friendsKeys.length; i++) {
                this.addFriends(friendsKeys, friendsValues, i);
            }
        });
    }

    addFriends(friendsKeys,friendsValues, i) {
        // Displays the users friend
        if (friendsValues[i] == true) {
            FB.database().ref('users/' + friendsKeys[i]).once('value').then(data => {
                var tempFriends = this.state.friends;
                var square = <ChatModalFriend key={Date.now()}
                                              fname={data.val().fname}
                                              lname={data.val().lname}
                                              email={data.val().email}
                                              userId={friendsKeys[i]}
                                              toggleStartChat={this.props.toggleStartChat}
                                              addUser={this.props.addUser}/>;
                tempFriends.push(square);
                this.setState({
                    friends: tempFriends
                });
            });
        }
    }

    render() {
        return(
            <div class={"modal" + this.props.isActive} id="chat-modal">
                <div class="modal-background" onClick={this.props.toggleStartChat}></div>
                <div class="modal-content">
                    <div class="box">
                        <p class="title is-4">Start a chat with:</p>
                        <hr/>
                        {this.state.friends}
                        <CreateRoomButton onClick={this.props.createRoom}/>
                    </div>

                </div>
                <button class="modal-close" onClick={this.props.toggleStartChat}></button>
            </div>
        );
    }
}