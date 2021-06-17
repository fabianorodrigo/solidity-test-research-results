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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[3], [232,80,13,48,111,83,42,213,128,5,171,157,234,180,17,158,235,215,190,37,253,90,220,96,242,96,11,58,243,76,248,241],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([141,60,79,113,121,228,124,176,193,223,106,142,124,151,36,128,47,176,137,201,40,45,208,159,51,18,59,234,94,251,39,139],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([81,54,12,127,222,46,219,163,149,62,138,238,55,215,221,51,240,50,62,247,187,118,231,216,40,138,201,208,15,38,148,246], accounts[0],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([81,54,12,127,222,46,219,163,149,62,138,238,55,215,221,51,240,50,62,247,187,118,231,216,40,138,201,208,15,38,148,246], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
