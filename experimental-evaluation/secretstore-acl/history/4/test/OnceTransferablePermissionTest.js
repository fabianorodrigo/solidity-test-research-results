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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[6], [107,207,82,31,113,41,168,251,148,35,144,143,167,246,122,231,121,205,2,240,155,119,31,25,73,147,28,74,51,247,140,90],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([7,198,146,253,89,72,139,212,179,38,153,220,27,245,16,41,187,101,9,197,170,32,104,204,70,187,160,255,245,243,103,145],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([71,225,165,48,239,180,21,128,15,58,22,226,125,143,25,226,218,23,50,17,165,149,199,14,106,243,48,166,184,43,156,94], accounts[9],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([71,225,165,48,239,180,21,128,15,58,22,226,125,143,25,226,218,23,50,17,165,149,199,14,106,243,48,166,184,43,156,94], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
