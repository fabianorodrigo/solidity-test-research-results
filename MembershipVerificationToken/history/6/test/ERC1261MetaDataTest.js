const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([39,143,121,123,122,198,76,118,244,201,145,194,133,181,175,145,160,161,78,87,45,160,46,16,231,2,235,81,54,76,153,45],[221,10,166,35,27,214,127,65,245,213,22,23,53,180,74,223,39,233,195,100,173,42,2,104,138,143,91,126,85,122,158,148],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([39,143,121,123,122,198,76,118,244,201,145,194,133,181,175,145,160,161,78,87,45,160,46,16,231,2,235,81,54,76,153,45],[221,10,166,35,27,214,127,65,245,213,22,23,53,180,74,223,39,233,195,100,173,42,2,104,138,143,91,126,85,122,158,148],{from:accounts[0]}');
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
