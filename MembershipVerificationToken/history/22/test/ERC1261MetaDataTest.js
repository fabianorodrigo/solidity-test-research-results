const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([227,47,94,212,202,103,197,148,146,135,109,242,39,162,22,147,69,223,83,176,199,212,101,66,205,190,231,26,211,59,167,9],[149,85,198,213,165,222,229,86,229,110,241,91,96,86,0,147,15,58,201,122,100,160,20,116,108,1,37,132,26,152,0,47],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([227,47,94,212,202,103,197,148,146,135,109,242,39,162,22,147,69,223,83,176,199,212,101,66,205,190,231,26,211,59,167,9],[149,85,198,213,165,222,229,86,229,110,241,91,96,86,0,147,15,58,201,122,100,160,20,116,108,1,37,132,26,152,0,47],{from:accounts[0]}');
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
