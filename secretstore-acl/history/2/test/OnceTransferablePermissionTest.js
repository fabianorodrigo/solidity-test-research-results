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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[3], [146,65,176,11,126,84,91,0,179,19,89,202,199,111,29,2,48,243,126,205,121,162,128,83,150,109,225,23,94,186,66,198],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([99,160,5,167,101,204,244,83,72,126,238,23,97,157,94,216,195,150,148,121,212,106,231,165,141,248,12,230,213,57,245,250],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([230,110,118,102,202,150,194,63,18,192,148,15,127,200,164,80,78,128,178,33,62,55,42,13,154,246,175,15,238,227,66,12], accounts[5],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([230,110,118,102,202,150,194,63,18,192,148,15,127,200,164,80,78,128,178,33,62,55,42,13,154,246,175,15,238,227,66,12], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
