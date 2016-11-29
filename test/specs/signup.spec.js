describe('Register page', function() {

    it("should display register form out",function(){
        browser.url('http://localhost:3000');
        browser.click('#login-signup');
        browser.isVisible("#signup-form").should.be.equal(true);
        return browser
    });

    it("should allow user to register and redirect",function(){
        browser.setValue("#login-fname", "Test");
        browser.setValue("#login-lname", "Run");
        browser.setValue("#login-username", "test@test.com");
        browser.setValue("#login-password", "123123");
        browser.click("#signup-submit");
        console.log(browser.getUrl());
        browser.waitForVisible("#profile-nav");
        browser.getUrl().should.not.be.equal("http://localhost:3000/splash/sign_up");
        return browser
    });
});
