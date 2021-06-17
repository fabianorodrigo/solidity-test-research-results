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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[0], [42,34,116,205,157,232,10,67,104,36,218,7,117,132,187,85,142,178,203,42,89,239,170,81,74,69,183,187,166,3,148,98],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([62,162,56,240,180,157,188,55,20,66,205,165,209,79,206,116,82,122,68,205,129,195,163,39,228,137,251,198,210,85,125,65],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([10,236,111,137,150,86,27,157,180,172,246,72,197,28,182,156,58,234,133,97,21,90,9,117,127,121,251,88,237,108,108,122], accounts[2],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([10,236,111,137,150,86,27,157,180,172,246,72,197,28,182,156,58,234,133,97,21,90,9,117,127,121,251,88,237,108,108,122], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
