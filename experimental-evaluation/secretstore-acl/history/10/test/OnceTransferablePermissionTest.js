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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[0], [62,206,124,32,64,32,5,219,33,152,33,221,137,61,62,231,232,128,213,134,128,146,80,155,62,216,67,199,229,49,38,9],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([69,196,89,255,82,56,202,46,142,31,163,112,252,137,73,234,94,40,239,238,98,66,200,100,46,141,121,93,164,79,180,108],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([16,198,8,237,42,82,70,67,222,113,68,156,169,111,215,36,102,255,93,13,119,186,159,26,182,238,160,2,47,82,242,75], accounts[8],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([16,198,8,237,42,82,70,67,222,113,68,156,169,111,215,36,102,255,93,13,119,186,159,26,182,238,160,2,47,82,242,75], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
