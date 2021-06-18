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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[7], [3,107,5,180,70,9,247,148,124,12,99,143,74,219,107,155,244,50,188,208,53,224,98,60,75,226,148,255,165,130,72,55],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([16,70,194,142,243,68,81,129,143,117,152,99,6,253,187,97,99,79,180,39,225,20,31,130,171,157,185,132,201,32,191,106],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([110,131,58,151,213,14,18,22,0,84,246,220,92,221,149,102,182,180,115,81,153,13,195,211,72,174,139,238,130,99,172,237], accounts[9],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([110,131,58,151,213,14,18,22,0,84,246,220,92,221,149,102,182,180,115,81,153,13,195,211,72,174,139,238,130,99,172,237], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
