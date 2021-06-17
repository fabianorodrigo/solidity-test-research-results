const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([93,199,249,39,201,131,209,50,164,231,243,29,75,95,249,160,3,132,72,75,167,93,133,154,249,16,251,243,50,134,153,198],[35,120,156,103,118,230,154,22,33,174,32,108,6,227,146,58,177,27,31,186,83,214,253,101,224,32,107,23,98,202,150,8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([93,199,249,39,201,131,209,50,164,231,243,29,75,95,249,160,3,132,72,75,167,93,133,154,249,16,251,243,50,134,153,198],[35,120,156,103,118,230,154,22,33,174,32,108,6,227,146,58,177,27,31,186,83,214,253,101,224,32,107,23,98,202,150,8],{from:accounts[0]}');
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
