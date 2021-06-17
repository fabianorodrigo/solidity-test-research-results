const NOIAToken = artifacts.require("NOIAToken");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(NOIAToken)
};
