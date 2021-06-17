const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([61,196,235,224,81,30,21,90,51,50,232,88,250,29,153,128,120,62,189,32,107,234,168,33,45,136,227,80,119,151,84,14],[223,4,180,69,210,219,4,178,138,108,134,84,97,71,90,142,143,110,53,66,125,103,106,185,104,214,249,89,7,71,147,173],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([61,196,235,224,81,30,21,90,51,50,232,88,250,29,153,128,120,62,189,32,107,234,168,33,45,136,227,80,119,151,84,14],[223,4,180,69,210,219,4,178,138,108,134,84,97,71,90,142,143,110,53,66,125,103,106,185,104,214,249,89,7,71,147,173],{from:accounts[0]}');
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
