import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

import ActiveChatMemberName from './activechatmembername.component';

export default class ActiveChatMemberList extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            memberNames: []
        }
    }

    componentWillMount() {
        this.generateMemberIds();
    }

    componentWillReceiveProps() {
        this.generateMemberIds();
    }

    generateMemberIds() {
        FB.database().ref('/chats/' + this.props.chatId + '/members').once('value', chatData => {
            this.generateMemberNames(_.keys(chatData.val()))
        }).catch(err => {
            console.log("ERROR Couldn't access chat members of currently active chat in Firebase: ", err)
        });
    }

    generateMemberNames(chatData) {
        // Creates the member links in the chat using ActiveChatMemberName
        var userNames = [];

        _.forEach(chatData, memberId => {
            FB.database().ref('/users/' + memberId).once('value').then(userData => {
                userNames.push(<ActiveChatMemberName key={memberId}
                                                     id={memberId}
                                                     name={userData.val().fname + ' ' + userData.val().lname}/>);
                this.setState({
                    memberNames: userNames
                });
            }).catch(err => {
                console.log("ERROR Couldn't access user in Firebase: ", err)
            });
        });
    }

    render() {
        return (
            <div class="tabs is-centered">
                <ul>
                    {this.state.memberNames}
                </ul>
            </div>
        )
    }
}