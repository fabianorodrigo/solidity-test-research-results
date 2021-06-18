const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([125,224,86,214,8,234,234,202,229,11,86,4,232,126,128,83,18,51,221,37,224,135,62,45,62,218,179,133,76,218,48,130],[239,19,52,24,166,136,255,166,209,210,88,64,133,19,64,49,32,151,37,103,76,138,187,24,227,240,32,76,94,122,41,172],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([125,224,86,214,8,234,234,202,229,11,86,4,232,126,128,83,18,51,221,37,224,135,62,45,62,218,179,133,76,218,48,130],[239,19,52,24,166,136,255,166,209,210,88,64,133,19,64,49,32,151,37,103,76,138,187,24,227,240,32,76,94,122,41,172],{from:accounts[0]}');
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
