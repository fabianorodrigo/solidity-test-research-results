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
    contractERC1261MetaData = await ERC1261MetaData.new([205,109,89,45,234,104,202,246,195,55,139,164,90,95,33,201,40,100,87,138,149,24,72,155,99,227,53,113,251,87,40,121],[66,181,18,116,108,111,26,67,28,67,84,102,127,214,103,117,27,66,3,206,203,109,206,235,122,159,91,80,52,56,189,201],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([205,109,89,45,234,104,202,246,195,55,139,164,90,95,33,201,40,100,87,138,149,24,72,155,99,227,53,113,251,87,40,121],[66,181,18,116,108,111,26,67,28,67,84,102,127,214,103,117,27,66,3,206,203,109,206,235,122,159,91,80,52,56,189,201],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
      contractProxyMembershipVerificationToken = await ProxyMembershipVerificationToken.new({ from: accounts[0] });
});
  
  it('Should execute test_assign(address,uint[]) WHEN _to!=0x0000000000000000000000000000000000000000,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractProxyMembershipVerificationToken.test_assign(accounts[0], [],{from: accounts[0]});
  });
  it('Should fail test_assign(address,uint[]) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_assign("0x0000000000000000000000000000000000000000", [],{from: accounts[0]}),'revert');
  });
  it('Should fail test_assign(address,uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_assign(accounts[0], [65],{from: accounts[0]}),'revert');
  });
  it('Should execute test_revoke(address) WHEN _from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMembershipVerificationToken.test_revoke(accounts[0],{from: accounts[0]});
  });
  it('Should fail test_revoke(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_revoke("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
