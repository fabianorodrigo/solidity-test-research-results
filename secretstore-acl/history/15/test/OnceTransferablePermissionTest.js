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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[8], [48,241,192,72,41,73,154,137,238,168,7,185,97,28,236,11,24,211,144,67,167,220,221,111,115,162,162,252,16,61,215,100],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([11,19,189,63,75,134,181,214,190,24,162,160,134,67,52,227,229,126,58,24,139,141,136,71,229,96,255,188,104,95,2,29],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([2,136,122,246,121,208,178,255,78,213,67,106,143,97,120,62,141,62,199,16,249,102,200,51,43,176,57,89,78,168,117,102], accounts[7],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([2,136,122,246,121,208,178,255,78,213,67,106,143,97,120,62,141,62,199,16,249,102,200,51,43,176,57,89,78,168,117,102], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
