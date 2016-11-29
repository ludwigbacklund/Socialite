import React, {Component} from "react";
import {render} from "react-dom";
import * as FB from 'firebase';

import SearchBar from './searchbar.component.js'

export default class Nav extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleTitle() {
        this.context.router.push('/');
        return true;
    }

    handleChat() {
        this.context.router.push('/');
        return true;
    }

    handleProfile() {
        var ownProfile = "/profile/" + FB.auth().currentUser.uid;
        this.context.router.push(ownProfile);
        return true;
    }

    handleFriends() {
        this.context.router.push('/friends');
        return true;
    }

    handleLogout() {
        this.context.router.push('/logout');
        return true;
    }

    render() {
        return (
            <div id="nav">
                <nav class="nav">
                    <div class="nav-left">
                        <a class="nav-item" onClick={this.handleTitle.bind(this)}>
                            <p class="title is-1">Socialite</p>
                        </a>
                    </div>

                    <div class="nav-right nav-menu">

                        <a id="chat-nav" class="nav-item" onClick={this.handleChat.bind(this)}>
                            Chat
                        </a>

                        <a id="profile-nav" class="nav-item" onClick={this.handleProfile.bind(this)}>
                            Profile
                        </a>

                        <a id="friends-nav" class="nav-item" onClick={this.handleFriends.bind(this)}>
                            Friends
                        </a>

                        <SearchBar/>

                        <span class="nav-item">
                            <a class="button is-primary" onClick={this.handleLogout.bind(this)}>
                                <span id ="sign-out">Sign out</span>
                            </a>
                        </span>
                    </div>
                </nav>
            </div>
        );
    }
}