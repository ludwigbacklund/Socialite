import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import ChatName from './chatname.component.js'

export default class ChatList extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            userChats: []
        }
    }

    componentWillMount() {
        FB.database().ref('/users/' + FB.auth().currentUser.uid + '/chats').on('child_added', userChatsData => {
            var userChats = this.state.userChats;

            userChats.unshift(<ChatName key={userChatsData.key} chatId={userChatsData.key}
                                        location={this.props.location}/>);

            this.setState({
                userChats: userChats
            });
        });
    }

    render() {
        return (
            <div id="chat-list">
                <nav class="panel chat-panel">
                    <p class="panel-heading chat-panel-heading">
                        Chats
                    </p>
                    <div class="chat-list-names">
                        {this.state.userChats}
                    </div>
                </nav>
            </div>
        );
    }
}