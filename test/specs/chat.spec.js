var _ = require('lodash');

FB.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
    console.log("ERROR", error);
});

var userRef;
userRef = FB.database().ref("/users");

describe('Chat Page', function () {

    var id;
    var self;
    var opponent;

    before(function () {
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', username);
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        FB.database().ref("/users/" + FB.auth().currentUser.uid).once('value', data=> {
            self = data.val().fname + " " + data.val().lname;
        });
        browser.waitForVisible('#start-chat-button');
        return browser
    });

    it('Should be able to open a chat', function () {
        console.log(browser.getUrl());
        var CurrentChatAmount = _.keys((browser.elements(".chat-name")).value).length;
        browser.click("#start-chat-button");
        browser.waitForVisible("#chat-modal");
        browser.getAttribute("#chat-modal", "class").should.be.equal("modal is-active");
        browser.click(".modal-checkbox");
        browser.isSelected(".modal-checkbox")[0].should.be.equal(true);
        id = browser.getAttribute(".modal-checkbox", "value")[0];
        console.log("ID",id);
        browser.waitForVisible("#create-chat-button");
        browser.click("#create-chat-button");
        FB.database().ref("/users/" + id).once('value', data=> {
            opponent = data.val().fname + " " + data.val().lname;
        });

        _.keys((browser.elements(".chat-name")).value).length.should.be.greaterThan(CurrentChatAmount);
        return browser
    });

    it('Should be able to send a message in the chat', function () {
        console.log(browser.getUrl());
        browser.setValue("#chat-field-textarea", "hello world");
        browser.keys('Enter');
        browser.waitForVisible("#user-message");
        browser.getText("#user-message").should.include(self + "\n" + "hello world");
        return browser
    });

    it('Should display the chat memebers', function () {
        console.log(browser.getUrl());
        browser.waitForVisible(".chat-member");
        browser.getText(".chat-member").should.be.deep.equal([opponent, self]);
        return browser
    });
});

