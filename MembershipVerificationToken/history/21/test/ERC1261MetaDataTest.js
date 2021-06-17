const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([176,144,209,151,0,76,67,12,47,180,139,26,147,204,247,172,24,80,161,250,163,108,154,148,90,157,153,0,253,55,238,58],[67,0,161,182,72,127,44,244,151,211,44,153,208,40,120,245,193,28,37,229,62,152,71,18,209,144,77,166,76,138,207,61],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([176,144,209,151,0,76,67,12,47,180,139,26,147,204,247,172,24,80,161,250,163,108,154,148,90,157,153,0,253,55,238,58],[67,0,161,182,72,127,44,244,151,211,44,153,208,40,120,245,193,28,37,229,62,152,71,18,209,144,77,166,76,138,207,61],{from:accounts[0]}');
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
