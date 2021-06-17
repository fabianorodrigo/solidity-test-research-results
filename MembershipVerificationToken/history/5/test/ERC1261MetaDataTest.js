const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([28,149,53,168,179,196,53,162,159,237,75,48,146,154,211,158,246,211,229,239,106,145,17,227,14,76,204,24,76,11,148,219],[149,171,144,227,241,214,77,219,71,248,35,164,138,210,175,173,107,46,160,145,53,212,154,125,197,91,213,157,219,71,96,16],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([28,149,53,168,179,196,53,162,159,237,75,48,146,154,211,158,246,211,229,239,106,145,17,227,14,76,204,24,76,11,148,219],[149,171,144,227,241,214,77,219,71,248,35,164,138,210,175,173,107,46,160,145,53,212,154,125,197,91,213,157,219,71,96,16],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
  });
  
  it('Should execute name()', async () => {
    let result = await contractERC1261MetaData.name({from: accounts[0]});
  });
  it('Should execute symbol()', async () => {
    let result = await contractERC1261MetaData.symbol({from: accounts[0]});
  });
});
