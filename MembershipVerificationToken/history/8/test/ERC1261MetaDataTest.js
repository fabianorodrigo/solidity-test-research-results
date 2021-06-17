const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([46,31,137,215,135,74,15,152,43,69,55,82,90,32,163,69,213,205,83,44,173,209,137,36,242,134,150,65,232,182,179,134],[26,47,26,213,119,57,151,37,58,198,8,108,27,226,241,188,63,255,202,172,135,227,244,23,66,225,129,187,115,90,20,194],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([46,31,137,215,135,74,15,152,43,69,55,82,90,32,163,69,213,205,83,44,173,209,137,36,242,134,150,65,232,182,179,134],[26,47,26,213,119,57,151,37,58,198,8,108,27,226,241,188,63,255,202,172,135,227,244,23,66,225,129,187,115,90,20,194],{from:accounts[0]}');
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
