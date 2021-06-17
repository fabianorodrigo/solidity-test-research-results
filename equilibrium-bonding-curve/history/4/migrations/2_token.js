/* global artifacts */

const Token = artifacts.require('Token.sol')

const token = (deployer) => {
    deployer.deploy(Token)
}

module.exports = token
