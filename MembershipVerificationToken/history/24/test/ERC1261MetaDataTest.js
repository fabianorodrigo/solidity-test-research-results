const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([201,98,18,125,99,195,233,222,41,58,67,103,4,174,145,249,243,215,167,148,226,178,140,251,112,75,57,249,192,94,66,204],[213,113,224,166,102,228,73,139,26,100,162,92,229,34,1,239,69,186,145,99,85,32,8,15,119,151,108,37,34,5,136,8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([201,98,18,125,99,195,233,222,41,58,67,103,4,174,145,249,243,215,167,148,226,178,140,251,112,75,57,249,192,94,66,204],[213,113,224,166,102,228,73,139,26,100,162,92,229,34,1,239,69,186,145,99,85,32,8,15,119,151,108,37,34,5,136,8],{from:accounts[0]}');
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
