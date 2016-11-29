import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import * as _ from 'lodash';

import FriendSquare from './friendsquare.component.js'

export default class Friends extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            friendsColumn: [],
            tempFriends: []
        }
    }

    componentWillMount() {
        FB.database().ref('users/' + FB.auth().currentUser.uid + '/friends').once('value').then(friendsData => {
            var friendsKeys = _.keys(friendsData.val());
            var friendsValues = _.values(friendsData.val());

            for (var i = 0; i < friendsKeys.length; i++) {
                this.addFriends(friendsKeys, friendsValues, i);
            }

            //Mock data is fake users used to pad out a users friends-list, only for demonstration purposes
            FB.database().ref('users/mockdata').once('value').then(mockData => {
                var friendsAndMock = this.state.friends;
                friendsAndMock.push(_.values(mockData.val()).map(
                    (value, i) => <FriendSquare key={i} fname={value.fname} lname={value.lname} email={value.email}/>));
                this.setState({
                    friends: friendsAndMock
                });
            }).catch(err => {
                console.log("ERROR Couldn't mock data in Firebase: ", err)
            });
        }).catch(err => {
            console.log("ERROR Couldn't access current user's friends in Firebase: ", err)
        });
    }

    addFriends(friendsKeys, friendsValues, i) {
        if (friendsValues[i] == true) {
            FB.database().ref('users/' + friendsKeys[i]).once('value').then(data => {
                var tempFriends = this.state.friends;
                var square = <FriendSquare key={Date.now()}
                                           fname={data.val().fname}
                                           lname={data.val().lname}
                                           email={data.val().email}
                                           userId={friendsKeys[i]}/>;
                tempFriends.push(square);
                this.setState({
                    friends: tempFriends
                });
            }).catch(err => {
                console.log("ERROR Couldn't access friend of current user in Firebase: ", err)
            });
        }
    }

    render() {
        return (
            <div id="friends">
                <section class="hero is-primary">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <h1 class="title">
                                Friends
                            </h1>
                        </div>
                    </div>
                </section>
                <div class="columns is-multiline friends">
                    {this.state.friends}
                </div>
            </div>
        );
    }
}