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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[7], [79,246,1,92,100,180,70,241,94,59,65,151,222,136,5,21,183,143,115,211,58,5,155,44,250,182,105,141,51,200,65,196],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([243,81,177,55,110,185,222,2,23,181,31,22,25,163,242,86,205,138,99,210,191,188,205,114,14,103,199,159,71,55,111,119],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([37,47,222,70,135,64,160,219,247,5,221,114,45,19,158,4,137,82,53,38,39,86,114,17,43,213,19,218,153,241,188,162], accounts[9],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([37,47,222,70,135,64,160,219,247,5,221,114,45,19,158,4,137,82,53,38,39,86,114,17,43,213,19,218,153,241,188,162], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
