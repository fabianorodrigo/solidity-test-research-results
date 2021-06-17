var Button = artifacts.require("./Button.sol");

module.exports = function(deployer) {
  var paymentTokenAddress = "0x5eb7e67ec2ce404ebabafed0a79bab10d030c58a";  
  deployer.deploy(Button, paymentTokenAddress);
};