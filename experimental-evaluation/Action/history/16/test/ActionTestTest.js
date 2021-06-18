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
    contractProtocol = await Protocol.new([64,125,0,227,7,229,107,235,86,42,129,122,33,62,236,90,35,158,181,99,46,147,235,46,191,196,81,30,128,120,145,221],[155,37,6,207,7,132,212,91,167,13,241,24,10,127,177,129,228,200,150,233,12,199,152,192,246,132,132,247,240,229,153,52],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Protocol.new([64,125,0,227,7,229,107,235,86,42,129,122,33,62,236,90,35,158,181,99,46,147,235,46,191,196,81,30,128,120,145,221],[155,37,6,207,7,132,212,91,167,13,241,24,10,127,177,129,228,200,150,233,12,199,152,192,246,132,132,247,240,229,153,52],{from:accounts[0]}');
    contractERC1261MetaData = await ERC1261MetaData.new([238,7,63,182,157,254,224,183,196,227,189,153,13,79,179,11,117,170,35,53,132,92,241,76,234,139,74,155,158,177,217,88],[192,145,219,32,249,118,215,165,41,185,94,80,48,2,164,140,172,22,47,156,123,41,168,13,202,217,187,192,239,186,33,73],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([238,7,63,182,157,254,224,183,196,227,189,153,13,79,179,11,117,170,35,53,132,92,241,76,234,139,74,155,158,177,217,88],[192,145,219,32,249,118,215,165,41,185,94,80,48,2,164,140,172,22,47,156,123,41,168,13,202,217,187,192,239,186,33,73],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
    contractTokenProportionalUncappedTest = await TokenProportionalUncappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[200,167,77,19,219,79,19,116,43,59,10,156,239,172,199,3,26,241,224,9,114,89,128,28,182,176,174,95,188,16,217,114],[74,21,153,78,4,107,2,1,182,89,231,157,86,241,35,99,118,123,159,30,254,68,23,153,218,87,146,197,68,215,48,177],[22,193,39,228,8,66,120,32,230,154,60,6,96,73,126,26,2,97,206,230,19,93,129,43,235,180,140,60,47,126,51,34],[52,232,137,90,239,39,44,174,135,125,63,189,93,56,152,245,180,79,173,12,36,82,229,33,187,150,76,32,161,167,22,223]],contractFreezableToken.address,[0,239,229,141,59,89,8,207,89,118,204,216,233,156,26,249,135,128,17,27,134,73,3,59,184,95,45,158,79,110,35,185],[35,0,52,30,8,236,91,234,236,81,194,79,241,77,60,168,108,86,176,100,144,167,55,135,227,115,175,93,11,218,141,108],[12,247,230,6,176,68,105,153,101,44,183,68,181,25,119,170,224,8,130,243,109,99,94,246,201,183,67,194,184,115,157,2],97,1532892063,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalUncappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[200,167,77,19,219,79,19,116,43,59,10,156,239,172,199,3,26,241,224,9,114,89,128,28,182,176,174,95,188,16,217,114],[74,21,153,78,4,107,2,1,182,89,231,157,86,241,35,99,118,123,159,30,254,68,23,153,218,87,146,197,68,215,48,177],[22,193,39,228,8,66,120,32,230,154,60,6,96,73,126,26,2,97,206,230,19,93,129,43,235,180,140,60,47,126,51,34],[52,232,137,90,239,39,44,174,135,125,63,189,93,56,152,245,180,79,173,12,36,82,229,33,187,150,76,32,161,167,22,223]],contractFreezableToken.address,[0,239,229,141,59,89,8,207,89,118,204,216,233,156,26,249,135,128,17,27,134,73,3,59,184,95,45,158,79,110,35,185],[35,0,52,30,8,236,91,234,236,81,194,79,241,77,60,168,108,86,176,100,144,167,55,135,227,115,175,93,11,218,141,108],[12,247,230,6,176,68,105,153,101,44,183,68,181,25,119,170,224,8,130,243,109,99,94,246,201,183,67,194,184,115,157,2],97,1532892063,{from:accounts[0]}');
    contractTokenProportionalCappedTest = await TokenProportionalCappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[21,219,163,79,107,229,187,43,160,123,41,68,236,254,235,64,77,131,38,69,174,231,135,100,170,250,226,102,220,154,141,101],[139,91,177,19,100,104,27,11,80,37,44,214,72,184,90,118,50,168,120,244,90,115,102,81,181,70,129,152,181,13,123,39],[233,241,39,252,166,162,181,214,61,36,142,93,255,62,240,18,112,206,214,213,149,84,218,191,244,61,160,119,121,135,173,79],[246,247,53,104,129,138,161,73,184,203,156,0,34,1,112,113,124,220,144,34,217,193,17,60,76,34,138,226,170,129,40,186],[144,187,62,120,9,162,3,221,195,244,8,54,253,59,188,195,194,175,189,169,46,116,33,127,255,129,235,234,171,30,81,133]],contractFreezableToken.address,99,[57,91,193,69,51,63,65,72,192,231,181,108,134,36,23,71,105,185,45,67,192,23,254,173,139,241,17,18,3,175,145,122],[240,74,100,11,130,106,102,247,152,36,238,115,124,16,103,30,24,73,19,53,53,103,180,186,123,87,67,223,80,54,253,97],[7,34,230,243,185,150,255,241,20,146,157,51,217,176,53,215,14,206,209,89,43,95,176,88,84,177,34,232,122,155,14,92],27,28,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalCappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[21,219,163,79,107,229,187,43,160,123,41,68,236,254,235,64,77,131,38,69,174,231,135,100,170,250,226,102,220,154,141,101],[139,91,177,19,100,104,27,11,80,37,44,214,72,184,90,118,50,168,120,244,90,115,102,81,181,70,129,152,181,13,123,39],[233,241,39,252,166,162,181,214,61,36,142,93,255,62,240,18,112,206,214,213,149,84,218,191,244,61,160,119,121,135,173,79],[246,247,53,104,129,138,161,73,184,203,156,0,34,1,112,113,124,220,144,34,217,193,17,60,76,34,138,226,170,129,40,186],[144,187,62,120,9,162,3,221,195,244,8,54,253,59,188,195,194,175,189,169,46,116,33,127,255,129,235,234,171,30,81,133]],contractFreezableToken.address,99,[57,91,193,69,51,63,65,72,192,231,181,108,134,36,23,71,105,185,45,67,192,23,254,173,139,241,17,18,3,175,145,122],[240,74,100,11,130,106,102,247,152,36,238,115,124,16,103,30,24,73,19,53,53,103,180,186,123,87,67,223,80,54,253,97],[7,34,230,243,185,150,255,241,20,146,157,51,217,176,53,215,14,206,209,89,43,95,176,88,84,177,34,232,122,155,14,92],27,28,{from:accounts[0]}');
    contractFreezableTestToken = await FreezableTestToken.new({from:accounts[9]});
    if(trace) console.log('SUCESSO: FreezableTestToken.new({from:accounts[9]}');
    contractActionTest = await ActionTest.new([contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address],accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ActionTest.new([contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address],accounts[3],{from:accounts[0]}');
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
