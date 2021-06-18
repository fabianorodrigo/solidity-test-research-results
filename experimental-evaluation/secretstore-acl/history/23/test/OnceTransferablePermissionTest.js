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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[1], [205,245,102,238,177,209,164,108,222,137,106,180,150,24,28,158,105,39,156,210,247,91,167,81,61,135,16,211,227,134,106,14],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([98,62,222,69,130,153,244,9,255,30,232,63,182,106,222,62,208,247,40,254,123,253,171,192,93,250,12,111,26,202,132,37],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([16,143,54,1,238,6,209,172,143,123,150,114,241,240,109,151,132,22,0,134,28,20,181,38,6,254,86,86,236,56,219,202], accounts[0],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([16,143,54,1,238,6,209,172,143,123,150,114,241,240,109,151,132,22,0,134,28,20,181,38,6,254,86,86,236,56,219,202], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
