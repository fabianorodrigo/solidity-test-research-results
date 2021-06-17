/* global artifacts */
const BondingCurve = artifacts.require('BondingCurve.sol')
const Token = artifacts.require('Token.sol')

const deployBondingCurve = async (deployer, network) => {
    const tokenAddress = Token.address

    await deployer.deploy(
        BondingCurve,
        tokenAddress
    )
}

module.exports = deployBondingCurve
