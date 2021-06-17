const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([153,17,126,232,33,48,1,87,120,170,120,115,20,162,225,30,93,108,23,177,150,45,115,233,142,70,121,224,163,7,82,15],[112,31,62,178,223,34,168,101,181,90,64,212,194,132,129,35,123,51,28,239,175,182,0,59,136,198,58,193,96,61,97,173],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([153,17,126,232,33,48,1,87,120,170,120,115,20,162,225,30,93,108,23,177,150,45,115,233,142,70,121,224,163,7,82,15],[112,31,62,178,223,34,168,101,181,90,64,212,194,132,129,35,123,51,28,239,175,182,0,59,136,198,58,193,96,61,97,173],{from:accounts[0]}');
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
