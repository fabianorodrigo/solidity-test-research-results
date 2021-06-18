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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[1], [250,69,157,45,244,23,69,207,90,118,56,255,63,67,114,183,204,229,143,244,17,216,239,22,73,63,38,173,10,118,101,110],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([50,68,39,213,116,94,202,147,53,50,71,145,109,160,12,209,139,247,202,164,219,116,225,121,237,64,131,70,0,36,223,225],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([231,186,242,75,250,67,210,58,216,174,125,118,208,199,130,125,58,176,218,29,115,57,19,182,180,118,45,36,122,147,93,114], accounts[1],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([231,186,242,75,250,67,210,58,216,174,125,118,208,199,130,125,58,176,218,29,115,57,19,182,180,118,45,36,122,147,93,114], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
