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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[4], [160,176,166,1,48,201,225,189,49,30,170,225,121,113,167,39,74,210,10,191,40,9,245,133,23,246,167,201,1,151,185,138],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([158,85,101,24,58,243,137,196,37,95,252,240,251,194,122,153,150,196,1,124,235,145,4,158,96,248,230,245,201,194,14,102],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([184,89,99,12,65,174,36,182,20,87,245,131,11,77,232,119,229,181,131,28,220,8,129,151,255,252,255,154,174,26,4,39], accounts[4],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([184,89,99,12,65,174,36,182,20,87,245,131,11,77,232,119,229,181,131,28,220,8,129,151,255,252,255,154,174,26,4,39], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
