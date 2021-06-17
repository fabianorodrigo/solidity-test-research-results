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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[6], [210,223,137,73,85,80,11,214,128,161,55,34,70,120,119,238,130,66,172,126,111,13,239,202,87,182,164,135,47,216,136,225],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([18,124,115,240,237,50,47,10,183,125,235,91,222,185,113,232,179,121,3,126,6,201,54,49,28,131,44,92,64,11,190,65],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([83,25,19,7,84,30,65,161,156,203,175,131,4,194,167,130,224,55,89,169,35,61,171,191,215,29,154,53,38,180,36,200], accounts[8],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([83,25,19,7,84,30,65,161,156,203,175,131,4,194,167,130,224,55,89,169,35,61,171,191,215,29,154,53,38,180,36,200], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
