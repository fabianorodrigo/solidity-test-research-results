var SimpleCoin = artifacts.require("SimpleCoin");

module.exports = function(callback) {

    SimpleCoin.deployed().then(instance => {
        // interact with the contract here
        // as an example, let's get the contract name
        return instance.name.call();
    }).then(response => {
        // log the response and then callback
        console.log(response);
        callback();
    });


}
