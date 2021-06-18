const Migrations = artifacts.require('./Migrations.sol');
const AtlantisToken = artifacts.require('./AtlantisToken.sol');
const AtlantisCrowdsale = artifacts.require('./AtlantisCrowdsale.sol');

module.exports = function (deployer) {
    const time = Math.round((new Date()).getTime() / 1000);

    deployer.deploy(Migrations);
    deployer.deploy(AtlantisToken);
    deployer.deploy(
        AtlantisCrowdsale,
        10000, // uint256 rate
        '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF', // address payable wallet
        '0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF', // IERC20 token
        web3.utils.toWei('1000'), // uint256 hardcap
        time + 1000, // uint256 openingTime
        time + 2000, // uint256 closingTime
        web3.utils.toWei('1') // uint256 minLimit
    );
};
