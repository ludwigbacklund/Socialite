describe('Signout page', function() {

    it("should Log out",function(){
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', username);
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        browser.waitForVisible("#sign-out");
        browser.click("#sign-out");
        browser.isVisible("#login-form").should.be.equal(true);
        return browser
    });

    it("should redirect unathorized user to splash screen",function(){
        browser.url('http://localhost:3000/profile/Xhr4tdG52dPzhzDk53vXecw10xB2');
        browser.isVisible("#login-form").should.be.equal(true);
        browser.getUrl().should.be.equal("http://localhost:3000/splash");
    });
});
