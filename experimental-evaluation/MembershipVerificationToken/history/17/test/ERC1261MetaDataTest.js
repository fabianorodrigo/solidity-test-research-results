const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([204,134,32,112,123,76,167,45,77,151,87,213,220,239,166,49,24,156,50,247,115,238,74,41,185,2,85,5,212,167,225,226],[170,139,252,118,175,180,78,192,150,82,201,89,202,87,143,182,43,234,209,132,9,117,114,191,253,61,115,170,207,188,81,215],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([204,134,32,112,123,76,167,45,77,151,87,213,220,239,166,49,24,156,50,247,115,238,74,41,185,2,85,5,212,167,225,226],[170,139,252,118,175,180,78,192,150,82,201,89,202,87,143,182,43,234,209,132,9,117,114,191,253,61,115,170,207,188,81,215],{from:accounts[0]}');
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
