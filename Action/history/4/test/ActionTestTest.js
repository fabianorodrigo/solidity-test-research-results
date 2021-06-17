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
    contractProtocol = await Protocol.new([239,117,33,213,137,22,150,215,137,192,68,196,220,134,23,144,63,192,177,205,106,23,233,67,243,108,75,199,248,237,18,110],[18,169,247,157,241,226,121,158,185,145,92,96,73,72,140,40,211,243,198,213,101,207,81,250,111,91,245,139,61,240,166,54],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Protocol.new([239,117,33,213,137,22,150,215,137,192,68,196,220,134,23,144,63,192,177,205,106,23,233,67,243,108,75,199,248,237,18,110],[18,169,247,157,241,226,121,158,185,145,92,96,73,72,140,40,211,243,198,213,101,207,81,250,111,91,245,139,61,240,166,54],{from:accounts[0]}');
    contractERC1261MetaData = await ERC1261MetaData.new([234,2,150,66,32,97,224,149,167,12,194,7,170,120,172,187,122,47,102,41,48,17,216,2,176,72,137,124,229,253,239,89],[173,174,203,60,225,241,223,133,135,204,153,211,248,243,47,50,103,200,175,8,3,156,63,71,215,239,158,147,119,206,157,121],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([234,2,150,66,32,97,224,149,167,12,194,7,170,120,172,187,122,47,102,41,48,17,216,2,176,72,137,124,229,253,239,89],[173,174,203,60,225,241,223,133,135,204,153,211,248,243,47,50,103,200,175,8,3,156,63,71,215,239,158,147,119,206,157,121],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
    contractTokenProportionalUncappedTest = await TokenProportionalUncappedTest.new([contractProtocol.address,contractProtocol.address,contractProtocol.address],[[20,136,59,171,184,245,253,210,54,86,98,241,47,241,65,119,119,82,67,207,168,167,151,223,217,148,52,68,58,144,122,25],[129,121,247,115,143,186,23,248,141,88,71,19,20,151,137,153,163,126,246,219,252,161,241,187,81,34,149,254,112,133,107,172],[71,167,92,69,67,241,170,171,86,158,153,171,130,146,61,174,105,101,129,0,138,46,148,21,171,89,133,207,228,10,19,193],[249,249,147,73,152,209,20,160,60,183,131,187,78,196,173,4,227,47,13,30,71,200,46,146,126,99,255,163,95,136,179,24]],contractFreezableToken.address,[6,120,241,178,154,205,240,84,186,178,206,90,3,148,87,51,161,226,87,150,27,199,227,7,192,244,232,24,131,13,232,41],[247,100,128,212,86,107,96,84,72,121,224,194,112,34,145,39,206,5,72,111,34,203,124,77,50,160,166,12,160,203,102,68],[166,98,173,6,156,179,156,15,134,148,58,253,146,37,179,105,127,163,213,88,222,140,99,38,131,184,21,212,151,164,153,230],10001,100,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalUncappedTest.new([contractProtocol.address,contractProtocol.address,contractProtocol.address],[[20,136,59,171,184,245,253,210,54,86,98,241,47,241,65,119,119,82,67,207,168,167,151,223,217,148,52,68,58,144,122,25],[129,121,247,115,143,186,23,248,141,88,71,19,20,151,137,153,163,126,246,219,252,161,241,187,81,34,149,254,112,133,107,172],[71,167,92,69,67,241,170,171,86,158,153,171,130,146,61,174,105,101,129,0,138,46,148,21,171,89,133,207,228,10,19,193],[249,249,147,73,152,209,20,160,60,183,131,187,78,196,173,4,227,47,13,30,71,200,46,146,126,99,255,163,95,136,179,24]],contractFreezableToken.address,[6,120,241,178,154,205,240,84,186,178,206,90,3,148,87,51,161,226,87,150,27,199,227,7,192,244,232,24,131,13,232,41],[247,100,128,212,86,107,96,84,72,121,224,194,112,34,145,39,206,5,72,111,34,203,124,77,50,160,166,12,160,203,102,68],[166,98,173,6,156,179,156,15,134,148,58,253,146,37,179,105,127,163,213,88,222,140,99,38,131,184,21,212,151,164,153,230],10001,100,{from:accounts[0]}');
    contractTokenProportionalCappedTest = await TokenProportionalCappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address],[[242,7,118,77,27,4,15,201,120,22,70,75,107,66,154,85,23,210,253,187,20,31,235,216,108,238,184,98,15,75,19,67]],contractFreezableToken.address,0,[47,75,255,53,72,183,132,69,32,117,40,58,218,142,122,244,193,177,135,136,95,245,246,59,120,226,39,47,30,62,144,216],[234,90,115,37,214,216,52,142,15,132,65,115,74,141,133,36,196,99,250,236,192,220,69,174,196,171,71,60,176,107,24,28],[228,222,45,166,188,226,57,224,84,191,143,114,222,191,40,152,238,54,252,20,61,196,32,44,160,51,153,67,16,11,142,92],3,0,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalCappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address],[[242,7,118,77,27,4,15,201,120,22,70,75,107,66,154,85,23,210,253,187,20,31,235,216,108,238,184,98,15,75,19,67]],contractFreezableToken.address,0,[47,75,255,53,72,183,132,69,32,117,40,58,218,142,122,244,193,177,135,136,95,245,246,59,120,226,39,47,30,62,144,216],[234,90,115,37,214,216,52,142,15,132,65,115,74,141,133,36,196,99,250,236,192,220,69,174,196,171,71,60,176,107,24,28],[228,222,45,166,188,226,57,224,84,191,143,114,222,191,40,152,238,54,252,20,61,196,32,44,160,51,153,67,16,11,142,92],3,0,{from:accounts[0]}');
    contractFreezableTestToken = await FreezableTestToken.new({from:accounts[1]});
    if(trace) console.log('SUCESSO: FreezableTestToken.new({from:accounts[1]}');
    contractActionTest = await ActionTest.new([contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address],accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ActionTest.new([contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalUncappedTest.address],accounts[4],{from:accounts[0]}');
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
