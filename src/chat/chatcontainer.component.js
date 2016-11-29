import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import * as _ from 'lodash';

import ChatList from './chatlist.component.js'
import StartChat from './startchat.component.js'
import ActiveChat from './activechat.component.js'

export default class ChatContainer extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            currentChatId: 'abc', selectedUsers: [FB.auth().currentUser.uid], isActive: ''
        }
    }

    componentWillMount() {
        this.setState({
            currentChatId: this.props.params.id
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentChatId: nextProps.params.id
        });
    }

    createRoom() {
        this.startChat();
    }

    addUser(e) {
        // Adds checked user to list, to create a groupchat with
        if (e.target.checked) {
            var users = this.state.selectedUsers;
            users.push(e.target.value);
            this.setState({selectedUsers: users});
        } else if (!e.target.checked) {
            var users = this.state.selectedUsers;
            var index = users.indexOf(e.target.value);
            users.splice(index, 1);
            this.setState({selectedUsers: users});
        }
    }


    startChat() {
        // Creates Chat object in DB and sets the necessary members to users.
        var newChatRef = FB.database().ref('/chats').push();
        var key = newChatRef.key;
        var temp = {};
        temp[key] = true;
        var chatMembers = {};

        _.forEach(this.state.selectedUsers, value => {
            chatMembers[value] = true;
            FB.database().ref('/users/' + value + '/chats/').update(temp).catch(err => {
                console.log("ERROR Couldn't add new chat to user in Firebase: ", err)
            });
        });
        FB.database().ref('/chats/' + key + '/members/').set(chatMembers).catch(err => {
            console.log("ERROR Couldn't set members of current chat in Firebase: ", err)
        });
        this.toggleStartChat();
    }

    toggleStartChat() {
        //Sets the modal to be active or inactive
        if (this.state.isActive == ' is-active') {
            this.setState({isActive: ''})
        } else {
            this.setState({isActive: ' is-active'})
        }
    }

    render() {
        return (
            <div>
                <section class="hero is-primary">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <h1 class="title">
                                Chat
                            </h1>
                        </div>
                    </div>
                </section>
                <div class="box" id="chat-container">
                    <div id="left-chat-area">
                        <StartChat createRoom={this.createRoom.bind(this)} addUser={this.addUser.bind(this)}
                                   toggleStartChat={this.toggleStartChat.bind(this)} isActive={this.state.isActive}/>
                        <ChatList location={this.props.location}/>
                    </div>
                    <ActiveChat currentChatId={this.state.currentChatId}/>
                </div>
            </div>
        );
    }
}