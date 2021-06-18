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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[6], [136,153,211,231,31,231,210,223,252,130,212,87,72,77,148,251,170,188,27,161,111,249,32,69,69,92,221,36,85,26,89,68],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([212,243,3,94,49,174,71,88,228,37,154,131,101,56,101,159,53,41,140,67,25,49,222,71,174,192,250,41,110,86,22,141],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([135,109,221,134,196,173,58,132,205,221,102,163,198,98,134,144,121,96,107,66,96,172,40,37,215,100,235,207,159,57,94,53], accounts[7],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([135,109,221,134,196,173,58,132,205,221,102,163,198,98,134,144,121,96,107,66,96,172,40,37,215,100,235,207,159,57,94,53], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
