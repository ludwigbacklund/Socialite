import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import Avatar from 'react-avatar';

import Messages from './messages.component.js'
import SubmitMessage from './submitmessage.component.js'
import AddFriendButton from './addfriendbutton.component.js'
import RequestPending from './requestpending.component.js'

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id,
            fname: 'Loading',
            lname: 'Data',
            email: null,
            avatar: null,
            returnHTML: ""
        }
    }

    componentWillMount() {
        this.retrieveProfileData(this.state.id);
        if (FB.auth().currentUser.uid != this.state.id) {
            FB.database().ref('users/' + FB.auth().currentUser.uid + '/friends').once('value', userData => {
                if (!userData.hasChild(this.state.id) && this.state.id != 'undefined') {
                    this.setState({
                        returnHTML: <AddFriendButton id={this.state.id}/>
                    })
                } else if (!userData.val()[this.state.id]) {
                    this.setState({
                        returnHTML: <RequestPending/>
                    })
                }
            }).catch(err => {
                console.log("ERROR Couldn't access friends of current user in Firebase: ", err)
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.params.id
        }, this.retrieveProfileData(nextProps.params.id));
    }

    retrieveProfileData(id) {
        FB.database().ref('users/' + id).once('value').then(userData => {
            this.setState({
                fname: userData.val().fname,
                lname: userData.val().lname,
                email: userData.val().email,
                avatar: <Avatar name={userData.val().fname + " " + userData.val().lname} size={78}/>
            });
        }).catch(err => {
            console.log("ERROR Couldn't access user in Firebase: ", err)
        });
    }

    render() {
        return (
            <div id="profile">
                <div id="profile-hero">
                    <section class="hero is-primary">
                        <div class="hero-body">
                            <div class="container has-text-centered">
                                <h1 class="title">
                                    Profile
                                </h1>
                            </div>
                        </div>
                    </section>
                </div>
                <div id="profile-user-content">
                    <section class="hero">
                        <div class="hero-body">
                            <div id="profile-user-avatar" class="container">
                                {this.state.avatar}
                            </div>

                            <div id="profile-user-name" class="container">
                                <h1 id="profile-name" class="title">
                                    {this.state.fname + " " + this.state.lname}
                                </h1>
                                <h2 class="subtitle">
                                    {this.state.email}
                                </h2>
                            </div>
                            {this.state.returnHTML}
                        </div>
                    </section>
                </div>
                <Messages id={this.state.id}/>
                <SubmitMessage avatar={this.state.avatar} id={this.state.id}/>
            </div>
        );
    }
}