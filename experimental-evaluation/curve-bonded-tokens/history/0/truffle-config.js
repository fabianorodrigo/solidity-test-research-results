/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: "*",
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  networks: {
    coverage: {                                                                        
      host: "localhost",                                                               
      network_id: "*",                                                                 
      port: 8555,         // <-- If you change this, also set the port option in .solco
      gas: 0xfffffffffff, // <-- Use this high gas value                               
      gasPrice: 0x01      // <-- Use this low gas price                                
    } 
   },
   compilers: {
    solc: {
      version: "0.4.25",
    }
  }
  
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
};
