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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[7], [38,248,157,57,3,228,21,135,126,233,151,165,216,148,95,47,111,168,139,133,133,11,206,137,41,3,118,12,30,195,178,159],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([24,210,66,90,7,188,129,197,0,196,163,251,158,153,27,42,129,78,197,22,213,219,3,219,70,255,52,74,232,50,57,172],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([143,80,70,227,26,200,86,45,165,37,76,70,166,167,163,237,19,81,172,253,117,221,31,142,214,145,192,79,248,179,236,188], accounts[4],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([143,80,70,227,26,200,86,45,165,37,76,70,166,167,163,237,19,81,172,253,117,221,31,142,214,145,192,79,248,179,236,188], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
