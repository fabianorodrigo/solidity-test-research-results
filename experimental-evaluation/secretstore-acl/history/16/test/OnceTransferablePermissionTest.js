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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[8], [178,159,87,17,80,254,250,20,229,121,81,161,149,61,143,205,16,254,186,68,58,254,189,176,136,229,218,132,60,124,9,0],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([56,177,208,94,225,101,1,121,20,93,27,205,251,135,18,57,42,55,69,160,69,173,70,248,144,109,141,233,144,28,189,37],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([118,156,26,143,79,85,232,223,71,111,35,136,195,33,29,89,147,138,215,170,16,23,55,118,234,135,38,230,98,98,164,48], accounts[1],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([118,156,26,143,79,85,232,223,71,111,35,136,195,33,29,89,147,138,215,170,16,23,55,118,234,135,38,230,98,98,164,48], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
