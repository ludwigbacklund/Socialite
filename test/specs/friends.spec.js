var _ = require('lodash');

FB.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    console.log("ERROR",error);
});

var userRef;
userRef = FB.database().ref("/users");

describe('Friends Page', function() {

    var friendsLength;
    var mockLength;

    before(function(done){
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', username);
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        FB.database().ref("/users/"+FB.auth().currentUser.uid).once('value', data=>{
            friendsLength = _.keys(data.val().friends).length;
        });
        FB.database().ref("/users/mockdata").once('value',data=>{
            mockLength = _.keys(data.val()).length;
            done
        });
        browser.waitForVisible("#friends-nav");
        browser.click('#friends-nav');
    });

    it('Should display the proper amount of friends',function() {
        browser.url("http://localhost:3000/friends");
        console.log(browser.getUrl());
        browser.waitForVisible(".card");
        var CurrentChatAmount = _.keys(browser.elements(".card").value).length;
        var trueAmount = CurrentChatAmount-mockLength;
        friendsLength.should.be.equal(trueAmount);
        return browser
    });

    it('Should link the users profile',function(){
        console.log(browser.getUrl());
        browser.waitForVisible(".card");
        browser.click(".card");
        browser.waitForVisible("#profile-name");
         return browser.waitUntil(function async () {
             return browser.getText('#profile-name').then(function(text) {
                 return text != ("Loading data");
            });
        });
    });

});
