import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import Avatar from 'react-avatar';
import * as _ from 'lodash';

export default class ChatName extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            chatName: 'Loading chat name...',
            className: 'chat-name'
        }
    }

    componentWillMount() {
        FB.database().ref('chats/' + this.props.chatId).once('value').then(chatsData => {
            var members = chatsData.val().members;
            if (_.keys(members).length > 2) {
                this.setState({
                    chatName: '- Group chat -'
                });
            } else {
                _.forEach(members, function (value, key) {
                    if (key != FB.auth().currentUser.uid) {
                        FB.database().ref('users/' + key).once('value').then(userData => {
                            var name = userData.val().fname + ' ' + userData.val().lname;
                            this.setState({
                                chatName: name
                            });
                        }).catch(err => {
                            console.log("ERROR Couldn't access user data in Firebase: ", err)
                        });
                    }
                }.bind(this));
            }
        }).catch(err => {
            console.log("ERROR Couödn't access chat data in Firebase: ", err)
        });
    }

    componentWillReceiveProps() {
        if (window.location.pathname.slice(6) == this.props.chatId) {
            this.setState({
                className: 'chat-name active-chat'
            })
        } else {
            this.setState({
                className: 'chat-name'
            })
        }
    }

    handleClick() {
        this.context.router.push('/chat/' + this.props.chatId);
        return true;
    }

    render() {
        return (
            <div class={this.state.className}>
                <a class="panel-block is-active chat-name-panel" onClick={this.handleClick.bind(this)}>
                    <span class="panel-icon" id="chat-icon">
                        <Avatar name={this.state.chatName} size={24}/>
                    </span>
                    {this.state.chatName}
                </a>
            </div>
        );
    }
}