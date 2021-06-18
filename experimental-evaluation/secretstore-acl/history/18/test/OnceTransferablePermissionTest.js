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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[1], [161,83,229,7,197,220,78,59,6,38,220,157,37,128,254,208,155,139,68,157,170,106,187,255,41,252,211,7,12,91,173,156],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([102,168,73,8,43,156,202,203,50,244,1,101,26,97,86,9,100,85,91,39,0,33,184,66,109,22,210,225,7,191,134,189],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([138,244,114,23,145,37,244,91,27,194,163,20,98,239,46,124,124,161,164,111,31,108,208,119,3,8,132,186,213,93,227,236], accounts[9],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([138,244,114,23,145,37,244,91,27,194,163,20,98,239,46,124,124,161,164,111,31,108,208,119,3,8,132,186,213,93,227,236], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
