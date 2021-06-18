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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[3], [211,7,226,128,202,216,105,180,77,34,67,29,247,255,40,125,192,214,49,167,127,157,120,198,91,69,119,180,181,78,29,216],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([134,134,144,88,225,72,20,121,204,67,69,166,223,201,164,40,84,52,17,50,83,184,22,220,41,41,40,143,255,1,225,121],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([141,98,161,240,156,251,74,209,224,118,44,234,179,89,188,12,197,183,197,204,156,83,101,16,27,160,186,44,139,0,154,246], accounts[1],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([141,98,161,240,156,251,74,209,224,118,44,234,179,89,188,12,197,183,197,204,156,83,101,16,27,160,186,44,139,0,154,246], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
