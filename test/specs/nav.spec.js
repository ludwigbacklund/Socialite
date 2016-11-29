FB.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    console.log("ERROR",error);
});
describe('Nav Page', function() {
    var self;

    before(function () {
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', username);
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        FB.database().ref("/users/"+FB.auth().currentUser.uid).once('value', data=>{
            self = data.val().fname + " " + data.val().lname;
        });
        return browser
    });
    it("Should allow navigation to profile page",function(){
        browser.waitForVisible("#profile-nav");
        browser.click("#profile-nav");
        browser.waitForVisible("#profile-name");
        browser.isVisible(".profile-messages").should.be.equal(true);
        browser.getUrl().should.be.equal("http://localhost:3000/profile/jmkmzJedonQfeVVwfFObgoibA6J3");
        return browser
    });
    it("Should allow navigation to Friend page",function(){
        browser.waitForVisible("#friends-nav");
        browser.click("#friends-nav");
        browser.timeoutsAsyncScript(1000);
        browser.isVisible("#friends").should.be.equal(true);
        browser.getUrl().should.be.equal("http://localhost:3000/friends");
        return browser
    });
    it("Should allow navigation to chat page",function(){
        browser.waitForVisible("#chat-nav");
        browser.click("#chat-nav");
        browser.waitForVisible("#chat-container");
        browser.isVisible("#active-chat").should.be.equal(true);
        return browser
    });
});
