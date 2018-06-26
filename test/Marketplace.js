//Test the contract

var Marketplace = artifacts.require("./Marketplace.sol");

//start contract testing
contract("Marketplace", function(accounts){

    var articleName = "test_article";
    var articleDesciption = "this is a test";
    var articlePrice =  web3.toWei(10,"ether");
    
    //start the first test
    it("article counter is zero in the beginning", function(){
        return Marketplace.deployed().then(function(instance){
            return instance.getNumberOfArticles();
        }).then(function(articleNumber){
            assert.equal(articleNumber, 0, "initial number not equal to zero");
        });
   });  

       //start the first test
       it("should have one article for sale", function(){
            var MarketplaceInstance;

        return Marketplace.deployed().then(function(instance){
            MarketplaceInstance = instance;
            return MarketplaceInstance.sellArticle(
                articleName,
                articleDesciption,
                articlePrice,
                {'from':accounts[0]}
            )
        }).then(function(){
            return MarketplaceInstance.getNumberOfArticles();
        }).then(function(articleCounter){
            assert.equal(articleCounter,1,"articleCounter has not increased");
        }).then(function(){
            return MarketplaceInstance.articles(1);
        }).then(function(article){
            assert.equal(article[0],1,"id is not 1");
            assert.equal(article[1],articlePrice,"price is not ten ether");
            assert.equal(article[2],accounts[0],"seller is not correct");
            assert.equal(article[3],0x0,"buyer is not unknown");
            assert.equal(article[4],articleName,"articleName is not correct");
            assert.equal(article[5],articleDesciption,"articleDescription is not correct");
        });
    });
});
