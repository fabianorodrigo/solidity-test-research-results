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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[7], [181,30,210,66,92,94,96,188,207,104,81,82,164,57,6,140,212,51,143,188,170,39,134,37,206,11,88,113,112,110,235,248],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([24,72,224,113,0,23,79,233,30,221,52,242,100,228,47,124,27,102,63,166,248,190,118,15,87,43,79,253,136,155,166,23],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([83,148,173,166,29,62,156,59,251,200,201,236,16,49,40,205,58,217,29,217,116,156,98,95,78,205,38,222,224,13,191,180], accounts[0],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([83,148,173,166,29,62,156,59,251,200,201,236,16,49,40,205,58,217,29,217,116,156,98,95,78,205,38,222,224,13,191,180], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
