const HDWalletProvider = require("truffle-hdwallet-provider");


module.exports = {

  plugins: ["truffle-security"],

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    },
    goerli: {
      provider: () =>
        new HDWalletProvider(require('./mnemonic.js'), 'https://goerli.infura.io/v3/a5d418a8a94240fa8d067ed1ac2313fa'),
      network_id: "*",
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(require('./mnemonic.js'), 'https://kovan.infura.io/v3/a5d418a8a94240fa8d067ed1ac2313fa'),
      network_id: "*",
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(require('./mnemonic.js'), 'https://rinkeby.infura.io/v3/a5d418a8a94240fa8d067ed1ac2313fa'),
      network_id: "*",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(require('./mnemonic.js'), 'https://ropsten.infura.io/v3/a5d418a8a94240fa8d067ed1ac2313fa'),
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.5.2",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}
