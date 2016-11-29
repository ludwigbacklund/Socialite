FB.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    console.log("ERROR",error);
});
var _ = require('lodash');
describe('Profile Page', function() {
    var self;

    before(function (done) {
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', username);
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        browser.waitForVisible("#profile-nav");
        browser.click("#profile-nav");
        return FB.database().ref("/users/"+FB.auth().currentUser.uid).once('value', data=>{
            self = data.val().fname + " " + data.val().lname;
            done;
        });
    });
    it("Should load the correct profile name",function(){
        browser.url("http://localhost:3000/profile/jmkmzJedonQfeVVwfFObgoibA6J3");
        browser.waitForVisible("#profile-name");
        return browser.waitUntil(function async () {
            return browser.getText('#profile-name').then(function(text) {
                return text != ("Loading data");
            });
        });

    });
    it("Should have ability to post profile message",function(){
        var currentMessages = _.keys(browser.elements(".profile-message").value).length;
        browser.waitForVisible("#profile-message-area");
        browser.setValue("textarea","hello world");
        browser.submitForm("#submit-message-form");
        browser.timeoutsAsyncScript(3000);
        _.keys(browser.elements(".profile-message").value).length.should.be.greaterThan(currentMessages);
        return browser
    });


});
