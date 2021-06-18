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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[0], [157,115,164,181,201,246,21,45,121,34,201,20,149,131,97,67,181,206,100,144,43,109,211,167,103,86,0,225,95,163,246,3],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([249,55,17,125,72,3,200,59,165,232,137,173,178,190,49,241,15,27,127,213,15,142,56,118,236,128,230,138,99,99,42,102],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([127,200,226,163,47,223,84,67,86,237,33,221,69,47,9,197,90,104,27,93,116,33,82,34,127,106,253,79,136,23,110,110], accounts[3],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([127,200,226,163,47,223,84,67,86,237,33,221,69,47,9,197,90,104,27,93,116,33,82,34,127,106,253,79,136,23,110,110], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
