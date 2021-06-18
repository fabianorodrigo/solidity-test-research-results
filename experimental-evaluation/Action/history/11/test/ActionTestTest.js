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
    contractProtocol = await Protocol.new([75,247,109,144,114,109,5,93,166,157,46,169,144,27,218,231,171,131,128,64,188,122,213,76,35,111,122,234,32,245,102,213],[30,233,10,231,240,255,200,144,218,106,149,175,189,218,213,125,158,139,161,93,231,224,82,97,83,207,126,168,109,11,100,26],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Protocol.new([75,247,109,144,114,109,5,93,166,157,46,169,144,27,218,231,171,131,128,64,188,122,213,76,35,111,122,234,32,245,102,213],[30,233,10,231,240,255,200,144,218,106,149,175,189,218,213,125,158,139,161,93,231,224,82,97,83,207,126,168,109,11,100,26],{from:accounts[0]}');
    contractERC1261MetaData = await ERC1261MetaData.new([254,225,123,47,204,82,14,186,136,46,252,62,203,167,204,197,99,142,236,189,101,108,172,131,3,223,249,248,189,148,180,88],[244,227,155,228,251,146,140,184,62,218,98,132,136,24,168,7,79,231,88,0,78,174,207,84,128,108,228,203,143,217,41,214],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([254,225,123,47,204,82,14,186,136,46,252,62,203,167,204,197,99,142,236,189,101,108,172,131,3,223,249,248,189,148,180,88],[244,227,155,228,251,146,140,184,62,218,98,132,136,24,168,7,79,231,88,0,78,174,207,84,128,108,228,203,143,217,41,214],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
    contractTokenProportionalUncappedTest = await TokenProportionalUncappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[106,132,227,41,154,109,2,182,55,194,167,179,37,118,218,88,30,255,50,9,9,87,117,28,58,94,181,186,154,227,49,193],[224,120,163,46,81,1,188,31,16,183,19,208,110,204,231,124,41,222,43,140,44,31,59,158,69,192,161,183,164,121,122,221],[233,78,185,132,43,1,105,193,220,172,195,101,219,215,99,155,113,25,176,192,232,19,70,21,78,42,169,79,50,182,9,137],[4,70,166,104,179,159,168,240,102,93,190,251,125,61,47,233,192,99,73,15,90,28,210,164,15,141,75,165,153,84,41,41],[16,56,69,233,22,179,142,52,206,197,210,200,107,22,37,252,112,114,216,99,98,247,253,166,164,77,114,152,242,3,174,243],[39,220,102,7,193,43,193,96,60,183,180,91,52,139,131,34,221,221,191,30,194,10,16,199,146,85,92,248,92,60,159,234]],contractFreezableToken.address,[104,98,189,10,92,11,253,32,241,198,73,194,63,210,71,153,109,193,139,185,221,39,72,252,173,40,136,161,242,213,94,222],[160,132,224,137,52,192,231,137,22,156,52,51,149,29,33,242,110,20,58,176,151,67,167,14,181,30,227,89,62,105,184,12],[216,147,176,246,22,51,185,117,177,147,129,254,112,33,60,117,26,119,192,75,58,243,139,137,80,212,148,42,54,14,187,142],254,2014223716,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalUncappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[106,132,227,41,154,109,2,182,55,194,167,179,37,118,218,88,30,255,50,9,9,87,117,28,58,94,181,186,154,227,49,193],[224,120,163,46,81,1,188,31,16,183,19,208,110,204,231,124,41,222,43,140,44,31,59,158,69,192,161,183,164,121,122,221],[233,78,185,132,43,1,105,193,220,172,195,101,219,215,99,155,113,25,176,192,232,19,70,21,78,42,169,79,50,182,9,137],[4,70,166,104,179,159,168,240,102,93,190,251,125,61,47,233,192,99,73,15,90,28,210,164,15,141,75,165,153,84,41,41],[16,56,69,233,22,179,142,52,206,197,210,200,107,22,37,252,112,114,216,99,98,247,253,166,164,77,114,152,242,3,174,243],[39,220,102,7,193,43,193,96,60,183,180,91,52,139,131,34,221,221,191,30,194,10,16,199,146,85,92,248,92,60,159,234]],contractFreezableToken.address,[104,98,189,10,92,11,253,32,241,198,73,194,63,210,71,153,109,193,139,185,221,39,72,252,173,40,136,161,242,213,94,222],[160,132,224,137,52,192,231,137,22,156,52,51,149,29,33,242,110,20,58,176,151,67,167,14,181,30,227,89,62,105,184,12],[216,147,176,246,22,51,185,117,177,147,129,254,112,33,60,117,26,119,192,75,58,243,139,137,80,212,148,42,54,14,187,142],254,2014223716,{from:accounts[0]}');
    contractTokenProportionalCappedTest = await TokenProportionalCappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[59,196,17,13,12,221,5,82,134,145,208,135,56,197,78,14,209,35,51,167,202,191,10,94,242,40,92,144,106,187,47,153],[3,90,14,74,136,161,20,165,89,222,130,221,233,121,66,112,146,167,213,194,124,210,247,204,166,228,199,187,61,51,9,4]],contractFreezableToken.address,27,[104,67,155,143,91,68,211,240,221,167,194,111,40,204,241,246,245,227,146,245,12,115,78,236,120,138,195,186,170,10,109,45],[157,103,74,187,189,183,202,219,110,143,115,190,62,100,194,27,226,181,20,204,90,38,97,64,16,31,56,79,195,171,89,37],[38,164,137,92,95,96,47,158,116,22,121,72,155,207,146,14,2,174,1,37,109,212,17,189,207,28,234,77,121,55,125,207],64,29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalCappedTest.new([contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address,contractMembershipVerificationToken.address],[[59,196,17,13,12,221,5,82,134,145,208,135,56,197,78,14,209,35,51,167,202,191,10,94,242,40,92,144,106,187,47,153],[3,90,14,74,136,161,20,165,89,222,130,221,233,121,66,112,146,167,213,194,124,210,247,204,166,228,199,187,61,51,9,4]],contractFreezableToken.address,27,[104,67,155,143,91,68,211,240,221,167,194,111,40,204,241,246,245,227,146,245,12,115,78,236,120,138,195,186,170,10,109,45],[157,103,74,187,189,183,202,219,110,143,115,190,62,100,194,27,226,181,20,204,90,38,97,64,16,31,56,79,195,171,89,37],[38,164,137,92,95,96,47,158,116,22,121,72,155,207,146,14,2,174,1,37,109,212,17,189,207,28,234,77,121,55,125,207],64,29,{from:accounts[0]}');
    contractFreezableTestToken = await FreezableTestToken.new({from:accounts[2]});
    if(trace) console.log('SUCESSO: FreezableTestToken.new({from:accounts[2]}');
    contractActionTest = await ActionTest.new([contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address],accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ActionTest.new([contractTokenProportionalCappedTest.address,contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address],accounts[2],{from:accounts[0]}');
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
