const truffleAssert = require('truffle-assertions');
const ActionTest = artifacts.require("ActionTest");
const FreezableTestToken = artifacts.require("FreezableTestToken");
const TokenProportionalCapped = artifacts.require("electusvoting/contracts/poll/TokenProportionalCapped.sol");
const TokenProportionalUncapped = artifacts.require("electusvoting/contracts/poll/TokenProportionalUncapped.sol");
const Protocol = artifacts.require("electusvoting/contracts/protocol/Protocol.sol");
const TokenProportionalCappedTest = artifacts.require("electusvoting/contracts/testContracts/TokenProportionalCappedTest.sol");
const TokenProportionalUncappedTest = artifacts.require("electusvoting/contracts/testContracts/TokenProportionalUncappedTest.sol");
const FreezableToken = artifacts.require("electusvoting/contracts/Token/FreezableToken.sol");
const ERC1261MetaData = artifacts.require("membershipverificationtoken/contracts/ERC1261MetaData.sol");
const MembershipVerificationToken = artifacts.require("membershipverificationtoken/contracts/MembershipVerificationToken.sol");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20.sol");

contract("ActionTest",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractERC20 = null;
  let contractFreezableToken = null;
  let contractProtocol = null;
  let contractERC1261MetaData = null;
  let contractMembershipVerificationToken = null;
  let contractTokenProportionalCapped = null;
  let contractTokenProportionalUncapped = null;
  let contractTokenProportionalUncappedTest = null;
  let contractTokenProportionalCappedTest = null;
  let contractFreezableTestToken = null;
  let contractActionTest = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractFreezableToken = await FreezableToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: FreezableToken.new({from: accounts[0]}');
    contractProtocol = await Protocol.new([40,63,150,84,183,231,128,129,113,56,39,127,199,150,193,28,126,187,128,169,5,27,201,57,144,152,233,38,132,38,207,173],[162,191,72,41,233,142,46,39,71,24,238,71,194,40,109,162,65,239,100,56,3,185,15,39,50,160,186,85,27,79,53,152],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Protocol.new([40,63,150,84,183,231,128,129,113,56,39,127,199,150,193,28,126,187,128,169,5,27,201,57,144,152,233,38,132,38,207,173],[162,191,72,41,233,142,46,39,71,24,238,71,194,40,109,162,65,239,100,56,3,185,15,39,50,160,186,85,27,79,53,152],{from:accounts[0]}');
    contractERC1261MetaData = await ERC1261MetaData.new([36,76,175,90,153,44,64,113,189,191,202,133,241,246,201,153,230,101,51,154,204,159,165,157,220,176,34,90,253,133,68,130],[36,172,12,172,235,117,213,52,251,173,12,24,231,31,56,146,183,109,187,135,56,118,180,167,204,130,199,125,49,236,252,45],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([36,76,175,90,153,44,64,113,189,191,202,133,241,246,201,153,230,101,51,154,204,159,165,157,220,176,34,90,253,133,68,130],[36,172,12,172,235,117,213,52,251,173,12,24,231,31,56,146,183,109,187,135,56,118,180,167,204,130,199,125,49,236,252,45],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
    contractTokenProportionalUncappedTest = await TokenProportionalUncappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address],[[75,130,171,29,197,167,90,74,100,127,153,206,118,135,230,103,95,189,204,8,108,196,215,0,161,53,102,19,236,183,63,182],[120,111,80,88,134,36,168,49,18,1,126,151,124,206,214,96,234,78,50,4,233,244,247,74,183,161,142,156,215,250,87,160],[173,251,89,211,90,196,68,1,205,210,90,119,155,247,234,235,152,210,182,232,164,28,183,170,61,29,67,226,179,83,160,22],[198,167,63,84,77,254,111,35,255,23,91,171,39,222,68,212,19,7,69,58,124,130,66,115,243,23,154,111,198,156,46,193],[2,174,166,200,247,80,58,112,135,249,170,102,201,116,50,91,145,243,207,31,217,6,2,116,86,78,201,208,28,101,41,250]],contractFreezableToken.address,[228,175,218,163,24,193,160,99,140,171,231,69,193,23,248,13,204,118,190,41,189,245,234,66,241,88,194,102,40,208,98,199],[157,247,95,150,176,39,32,193,230,80,141,81,173,1,155,156,142,93,161,139,61,42,205,195,214,14,51,143,72,96,105,24],[182,87,143,184,5,230,40,23,33,254,7,94,188,66,159,69,170,201,160,223,19,232,218,187,104,250,61,236,138,102,105,208],3,26,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalUncappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address],[[75,130,171,29,197,167,90,74,100,127,153,206,118,135,230,103,95,189,204,8,108,196,215,0,161,53,102,19,236,183,63,182],[120,111,80,88,134,36,168,49,18,1,126,151,124,206,214,96,234,78,50,4,233,244,247,74,183,161,142,156,215,250,87,160],[173,251,89,211,90,196,68,1,205,210,90,119,155,247,234,235,152,210,182,232,164,28,183,170,61,29,67,226,179,83,160,22],[198,167,63,84,77,254,111,35,255,23,91,171,39,222,68,212,19,7,69,58,124,130,66,115,243,23,154,111,198,156,46,193],[2,174,166,200,247,80,58,112,135,249,170,102,201,116,50,91,145,243,207,31,217,6,2,116,86,78,201,208,28,101,41,250]],contractFreezableToken.address,[228,175,218,163,24,193,160,99,140,171,231,69,193,23,248,13,204,118,190,41,189,245,234,66,241,88,194,102,40,208,98,199],[157,247,95,150,176,39,32,193,230,80,141,81,173,1,155,156,142,93,161,139,61,42,205,195,214,14,51,143,72,96,105,24],[182,87,143,184,5,230,40,23,33,254,7,94,188,66,159,69,170,201,160,223,19,232,218,187,104,250,61,236,138,102,105,208],3,26,{from:accounts[0]}');
    contractTokenProportionalCappedTest = await TokenProportionalCappedTest.new([contractERC1261MetaData.address],[[120,182,144,80,208,101,221,179,249,153,53,186,219,74,48,254,196,216,94,153,226,236,119,185,252,204,49,142,177,221,224,165]],contractFreezableToken.address,65,[183,4,214,9,199,206,190,67,189,40,149,0,44,83,63,227,15,243,71,246,43,149,131,99,215,177,70,21,134,3,156,119],[33,217,50,192,66,53,179,165,130,32,75,28,247,18,155,138,101,120,175,83,244,220,80,130,24,248,77,159,45,122,135,227],[240,249,199,194,69,172,63,190,50,87,107,173,16,243,123,104,33,229,161,219,132,213,254,111,82,35,161,223,0,186,84,177],99,99,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalCappedTest.new([contractERC1261MetaData.address],[[120,182,144,80,208,101,221,179,249,153,53,186,219,74,48,254,196,216,94,153,226,236,119,185,252,204,49,142,177,221,224,165]],contractFreezableToken.address,65,[183,4,214,9,199,206,190,67,189,40,149,0,44,83,63,227,15,243,71,246,43,149,131,99,215,177,70,21,134,3,156,119],[33,217,50,192,66,53,179,165,130,32,75,28,247,18,155,138,101,120,175,83,244,220,80,130,24,248,77,159,45,122,135,227],[240,249,199,194,69,172,63,190,50,87,107,173,16,243,123,104,33,229,161,219,132,213,254,111,82,35,161,223,0,186,84,177],99,99,{from:accounts[0]}');
    contractFreezableTestToken = await FreezableTestToken.new({from:accounts[3]});
    if(trace) console.log('SUCESSO: FreezableTestToken.new({from:accounts[3]}');
    contractActionTest = await ActionTest.new([contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address],accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ActionTest.new([contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address],accounts[3],{from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractActionTest.sendTransaction({from: accounts[0]});
  });
  it('Should execute execute()', async () => {
    let result = await contractActionTest.execute({from: accounts[0]});
  });
  it('Should execute canExecute()', async () => {
    let result = await contractActionTest.canExecute({from: accounts[0]});
  });
});
