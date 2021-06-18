const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([158,37,214,12,38,54,15,127,193,99,244,30,248,68,11,214,173,88,162,225,46,159,87,233,117,26,153,92,105,109,132,211],[15,30,90,81,123,153,216,196,136,54,209,162,220,219,215,122,87,134,76,155,128,25,64,224,149,247,73,211,68,254,151,93],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([158,37,214,12,38,54,15,127,193,99,244,30,248,68,11,214,173,88,162,225,46,159,87,233,117,26,153,92,105,109,132,211],[15,30,90,81,123,153,216,196,136,54,209,162,220,219,215,122,87,134,76,155,128,25,64,224,149,247,73,211,68,254,151,93],{from:accounts[0]}');
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
