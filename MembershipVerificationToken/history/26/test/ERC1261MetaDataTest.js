const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([212,143,134,69,255,181,101,66,53,210,159,195,52,224,145,76,39,9,193,74,170,179,29,197,25,108,61,74,65,240,158,104],[168,116,163,23,45,220,216,151,203,196,45,48,62,210,177,119,224,239,23,38,113,90,191,119,151,243,85,10,222,29,184,141],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([212,143,134,69,255,181,101,66,53,210,159,195,52,224,145,76,39,9,193,74,170,179,29,197,25,108,61,74,65,240,158,104],[168,116,163,23,45,220,216,151,203,196,45,48,62,210,177,119,224,239,23,38,113,90,191,119,151,243,85,10,222,29,184,141],{from:accounts[0]}');
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
