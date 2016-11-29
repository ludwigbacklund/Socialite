
describe('Login Page', function() {
    it('Should display red bar around email field upon invalid input',function(){
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', 'mrcate');
        browser.getAttribute('#login-username',"class").should.be.equal("input is-danger");
        return browser
    });
    it('Should prevent user from loggin in with invalid email',function(){
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', 'mrcate.com');
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        browser.isVisible('#login-username').should.be.equal(true);
        return browser
    });

    it('Should successfully Log in a user', function () {
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', username);
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        browser.waitForVisible('#sign-out');
        browser.getText('#sign-out').should.be.equal('Sign out');
        return browser
    });

});
