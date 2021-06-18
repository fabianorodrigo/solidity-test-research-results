const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([128,50,181,240,206,193,76,114,106,127,79,138,159,247,78,7,6,90,59,3,230,243,80,231,11,255,8,69,111,177,250,89],[9,106,69,124,160,2,187,100,45,153,230,148,229,175,200,51,91,169,243,1,2,211,157,156,166,169,123,104,2,15,163,212],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([128,50,181,240,206,193,76,114,106,127,79,138,159,247,78,7,6,90,59,3,230,243,80,231,11,255,8,69,111,177,250,89],[9,106,69,124,160,2,187,100,45,153,230,148,229,175,200,51,91,169,243,1,2,211,157,156,166,169,123,104,2,15,163,212],{from:accounts[0]}');
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
