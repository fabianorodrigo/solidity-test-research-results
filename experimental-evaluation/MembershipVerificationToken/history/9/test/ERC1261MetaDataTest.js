const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([187,60,245,91,42,187,242,80,8,127,207,101,119,197,115,237,184,101,97,10,168,48,64,169,54,126,90,97,146,19,85,189],[164,31,121,3,172,199,46,155,152,154,68,102,239,160,67,229,179,74,88,206,149,52,188,173,197,116,48,193,103,90,80,183],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([187,60,245,91,42,187,242,80,8,127,207,101,119,197,115,237,184,101,97,10,168,48,64,169,54,126,90,97,146,19,85,189],[164,31,121,3,172,199,46,155,152,154,68,102,239,160,67,229,179,74,88,206,149,52,188,173,197,116,48,193,103,90,80,183],{from:accounts[0]}');
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
