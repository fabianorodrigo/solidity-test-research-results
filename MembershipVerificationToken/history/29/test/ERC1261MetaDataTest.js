const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([166,108,139,33,253,223,28,2,184,67,11,252,50,161,0,186,72,67,110,60,120,42,95,20,191,66,79,244,53,161,91,80],[231,123,32,98,33,3,120,170,7,99,214,105,172,211,233,112,11,40,170,193,1,217,17,73,34,213,167,12,106,63,181,43],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([166,108,139,33,253,223,28,2,184,67,11,252,50,161,0,186,72,67,110,60,120,42,95,20,191,66,79,244,53,161,91,80],[231,123,32,98,33,3,120,170,7,99,214,105,172,211,233,112,11,40,170,193,1,217,17,73,34,213,167,12,106,63,181,43],{from:accounts[0]}');
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
