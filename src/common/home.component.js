import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import * as _ from 'lodash';

export default class Home extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            currentChatId: null
        }
    }

    componentWillMount() {
        FB.database().ref('users/' + FB.auth().currentUser.uid + '/chats').limitToLast(1).once('value').then(chatData => {
            this.setState({
                currentChatId: _.keys(chatData.val())[0]
            });

            this.context.router.push('/chat/' + this.state.currentChatId);
        }).catch(err => {
            console.log("ERROR Couldn't load chats of current user in Firebase: ", err)
        });
    }

    render() {
        return (
            <div id="home">

            </div>
        );
    }
}