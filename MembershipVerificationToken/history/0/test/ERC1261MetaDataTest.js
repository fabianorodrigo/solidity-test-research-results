const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([49,49,234,83,113,55,11,37,223,247,103,251,174,48,198,171,207,47,193,212,116,161,81,28,53,68,148,246,9,90,237,61],[219,247,104,65,103,186,227,152,120,160,180,250,27,165,67,218,128,94,75,187,204,234,249,170,169,159,96,52,138,81,37,202],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([49,49,234,83,113,55,11,37,223,247,103,251,174,48,198,171,207,47,193,212,116,161,81,28,53,68,148,246,9,90,237,61],[219,247,104,65,103,186,227,152,120,160,180,250,27,165,67,218,128,94,75,187,204,234,249,170,169,159,96,52,138,81,37,202],{from:accounts[0]}');
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
