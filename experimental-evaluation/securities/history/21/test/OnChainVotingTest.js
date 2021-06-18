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

contract("OnChainVoting",(accounts)=>{
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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[1],95,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[1],95,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[7],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[7],29,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[6],{from:accounts[0]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[5],3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[5],3,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[4],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[4],{from:accounts[1]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(1,contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[1],26,5,{from:accounts[7]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(1,contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[1],26,5,{from:accounts[7]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],29,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+259,{from:accounts[1]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableTokenMock.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+259,{from:accounts[1]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("RevertWithReason",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+320,{from:accounts[1]});
    let result = await localOnChainVoting.submitUserVotes([[99,8,221,196,43,85,150,17,215,9,185,24,203,213,121,11,46,157,121,173,214,225,56,190,138,154,115,244,129,99,10,213],[60,147,199,17,94,3,41,23,14,126,124,55,1,229,92,229,90,219,10,114,194,106,235,78,255,197,215,121,20,13,80,156],[183,30,169,251,221,178,27,184,121,23,191,40,109,23,247,248,220,15,186,62,14,249,79,48,117,146,9,233,10,50,142,120],[181,244,137,61,38,185,118,79,252,206,135,115,186,62,57,9,87,85,161,106,12,106,19,238,163,239,232,104,62,177,98,118],[153,213,88,228,220,92,166,101,141,192,34,249,81,248,147,122,203,180,0,254,25,138,0,172,195,208,94,6,151,129,223,217],[169,88,202,80,113,243,5,94,119,155,46,100,5,108,69,57,152,173,226,155,236,123,153,77,122,152,162,183,12,77,145,73]], [[86,191,36,124,131,237,90,112,201,255,159,17,203,233,199,55,110,177,165,211,26,249,184,108,177,93,119,144,134,194,132,3],[211,90,6,171,84,213,227,67,78,142,129,250,162,241,171,238,237,112,124,152,135,177,215,230,219,4,110,103,180,93,89,14],[214,135,33,50,32,178,77,15,93,14,201,109,55,161,121,152,219,20,33,123,85,49,253,135,103,196,124,121,250,220,161,11],[98,67,176,222,255,156,202,32,122,149,40,222,160,128,84,221,93,156,80,254,91,68,40,20,140,95,67,84,77,39,180,145],[145,253,203,237,46,186,136,80,139,170,216,89,44,119,5,65,9,96,146,119,247,112,184,251,16,198,138,240,160,195,246,20],[149,219,6,103,29,144,185,190,174,51,215,212,129,19,225,67,177,158,237,68,156,85,216,253,237,42,189,58,131,74,115,141]],{from: accounts[1]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+320,{from:accounts[1]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[99,8,221,196,43,85,150,17,215,9,185,24,203,213,121,11,46,157,121,173,214,225,56,190,138,154,115,244,129,99,10,213],[60,147,199,17,94,3,41,23,14,126,124,55,1,229,92,229,90,219,10,114,194,106,235,78,255,197,215,121,20,13,80,156],[183,30,169,251,221,178,27,184,121,23,191,40,109,23,247,248,220,15,186,62,14,249,79,48,117,146,9,233,10,50,142,120],[181,244,137,61,38,185,118,79,252,206,135,115,186,62,57,9,87,85,161,106,12,106,19,238,163,239,232,104,62,177,98,118],[153,213,88,228,220,92,166,101,141,192,34,249,81,248,147,122,203,180,0,254,25,138,0,172,195,208,94,6,151,129,223,217],[169,88,202,80,113,243,5,94,119,155,46,100,5,108,69,57,152,173,226,155,236,123,153,77,122,152,162,183,12,77,145,73]], [[86,191,36,124,131,237,90,112,201,255,159,17,203,233,199,55,110,177,165,211,26,249,184,108,177,93,119,144,134,194,132,3],[211,90,6,171,84,213,227,67,78,142,129,250,162,241,171,238,237,112,124,152,135,177,215,230,219,4,110,103,180,93,89,14],[214,135,33,50,32,178,77,15,93,14,201,109,55,161,121,152,219,20,33,123,85,49,253,135,103,196,124,121,250,220,161,11],[98,67,176,222,255,156,202,32,122,149,40,222,160,128,84,221,93,156,80,254,91,68,40,20,140,95,67,84,77,39,180,145],[145,253,203,237,46,186,136,80,139,170,216,89,44,119,5,65,9,96,146,119,247,112,184,251,16,198,138,240,160,195,246,20],[149,219,6,103,29,144,185,190,174,51,215,212,129,19,225,67,177,158,237,68,156,85,216,253,237,42,189,58,131,74,115,141]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+320,{from:accounts[1]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[20,74,234,163,14,29,70,240,12,225,155,136,185,98,63,115,254,159,90,96,52,203,140,183,57,240,27,80,106,88,178,46],[79,171,150,242,170,223,20,121,217,214,251,190,4,212,155,20,11,13,9,111,21,188,118,172,104,242,6,176,28,24,136,226],[137,234,254,187,215,163,173,43,43,112,20,86,68,60,24,168,108,194,122,109,61,108,215,57,51,234,36,102,198,204,208,123],[84,236,81,116,160,193,46,245,7,171,120,89,162,213,61,5,87,5,17,239,89,7,84,10,16,54,69,112,78,38,4,165],[247,200,106,118,108,136,179,95,180,183,23,36,156,69,57,36,112,110,79,136,160,152,28,157,117,126,136,215,83,249,98,141],[180,80,136,232,226,71,228,45,78,78,49,208,225,204,253,232,52,255,119,224,147,202,35,37,210,55,157,24,163,113,19,211],[5,93,181,116,213,52,94,44,216,195,105,145,226,11,223,198,134,187,218,175,199,7,197,148,202,47,245,91,83,127,121,149]], [[86,191,36,124,131,237,90,112,201,255,159,17,203,233,199,55,110,177,165,211,26,249,184,108,177,93,119,144,134,194,132,3],[211,90,6,171,84,213,227,67,78,142,129,250,162,241,171,238,237,112,124,152,135,177,215,230,219,4,110,103,180,93,89,14],[214,135,33,50,32,178,77,15,93,14,201,109,55,161,121,152,219,20,33,123,85,49,253,135,103,196,124,121,250,220,161,11],[98,67,176,222,255,156,202,32,122,149,40,222,160,128,84,221,93,156,80,254,91,68,40,20,140,95,67,84,77,39,180,145],[145,253,203,237,46,186,136,80,139,170,216,89,44,119,5,65,9,96,146,119,247,112,184,251,16,198,138,240,160,195,246,20],[149,219,6,103,29,144,185,190,174,51,215,212,129,19,225,67,177,158,237,68,156,85,216,253,237,42,189,58,131,74,115,141]],{from: accounts[1]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+320,{from:accounts[1]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[86,191,36,124,131,237,90,112,201,255,159,17,203,233,199,55,110,177,165,211,26,249,184,108,177,93,119,144,134,194,132,3],[211,90,6,171,84,213,227,67,78,142,129,250,162,241,171,238,237,112,124,152,135,177,215,230,219,4,110,103,180,93,89,14],[214,135,33,50,32,178,77,15,93,14,201,109,55,161,121,152,219,20,33,123,85,49,253,135,103,196,124,121,250,220,161,11],[98,67,176,222,255,156,202,32,122,149,40,222,160,128,84,221,93,156,80,254,91,68,40,20,140,95,67,84,77,39,180,145],[145,253,203,237,46,186,136,80,139,170,216,89,44,119,5,65,9,96,146,119,247,112,184,251,16,198,138,240,160,195,246,20],[149,219,6,103,29,144,185,190,174,51,215,212,129,19,225,67,177,158,237,68,156,85,216,253,237,42,189,58,131,74,115,141]],{from: accounts[1]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+568,{from:accounts[1]});
    let result = await localOnChainVoting.finalizeVote("Example",{from: accounts[1]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+568,{from:accounts[1]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("Example",{from: accounts[9]}),'revert');
  });
});
