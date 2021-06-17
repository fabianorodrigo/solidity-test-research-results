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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[8],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[8],6,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[3],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[3],1337,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[9],{from:accounts[9]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[9],{from:accounts[9]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[7],3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[7],3,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[7],{from:accounts[0]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(255,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[4],2,29,{from:accounts[4]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(255,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[4],2,29,{from:accounts[4]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[1],1,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[1],1,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+793,{from:accounts[9]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+793,{from:accounts[9]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("RevertWithReason",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[0],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+580,{from:accounts[9]});
    let result = await localOnChainVoting.submitUserVotes([[232,6,128,173,85,184,143,50,208,117,94,115,90,136,197,161,249,248,18,5,241,204,147,247,93,74,39,165,182,211,25,44],[43,27,162,166,34,19,12,120,28,233,216,11,150,65,8,32,206,132,107,68,86,230,234,40,28,68,214,253,179,198,115,166],[202,161,254,194,124,4,191,91,214,81,55,247,164,79,73,104,108,138,25,152,247,141,46,113,174,12,176,168,141,33,153,63],[149,255,129,213,166,181,237,41,120,166,170,55,126,247,82,38,152,174,39,122,16,73,217,184,59,28,223,224,73,197,230,130],[139,102,53,66,227,245,138,89,70,37,142,221,228,205,128,29,227,51,231,134,223,164,52,153,238,225,126,150,217,225,238,141]], [[142,231,112,203,69,4,42,113,119,45,254,244,134,171,235,170,75,151,106,160,9,18,174,136,3,90,129,71,122,162,249,155],[37,215,151,255,187,94,123,110,45,218,119,182,28,241,39,71,182,208,196,235,12,25,132,61,24,93,109,175,239,182,43,157],[215,159,212,162,195,141,228,87,254,220,72,200,159,213,66,217,132,28,113,180,54,210,145,109,173,253,22,221,9,111,114,229],[95,35,119,156,155,215,119,53,238,18,233,116,124,234,95,237,246,238,184,87,192,115,126,234,243,210,195,241,32,169,225,106],[143,2,80,108,96,231,136,245,46,217,223,246,91,173,83,8,203,135,170,58,231,244,52,225,147,150,87,142,42,35,4,148]],{from: accounts[9]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[0],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+580,{from:accounts[9]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[232,6,128,173,85,184,143,50,208,117,94,115,90,136,197,161,249,248,18,5,241,204,147,247,93,74,39,165,182,211,25,44],[43,27,162,166,34,19,12,120,28,233,216,11,150,65,8,32,206,132,107,68,86,230,234,40,28,68,214,253,179,198,115,166],[202,161,254,194,124,4,191,91,214,81,55,247,164,79,73,104,108,138,25,152,247,141,46,113,174,12,176,168,141,33,153,63],[149,255,129,213,166,181,237,41,120,166,170,55,126,247,82,38,152,174,39,122,16,73,217,184,59,28,223,224,73,197,230,130],[139,102,53,66,227,245,138,89,70,37,142,221,228,205,128,29,227,51,231,134,223,164,52,153,238,225,126,150,217,225,238,141]], [[142,231,112,203,69,4,42,113,119,45,254,244,134,171,235,170,75,151,106,160,9,18,174,136,3,90,129,71,122,162,249,155],[37,215,151,255,187,94,123,110,45,218,119,182,28,241,39,71,182,208,196,235,12,25,132,61,24,93,109,175,239,182,43,157],[215,159,212,162,195,141,228,87,254,220,72,200,159,213,66,217,132,28,113,180,54,210,145,109,173,253,22,221,9,111,114,229],[95,35,119,156,155,215,119,53,238,18,233,116,124,234,95,237,246,238,184,87,192,115,126,234,243,210,195,241,32,169,225,106],[143,2,80,108,96,231,136,245,46,217,223,246,91,173,83,8,203,135,170,58,231,244,52,225,147,150,87,142,42,35,4,148]],{from: accounts[8]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[0],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+580,{from:accounts[9]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[242,209,235,205,206,181,111,101,151,219,138,34,87,64,69,224,115,56,144,36,163,225,40,68,126,139,43,138,32,182,174,84],[212,65,108,209,253,29,112,112,215,108,255,112,116,69,172,30,122,107,103,222,77,86,107,253,120,50,57,125,188,100,148,227],[57,193,174,144,90,11,159,114,60,50,197,79,94,98,188,108,122,249,83,227,134,22,53,105,53,177,141,24,94,190,241,196],[229,184,224,66,76,43,213,217,243,162,93,142,232,134,66,195,189,19,222,112,121,255,158,224,32,151,213,84,230,0,253,44],[90,20,137,251,75,9,253,56,233,3,50,144,129,114,142,226,10,207,144,223,50,85,71,62,45,207,69,48,148,173,115,204],[173,62,143,208,4,243,225,136,40,100,246,67,35,177,219,120,137,192,226,252,74,168,68,97,101,154,246,193,14,141,40,155]], [[142,231,112,203,69,4,42,113,119,45,254,244,134,171,235,170,75,151,106,160,9,18,174,136,3,90,129,71,122,162,249,155],[37,215,151,255,187,94,123,110,45,218,119,182,28,241,39,71,182,208,196,235,12,25,132,61,24,93,109,175,239,182,43,157],[215,159,212,162,195,141,228,87,254,220,72,200,159,213,66,217,132,28,113,180,54,210,145,109,173,253,22,221,9,111,114,229],[95,35,119,156,155,215,119,53,238,18,233,116,124,234,95,237,246,238,184,87,192,115,126,234,243,210,195,241,32,169,225,106],[143,2,80,108,96,231,136,245,46,217,223,246,91,173,83,8,203,135,170,58,231,244,52,225,147,150,87,142,42,35,4,148]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[0],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+580,{from:accounts[9]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[142,231,112,203,69,4,42,113,119,45,254,244,134,171,235,170,75,151,106,160,9,18,174,136,3,90,129,71,122,162,249,155],[37,215,151,255,187,94,123,110,45,218,119,182,28,241,39,71,182,208,196,235,12,25,132,61,24,93,109,175,239,182,43,157],[215,159,212,162,195,141,228,87,254,220,72,200,159,213,66,217,132,28,113,180,54,210,145,109,173,253,22,221,9,111,114,229],[95,35,119,156,155,215,119,53,238,18,233,116,124,234,95,237,246,238,184,87,192,115,126,234,243,210,195,241,32,169,225,106],[143,2,80,108,96,231,136,245,46,217,223,246,91,173,83,8,203,135,170,58,231,244,52,225,147,150,87,142,42,35,4,148]],{from: accounts[9]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+571,{from:accounts[9]});
    let result = await localOnChainVoting.finalizeVote("IsLibrary",{from: accounts[9]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+571,{from:accounts[9]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("IsLibrary",{from: accounts[8]}),'revert');
  });
});
