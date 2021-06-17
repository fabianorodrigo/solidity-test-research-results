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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[6], [89,104,78,94,54,253,145,26,228,161,46,131,195,203,173,34,23,15,211,91,58,77,138,135,74,25,93,7,147,32,193,184],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([65,197,122,157,168,48,214,110,171,145,11,134,171,45,218,87,127,12,12,88,106,101,241,240,88,105,124,152,237,210,194,192],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([215,90,91,102,59,109,27,158,215,119,64,10,106,47,196,215,31,164,169,227,73,115,203,255,158,199,18,244,10,140,68,137], accounts[5],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([215,90,91,102,59,109,27,158,215,119,64,10,106,47,196,215,31,164,169,227,73,115,203,255,158,199,18,244,10,140,68,137], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
