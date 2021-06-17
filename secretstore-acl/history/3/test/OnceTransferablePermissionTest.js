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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[3], [87,210,54,233,238,193,120,123,59,238,183,118,229,234,181,11,240,91,220,180,65,71,183,142,252,170,43,60,51,237,205,234],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([174,133,142,32,128,239,68,102,140,96,44,241,148,135,135,0,135,0,223,44,106,229,14,170,213,173,24,20,212,104,231,221],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([109,165,56,162,162,28,212,151,191,253,194,178,71,163,216,104,167,145,97,90,17,138,74,35,52,222,53,162,171,229,185,19], accounts[5],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([109,165,56,162,162,28,212,151,191,253,194,178,71,163,216,104,167,145,97,90,17,138,74,35,52,222,53,162,171,229,185,19], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
