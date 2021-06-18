const truffleAssert = require('truffle-assertions');
const ERC1261MetaData = artifacts.require("ERC1261MetaData");
const MembershipVerificationToken = artifacts.require("MembershipVerificationToken");

contract("ERC1261MetaData",(accounts)=>{
  let trace = false;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  beforeEach(async () => {
    contractERC1261MetaData = await ERC1261MetaData.new([16,198,177,147,45,102,141,163,138,115,205,129,238,197,96,8,20,42,139,6,12,73,91,2,55,34,179,239,216,87,230,195],[248,150,28,138,74,162,92,251,238,120,87,36,7,230,77,203,180,107,248,161,65,20,195,68,187,231,62,9,191,48,63,113],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([16,198,177,147,45,102,141,163,138,115,205,129,238,197,96,8,20,42,139,6,12,73,91,2,55,34,179,239,216,87,230,195],[248,150,28,138,74,162,92,251,238,120,87,36,7,230,77,203,180,107,248,161,65,20,195,68,187,231,62,9,191,48,63,113],{from:accounts[0]}');
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
