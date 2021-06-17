const ganache = require("ganache-core");
var HDWalletProvider = require("truffle-hdwallet-provider-privkey");

module.exports = {
  network: "ganache",
  networks: {
    ganache: {
      network_id: "*",
      provider: ganache.provider({ total_accounts: 100 })
    },
	  coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    },
    ropsten: {
      // provider: () => new HDWalletProvider([PK], `https://ropsten.infura.io/${INFURA_KEY}`),
      provider: () => new HDWalletProvider([PK], `127.0.0.1`),
      network_id: "*"
    }
  },
  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.5.7",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "petersburg"
      }
    }
  }
};
