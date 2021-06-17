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
    contractERC1261MetaData = await ERC1261MetaData.new([66,40,73,185,58,171,156,160,37,7,120,235,196,191,171,243,210,141,57,224,82,108,216,253,209,110,69,215,52,199,111,142],[146,193,225,72,234,222,235,38,8,48,168,231,20,233,223,42,51,106,180,246,186,59,199,183,114,121,100,227,159,174,91,119],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([66,40,73,185,58,171,156,160,37,7,120,235,196,191,171,243,210,141,57,224,82,108,216,253,209,110,69,215,52,199,111,142],[146,193,225,72,234,222,235,38,8,48,168,231,20,233,223,42,51,106,180,246,186,59,199,183,114,121,100,227,159,174,91,119],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
      contractProxyMembershipVerificationToken = await ProxyMembershipVerificationToken.new({ from: accounts[0] });
});
  
  it('Should execute test_assign(address,uint[]) WHEN _to!=0x0000000000000000000000000000000000000000,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractProxyMembershipVerificationToken.test_assign(accounts[8], [],{from: accounts[0]});
  });
  it('Should fail test_assign(address,uint[]) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_assign("0x0000000000000000000000000000000000000000", [],{from: accounts[0]}),'revert');
  });
  it('Should fail test_assign(address,uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_assign(accounts[8], [26],{from: accounts[0]}),'revert');
  });
  it('Should execute test_revoke(address) WHEN _from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMembershipVerificationToken.test_revoke(accounts[2],{from: accounts[0]});
  });
  it('Should fail test_revoke(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_revoke("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
