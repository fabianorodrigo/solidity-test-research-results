const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([167,38,57,192,57,149,229,45,155,102,177,179,230,240,248,127,247,219,1,90,185,181,15,44,217,10,104,124,152,110,67,175],[166,246,175,68,31,222,188,118,136,80,161,48,193,248,7,187,93,96,172,223,58,22,10,168,37,99,19,130,145,95,61,234],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([167,38,57,192,57,149,229,45,155,102,177,179,230,240,248,127,247,219,1,90,185,181,15,44,217,10,104,124,152,110,67,175],[166,246,175,68,31,222,188,118,136,80,161,48,193,248,7,187,93,96,172,223,58,22,10,168,37,99,19,130,145,95,61,234],{from:accounts[0]}');
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
