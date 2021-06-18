const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([75,190,185,188,195,35,5,197,99,85,113,159,215,240,54,243,158,13,86,196,238,59,87,194,91,56,108,20,151,180,186,154],[192,239,171,223,43,219,166,192,109,218,214,224,164,158,131,108,187,220,167,137,26,136,162,131,146,238,51,240,242,180,129,168],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([75,190,185,188,195,35,5,197,99,85,113,159,215,240,54,243,158,13,86,196,238,59,87,194,91,56,108,20,151,180,186,154],[192,239,171,223,43,219,166,192,109,218,214,224,164,158,131,108,187,220,167,137,26,136,162,131,146,238,51,240,242,180,129,168],{from:accounts[0]}');
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
