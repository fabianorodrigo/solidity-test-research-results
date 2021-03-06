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
    contractProtocol = await Protocol.new([63,30,38,153,192,229,2,149,194,128,66,135,123,192,172,158,44,58,117,108,177,129,214,2,184,229,124,91,111,105,106,219],[189,64,150,145,228,157,89,184,112,191,95,246,37,179,230,95,143,62,253,135,129,151,38,81,134,7,89,251,231,49,58,158],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Protocol.new([63,30,38,153,192,229,2,149,194,128,66,135,123,192,172,158,44,58,117,108,177,129,214,2,184,229,124,91,111,105,106,219],[189,64,150,145,228,157,89,184,112,191,95,246,37,179,230,95,143,62,253,135,129,151,38,81,134,7,89,251,231,49,58,158],{from:accounts[0]}');
    contractERC1261MetaData = await ERC1261MetaData.new([87,74,179,3,21,176,25,48,188,80,238,179,137,248,50,18,6,116,212,232,73,2,241,156,153,1,207,126,11,215,249,62],[11,92,67,74,215,230,170,198,70,0,25,98,157,112,189,25,191,48,87,237,42,131,106,108,83,135,26,253,213,114,44,42],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([87,74,179,3,21,176,25,48,188,80,238,179,137,248,50,18,6,116,212,232,73,2,241,156,153,1,207,126,11,215,249,62],[11,92,67,74,215,230,170,198,70,0,25,98,157,112,189,25,191,48,87,237,42,131,106,108,83,135,26,253,213,114,44,42],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
    contractTokenProportionalUncappedTest = await TokenProportionalUncappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[92,64,163,170,46,234,38,247,45,47,246,197,110,70,108,14,165,67,52,170,135,149,165,134,234,132,92,119,56,194,244,147],[28,231,146,20,63,57,24,34,79,195,67,216,216,162,168,251,249,127,226,167,35,240,53,5,130,210,164,224,248,70,255,72],[178,171,142,67,128,124,54,138,254,203,216,12,2,148,171,196,61,191,58,5,62,190,116,217,218,97,31,222,228,173,5,213],[148,65,183,232,102,84,166,112,244,68,52,20,113,69,68,149,47,182,213,168,83,97,117,133,27,103,205,68,95,117,14,187],[8,94,209,234,14,27,75,132,115,241,21,2,101,123,94,4,171,174,121,33,63,249,239,217,135,191,118,24,50,220,126,67]],contractFreezableToken.address,[172,193,91,141,164,118,229,171,189,75,15,3,198,150,140,234,23,82,239,144,109,228,213,18,189,93,128,249,90,191,233,103],[164,137,235,134,155,50,138,51,57,208,140,45,188,254,25,102,64,40,3,234,187,62,41,222,37,190,68,104,90,236,250,134],[35,115,12,253,136,26,155,54,237,52,41,224,175,198,92,100,62,34,71,50,186,163,248,169,252,75,143,225,231,8,138,222],1,66,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalUncappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[92,64,163,170,46,234,38,247,45,47,246,197,110,70,108,14,165,67,52,170,135,149,165,134,234,132,92,119,56,194,244,147],[28,231,146,20,63,57,24,34,79,195,67,216,216,162,168,251,249,127,226,167,35,240,53,5,130,210,164,224,248,70,255,72],[178,171,142,67,128,124,54,138,254,203,216,12,2,148,171,196,61,191,58,5,62,190,116,217,218,97,31,222,228,173,5,213],[148,65,183,232,102,84,166,112,244,68,52,20,113,69,68,149,47,182,213,168,83,97,117,133,27,103,205,68,95,117,14,187],[8,94,209,234,14,27,75,132,115,241,21,2,101,123,94,4,171,174,121,33,63,249,239,217,135,191,118,24,50,220,126,67]],contractFreezableToken.address,[172,193,91,141,164,118,229,171,189,75,15,3,198,150,140,234,23,82,239,144,109,228,213,18,189,93,128,249,90,191,233,103],[164,137,235,134,155,50,138,51,57,208,140,45,188,254,25,102,64,40,3,234,187,62,41,222,37,190,68,104,90,236,250,134],[35,115,12,253,136,26,155,54,237,52,41,224,175,198,92,100,62,34,71,50,186,163,248,169,252,75,143,225,231,8,138,222],1,66,{from:accounts[0]}');
    contractTokenProportionalCappedTest = await TokenProportionalCappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address],[],contractFreezableToken.address,26,[108,60,241,101,150,124,49,208,127,211,128,27,99,150,193,129,222,85,223,227,251,33,182,208,154,200,251,146,72,99,110,222],[47,91,122,176,2,227,112,52,76,112,227,71,172,132,254,232,38,242,253,23,226,206,43,101,135,139,27,115,207,146,215,86],[64,40,98,197,237,68,237,154,172,52,216,187,57,182,121,75,235,228,152,55,177,198,240,129,54,53,210,184,199,25,141,41],28,3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalCappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address],[],contractFreezableToken.address,26,[108,60,241,101,150,124,49,208,127,211,128,27,99,150,193,129,222,85,223,227,251,33,182,208,154,200,251,146,72,99,110,222],[47,91,122,176,2,227,112,52,76,112,227,71,172,132,254,232,38,242,253,23,226,206,43,101,135,139,27,115,207,146,215,86],[64,40,98,197,237,68,237,154,172,52,216,187,57,182,121,75,235,228,152,55,177,198,240,129,54,53,210,184,199,25,141,41],28,3,{from:accounts[0]}');
    contractFreezableTestToken = await FreezableTestToken.new({from:accounts[5]});
    if(trace) console.log('SUCESSO: FreezableTestToken.new({from:accounts[5]}');
    contractActionTest = await ActionTest.new([contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address],accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ActionTest.new([contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address],accounts[8],{from:accounts[0]}');
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
