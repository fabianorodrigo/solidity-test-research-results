var King = artifacts.require("./King.sol");

module.exports = function(deployer) {
  var paymentTokenAddress = "0x5eb7E67eC2CE404EbAbafED0A79BaB10D030c58a";  
  deployer.deploy(King, paymentTokenAddress);
};