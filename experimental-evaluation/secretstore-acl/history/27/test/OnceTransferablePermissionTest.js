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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[9], [206,145,81,210,143,140,9,103,186,175,99,53,137,222,81,23,151,104,2,166,105,175,90,38,241,133,126,181,197,151,60,213],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([13,75,123,20,83,65,244,217,245,222,122,148,101,195,126,103,129,63,67,95,12,195,93,242,2,235,70,208,227,25,217,75],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([112,107,61,175,229,206,249,1,224,88,245,66,2,199,246,160,99,83,113,138,60,12,161,77,97,202,29,205,130,76,104,199], accounts[4],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([112,107,61,175,229,206,249,1,224,88,245,66,2,199,246,160,99,83,113,138,60,12,161,77,97,202,29,205,130,76,104,199], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
