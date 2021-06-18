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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[1], [134,238,122,235,5,111,243,125,5,230,234,100,253,122,114,150,225,251,38,136,67,255,18,129,2,191,99,119,14,128,150,76],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([128,15,2,91,141,111,77,58,148,153,156,254,52,139,231,228,165,242,152,180,171,224,70,30,5,236,150,202,182,232,49,12],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([21,90,229,109,124,178,109,213,96,89,253,191,192,150,72,211,233,37,239,22,176,180,41,112,208,34,96,108,84,233,8,108], accounts[7],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([21,90,229,109,124,178,109,213,96,89,253,191,192,150,72,211,233,37,239,22,176,180,41,112,208,34,96,108,84,233,8,108], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
