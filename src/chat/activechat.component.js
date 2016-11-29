import React, {Component} from "react";
import * as FB from 'firebase';
import * as _ from 'lodash';

import ChatMessageList from './chatmessagelist.component.js';
import ChatMessageForm from'./chatmessageform.component.js';
import ActiveChatMemberList from './activechatmemberlist.component.js';

var socket = io.connect();

export default class ActiveChat extends Component {

    constructor(props) {
        super(props);
        this.state =
        {users: [], messages: [], text: ''};
    };

    setSocketListeners() {
        this.state.socket.on('init', this._initialize.bind(this));
        this.state.socket.on('send:message', this._messageReceive.bind(this));
        this.state.socket.on('user:left', this._userLeft.bind(this));
    }

    componentWillMount() {
        this.loadMessages(this.props.currentChatId);
        this.setState({socket: this.socket_connect((this.props.currentChatId))}, this.setSocketListeners.bind(this));
    }

    //This is triggered whenever the user browses to a new chat which means we have to disconnect the old socket
    //and clear the messages in the active chat window
    componentWillReceiveProps(nextProps) {
        this.state.socket.disconnect();
        this.setState({
            messages: []
        });
        this.loadMessages(nextProps.currentChatId);
        this.setState({socket: this.socket_connect((nextProps.currentChatId))}, this.setSocketListeners.bind(this));
    }

    socket_connect(room) {
        // Send room creation request to Express, used to create a room
        return io.connect({
            query: 'room=' + room
        });
    }

    _initialize(data) {
        var {users, name} = data;
        this.setState({users, user: name})
    }

    _messageReceive(message) {
        var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }

    _userLeft(data) {
        var {messages} = this.state;
        messages.push({
            text: 'left'
        });
        this.setState({messages});
    }

    handleMessageSubmit(message) {
        var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
        this.state.socket.emit('send:message', message);
        var newPostRef = FB.database().ref('/chats/' + this.props.currentChatId + '/messages').push();

        newPostRef.set({
            text: message.text,
            user: message.user
        }).catch(err => {
            console.log("ERROR Couldn't push messages to current chat in Firebase: ", err)
        });
    }

    loadMessages(chatId) {
        // Loads messages from DB upon entering.
        FB.database().ref('/chats/' + chatId + '/messages').limitToLast(25).once('value', messagesData => {
            this.setState({
                messages: _.values(messagesData.val())
            })
        }).catch(err => {
            console.log("ERROR Couldn't access messages of currently active chat in Firebase: ", err)
        });
    }

    render() {
        return (
            <div id="active-chat">
                <div class="box" id="active-chat-window">
                    <ActiveChatMemberList chatId={this.props.currentChatId}/>
                    <ChatMessageList messages={this.state.messages}/>
                </div>
                <ChatMessageForm onMessageSubmit={this.handleMessageSubmit.bind(this)}/>
            </div>
        );
    }
}

