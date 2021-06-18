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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[6], [77,103,183,86,208,2,192,169,19,32,180,82,96,231,55,86,145,151,223,33,147,227,57,135,200,172,201,231,123,36,211,11],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([89,11,168,122,193,80,115,182,227,86,105,125,98,164,188,145,3,71,222,220,34,121,162,114,163,77,48,252,76,223,215,170],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([149,77,170,245,125,146,205,232,4,116,9,132,80,33,177,13,229,237,143,106,74,22,121,165,236,2,230,30,77,119,61,64], accounts[8],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([149,77,170,245,125,146,205,232,4,116,9,132,80,33,177,13,229,237,143,106,74,22,121,165,236,2,230,30,77,119,61,64], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
