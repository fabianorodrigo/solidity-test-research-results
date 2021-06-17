const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([116,117,23,45,247,43,7,150,150,199,84,53,66,88,14,5,176,60,89,77,182,186,71,58,121,107,156,6,225,170,112,38],[212,62,159,36,35,211,45,224,184,156,253,237,63,88,138,206,175,155,18,77,23,153,171,116,127,187,42,82,6,76,89,176],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([116,117,23,45,247,43,7,150,150,199,84,53,66,88,14,5,176,60,89,77,182,186,71,58,121,107,156,6,225,170,112,38],[212,62,159,36,35,211,45,224,184,156,253,237,63,88,138,206,175,155,18,77,23,153,171,116,127,187,42,82,6,76,89,176],{from:accounts[0]}');
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
