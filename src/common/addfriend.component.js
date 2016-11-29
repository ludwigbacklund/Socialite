import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';
import * as _ from 'lodash';

export default class AddFriend extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.addFriend(this.props.params.id);
    }

    isValidUser(id) {
        return FB.database().ref('users/' + id);
    }

    addFriend(newFriendId) {
        if (this.isValidUser(newFriendId)) {
            var currentUserRef = FB.database().ref('users/' + FB.auth().currentUser.uid + '/friends');
            var newFriendRef = FB.database().ref('/users/' + newFriendId + '/friends');

            newFriendRef.once('value', newFriendData => {
                //If the friend to add has already added the currently logged in user then both should change their
                //friend status to each other to true
                if (newFriendData.hasChild(FB.auth().currentUser.uid)) {
                    var temp1 = {};
                    temp1[FB.auth().currentUser.uid] = true;
                    newFriendRef.update(temp1).catch(err => {
                        console.log("ERROR Couldn't update new friend in Firebase: ", err)
                    });

                    var temp2 = {};
                    temp2[newFriendId] = true;
                    currentUserRef.update(temp2).catch(err => {
                        console.log("ERROR Couldn't update current user friend data in Firebase: ", err)
                    });
                } else {
                    //If only the currently logged in user has added the other person then it's a one-way friendship
                    //and the friend status to the other user is set to false (added but not reciprocated)
                    var temp3 = {};
                    temp3[newFriendId] = false;
                    currentUserRef.update(temp3).catch(err => {
                        console.log("ERROR Couödn't update current user friend data in Firebase: ", err)
                    });
                }
            }).catch(err => {
                console.log("ERROR Couldn't access new friend data in Firebase: ", err)
            });

            this.context.router.push('/friends')
        }
    }

    render() {
        return (
            <div>
                {/*{_.forEach(this.state.friends, function(value, id) {*/}
                {/*<FriendSquare id={id}/>*/}
                {/*})}*/}
            </div>
        );
    }
}