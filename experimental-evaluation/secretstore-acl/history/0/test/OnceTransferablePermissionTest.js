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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[6], [221,0,249,11,239,51,231,41,61,15,19,86,102,86,250,149,81,24,208,111,216,200,78,18,228,168,185,235,91,46,127,202],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([107,98,213,11,141,210,197,132,188,9,20,28,37,161,79,134,127,238,150,36,71,243,206,191,173,211,251,233,170,159,218,137],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([197,213,202,76,175,232,187,236,95,139,224,209,230,46,245,58,10,62,224,172,189,121,12,233,148,246,127,243,158,7,248,226], accounts[3],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([197,213,202,76,175,232,187,236,95,139,224,209,230,46,245,58,10,62,224,172,189,121,12,233,148,246,127,243,158,7,248,226], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
