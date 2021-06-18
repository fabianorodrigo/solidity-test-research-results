const Splitter = artifacts.require('Splitter');

module.exports = function(deployer, network, accounts) {
    deployer.deploy(Splitter, {from: accounts[0]} );
}