const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([23,179,44,78,229,61,97,14,37,106,137,163,8,178,173,186,180,233,120,142,92,123,78,230,87,198,156,123,173,149,153,22],[8,237,26,180,131,33,115,205,122,19,91,160,18,70,51,45,37,69,2,58,123,238,10,208,178,95,167,75,102,224,172,70],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([23,179,44,78,229,61,97,14,37,106,137,163,8,178,173,186,180,233,120,142,92,123,78,230,87,198,156,123,173,149,153,22],[8,237,26,180,131,33,115,205,122,19,91,160,18,70,51,45,37,69,2,58,123,238,10,208,178,95,167,75,102,224,172,70],{from:accounts[0]}');
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
