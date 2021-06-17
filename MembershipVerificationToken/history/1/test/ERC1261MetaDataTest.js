const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([66,40,73,185,58,171,156,160,37,7,120,235,196,191,171,243,210,141,57,224,82,108,216,253,209,110,69,215,52,199,111,142],[146,193,225,72,234,222,235,38,8,48,168,231,20,233,223,42,51,106,180,246,186,59,199,183,114,121,100,227,159,174,91,119],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([66,40,73,185,58,171,156,160,37,7,120,235,196,191,171,243,210,141,57,224,82,108,216,253,209,110,69,215,52,199,111,142],[146,193,225,72,234,222,235,38,8,48,168,231,20,233,223,42,51,106,180,246,186,59,199,183,114,121,100,227,159,174,91,119],{from:accounts[0]}');
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
