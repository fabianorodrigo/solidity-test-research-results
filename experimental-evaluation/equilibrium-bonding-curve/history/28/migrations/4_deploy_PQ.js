/* global artifacts */
const PriorityQueue = artifacts.require('PriorityQueue.sol')

const deployPQ = async (deployer, network) => {

    await deployer.deploy(
        PriorityQueue
    )
}

module.exports = deployPQ
