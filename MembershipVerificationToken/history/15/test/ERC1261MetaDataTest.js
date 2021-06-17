const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([194,81,247,91,238,176,0,184,91,146,173,252,84,5,176,61,11,169,155,64,172,148,188,141,158,248,66,215,222,97,26,13],[99,119,15,117,161,101,255,118,153,122,179,222,239,128,115,118,184,155,247,198,102,156,0,100,173,50,115,164,232,216,167,173],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([194,81,247,91,238,176,0,184,91,146,173,252,84,5,176,61,11,169,155,64,172,148,188,141,158,248,66,215,222,97,26,13],[99,119,15,117,161,101,255,118,153,122,179,222,239,128,115,118,184,155,247,198,102,156,0,100,173,50,115,164,232,216,167,173],{from:accounts[0]}');
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
