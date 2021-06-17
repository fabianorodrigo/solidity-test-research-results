const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");
const ProxyMembershipVerificationToken = artifacts.require("ProxyMembershipVerificationToken");

contract("contractProxyMembershipVerificationToken",(accounts)=>{
    let contractProxyMembershipVerificationToken = null;
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([149,116,224,224,20,173,218,234,141,52,246,214,93,215,56,53,10,20,74,63,135,125,184,95,180,167,81,128,189,126,20,83],[163,252,105,181,76,60,54,66,3,177,237,125,155,65,15,109,151,146,183,156,156,147,55,231,221,202,113,249,85,112,155,85],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([149,116,224,224,20,173,218,234,141,52,246,214,93,215,56,53,10,20,74,63,135,125,184,95,180,167,81,128,189,126,20,83],[163,252,105,181,76,60,54,66,3,177,237,125,155,65,15,109,151,146,183,156,156,147,55,231,221,202,113,249,85,112,155,85],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
      contractProxyMembershipVerificationToken = await ProxyMembershipVerificationToken.new({ from: accounts[0] });
});
  
  it('Should execute test_assign(address,uint[]) WHEN _to!=0x0000000000000000000000000000000000000000,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractProxyMembershipVerificationToken.test_assign(accounts[9], [],{from: accounts[0]});
  });
  it('Should fail test_assign(address,uint[]) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_assign("0x0000000000000000000000000000000000000000", [],{from: accounts[0]}),'revert');
  });
  it('Should fail test_assign(address,uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_assign(accounts[9], [2014223715],{from: accounts[0]}),'revert');
  });
  it('Should execute test_revoke(address) WHEN _from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMembershipVerificationToken.test_revoke(accounts[5],{from: accounts[0]});
  });
  it('Should fail test_revoke(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_revoke("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
