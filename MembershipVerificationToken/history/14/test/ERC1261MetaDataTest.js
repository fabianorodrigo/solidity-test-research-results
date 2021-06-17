const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([27,6,240,69,134,58,153,49,41,86,114,245,147,161,9,102,2,132,153,5,57,82,69,103,77,182,187,255,152,35,111,105],[11,131,28,96,193,134,151,101,132,215,246,105,87,179,190,250,147,45,138,60,175,108,165,120,30,132,60,88,173,255,174,22],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([27,6,240,69,134,58,153,49,41,86,114,245,147,161,9,102,2,132,153,5,57,82,69,103,77,182,187,255,152,35,111,105],[11,131,28,96,193,134,151,101,132,215,246,105,87,179,190,250,147,45,138,60,175,108,165,120,30,132,60,88,173,255,174,22],{from:accounts[0]}');
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
