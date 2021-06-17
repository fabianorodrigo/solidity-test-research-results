const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([127,1,51,169,138,133,62,114,241,56,172,97,40,52,206,202,180,226,113,58,219,61,7,101,67,249,47,242,153,101,90,165],[126,20,188,101,19,37,136,4,195,118,130,193,77,168,245,121,160,123,145,64,122,6,233,200,117,19,46,179,171,52,156,156],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([127,1,51,169,138,133,62,114,241,56,172,97,40,52,206,202,180,226,113,58,219,61,7,101,67,249,47,242,153,101,90,165],[126,20,188,101,19,37,136,4,195,118,130,193,77,168,245,121,160,123,145,64,122,6,233,200,117,19,46,179,171,52,156,156],{from:accounts[0]}');
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
