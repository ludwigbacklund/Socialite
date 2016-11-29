var _ = require('lodash');
var elasticsearch = require('elasticsearch')

FB.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    console.log("ERROR",error);
});

var userRef;
userRef = FB.database().ref("/users");

describe('Search Page', function() {

    var client;


    before(function(done){
        browser.url('http://localhost:3000');
        browser.setValue('#login-username', username);
        browser.setValue('#login-password', password);
        browser.click('#login-submit');
        client = new elasticsearch.Client({
            host: 'localhost:9200'
        });

    });

    it('should display the proper search result',function() {
        var resultList = [];
        client.search(
            {index: 'firebase', body: {query: {query_string: {query: "*" + 'Screencast' + "*", fields: ['fname','lname']}}}},
            function(error, response) {
                if (response.hits.total > 0) {
                    _.forEach(response.hits.hits, function(hit) {
                        resultList.push(hit._source.fname + " " + hit._source.lname)
                    });
                }
            }
        );
        browser.waitForVisible("#searchbar-input");
        browser.setValue('#searchbar-input', 'Screencast');
        browser.submitForm('#searchbar-form');
        browser.waitForVisible(".card");
        browser.getText('.is-5').should.be.deep.equal(resultList);
    });

    it('should not display results upon empty search',function() {
        var thisResults = [];
        browser.waitForVisible("#searchbar-input");
        browser.setValue('#searchbar-input', 'IAMSEARCHRING FOR NOTHING THAT DOESNT EXIST');
        browser.submitForm('#searchbar-form');
        browser.getHTML('.columns',false).should.be.equal('');
    });
});
