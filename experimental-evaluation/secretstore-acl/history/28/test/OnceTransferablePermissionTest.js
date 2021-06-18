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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[2], [15,30,187,75,64,134,232,165,154,73,72,75,132,7,32,134,133,245,134,21,25,106,171,187,73,107,203,72,253,205,59,26],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([4,237,79,131,36,38,9,174,90,181,126,161,4,105,29,108,171,54,177,53,122,215,25,234,209,36,74,113,140,17,193,94],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([228,150,169,41,211,49,83,30,242,36,18,64,224,126,33,0,158,94,80,202,180,130,5,18,9,66,100,44,52,79,206,124], accounts[4],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([228,150,169,41,211,49,83,30,242,36,18,64,224,126,33,0,158,94,80,202,180,130,5,18,9,66,100,44,52,79,206,124], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
