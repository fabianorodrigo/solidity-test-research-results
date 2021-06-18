const truffleAssert = require('truffle-assertions');
const OnceTransferablePermission = artifacts.require("OnceTransferablePermission");

contract("OnceTransferablePermission",(accounts)=>{
  let trace = false;
  let contractOnceTransferablePermission = null;
  beforeEach(async () => {
    contractOnceTransferablePermission = await OnceTransferablePermission.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: OnceTransferablePermission.new({from: accounts[0]}');
  });
  
  it('Should execute checkPermissions(address,bytes32)', async () => {
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[1], [68,194,155,161,155,243,54,136,19,146,38,161,165,14,141,71,230,122,131,41,24,186,246,96,129,205,130,171,12,181,228,104],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([172,207,119,192,201,224,175,177,30,47,23,161,73,142,136,242,26,237,75,197,188,98,224,194,23,144,11,6,142,222,103,130],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([15,34,18,84,235,105,172,140,0,146,164,172,103,149,251,114,141,103,76,13,89,233,186,225,130,42,145,136,226,79,233,151], accounts[0],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([15,34,18,84,235,105,172,140,0,146,164,172,103,149,251,114,141,103,76,13,89,233,186,225,130,42,145,136,226,79,233,151], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
