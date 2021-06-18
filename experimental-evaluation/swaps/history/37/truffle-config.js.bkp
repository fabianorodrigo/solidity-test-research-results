const ganache = require("ganache-core");

module.exports = {
  network: "ganache",
  networks: {
    ganache: {
      network_id: "*",
      provider: ganache.provider({ total_accounts: 100 })
    }
  },
  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.5.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
