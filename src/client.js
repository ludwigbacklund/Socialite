import React, {Component} from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, browserHistory, IndexRedirect} from "react-router";
import * as elasticsearch from 'elasticsearch';
import * as _ from 'lodash';

import * as FB from 'firebase'

var config = {
    apiKey: "AIzaSyDev18fJplYSrWYWeBNNVshIL3qetgpWd0",
    authDomain: "socialite-93eab.firebaseapp.com",
    databaseURL: "https://socialite-93eab.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "184526267305"
};

FB.initializeApp(config);

import auth from './auth.js'
import Layout from './pages/layout.component.js'
import Logout from './common/logout.component.js'
import Splash from './pages/splash.component.js'
import Friends from './friends/friends.component.js'
import AddFriend from './common/addfriend.component.js'
import Login from './splash/login.component.js'
import Signup from './splash/signup.component.js'
import ChatContainer from './chat/chatcontainer.component.js'
import Profile from './profile/profile.component.js'
import Search from './common/search.component.js'
import Home from './common/home.component.js'

render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout} onEnter={auth.auth(false, '/splash')}>
            <IndexRoute component={Home}/>
            <Route path="profile/:id" component={Profile}/>
            <Route path="friends" component={Friends}/>
            <Route path="add_friend/:id" component={AddFriend}/>
            <Route path="logout" component={Logout}/>
            <Route path="chat/:id" component={ChatContainer}/>
            <Route path="search" component={Search}/>
        </Route>
        <Route path="splash" component={Splash} onEnter={auth.auth(true, '/')}>
            <IndexRoute component={Login}/>
            <Route path="sign_up" component={Signup}/>
        </Route>
    </Router>,
    document.getElementById('app')
);

var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

//These are used to keep ElasticSearch up-to-date with the changes in Firebase (the changes we are interested in for
//searching)
var usersRef = FB.database().ref('users');
usersRef.on('child_added', upsert);
usersRef.on('child_changed', upsert);
usersRef.on('child_removed', remove);

FB.database().ref('Search/requests').on('child_added', processRequest);


//ElasticSearch function that is triggered whenever a search request is added to the database. ElasticSearch processes
//the search and push the search results to the database under /Search/response
function processRequest(snap) {
    console.log("Processing Request");
    snap.ref.remove();
    var data = snap.val();
    client.search(
        {index: 'firebase', body: {query: {query_string: {query: "*" + data.term + "*", fields: ['fname','lname']}}}}, function(error, response) {
            if (response.hits.total > 0) {
                _.forEach(response.hits.hits, function(hit) {
                    console.log("FOUND REQUEST WITH KEY" + snap.key);
                    var res = FB.database().ref('Search/response/' + snap.key).push();
                    res.set({
                        hits: response.hits.total,
                        id: hit._id,
                        fname: hit._source.fname,
                        lname: hit._source.lname,
                        email: hit._source.email
                    })
                });
            }
        }
    );
}

function upsert(snapshot){
    if (snapshot.key != "mockdata") {
        client.index({
            index: 'firebase',
            type: 'users',
            id: snapshot.key,
            body: snapshot.val()
        }, function (err, response) {
            if (err) {
                console.log("Error indexing user: " + err);
            }
        })
    }
}

function remove(snapshot){
    if (snapshot.key != "mockdata") {
        client.delete({
            index: 'firebase',
            type: 'users',
            id: snapshot.key()
        }, function (error, response) {
            if (error) {
                console.log("Error deleting user : " + error);
            }
        })
    }
}