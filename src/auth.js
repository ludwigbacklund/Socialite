import * as FB from 'firebase'

//Auth function that is called on whenever a page is visited, ensures that the user is redirected to /splash when not
//logged in and to / if they are logged in
var auth = function(redirectWhenUserIs, url,router) {
    return (nextState, replace, callback) => {
        FB.auth().onAuthStateChanged(function(user) {
            if (user && !redirectWhenUserIs) {
                callback();
            } else if (!user && !redirectWhenUserIs){ // When the user is not logged in
                replace({pathname: url});
                callback();
            } else if (!user && redirectWhenUserIs) {
                callback();
            } else if (user && redirectWhenUserIs) {
                replace({pathname: url});
                window.location.reload(); // Fixes bug where firebase .on didnt fire (in search functions) until refresh.
                callback();
            }
        });
    };
};

module.exports.auth = auth;