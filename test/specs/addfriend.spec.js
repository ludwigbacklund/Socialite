var _ = require('lodash');

describe('Add Friend', function() {

    before(function () {

    });
    it("should display the add friend button for a non friend",function(){
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', username);
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        browser.waitForVisible("#profile-nav")
        browser.url('http://localhost:3000/profile/Xhr4tdG52dPzhzDk53vXecw10xB2');
        browser.waitForVisible(".add-friend-button");
        browser.isVisible(".add-friend-button").should.be.equal(true);
        return browser
    });
    it("should not show one way friendship in friends",function(){

       browser.click(".add-friend-button");
        browser.waitForVisible(".card");
        browser.getText(".is-5").should.not.include("Olof Surströmming");
    });
    it("should show request peding in one way friendships",function(){
        browser.url('http://localhost:3000/profile/Xhr4tdG52dPzhzDk53vXecw10xB2');
        browser.waitForVisible("#request-pending");
        browser.getText("#request-pending").should.be.equal("Request pending");
        return browser
    });

    it("should show two way friends in friend",function(){
        browser.click("#sign-out");
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', "mrcate@mrcate.com");
        browser.setValue('#login-password', "kylskåp12");
        browser.click('#login-submit');
        browser.waitForVisible("#profile-nav");
        browser.url('http://localhost:3000/profile/jmkmzJedonQfeVVwfFObgoibA6J3');
        browser.waitForVisible(".add-friend-button");
        browser.click(".add-friend-button");
        browser.waitForVisible(".card");
        browser.getText(".is-5").should.include("Mr Doge");
        return browser
    });


});
