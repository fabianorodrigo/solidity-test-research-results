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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[5], [114,64,28,198,72,140,233,75,193,214,179,34,195,122,13,175,77,154,167,2,135,31,171,193,25,33,227,15,83,97,9,113],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([148,242,72,25,163,182,56,75,72,11,32,44,183,203,118,200,176,155,88,134,85,84,77,225,17,157,147,143,86,216,247,188],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([84,64,114,67,212,24,41,185,147,246,60,92,124,84,127,79,123,14,122,141,127,88,33,229,16,101,148,86,76,125,79,106], accounts[2],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([84,64,114,67,212,24,41,185,147,246,60,92,124,84,127,79,123,14,122,141,127,88,33,229,16,101,148,86,76,125,79,106], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
