const truffleAssert = require('truffle-assertions');
const PaymentTokenMock = artifacts.require("PaymentTokenMock");
const RedeemableTokenMock = artifacts.require("RedeemableTokenMock");
const OffChainPayments = artifacts.require("OffChainPayments");
const OnChainPayments = artifacts.require("OnChainPayments");
const FixedPriceTender = artifacts.require("FixedPriceTender");
const FullRedemption = artifacts.require("FullRedemption");
const PartialRedemption = artifacts.require("PartialRedemption");
const RedeemableToken = artifacts.require("RedeemableToken");
const OnChainVoting = artifacts.require("OnChainVoting");
const ECDSA = artifacts.require("openzeppelin-solidity/contracts/cryptography/ECDSA.sol");
const Math = artifacts.require("openzeppelin-solidity/contracts/math/Math.sol");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20.sol");

contract("OffChainPayments",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractMath = null;
  let contractECDSA = null;
  let contractERC20 = null;
  let contractRedeemableToken = null;
  let contractPaymentTokenMock = null;
  let contractRedeemableTokenMock = null;
  let contractOffChainPayments = null;
  let contractPartialRedemption = null;
  let contractOnChainPayments = null;
  let contractFixedPriceTender = null;
  let contractFullRedemption = null;
  let contractOnChainVoting = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractMath = await Math.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Math.new({from: accounts[0]}');
    contractECDSA = await ECDSA.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ECDSA.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    RedeemableToken.link("SafeMath",contractSafeMath.address);
    contractRedeemableToken = await RedeemableToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableToken.new({from: accounts[0]}');
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[1],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[1],29,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[8],3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[8],3,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[0],{from:accounts[9]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[0],{from:accounts[9]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[7],66,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[7],66,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[3],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[3],{from:accounts[1]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(2014223714,contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,contractMath.address,3,27,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(2014223714,contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,contractMath.address,3,27,{from:accounts[0]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[3],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[3],1337,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648,{from:accounts[2]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+648,{from:accounts[2]}');
  });
  
  it('Should execute recordPayments(address[],uint256[],uint256[],bytes32[]) WHEN msg.sender==_owner,_securityHolders.length>0,_securityHolders.length==_offchainPaymentHashes.length,_securityHolders.length==_paymentTimestamps.length,_securityHolders.length==_paymentValues.length', async () => {
    let result = await contractOffChainPayments.recordPayments([accounts[8],accounts[6],accounts[2],accounts[6],accounts[9],accounts[9],accounts[3],accounts[3],accounts[4],accounts[0],accounts[1],accounts[7],accounts[8],accounts[7],accounts[3],accounts[9],accounts[2],accounts[0],accounts[8],accounts[7],accounts[4],accounts[1],accounts[4],accounts[1],accounts[6],accounts[7],accounts[1]], [6,29,27,2014223716,27,255,66,3,2014223716,64,1532892063,257,97,9999,5,4,1336,9999,10000,1532892062,1532892062,255,27,96,5,3,29], [1532892062,1,66,4,2014223714,28,0,10001,65,0,2014223715,1532892063,10001,64,64,255,64,6,66,1338,257,256,10001,64,256,27,95], [[255,254,20,106,100,203,209,34,16,167,121,1,169,63,154,21,97,252,52,212,108,159,76,40,6,12,228,226,92,184,40,173],[78,249,19,56,44,208,27,82,136,45,63,102,129,99,154,33,171,19,106,14,96,31,170,135,190,236,198,53,69,135,127,52],[165,78,214,117,44,112,202,39,129,254,90,185,80,245,30,110,88,1,79,49,232,64,181,70,95,157,75,76,0,133,192,69],[116,111,224,168,126,170,123,183,6,158,14,238,209,156,26,71,134,217,230,204,44,162,178,92,203,0,81,144,44,213,109,91],[143,82,197,67,183,181,208,160,234,132,222,31,148,231,78,196,212,233,210,139,15,24,188,211,250,5,218,77,175,198,167,180],[52,104,210,66,83,0,255,114,205,159,165,161,228,8,210,19,223,42,77,132,27,188,234,129,106,135,228,59,189,212,194,31],[210,244,121,226,82,54,78,99,163,106,109,114,206,242,202,219,138,72,216,189,253,72,251,211,246,245,109,199,154,253,48,22],[191,82,229,72,150,30,82,215,124,31,6,254,45,98,253,10,230,15,170,138,43,164,198,132,103,120,227,106,67,47,107,206],[217,19,80,124,30,241,89,203,47,97,123,158,32,174,221,215,152,128,48,36,40,249,79,181,213,231,127,94,78,31,240,104],[152,170,40,161,225,134,69,112,26,79,208,223,34,106,12,140,110,155,89,116,199,165,74,101,240,84,84,13,120,81,120,26],[66,81,24,152,50,242,146,196,108,240,140,99,194,51,234,144,235,190,195,76,173,88,203,17,21,157,35,244,110,59,75,230],[167,100,108,137,221,193,14,197,111,0,10,27,90,133,73,237,19,199,39,20,145,214,37,81,156,168,74,22,36,161,219,149],[208,82,62,63,245,43,207,162,167,220,36,216,96,68,255,154,17,40,245,113,32,24,135,251,180,226,162,171,52,57,240,235],[134,84,242,53,37,202,131,41,244,34,191,212,153,92,234,186,21,52,248,65,126,28,31,139,244,51,218,26,38,149,52,243],[255,196,25,175,98,155,54,2,38,106,84,225,60,43,54,102,2,129,11,56,178,64,250,33,10,78,199,48,231,100,61,135],[120,206,227,117,160,215,211,189,142,173,136,101,120,58,107,60,115,170,7,115,121,91,181,199,52,25,194,226,29,17,157,225],[239,71,198,21,238,20,233,223,30,147,37,33,77,10,57,101,208,216,177,101,81,117,211,119,7,184,151,92,124,140,164,215],[185,122,136,227,47,228,94,104,85,218,52,99,26,58,67,23,195,30,87,69,112,60,67,56,4,194,37,128,143,177,162,5],[142,249,37,142,168,98,232,251,153,29,2,122,99,173,46,74,172,228,9,235,122,160,190,94,63,213,215,232,63,76,179,98],[230,95,209,12,84,42,190,21,117,122,241,170,54,214,42,191,231,94,15,220,176,12,233,240,212,152,91,131,188,249,9,212],[134,3,166,151,43,143,67,178,23,104,237,232,211,122,180,128,61,57,115,177,74,77,154,177,154,109,60,76,35,142,76,156],[219,65,148,246,252,130,217,48,103,114,49,196,119,102,12,156,68,97,132,242,201,228,113,184,52,12,75,61,184,200,84,183],[19,0,242,170,130,169,75,138,67,11,157,22,33,104,107,8,172,233,223,84,222,226,32,184,106,152,41,53,131,235,85,138],[120,255,183,152,63,249,189,17,75,168,226,212,91,198,164,56,92,152,232,34,112,132,254,167,188,4,68,65,212,227,25,160],[25,6,96,128,146,171,53,64,163,201,59,246,150,238,227,225,35,53,140,24,48,153,129,186,42,139,83,65,119,63,7,216],[62,195,173,148,141,43,235,38,2,221,238,180,35,96,196,36,183,80,93,212,130,27,114,217,139,172,78,74,183,249,17,210],[167,81,169,242,101,230,67,65,170,228,222,103,133,2,207,232,245,212,44,142,86,76,112,124,156,26,80,139,26,215,135,22]],{from: accounts[9]});
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[8],accounts[6],accounts[2],accounts[6],accounts[9],accounts[9],accounts[3],accounts[3],accounts[4],accounts[0],accounts[1],accounts[7],accounts[8],accounts[7],accounts[3],accounts[9],accounts[2],accounts[0],accounts[8],accounts[7],accounts[4],accounts[1],accounts[4],accounts[1],accounts[6],accounts[7],accounts[1]], [6,29,27,2014223716,27,255,66,3,2014223716,64,1532892063,257,97,9999,5,4,1336,9999,10000,1532892062,1532892062,255,27,96,5,3,29], [1532892062,1,66,4,2014223714,28,0,10001,65,0,2014223715,1532892063,10001,64,64,255,64,6,66,1338,257,256,10001,64,256,27,95], [[255,254,20,106,100,203,209,34,16,167,121,1,169,63,154,21,97,252,52,212,108,159,76,40,6,12,228,226,92,184,40,173],[78,249,19,56,44,208,27,82,136,45,63,102,129,99,154,33,171,19,106,14,96,31,170,135,190,236,198,53,69,135,127,52],[165,78,214,117,44,112,202,39,129,254,90,185,80,245,30,110,88,1,79,49,232,64,181,70,95,157,75,76,0,133,192,69],[116,111,224,168,126,170,123,183,6,158,14,238,209,156,26,71,134,217,230,204,44,162,178,92,203,0,81,144,44,213,109,91],[143,82,197,67,183,181,208,160,234,132,222,31,148,231,78,196,212,233,210,139,15,24,188,211,250,5,218,77,175,198,167,180],[52,104,210,66,83,0,255,114,205,159,165,161,228,8,210,19,223,42,77,132,27,188,234,129,106,135,228,59,189,212,194,31],[210,244,121,226,82,54,78,99,163,106,109,114,206,242,202,219,138,72,216,189,253,72,251,211,246,245,109,199,154,253,48,22],[191,82,229,72,150,30,82,215,124,31,6,254,45,98,253,10,230,15,170,138,43,164,198,132,103,120,227,106,67,47,107,206],[217,19,80,124,30,241,89,203,47,97,123,158,32,174,221,215,152,128,48,36,40,249,79,181,213,231,127,94,78,31,240,104],[152,170,40,161,225,134,69,112,26,79,208,223,34,106,12,140,110,155,89,116,199,165,74,101,240,84,84,13,120,81,120,26],[66,81,24,152,50,242,146,196,108,240,140,99,194,51,234,144,235,190,195,76,173,88,203,17,21,157,35,244,110,59,75,230],[167,100,108,137,221,193,14,197,111,0,10,27,90,133,73,237,19,199,39,20,145,214,37,81,156,168,74,22,36,161,219,149],[208,82,62,63,245,43,207,162,167,220,36,216,96,68,255,154,17,40,245,113,32,24,135,251,180,226,162,171,52,57,240,235],[134,84,242,53,37,202,131,41,244,34,191,212,153,92,234,186,21,52,248,65,126,28,31,139,244,51,218,26,38,149,52,243],[255,196,25,175,98,155,54,2,38,106,84,225,60,43,54,102,2,129,11,56,178,64,250,33,10,78,199,48,231,100,61,135],[120,206,227,117,160,215,211,189,142,173,136,101,120,58,107,60,115,170,7,115,121,91,181,199,52,25,194,226,29,17,157,225],[239,71,198,21,238,20,233,223,30,147,37,33,77,10,57,101,208,216,177,101,81,117,211,119,7,184,151,92,124,140,164,215],[185,122,136,227,47,228,94,104,85,218,52,99,26,58,67,23,195,30,87,69,112,60,67,56,4,194,37,128,143,177,162,5],[142,249,37,142,168,98,232,251,153,29,2,122,99,173,46,74,172,228,9,235,122,160,190,94,63,213,215,232,63,76,179,98],[230,95,209,12,84,42,190,21,117,122,241,170,54,214,42,191,231,94,15,220,176,12,233,240,212,152,91,131,188,249,9,212],[134,3,166,151,43,143,67,178,23,104,237,232,211,122,180,128,61,57,115,177,74,77,154,177,154,109,60,76,35,142,76,156],[219,65,148,246,252,130,217,48,103,114,49,196,119,102,12,156,68,97,132,242,201,228,113,184,52,12,75,61,184,200,84,183],[19,0,242,170,130,169,75,138,67,11,157,22,33,104,107,8,172,233,223,84,222,226,32,184,106,152,41,53,131,235,85,138],[120,255,183,152,63,249,189,17,75,168,226,212,91,198,164,56,92,152,232,34,112,132,254,167,188,4,68,65,212,227,25,160],[25,6,96,128,146,171,53,64,163,201,59,246,150,238,227,225,35,53,140,24,48,153,129,186,42,139,83,65,119,63,7,216],[62,195,173,148,141,43,235,38,2,221,238,180,35,96,196,36,183,80,93,212,130,27,114,217,139,172,78,74,183,249,17,210],[167,81,169,242,101,230,67,65,170,228,222,103,133,2,207,232,245,212,44,142,86,76,112,124,156,26,80,139,26,215,135,22]],{from: accounts[8]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length > 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([], [6,29,27,2014223716,27,255,66,3,2014223716,64,1532892063,257,97,9999,5,4,1336,9999,10000,1532892062,1532892062,255,27,96,5,3,29], [1532892062,1,66,4,2014223714,28,0,10001,65,0,2014223715,1532892063,10001,64,64,255,64,6,66,1338,257,256,10001,64,256,27,95], [[255,254,20,106,100,203,209,34,16,167,121,1,169,63,154,21,97,252,52,212,108,159,76,40,6,12,228,226,92,184,40,173],[78,249,19,56,44,208,27,82,136,45,63,102,129,99,154,33,171,19,106,14,96,31,170,135,190,236,198,53,69,135,127,52],[165,78,214,117,44,112,202,39,129,254,90,185,80,245,30,110,88,1,79,49,232,64,181,70,95,157,75,76,0,133,192,69],[116,111,224,168,126,170,123,183,6,158,14,238,209,156,26,71,134,217,230,204,44,162,178,92,203,0,81,144,44,213,109,91],[143,82,197,67,183,181,208,160,234,132,222,31,148,231,78,196,212,233,210,139,15,24,188,211,250,5,218,77,175,198,167,180],[52,104,210,66,83,0,255,114,205,159,165,161,228,8,210,19,223,42,77,132,27,188,234,129,106,135,228,59,189,212,194,31],[210,244,121,226,82,54,78,99,163,106,109,114,206,242,202,219,138,72,216,189,253,72,251,211,246,245,109,199,154,253,48,22],[191,82,229,72,150,30,82,215,124,31,6,254,45,98,253,10,230,15,170,138,43,164,198,132,103,120,227,106,67,47,107,206],[217,19,80,124,30,241,89,203,47,97,123,158,32,174,221,215,152,128,48,36,40,249,79,181,213,231,127,94,78,31,240,104],[152,170,40,161,225,134,69,112,26,79,208,223,34,106,12,140,110,155,89,116,199,165,74,101,240,84,84,13,120,81,120,26],[66,81,24,152,50,242,146,196,108,240,140,99,194,51,234,144,235,190,195,76,173,88,203,17,21,157,35,244,110,59,75,230],[167,100,108,137,221,193,14,197,111,0,10,27,90,133,73,237,19,199,39,20,145,214,37,81,156,168,74,22,36,161,219,149],[208,82,62,63,245,43,207,162,167,220,36,216,96,68,255,154,17,40,245,113,32,24,135,251,180,226,162,171,52,57,240,235],[134,84,242,53,37,202,131,41,244,34,191,212,153,92,234,186,21,52,248,65,126,28,31,139,244,51,218,26,38,149,52,243],[255,196,25,175,98,155,54,2,38,106,84,225,60,43,54,102,2,129,11,56,178,64,250,33,10,78,199,48,231,100,61,135],[120,206,227,117,160,215,211,189,142,173,136,101,120,58,107,60,115,170,7,115,121,91,181,199,52,25,194,226,29,17,157,225],[239,71,198,21,238,20,233,223,30,147,37,33,77,10,57,101,208,216,177,101,81,117,211,119,7,184,151,92,124,140,164,215],[185,122,136,227,47,228,94,104,85,218,52,99,26,58,67,23,195,30,87,69,112,60,67,56,4,194,37,128,143,177,162,5],[142,249,37,142,168,98,232,251,153,29,2,122,99,173,46,74,172,228,9,235,122,160,190,94,63,213,215,232,63,76,179,98],[230,95,209,12,84,42,190,21,117,122,241,170,54,214,42,191,231,94,15,220,176,12,233,240,212,152,91,131,188,249,9,212],[134,3,166,151,43,143,67,178,23,104,237,232,211,122,180,128,61,57,115,177,74,77,154,177,154,109,60,76,35,142,76,156],[219,65,148,246,252,130,217,48,103,114,49,196,119,102,12,156,68,97,132,242,201,228,113,184,52,12,75,61,184,200,84,183],[19,0,242,170,130,169,75,138,67,11,157,22,33,104,107,8,172,233,223,84,222,226,32,184,106,152,41,53,131,235,85,138],[120,255,183,152,63,249,189,17,75,168,226,212,91,198,164,56,92,152,232,34,112,132,254,167,188,4,68,65,212,227,25,160],[25,6,96,128,146,171,53,64,163,201,59,246,150,238,227,225,35,53,140,24,48,153,129,186,42,139,83,65,119,63,7,216],[62,195,173,148,141,43,235,38,2,221,238,180,35,96,196,36,183,80,93,212,130,27,114,217,139,172,78,74,183,249,17,210],[167,81,169,242,101,230,67,65,170,228,222,103,133,2,207,232,245,212,44,142,86,76,112,124,156,26,80,139,26,215,135,22]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _offchainPaymentHashes.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[3],accounts[8],accounts[5],accounts[2],accounts[4],accounts[9],accounts[9],accounts[0],accounts[9],accounts[2],accounts[0],accounts[9],accounts[0],accounts[0],accounts[0],accounts[9],accounts[9],accounts[7],accounts[1],accounts[2],accounts[6],accounts[1],accounts[7],accounts[1],accounts[5],accounts[5],accounts[3],accounts[2]], [6,29,27,2014223716,27,255,66,3,2014223716,64,1532892063,257,97,9999,5,4,1336,9999,10000,1532892062,1532892062,255,27,96,5,3,29], [1532892062,1,66,4,2014223714,28,0,10001,65,0,2014223715,1532892063,10001,64,64,255,64,6,66,1338,257,256,10001,64,256,27,95], [[255,254,20,106,100,203,209,34,16,167,121,1,169,63,154,21,97,252,52,212,108,159,76,40,6,12,228,226,92,184,40,173],[78,249,19,56,44,208,27,82,136,45,63,102,129,99,154,33,171,19,106,14,96,31,170,135,190,236,198,53,69,135,127,52],[165,78,214,117,44,112,202,39,129,254,90,185,80,245,30,110,88,1,79,49,232,64,181,70,95,157,75,76,0,133,192,69],[116,111,224,168,126,170,123,183,6,158,14,238,209,156,26,71,134,217,230,204,44,162,178,92,203,0,81,144,44,213,109,91],[143,82,197,67,183,181,208,160,234,132,222,31,148,231,78,196,212,233,210,139,15,24,188,211,250,5,218,77,175,198,167,180],[52,104,210,66,83,0,255,114,205,159,165,161,228,8,210,19,223,42,77,132,27,188,234,129,106,135,228,59,189,212,194,31],[210,244,121,226,82,54,78,99,163,106,109,114,206,242,202,219,138,72,216,189,253,72,251,211,246,245,109,199,154,253,48,22],[191,82,229,72,150,30,82,215,124,31,6,254,45,98,253,10,230,15,170,138,43,164,198,132,103,120,227,106,67,47,107,206],[217,19,80,124,30,241,89,203,47,97,123,158,32,174,221,215,152,128,48,36,40,249,79,181,213,231,127,94,78,31,240,104],[152,170,40,161,225,134,69,112,26,79,208,223,34,106,12,140,110,155,89,116,199,165,74,101,240,84,84,13,120,81,120,26],[66,81,24,152,50,242,146,196,108,240,140,99,194,51,234,144,235,190,195,76,173,88,203,17,21,157,35,244,110,59,75,230],[167,100,108,137,221,193,14,197,111,0,10,27,90,133,73,237,19,199,39,20,145,214,37,81,156,168,74,22,36,161,219,149],[208,82,62,63,245,43,207,162,167,220,36,216,96,68,255,154,17,40,245,113,32,24,135,251,180,226,162,171,52,57,240,235],[134,84,242,53,37,202,131,41,244,34,191,212,153,92,234,186,21,52,248,65,126,28,31,139,244,51,218,26,38,149,52,243],[255,196,25,175,98,155,54,2,38,106,84,225,60,43,54,102,2,129,11,56,178,64,250,33,10,78,199,48,231,100,61,135],[120,206,227,117,160,215,211,189,142,173,136,101,120,58,107,60,115,170,7,115,121,91,181,199,52,25,194,226,29,17,157,225],[239,71,198,21,238,20,233,223,30,147,37,33,77,10,57,101,208,216,177,101,81,117,211,119,7,184,151,92,124,140,164,215],[185,122,136,227,47,228,94,104,85,218,52,99,26,58,67,23,195,30,87,69,112,60,67,56,4,194,37,128,143,177,162,5],[142,249,37,142,168,98,232,251,153,29,2,122,99,173,46,74,172,228,9,235,122,160,190,94,63,213,215,232,63,76,179,98],[230,95,209,12,84,42,190,21,117,122,241,170,54,214,42,191,231,94,15,220,176,12,233,240,212,152,91,131,188,249,9,212],[134,3,166,151,43,143,67,178,23,104,237,232,211,122,180,128,61,57,115,177,74,77,154,177,154,109,60,76,35,142,76,156],[219,65,148,246,252,130,217,48,103,114,49,196,119,102,12,156,68,97,132,242,201,228,113,184,52,12,75,61,184,200,84,183],[19,0,242,170,130,169,75,138,67,11,157,22,33,104,107,8,172,233,223,84,222,226,32,184,106,152,41,53,131,235,85,138],[120,255,183,152,63,249,189,17,75,168,226,212,91,198,164,56,92,152,232,34,112,132,254,167,188,4,68,65,212,227,25,160],[25,6,96,128,146,171,53,64,163,201,59,246,150,238,227,225,35,53,140,24,48,153,129,186,42,139,83,65,119,63,7,216],[62,195,173,148,141,43,235,38,2,221,238,180,35,96,196,36,183,80,93,212,130,27,114,217,139,172,78,74,183,249,17,210],[167,81,169,242,101,230,67,65,170,228,222,103,133,2,207,232,245,212,44,142,86,76,112,124,156,26,80,139,26,215,135,22]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentTimestamps.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[0],accounts[7],accounts[7],accounts[5],accounts[1],accounts[0],accounts[1],accounts[0],accounts[3],accounts[7],accounts[2],accounts[7],accounts[6],accounts[5],accounts[0],accounts[0],accounts[1],accounts[0],accounts[5],accounts[4],accounts[5],accounts[0],accounts[0],accounts[2],accounts[8],accounts[1],accounts[2],accounts[0]], [6,29,27,2014223716,27,255,66,3,2014223716,64,1532892063,257,97,9999,5,4,1336,9999,10000,1532892062,1532892062,255,27,96,5,3,29], [1532892062,1,66,4,2014223714,28,0,10001,65,0,2014223715,1532892063,10001,64,64,255,64,6,66,1338,257,256,10001,64,256,27,95], [[255,254,20,106,100,203,209,34,16,167,121,1,169,63,154,21,97,252,52,212,108,159,76,40,6,12,228,226,92,184,40,173],[78,249,19,56,44,208,27,82,136,45,63,102,129,99,154,33,171,19,106,14,96,31,170,135,190,236,198,53,69,135,127,52],[165,78,214,117,44,112,202,39,129,254,90,185,80,245,30,110,88,1,79,49,232,64,181,70,95,157,75,76,0,133,192,69],[116,111,224,168,126,170,123,183,6,158,14,238,209,156,26,71,134,217,230,204,44,162,178,92,203,0,81,144,44,213,109,91],[143,82,197,67,183,181,208,160,234,132,222,31,148,231,78,196,212,233,210,139,15,24,188,211,250,5,218,77,175,198,167,180],[52,104,210,66,83,0,255,114,205,159,165,161,228,8,210,19,223,42,77,132,27,188,234,129,106,135,228,59,189,212,194,31],[210,244,121,226,82,54,78,99,163,106,109,114,206,242,202,219,138,72,216,189,253,72,251,211,246,245,109,199,154,253,48,22],[191,82,229,72,150,30,82,215,124,31,6,254,45,98,253,10,230,15,170,138,43,164,198,132,103,120,227,106,67,47,107,206],[217,19,80,124,30,241,89,203,47,97,123,158,32,174,221,215,152,128,48,36,40,249,79,181,213,231,127,94,78,31,240,104],[152,170,40,161,225,134,69,112,26,79,208,223,34,106,12,140,110,155,89,116,199,165,74,101,240,84,84,13,120,81,120,26],[66,81,24,152,50,242,146,196,108,240,140,99,194,51,234,144,235,190,195,76,173,88,203,17,21,157,35,244,110,59,75,230],[167,100,108,137,221,193,14,197,111,0,10,27,90,133,73,237,19,199,39,20,145,214,37,81,156,168,74,22,36,161,219,149],[208,82,62,63,245,43,207,162,167,220,36,216,96,68,255,154,17,40,245,113,32,24,135,251,180,226,162,171,52,57,240,235],[134,84,242,53,37,202,131,41,244,34,191,212,153,92,234,186,21,52,248,65,126,28,31,139,244,51,218,26,38,149,52,243],[255,196,25,175,98,155,54,2,38,106,84,225,60,43,54,102,2,129,11,56,178,64,250,33,10,78,199,48,231,100,61,135],[120,206,227,117,160,215,211,189,142,173,136,101,120,58,107,60,115,170,7,115,121,91,181,199,52,25,194,226,29,17,157,225],[239,71,198,21,238,20,233,223,30,147,37,33,77,10,57,101,208,216,177,101,81,117,211,119,7,184,151,92,124,140,164,215],[185,122,136,227,47,228,94,104,85,218,52,99,26,58,67,23,195,30,87,69,112,60,67,56,4,194,37,128,143,177,162,5],[142,249,37,142,168,98,232,251,153,29,2,122,99,173,46,74,172,228,9,235,122,160,190,94,63,213,215,232,63,76,179,98],[230,95,209,12,84,42,190,21,117,122,241,170,54,214,42,191,231,94,15,220,176,12,233,240,212,152,91,131,188,249,9,212],[134,3,166,151,43,143,67,178,23,104,237,232,211,122,180,128,61,57,115,177,74,77,154,177,154,109,60,76,35,142,76,156],[219,65,148,246,252,130,217,48,103,114,49,196,119,102,12,156,68,97,132,242,201,228,113,184,52,12,75,61,184,200,84,183],[19,0,242,170,130,169,75,138,67,11,157,22,33,104,107,8,172,233,223,84,222,226,32,184,106,152,41,53,131,235,85,138],[120,255,183,152,63,249,189,17,75,168,226,212,91,198,164,56,92,152,232,34,112,132,254,167,188,4,68,65,212,227,25,160],[25,6,96,128,146,171,53,64,163,201,59,246,150,238,227,225,35,53,140,24,48,153,129,186,42,139,83,65,119,63,7,216],[62,195,173,148,141,43,235,38,2,221,238,180,35,96,196,36,183,80,93,212,130,27,114,217,139,172,78,74,183,249,17,210],[167,81,169,242,101,230,67,65,170,228,222,103,133,2,207,232,245,212,44,142,86,76,112,124,156,26,80,139,26,215,135,22]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentValues.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[7],accounts[7],accounts[7],accounts[6],accounts[4],accounts[0],accounts[6],accounts[9],accounts[0],accounts[3],accounts[6],accounts[6],accounts[7],accounts[5],accounts[4],accounts[2],accounts[7],accounts[5],accounts[2],accounts[2],accounts[7],accounts[6],accounts[9],accounts[2],accounts[6],accounts[9],accounts[8],accounts[5]], [6,29,27,2014223716,27,255,66,3,2014223716,64,1532892063,257,97,9999,5,4,1336,9999,10000,1532892062,1532892062,255,27,96,5,3,29], [1532892062,1,66,4,2014223714,28,0,10001,65,0,2014223715,1532892063,10001,64,64,255,64,6,66,1338,257,256,10001,64,256,27,95], [[255,254,20,106,100,203,209,34,16,167,121,1,169,63,154,21,97,252,52,212,108,159,76,40,6,12,228,226,92,184,40,173],[78,249,19,56,44,208,27,82,136,45,63,102,129,99,154,33,171,19,106,14,96,31,170,135,190,236,198,53,69,135,127,52],[165,78,214,117,44,112,202,39,129,254,90,185,80,245,30,110,88,1,79,49,232,64,181,70,95,157,75,76,0,133,192,69],[116,111,224,168,126,170,123,183,6,158,14,238,209,156,26,71,134,217,230,204,44,162,178,92,203,0,81,144,44,213,109,91],[143,82,197,67,183,181,208,160,234,132,222,31,148,231,78,196,212,233,210,139,15,24,188,211,250,5,218,77,175,198,167,180],[52,104,210,66,83,0,255,114,205,159,165,161,228,8,210,19,223,42,77,132,27,188,234,129,106,135,228,59,189,212,194,31],[210,244,121,226,82,54,78,99,163,106,109,114,206,242,202,219,138,72,216,189,253,72,251,211,246,245,109,199,154,253,48,22],[191,82,229,72,150,30,82,215,124,31,6,254,45,98,253,10,230,15,170,138,43,164,198,132,103,120,227,106,67,47,107,206],[217,19,80,124,30,241,89,203,47,97,123,158,32,174,221,215,152,128,48,36,40,249,79,181,213,231,127,94,78,31,240,104],[152,170,40,161,225,134,69,112,26,79,208,223,34,106,12,140,110,155,89,116,199,165,74,101,240,84,84,13,120,81,120,26],[66,81,24,152,50,242,146,196,108,240,140,99,194,51,234,144,235,190,195,76,173,88,203,17,21,157,35,244,110,59,75,230],[167,100,108,137,221,193,14,197,111,0,10,27,90,133,73,237,19,199,39,20,145,214,37,81,156,168,74,22,36,161,219,149],[208,82,62,63,245,43,207,162,167,220,36,216,96,68,255,154,17,40,245,113,32,24,135,251,180,226,162,171,52,57,240,235],[134,84,242,53,37,202,131,41,244,34,191,212,153,92,234,186,21,52,248,65,126,28,31,139,244,51,218,26,38,149,52,243],[255,196,25,175,98,155,54,2,38,106,84,225,60,43,54,102,2,129,11,56,178,64,250,33,10,78,199,48,231,100,61,135],[120,206,227,117,160,215,211,189,142,173,136,101,120,58,107,60,115,170,7,115,121,91,181,199,52,25,194,226,29,17,157,225],[239,71,198,21,238,20,233,223,30,147,37,33,77,10,57,101,208,216,177,101,81,117,211,119,7,184,151,92,124,140,164,215],[185,122,136,227,47,228,94,104,85,218,52,99,26,58,67,23,195,30,87,69,112,60,67,56,4,194,37,128,143,177,162,5],[142,249,37,142,168,98,232,251,153,29,2,122,99,173,46,74,172,228,9,235,122,160,190,94,63,213,215,232,63,76,179,98],[230,95,209,12,84,42,190,21,117,122,241,170,54,214,42,191,231,94,15,220,176,12,233,240,212,152,91,131,188,249,9,212],[134,3,166,151,43,143,67,178,23,104,237,232,211,122,180,128,61,57,115,177,74,77,154,177,154,109,60,76,35,142,76,156],[219,65,148,246,252,130,217,48,103,114,49,196,119,102,12,156,68,97,132,242,201,228,113,184,52,12,75,61,184,200,84,183],[19,0,242,170,130,169,75,138,67,11,157,22,33,104,107,8,172,233,223,84,222,226,32,184,106,152,41,53,131,235,85,138],[120,255,183,152,63,249,189,17,75,168,226,212,91,198,164,56,92,152,232,34,112,132,254,167,188,4,68,65,212,227,25,160],[25,6,96,128,146,171,53,64,163,201,59,246,150,238,227,225,35,53,140,24,48,153,129,186,42,139,83,65,119,63,7,216],[62,195,173,148,141,43,235,38,2,221,238,180,35,96,196,36,183,80,93,212,130,27,114,217,139,172,78,74,183,249,17,210],[167,81,169,242,101,230,67,65,170,228,222,103,133,2,207,232,245,212,44,142,86,76,112,124,156,26,80,139,26,215,135,22]],{from: accounts[9]}),'revert');
  });
  it('Should execute lookUpPaymentIndex(address,bytes32) WHEN _securityHolder!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractOffChainPayments.lookUpPaymentIndex(accounts[9], [221,182,55,44,134,53,229,103,250,254,87,45,99,101,32,195,122,147,191,83,180,177,240,1,248,238,109,102,13,48,139,210],{from: accounts[0]});
  });
  it('Should fail lookUpPaymentIndex(address,bytes32) when NOT comply with: _securityHolder != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.lookUpPaymentIndex("0x0000000000000000000000000000000000000000", [221,182,55,44,134,53,229,103,250,254,87,45,99,101,32,195,122,147,191,83,180,177,240,1,248,238,109,102,13,48,139,210],{from: accounts[0]}),'revert');
  });
  it('Should execute challengePayment(uint256,uint256)', async () => {
    let result = await contractOffChainPayments.challengePayment(66, 1336,{from: accounts[0]});
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue==_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[4], 1532892062, [22,125,206,17,134,171,122,188,29,7,192,188,176,30,144,187,197,109,15,114,73,208,89,132,28,173,123,84,126,175,194,28], 1337,{from: accounts[9]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[4], 1532892062, [22,125,206,17,134,171,122,188,29,7,192,188,176,30,144,187,197,109,15,114,73,208,89,132,28,173,123,84,126,175,194,28], 1337,{from: accounts[8]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[4], -1, [22,125,206,17,134,171,122,188,29,7,192,188,176,30,144,187,197,109,15,114,73,208,89,132,28,173,123,84,126,175,194,28], 1337,{from: accounts[9]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue!=_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[8], 1338, [201,88,61,135,93,195,234,41,142,225,178,8,252,2,110,208,192,180,143,209,71,23,5,174,90,72,178,232,57,69,29,243], 254,{from: accounts[9]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[8], 1338, [201,88,61,135,93,195,234,41,142,225,178,8,252,2,110,208,192,180,143,209,71,23,5,174,90,72,178,232,57,69,29,243], 254,{from: accounts[8]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[8], -1, [201,88,61,135,93,195,234,41,142,225,178,8,252,2,110,208,192,180,143,209,71,23,5,174,90,72,178,232,57,69,29,243], 254,{from: accounts[9]}),'revert');
  });
});