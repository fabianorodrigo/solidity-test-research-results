module.exports = {
   networks:{
	   coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    }
	},
   compilers: {
    solc: {
      version: "0.5.0",
    }
  }
  
  };
  
