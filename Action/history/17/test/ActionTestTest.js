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
    contractProtocol = await Protocol.new([84,56,73,124,120,184,81,30,190,109,98,220,113,173,144,195,234,136,233,3,84,176,227,1,76,30,20,244,20,45,175,4],[44,108,183,245,221,219,9,14,11,39,78,133,23,84,102,29,157,102,1,126,139,203,69,46,131,90,117,127,105,163,105,26],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Protocol.new([84,56,73,124,120,184,81,30,190,109,98,220,113,173,144,195,234,136,233,3,84,176,227,1,76,30,20,244,20,45,175,4],[44,108,183,245,221,219,9,14,11,39,78,133,23,84,102,29,157,102,1,126,139,203,69,46,131,90,117,127,105,163,105,26],{from:accounts[0]}');
    contractERC1261MetaData = await ERC1261MetaData.new([184,6,245,221,197,157,162,106,230,10,144,86,39,39,119,212,47,209,58,206,150,221,145,187,117,161,194,50,58,17,14,63],[8,186,13,69,188,241,88,222,125,32,189,65,140,216,185,142,19,31,119,193,69,165,97,200,45,103,155,82,60,198,120,60],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC1261MetaData.new([184,6,245,221,197,157,162,106,230,10,144,86,39,39,119,212,47,209,58,206,150,221,145,187,117,161,194,50,58,17,14,63],[8,186,13,69,188,241,88,222,125,32,189,65,140,216,185,142,19,31,119,193,69,165,97,200,45,103,155,82,60,198,120,60],{from:accounts[0]}');
    contractMembershipVerificationToken = await MembershipVerificationToken.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MembershipVerificationToken.new({from:accounts[0]}');
    contractTokenProportionalUncappedTest = await TokenProportionalUncappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address],[[140,243,238,228,173,254,17,2,174,128,37,143,141,42,85,65,135,17,197,12,241,111,56,90,21,116,29,159,204,16,146,254],[245,8,183,159,194,206,32,211,47,107,28,99,55,37,250,25,234,238,162,96,251,6,35,160,202,13,189,9,112,89,149,31],[185,127,21,58,77,73,189,138,127,215,197,244,187,14,191,157,230,102,239,228,150,119,67,77,195,26,123,143,239,123,213,233],[39,203,230,172,15,78,170,4,185,105,183,231,159,132,123,254,71,109,252,190,31,176,49,234,245,206,40,89,158,231,249,142],[22,56,180,41,116,68,27,126,137,59,152,115,156,41,204,238,135,126,238,116,180,162,210,30,74,138,221,149,179,94,135,98],[200,185,58,116,109,221,152,195,204,44,5,15,44,45,232,97,164,102,32,81,141,217,62,240,14,22,187,91,194,84,202,59]],contractFreezableToken.address,[103,179,183,79,120,107,189,140,167,98,129,142,106,72,0,243,20,174,92,128,197,41,86,116,226,96,120,151,5,170,4,162],[207,88,124,159,20,213,130,218,228,50,154,81,236,96,57,183,105,145,118,38,119,100,228,163,183,216,238,109,191,183,83,165],[9,11,236,221,144,250,80,174,212,203,252,113,16,177,38,120,249,248,174,161,226,73,111,73,49,99,88,212,249,202,124,136],1532892062,1001,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalUncappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address],[[140,243,238,228,173,254,17,2,174,128,37,143,141,42,85,65,135,17,197,12,241,111,56,90,21,116,29,159,204,16,146,254],[245,8,183,159,194,206,32,211,47,107,28,99,55,37,250,25,234,238,162,96,251,6,35,160,202,13,189,9,112,89,149,31],[185,127,21,58,77,73,189,138,127,215,197,244,187,14,191,157,230,102,239,228,150,119,67,77,195,26,123,143,239,123,213,233],[39,203,230,172,15,78,170,4,185,105,183,231,159,132,123,254,71,109,252,190,31,176,49,234,245,206,40,89,158,231,249,142],[22,56,180,41,116,68,27,126,137,59,152,115,156,41,204,238,135,126,238,116,180,162,210,30,74,138,221,149,179,94,135,98],[200,185,58,116,109,221,152,195,204,44,5,15,44,45,232,97,164,102,32,81,141,217,62,240,14,22,187,91,194,84,202,59]],contractFreezableToken.address,[103,179,183,79,120,107,189,140,167,98,129,142,106,72,0,243,20,174,92,128,197,41,86,116,226,96,120,151,5,170,4,162],[207,88,124,159,20,213,130,218,228,50,154,81,236,96,57,183,105,145,118,38,119,100,228,163,183,216,238,109,191,183,83,165],[9,11,236,221,144,250,80,174,212,203,252,113,16,177,38,120,249,248,174,161,226,73,111,73,49,99,88,212,249,202,124,136],1532892062,1001,{from:accounts[0]}');
    contractTokenProportionalCappedTest = await TokenProportionalCappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address],[[217,97,24,126,150,88,236,33,177,48,211,95,102,254,65,248,27,194,215,121,184,118,204,218,79,1,133,6,83,62,148,67],[68,247,110,31,124,58,246,147,178,130,13,239,141,20,37,180,250,110,123,255,213,105,204,87,84,185,251,44,196,197,117,145],[113,229,84,124,147,160,77,42,103,112,6,115,190,212,235,13,18,239,50,110,7,175,154,77,253,228,23,137,150,171,137,119],[244,244,23,112,166,187,221,59,25,120,30,158,223,49,243,17,64,35,156,199,237,194,241,90,35,221,184,139,56,219,103,82],[187,49,42,98,184,204,168,45,162,70,216,66,244,184,28,119,33,248,7,129,21,57,186,43,183,82,172,197,254,34,41,68],[94,199,196,188,77,75,109,8,234,10,242,13,141,76,78,83,205,76,40,100,11,242,236,96,206,169,186,240,78,215,238,209],[15,223,79,187,9,107,97,70,248,49,15,94,242,220,2,74,148,63,16,92,191,94,206,67,195,118,140,12,199,119,74,52],[63,184,127,206,50,208,26,230,163,24,196,73,63,180,194,154,59,41,77,128,201,1,175,204,120,211,180,15,174,93,140,175],[16,131,79,162,85,180,247,29,190,127,24,48,93,61,44,244,13,63,231,73,120,169,63,54,231,43,148,24,112,216,158,205],[205,43,20,249,115,34,246,34,79,186,157,182,41,21,46,151,180,215,228,169,63,166,252,206,140,79,146,166,192,74,224,189],[37,240,16,218,183,35,240,243,85,162,15,235,42,123,8,229,43,225,37,240,186,213,138,53,82,183,214,84,199,115,30,88],[243,222,171,58,155,129,10,153,118,5,181,13,180,85,203,148,123,207,58,98,196,28,55,107,151,83,235,189,91,85,76,29],[196,103,57,107,230,104,176,27,154,112,25,251,57,253,243,143,37,25,105,61,231,156,131,122,18,11,17,65,117,151,93,130],[22,98,149,150,14,198,220,233,211,199,190,40,191,4,34,161,116,170,70,67,225,138,53,17,72,25,99,253,199,253,196,69],[132,180,79,133,152,91,208,44,249,79,136,239,117,41,195,155,164,251,90,139,252,58,14,227,94,11,103,45,38,231,143,133],[89,135,131,92,12,16,101,55,152,228,77,222,27,91,207,68,47,132,57,114,222,117,77,82,41,166,177,238,33,114,242,163],[30,231,21,188,148,50,254,48,102,132,111,81,72,41,159,12,165,78,114,245,81,129,96,108,224,74,72,166,123,128,215,46],[236,88,26,69,170,171,218,163,170,159,204,87,33,193,182,162,242,93,63,30,102,227,141,121,161,227,31,97,240,121,12,204],[76,33,91,231,31,193,200,33,39,127,98,233,173,30,236,164,238,4,59,119,197,25,124,149,29,138,6,13,237,106,62,68],[211,226,118,186,245,187,187,217,79,11,86,183,154,153,42,170,16,188,83,57,147,30,64,122,212,239,184,241,240,180,239,25],[205,175,28,38,57,28,113,129,196,248,161,93,185,152,156,37,1,13,184,183,150,221,141,166,152,238,58,195,230,2,176,79],[240,133,16,205,239,33,128,185,163,92,138,162,109,12,153,69,171,253,32,129,184,26,53,218,135,252,126,4,29,212,41,189],[91,96,97,182,190,197,223,60,172,107,83,75,96,91,6,222,247,174,63,171,65,10,240,55,157,139,143,144,19,162,114,251],[39,199,56,117,105,19,25,229,252,148,63,60,65,95,92,229,185,245,219,11,62,132,67,9,55,191,179,158,118,79,94,175],[167,84,126,52,156,55,34,114,101,215,254,184,237,129,12,193,30,102,226,3,134,35,164,153,75,89,27,82,72,71,114,40],[85,62,84,165,111,92,246,252,200,105,85,249,204,193,244,229,131,127,153,83,244,62,26,69,137,167,21,129,216,254,65,10],[158,168,13,101,245,120,80,166,24,65,237,79,160,80,197,36,246,115,27,131,201,155,191,182,27,149,103,36,155,150,93,0],[64,29,222,2,54,70,169,93,122,74,74,169,104,53,63,14,63,118,45,141,59,78,249,232,85,76,43,202,248,105,28,147],[140,67,161,5,96,147,181,206,175,17,4,9,40,228,26,6,131,192,233,170,103,99,140,161,130,10,207,133,189,225,249,92],[75,55,64,190,194,222,145,131,220,99,179,254,82,188,218,17,39,91,191,232,190,225,42,211,22,254,84,113,81,16,69,192],[237,164,188,180,109,50,95,98,144,185,68,134,168,178,114,216,27,234,28,223,89,129,115,79,129,179,92,53,60,14,196,98],[184,60,17,18,60,246,221,98,74,11,184,68,149,54,245,146,220,168,58,211,152,129,9,87,177,141,170,40,178,243,24,13],[136,222,25,185,120,96,103,107,132,122,62,16,186,76,117,48,41,29,92,136,55,174,0,121,84,238,245,104,85,128,87,111],[185,126,172,224,253,79,38,22,47,149,139,141,226,151,105,239,10,185,176,91,2,157,209,13,239,122,24,200,105,244,169,4],[50,210,3,11,84,31,145,21,112,205,35,184,40,233,83,47,231,4,29,142,255,95,150,165,95,147,30,195,72,78,143,58],[77,29,128,74,157,220,86,140,40,128,94,177,120,90,122,170,178,19,24,115,141,57,23,9,240,140,152,150,26,133,96,246],[127,130,169,179,223,75,126,83,27,66,191,232,204,209,244,101,4,100,90,98,128,57,65,184,127,249,12,244,69,220,192,108],[59,127,199,67,55,162,210,81,118,181,42,110,248,111,128,33,239,104,53,163,255,87,144,26,75,236,241,145,170,208,13,163],[176,74,160,234,97,65,1,1,142,250,14,186,225,181,219,180,6,46,160,146,104,50,83,207,254,139,103,163,103,151,224,251],[174,77,21,104,210,171,113,242,31,229,123,121,128,225,53,219,92,56,8,232,17,85,71,231,66,36,188,72,157,77,233,40],[71,144,36,74,146,222,252,69,66,186,236,70,91,154,113,109,17,249,81,148,144,251,132,100,30,114,69,32,194,10,94,80],[243,202,184,117,54,19,221,225,104,232,12,188,229,159,174,226,81,197,47,142,32,229,69,146,129,124,45,151,18,179,139,142],[111,107,51,3,10,186,231,157,9,115,142,27,248,38,84,9,37,169,92,216,216,188,236,191,150,214,111,60,157,122,117,222],[39,43,42,218,108,92,28,255,242,204,238,29,37,148,163,25,197,225,215,0,204,175,118,33,182,42,23,13,116,251,89,172],[99,188,61,209,208,51,223,166,17,184,54,214,236,148,228,17,46,127,186,38,207,200,47,20,14,79,183,206,235,38,129,16],[154,151,64,253,145,56,101,101,195,11,129,123,32,239,152,83,220,49,145,83,93,65,113,112,107,122,158,188,174,36,228,63],[224,80,12,36,213,253,21,34,145,68,30,6,251,87,227,3,170,14,188,149,227,11,88,25,240,109,133,20,212,42,72,238],[159,61,127,172,196,15,192,48,161,212,66,212,233,60,145,117,171,230,128,73,5,22,38,180,216,93,212,160,119,106,127,93],[152,243,165,149,63,251,28,189,205,123,183,184,216,161,58,81,158,252,103,6,204,233,1,20,216,52,154,49,237,71,127,148],[22,191,111,32,209,19,43,177,211,67,179,49,1,6,95,106,130,180,70,220,43,250,114,191,195,118,189,113,160,44,15,200],[193,130,146,1,174,207,117,147,176,61,70,55,178,33,248,55,130,182,38,239,15,69,61,210,252,121,246,31,245,140,83,176],[29,30,122,218,16,130,161,54,168,181,236,190,243,196,96,40,202,127,29,176,181,78,125,207,223,85,245,56,27,140,178,16],[201,232,153,192,204,140,229,195,36,68,221,88,141,98,237,201,0,150,232,165,96,104,232,61,27,219,137,33,157,106,185,175],[110,64,116,14,131,92,145,30,231,78,220,238,113,219,79,186,180,238,102,171,180,3,98,68,222,17,240,203,221,123,212,242],[173,101,52,149,135,136,240,175,57,6,228,160,26,23,95,171,81,123,182,253,100,160,239,119,187,148,226,2,129,90,236,154],[34,181,131,210,170,74,42,204,20,64,233,60,76,40,78,204,54,8,29,243,193,120,225,203,83,244,113,124,163,81,90,44],[27,154,198,177,75,205,1,219,28,143,151,130,46,17,166,222,187,205,65,23,160,173,119,116,109,221,28,64,247,154,206,179],[98,72,189,76,91,188,29,206,238,1,194,220,164,216,228,92,19,244,143,114,89,84,125,133,144,125,72,56,204,129,58,23],[231,40,161,44,215,124,71,175,202,43,127,11,15,110,172,182,48,232,4,204,56,194,7,124,31,131,130,96,239,15,49,72],[76,234,117,60,156,194,5,80,188,38,148,246,193,5,4,0,215,132,211,114,70,77,115,96,24,164,151,148,48,251,39,66],[6,136,90,29,199,124,9,59,142,202,239,246,78,244,172,199,126,190,65,241,63,209,137,228,157,29,205,196,63,178,17,228],[188,191,152,128,19,73,35,118,198,103,153,64,20,113,233,108,151,77,88,153,88,31,113,158,66,17,63,13,54,45,118,158],[173,252,200,71,206,59,175,185,93,84,113,64,21,23,0,153,5,43,2,88,134,15,219,90,226,95,43,169,167,234,220,223],[175,173,220,65,8,151,62,193,204,31,132,107,211,254,39,203,216,58,47,126,73,13,209,224,174,90,140,236,206,101,147,140],[176,213,96,212,89,147,87,56,41,255,124,241,182,6,176,246,86,231,46,137,19,105,47,66,143,35,5,173,87,111,57,207],[136,243,43,148,192,70,231,213,136,234,40,48,0,112,94,16,0,68,166,210,25,16,197,56,88,234,201,230,26,194,80,186],[145,252,121,154,117,192,206,191,185,9,75,250,69,224,211,240,4,35,206,165,3,13,209,23,220,202,104,246,7,217,94,130],[217,181,250,244,50,36,113,125,40,136,109,182,102,152,61,111,15,160,28,160,249,4,239,169,184,87,46,99,60,67,99,251],[161,236,209,185,246,175,25,123,116,58,252,40,234,220,106,72,9,119,106,167,151,74,171,212,20,127,124,196,243,24,110,147],[196,134,176,210,207,76,119,58,104,137,165,62,207,23,132,222,73,78,198,20,220,199,242,40,255,195,37,211,184,1,107,213],[116,107,197,245,33,111,132,123,84,112,225,150,205,248,131,211,189,4,118,30,80,205,88,27,39,47,136,17,66,192,237,124],[212,48,147,130,13,58,42,113,32,18,89,110,196,114,107,221,75,201,232,101,100,80,162,126,17,11,122,188,79,95,220,60],[101,159,176,205,237,94,40,212,151,8,223,187,249,34,232,240,85,62,219,80,182,50,166,71,109,234,9,110,168,117,185,200],[107,166,216,7,178,145,3,157,8,76,56,208,107,192,7,179,170,242,78,125,253,209,234,232,214,27,41,220,119,244,94,46],[87,188,30,127,124,176,74,68,247,65,44,222,217,207,192,127,238,61,219,204,40,81,168,77,30,58,244,184,82,37,174,80],[226,139,90,51,102,246,148,183,5,122,172,97,197,164,68,173,65,89,79,18,35,190,198,13,179,31,1,73,239,250,120,207],[94,163,181,202,45,143,31,6,212,59,174,180,187,136,223,116,23,242,12,153,142,124,118,221,191,234,70,23,59,167,163,101],[140,236,135,14,135,50,240,86,69,63,228,163,158,216,103,252,236,114,140,24,102,104,242,2,28,146,195,101,240,93,184,10],[36,145,69,24,215,152,85,91,233,122,137,132,23,25,212,211,41,118,198,239,7,9,111,137,224,126,51,224,216,100,163,137],[226,132,193,142,164,5,70,209,115,63,69,57,105,211,251,207,112,19,93,118,33,204,152,182,133,28,92,9,133,210,163,164],[141,244,222,153,217,218,137,60,50,68,89,210,40,27,126,248,251,9,149,215,159,86,180,39,158,95,252,47,206,226,23,111],[206,81,67,188,89,232,160,165,45,155,76,204,221,10,41,164,30,153,121,248,4,158,216,170,116,253,102,135,115,116,3,43],[193,106,193,16,195,255,140,5,129,91,236,206,73,66,148,58,161,93,113,146,149,63,152,65,152,81,6,157,168,63,45,58],[205,52,128,81,185,146,136,61,59,180,206,86,253,39,79,81,186,58,39,26,211,242,1,237,109,77,220,36,183,238,220,47],[56,39,211,100,239,134,193,240,81,253,200,108,104,55,99,247,158,207,164,254,153,68,13,208,13,66,199,120,157,179,205,136],[206,81,87,161,96,141,57,61,154,89,170,39,31,140,86,20,52,40,222,168,209,223,7,148,88,154,36,103,151,41,11,239],[95,122,135,33,214,130,156,112,50,210,136,73,30,180,135,87,34,53,243,155,177,35,196,189,91,22,69,71,103,252,130,211],[157,249,122,177,194,118,13,73,141,72,12,46,100,229,136,109,129,44,89,36,102,50,24,61,246,49,155,12,42,193,107,67],[64,80,182,195,58,169,244,79,52,121,173,133,170,49,161,37,11,33,17,27,53,99,129,82,214,60,136,60,75,204,176,190],[147,114,230,191,109,242,80,226,213,244,156,152,174,249,34,110,7,251,34,76,99,105,202,212,216,62,198,232,200,84,135,29],[197,213,52,215,174,127,31,95,242,101,125,70,96,187,99,55,190,184,49,31,255,223,223,73,19,226,146,96,11,163,210,189],[59,72,230,36,24,212,244,147,161,77,234,228,44,23,158,127,169,22,197,65,244,79,122,73,119,59,136,255,171,68,53,201],[69,217,151,73,221,142,162,58,99,100,87,131,71,112,234,83,102,102,255,0,71,193,172,167,92,213,11,232,231,116,161,175],[135,118,174,71,233,52,234,209,87,50,139,59,232,203,131,49,122,49,154,222,66,136,56,132,93,180,92,27,196,182,146,68],[149,53,149,45,184,171,128,70,41,96,193,164,78,152,222,56,221,249,221,219,20,180,104,56,29,34,47,139,128,223,41,148],[146,81,0,42,80,139,118,30,237,40,180,143,154,183,26,97,187,139,153,7,104,163,89,195,144,243,133,95,110,201,198,83],[235,21,139,40,197,48,214,72,116,80,124,67,196,25,35,37,235,245,106,232,64,51,82,201,67,248,85,8,62,212,235,7],[220,151,245,170,209,205,191,162,237,57,200,240,67,53,76,255,187,179,147,92,92,97,0,106,23,52,12,160,195,30,3,185],[24,102,130,17,166,81,83,131,197,53,10,153,174,181,64,162,66,171,101,68,224,45,154,22,219,117,158,2,127,197,73,224],[107,118,42,247,55,77,115,229,208,33,4,88,40,223,201,19,143,208,8,130,253,81,161,97,80,253,175,235,168,148,46,105]],contractFreezableToken.address,257,[165,130,192,232,80,109,24,39,14,159,41,104,122,167,6,157,207,178,196,17,98,204,149,1,139,42,114,180,61,246,198,240],[242,214,43,182,212,28,148,185,25,221,191,203,241,249,110,193,84,144,179,214,114,55,39,201,213,205,129,65,230,186,119,99],[219,19,26,191,211,137,122,179,73,9,106,255,131,162,49,64,11,201,170,222,210,46,108,106,230,249,87,218,122,174,110,28],66,256,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProportionalCappedTest.new([contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address,contractERC1261MetaData.address],[[217,97,24,126,150,88,236,33,177,48,211,95,102,254,65,248,27,194,215,121,184,118,204,218,79,1,133,6,83,62,148,67],[68,247,110,31,124,58,246,147,178,130,13,239,141,20,37,180,250,110,123,255,213,105,204,87,84,185,251,44,196,197,117,145],[113,229,84,124,147,160,77,42,103,112,6,115,190,212,235,13,18,239,50,110,7,175,154,77,253,228,23,137,150,171,137,119],[244,244,23,112,166,187,221,59,25,120,30,158,223,49,243,17,64,35,156,199,237,194,241,90,35,221,184,139,56,219,103,82],[187,49,42,98,184,204,168,45,162,70,216,66,244,184,28,119,33,248,7,129,21,57,186,43,183,82,172,197,254,34,41,68],[94,199,196,188,77,75,109,8,234,10,242,13,141,76,78,83,205,76,40,100,11,242,236,96,206,169,186,240,78,215,238,209],[15,223,79,187,9,107,97,70,248,49,15,94,242,220,2,74,148,63,16,92,191,94,206,67,195,118,140,12,199,119,74,52],[63,184,127,206,50,208,26,230,163,24,196,73,63,180,194,154,59,41,77,128,201,1,175,204,120,211,180,15,174,93,140,175],[16,131,79,162,85,180,247,29,190,127,24,48,93,61,44,244,13,63,231,73,120,169,63,54,231,43,148,24,112,216,158,205],[205,43,20,249,115,34,246,34,79,186,157,182,41,21,46,151,180,215,228,169,63,166,252,206,140,79,146,166,192,74,224,189],[37,240,16,218,183,35,240,243,85,162,15,235,42,123,8,229,43,225,37,240,186,213,138,53,82,183,214,84,199,115,30,88],[243,222,171,58,155,129,10,153,118,5,181,13,180,85,203,148,123,207,58,98,196,28,55,107,151,83,235,189,91,85,76,29],[196,103,57,107,230,104,176,27,154,112,25,251,57,253,243,143,37,25,105,61,231,156,131,122,18,11,17,65,117,151,93,130],[22,98,149,150,14,198,220,233,211,199,190,40,191,4,34,161,116,170,70,67,225,138,53,17,72,25,99,253,199,253,196,69],[132,180,79,133,152,91,208,44,249,79,136,239,117,41,195,155,164,251,90,139,252,58,14,227,94,11,103,45,38,231,143,133],[89,135,131,92,12,16,101,55,152,228,77,222,27,91,207,68,47,132,57,114,222,117,77,82,41,166,177,238,33,114,242,163],[30,231,21,188,148,50,254,48,102,132,111,81,72,41,159,12,165,78,114,245,81,129,96,108,224,74,72,166,123,128,215,46],[236,88,26,69,170,171,218,163,170,159,204,87,33,193,182,162,242,93,63,30,102,227,141,121,161,227,31,97,240,121,12,204],[76,33,91,231,31,193,200,33,39,127,98,233,173,30,236,164,238,4,59,119,197,25,124,149,29,138,6,13,237,106,62,68],[211,226,118,186,245,187,187,217,79,11,86,183,154,153,42,170,16,188,83,57,147,30,64,122,212,239,184,241,240,180,239,25],[205,175,28,38,57,28,113,129,196,248,161,93,185,152,156,37,1,13,184,183,150,221,141,166,152,238,58,195,230,2,176,79],[240,133,16,205,239,33,128,185,163,92,138,162,109,12,153,69,171,253,32,129,184,26,53,218,135,252,126,4,29,212,41,189],[91,96,97,182,190,197,223,60,172,107,83,75,96,91,6,222,247,174,63,171,65,10,240,55,157,139,143,144,19,162,114,251],[39,199,56,117,105,19,25,229,252,148,63,60,65,95,92,229,185,245,219,11,62,132,67,9,55,191,179,158,118,79,94,175],[167,84,126,52,156,55,34,114,101,215,254,184,237,129,12,193,30,102,226,3,134,35,164,153,75,89,27,82,72,71,114,40],[85,62,84,165,111,92,246,252,200,105,85,249,204,193,244,229,131,127,153,83,244,62,26,69,137,167,21,129,216,254,65,10],[158,168,13,101,245,120,80,166,24,65,237,79,160,80,197,36,246,115,27,131,201,155,191,182,27,149,103,36,155,150,93,0],[64,29,222,2,54,70,169,93,122,74,74,169,104,53,63,14,63,118,45,141,59,78,249,232,85,76,43,202,248,105,28,147],[140,67,161,5,96,147,181,206,175,17,4,9,40,228,26,6,131,192,233,170,103,99,140,161,130,10,207,133,189,225,249,92],[75,55,64,190,194,222,145,131,220,99,179,254,82,188,218,17,39,91,191,232,190,225,42,211,22,254,84,113,81,16,69,192],[237,164,188,180,109,50,95,98,144,185,68,134,168,178,114,216,27,234,28,223,89,129,115,79,129,179,92,53,60,14,196,98],[184,60,17,18,60,246,221,98,74,11,184,68,149,54,245,146,220,168,58,211,152,129,9,87,177,141,170,40,178,243,24,13],[136,222,25,185,120,96,103,107,132,122,62,16,186,76,117,48,41,29,92,136,55,174,0,121,84,238,245,104,85,128,87,111],[185,126,172,224,253,79,38,22,47,149,139,141,226,151,105,239,10,185,176,91,2,157,209,13,239,122,24,200,105,244,169,4],[50,210,3,11,84,31,145,21,112,205,35,184,40,233,83,47,231,4,29,142,255,95,150,165,95,147,30,195,72,78,143,58],[77,29,128,74,157,220,86,140,40,128,94,177,120,90,122,170,178,19,24,115,141,57,23,9,240,140,152,150,26,133,96,246],[127,130,169,179,223,75,126,83,27,66,191,232,204,209,244,101,4,100,90,98,128,57,65,184,127,249,12,244,69,220,192,108],[59,127,199,67,55,162,210,81,118,181,42,110,248,111,128,33,239,104,53,163,255,87,144,26,75,236,241,145,170,208,13,163],[176,74,160,234,97,65,1,1,142,250,14,186,225,181,219,180,6,46,160,146,104,50,83,207,254,139,103,163,103,151,224,251],[174,77,21,104,210,171,113,242,31,229,123,121,128,225,53,219,92,56,8,232,17,85,71,231,66,36,188,72,157,77,233,40],[71,144,36,74,146,222,252,69,66,186,236,70,91,154,113,109,17,249,81,148,144,251,132,100,30,114,69,32,194,10,94,80],[243,202,184,117,54,19,221,225,104,232,12,188,229,159,174,226,81,197,47,142,32,229,69,146,129,124,45,151,18,179,139,142],[111,107,51,3,10,186,231,157,9,115,142,27,248,38,84,9,37,169,92,216,216,188,236,191,150,214,111,60,157,122,117,222],[39,43,42,218,108,92,28,255,242,204,238,29,37,148,163,25,197,225,215,0,204,175,118,33,182,42,23,13,116,251,89,172],[99,188,61,209,208,51,223,166,17,184,54,214,236,148,228,17,46,127,186,38,207,200,47,20,14,79,183,206,235,38,129,16],[154,151,64,253,145,56,101,101,195,11,129,123,32,239,152,83,220,49,145,83,93,65,113,112,107,122,158,188,174,36,228,63],[224,80,12,36,213,253,21,34,145,68,30,6,251,87,227,3,170,14,188,149,227,11,88,25,240,109,133,20,212,42,72,238],[159,61,127,172,196,15,192,48,161,212,66,212,233,60,145,117,171,230,128,73,5,22,38,180,216,93,212,160,119,106,127,93],[152,243,165,149,63,251,28,189,205,123,183,184,216,161,58,81,158,252,103,6,204,233,1,20,216,52,154,49,237,71,127,148],[22,191,111,32,209,19,43,177,211,67,179,49,1,6,95,106,130,180,70,220,43,250,114,191,195,118,189,113,160,44,15,200],[193,130,146,1,174,207,117,147,176,61,70,55,178,33,248,55,130,182,38,239,15,69,61,210,252,121,246,31,245,140,83,176],[29,30,122,218,16,130,161,54,168,181,236,190,243,196,96,40,202,127,29,176,181,78,125,207,223,85,245,56,27,140,178,16],[201,232,153,192,204,140,229,195,36,68,221,88,141,98,237,201,0,150,232,165,96,104,232,61,27,219,137,33,157,106,185,175],[110,64,116,14,131,92,145,30,231,78,220,238,113,219,79,186,180,238,102,171,180,3,98,68,222,17,240,203,221,123,212,242],[173,101,52,149,135,136,240,175,57,6,228,160,26,23,95,171,81,123,182,253,100,160,239,119,187,148,226,2,129,90,236,154],[34,181,131,210,170,74,42,204,20,64,233,60,76,40,78,204,54,8,29,243,193,120,225,203,83,244,113,124,163,81,90,44],[27,154,198,177,75,205,1,219,28,143,151,130,46,17,166,222,187,205,65,23,160,173,119,116,109,221,28,64,247,154,206,179],[98,72,189,76,91,188,29,206,238,1,194,220,164,216,228,92,19,244,143,114,89,84,125,133,144,125,72,56,204,129,58,23],[231,40,161,44,215,124,71,175,202,43,127,11,15,110,172,182,48,232,4,204,56,194,7,124,31,131,130,96,239,15,49,72],[76,234,117,60,156,194,5,80,188,38,148,246,193,5,4,0,215,132,211,114,70,77,115,96,24,164,151,148,48,251,39,66],[6,136,90,29,199,124,9,59,142,202,239,246,78,244,172,199,126,190,65,241,63,209,137,228,157,29,205,196,63,178,17,228],[188,191,152,128,19,73,35,118,198,103,153,64,20,113,233,108,151,77,88,153,88,31,113,158,66,17,63,13,54,45,118,158],[173,252,200,71,206,59,175,185,93,84,113,64,21,23,0,153,5,43,2,88,134,15,219,90,226,95,43,169,167,234,220,223],[175,173,220,65,8,151,62,193,204,31,132,107,211,254,39,203,216,58,47,126,73,13,209,224,174,90,140,236,206,101,147,140],[176,213,96,212,89,147,87,56,41,255,124,241,182,6,176,246,86,231,46,137,19,105,47,66,143,35,5,173,87,111,57,207],[136,243,43,148,192,70,231,213,136,234,40,48,0,112,94,16,0,68,166,210,25,16,197,56,88,234,201,230,26,194,80,186],[145,252,121,154,117,192,206,191,185,9,75,250,69,224,211,240,4,35,206,165,3,13,209,23,220,202,104,246,7,217,94,130],[217,181,250,244,50,36,113,125,40,136,109,182,102,152,61,111,15,160,28,160,249,4,239,169,184,87,46,99,60,67,99,251],[161,236,209,185,246,175,25,123,116,58,252,40,234,220,106,72,9,119,106,167,151,74,171,212,20,127,124,196,243,24,110,147],[196,134,176,210,207,76,119,58,104,137,165,62,207,23,132,222,73,78,198,20,220,199,242,40,255,195,37,211,184,1,107,213],[116,107,197,245,33,111,132,123,84,112,225,150,205,248,131,211,189,4,118,30,80,205,88,27,39,47,136,17,66,192,237,124],[212,48,147,130,13,58,42,113,32,18,89,110,196,114,107,221,75,201,232,101,100,80,162,126,17,11,122,188,79,95,220,60],[101,159,176,205,237,94,40,212,151,8,223,187,249,34,232,240,85,62,219,80,182,50,166,71,109,234,9,110,168,117,185,200],[107,166,216,7,178,145,3,157,8,76,56,208,107,192,7,179,170,242,78,125,253,209,234,232,214,27,41,220,119,244,94,46],[87,188,30,127,124,176,74,68,247,65,44,222,217,207,192,127,238,61,219,204,40,81,168,77,30,58,244,184,82,37,174,80],[226,139,90,51,102,246,148,183,5,122,172,97,197,164,68,173,65,89,79,18,35,190,198,13,179,31,1,73,239,250,120,207],[94,163,181,202,45,143,31,6,212,59,174,180,187,136,223,116,23,242,12,153,142,124,118,221,191,234,70,23,59,167,163,101],[140,236,135,14,135,50,240,86,69,63,228,163,158,216,103,252,236,114,140,24,102,104,242,2,28,146,195,101,240,93,184,10],[36,145,69,24,215,152,85,91,233,122,137,132,23,25,212,211,41,118,198,239,7,9,111,137,224,126,51,224,216,100,163,137],[226,132,193,142,164,5,70,209,115,63,69,57,105,211,251,207,112,19,93,118,33,204,152,182,133,28,92,9,133,210,163,164],[141,244,222,153,217,218,137,60,50,68,89,210,40,27,126,248,251,9,149,215,159,86,180,39,158,95,252,47,206,226,23,111],[206,81,67,188,89,232,160,165,45,155,76,204,221,10,41,164,30,153,121,248,4,158,216,170,116,253,102,135,115,116,3,43],[193,106,193,16,195,255,140,5,129,91,236,206,73,66,148,58,161,93,113,146,149,63,152,65,152,81,6,157,168,63,45,58],[205,52,128,81,185,146,136,61,59,180,206,86,253,39,79,81,186,58,39,26,211,242,1,237,109,77,220,36,183,238,220,47],[56,39,211,100,239,134,193,240,81,253,200,108,104,55,99,247,158,207,164,254,153,68,13,208,13,66,199,120,157,179,205,136],[206,81,87,161,96,141,57,61,154,89,170,39,31,140,86,20,52,40,222,168,209,223,7,148,88,154,36,103,151,41,11,239],[95,122,135,33,214,130,156,112,50,210,136,73,30,180,135,87,34,53,243,155,177,35,196,189,91,22,69,71,103,252,130,211],[157,249,122,177,194,118,13,73,141,72,12,46,100,229,136,109,129,44,89,36,102,50,24,61,246,49,155,12,42,193,107,67],[64,80,182,195,58,169,244,79,52,121,173,133,170,49,161,37,11,33,17,27,53,99,129,82,214,60,136,60,75,204,176,190],[147,114,230,191,109,242,80,226,213,244,156,152,174,249,34,110,7,251,34,76,99,105,202,212,216,62,198,232,200,84,135,29],[197,213,52,215,174,127,31,95,242,101,125,70,96,187,99,55,190,184,49,31,255,223,223,73,19,226,146,96,11,163,210,189],[59,72,230,36,24,212,244,147,161,77,234,228,44,23,158,127,169,22,197,65,244,79,122,73,119,59,136,255,171,68,53,201],[69,217,151,73,221,142,162,58,99,100,87,131,71,112,234,83,102,102,255,0,71,193,172,167,92,213,11,232,231,116,161,175],[135,118,174,71,233,52,234,209,87,50,139,59,232,203,131,49,122,49,154,222,66,136,56,132,93,180,92,27,196,182,146,68],[149,53,149,45,184,171,128,70,41,96,193,164,78,152,222,56,221,249,221,219,20,180,104,56,29,34,47,139,128,223,41,148],[146,81,0,42,80,139,118,30,237,40,180,143,154,183,26,97,187,139,153,7,104,163,89,195,144,243,133,95,110,201,198,83],[235,21,139,40,197,48,214,72,116,80,124,67,196,25,35,37,235,245,106,232,64,51,82,201,67,248,85,8,62,212,235,7],[220,151,245,170,209,205,191,162,237,57,200,240,67,53,76,255,187,179,147,92,92,97,0,106,23,52,12,160,195,30,3,185],[24,102,130,17,166,81,83,131,197,53,10,153,174,181,64,162,66,171,101,68,224,45,154,22,219,117,158,2,127,197,73,224],[107,118,42,247,55,77,115,229,208,33,4,88,40,223,201,19,143,208,8,130,253,81,161,97,80,253,175,235,168,148,46,105]],contractFreezableToken.address,257,[165,130,192,232,80,109,24,39,14,159,41,104,122,167,6,157,207,178,196,17,98,204,149,1,139,42,114,180,61,246,198,240],[242,214,43,182,212,28,148,185,25,221,191,203,241,249,110,193,84,144,179,214,114,55,39,201,213,205,129,65,230,186,119,99],[219,19,26,191,211,137,122,179,73,9,106,255,131,162,49,64,11,201,170,222,210,46,108,106,230,249,87,218,122,174,110,28],66,256,{from:accounts[0]}');
    contractFreezableTestToken = await FreezableTestToken.new({from:accounts[9]});
    if(trace) console.log('SUCESSO: FreezableTestToken.new({from:accounts[9]}');
    contractActionTest = await ActionTest.new([contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address],accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: ActionTest.new([contractTokenProportionalUncappedTest.address,contractTokenProportionalCappedTest.address],accounts[4],{from:accounts[0]}');
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