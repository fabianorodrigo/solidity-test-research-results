const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([58,50,119,254,128,182,204,18,88,35,239,225,63,214,183,45,4,185,112,153,129,33,217,147,126,184,247,41,152,188,155,163],[38,9,27,253,200,56,109,75,222,115,200,108,102,208,49,169,125,112,201,16,19,238,190,52,179,97,115,34,159,71,102,232],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([58,50,119,254,128,182,204,18,88,35,239,225,63,214,183,45,4,185,112,153,129,33,217,147,126,184,247,41,152,188,155,163],[38,9,27,253,200,56,109,75,222,115,200,108,102,208,49,169,125,112,201,16,19,238,190,52,179,97,115,34,159,71,102,232],{from:accounts[0]}');
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
