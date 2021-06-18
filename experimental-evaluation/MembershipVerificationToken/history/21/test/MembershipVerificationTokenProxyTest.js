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
    contractERC1261MetaData = await ERC1261MetaData.new([176,144,209,151,0,76,67,12,47,180,139,26,147,204,247,172,24,80,161,250,163,108,154,148,90,157,153,0,253,55,238,58],[67,0,161,182,72,127,44,244,151,211,44,153,208,40,120,245,193,28,37,229,62,152,71,18,209,144,77,166,76,138,207,61],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([176,144,209,151,0,76,67,12,47,180,139,26,147,204,247,172,24,80,161,250,163,108,154,148,90,157,153,0,253,55,238,58],[67,0,161,182,72,127,44,244,151,211,44,153,208,40,120,245,193,28,37,229,62,152,71,18,209,144,77,166,76,138,207,61],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
      contractProxyMembershipVerificationToken = await ProxyMembershipVerificationToken.new({ from: accounts[0] });
});
  
  it('Should execute test_assign(address,uint[]) WHEN _to!=0x0000000000000000000000000000000000000000,_attributeIndexes.length==attributeNames.length', async () => {
    let result = await contractProxyMembershipVerificationToken.test_assign(accounts[6], [],{from: accounts[0]});
  });
  it('Should fail test_assign(address,uint[]) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_assign("0x0000000000000000000000000000000000000000", [],{from: accounts[0]}),'revert');
  });
  it('Should fail test_assign(address,uint[]) when NOT comply with: _attributeIndexes.length == attributeNames.length', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_assign(accounts[6], [10000],{from: accounts[0]}),'revert');
  });
  it('Should execute test_revoke(address) WHEN _from!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMembershipVerificationToken.test_revoke(accounts[6],{from: accounts[0]});
  });
  it('Should fail test_revoke(address) when NOT comply with: _from != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMembershipVerificationToken.test_revoke("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
