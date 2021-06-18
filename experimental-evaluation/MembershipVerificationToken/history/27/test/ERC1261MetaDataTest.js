const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([247,197,102,28,237,141,18,184,119,194,210,104,206,83,56,157,219,50,237,23,209,79,42,43,160,122,200,35,135,118,73,146],[11,135,186,81,33,9,185,28,31,133,255,36,20,194,126,67,37,253,117,53,191,217,18,98,11,213,207,235,242,35,157,13],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([247,197,102,28,237,141,18,184,119,194,210,104,206,83,56,157,219,50,237,23,209,79,42,43,160,122,200,35,135,118,73,146],[11,135,186,81,33,9,185,28,31,133,255,36,20,194,126,67,37,253,117,53,191,217,18,98,11,213,207,235,242,35,157,13],{from:accounts[0]}');
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
