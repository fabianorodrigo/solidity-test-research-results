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
    let result = await contractOnceTransferablePermission.checkPermissions(accounts[5], [165,87,227,62,48,73,146,190,9,162,98,193,228,15,32,24,212,140,60,238,207,255,80,179,29,174,23,89,31,74,237,128],{from: accounts[0]});
  });
  it('Should execute createKey(bytes32)', async () => {
    let result = await contractOnceTransferablePermission.createKey([51,127,248,80,54,127,243,39,136,174,111,185,223,37,237,30,108,106,15,67,143,238,181,228,98,234,25,139,78,176,159,133],{from: accounts[0]});
  });
  it('Should execute transferPermission(bytes32,address) WHEN newOwner!=0x0000000000000000000000000000000000000000,MemberAccess.Identifier!=true', async () => {
    let result = await contractOnceTransferablePermission.transferPermission([160,38,159,48,217,143,211,218,166,237,150,83,209,247,234,238,14,143,36,102,241,32,210,73,143,140,63,35,53,2,34,239], accounts[6],{from: accounts[0]});
  });
  it('Should fail transferPermission(bytes32,address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnceTransferablePermission.transferPermission([160,38,159,48,217,143,211,218,166,237,150,83,209,247,234,238,14,143,36,102,241,32,210,73,143,140,63,35,53,2,34,239], "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
