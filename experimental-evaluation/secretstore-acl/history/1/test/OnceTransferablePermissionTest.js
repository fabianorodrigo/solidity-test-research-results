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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[8], [40,64,55,148,199,83,167,131,25,40,237,166,38,205,206,237,68,104,208,20,156,78,143,68,211,116,222,103,112,68,81,215],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([230,110,245,210,78,252,46,153,39,68,31,82,10,34,227,189,215,149,93,7,126,26,68,209,92,86,109,70,75,229,106,39],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([111,137,201,75,139,103,208,78,116,91,238,185,88,54,76,168,22,60,121,200,191,102,106,39,205,231,94,40,141,2,228,156], accounts[2],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([111,137,201,75,139,103,208,78,116,91,238,185,88,54,76,168,22,60,121,200,191,102,106,39,205,231,94,40,141,2,228,156], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
