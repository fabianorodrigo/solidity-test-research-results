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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[8],66,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[8],66,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[8],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[8],29,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[3],{from:accounts[8]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[3],{from:accounts[8]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[9],1336,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[9],1336,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[3],{from:accounts[5]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[3],{from:accounts[5]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(10000,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[0],2,27,{from:accounts[1]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(10000,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[0],2,27,{from:accounts[1]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[3],257,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[3],257,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+104,{from:accounts[0]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractPaymentTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+104,{from:accounts[0]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("PayableExample",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+399,{from:accounts[0]});
    let result = await localOnChainVoting.submitUserVotes([[201,49,71,236,69,28,7,70,177,209,30,55,53,98,195,221,31,197,128,215,211,24,25,112,58,57,240,203,80,255,19,74],[241,218,163,197,89,216,2,103,196,65,207,33,231,91,151,13,64,218,216,201,71,124,155,194,155,113,175,41,1,215,137,189],[175,97,197,126,180,179,14,141,183,39,145,223,158,130,86,148,240,124,114,217,44,63,225,150,214,50,103,148,182,6,38,18],[244,223,98,130,226,190,98,55,21,150,16,175,124,136,3,14,227,86,229,166,154,219,208,97,164,169,101,251,135,51,203,77]], [[66,48,154,186,110,138,97,78,198,73,140,11,95,165,139,130,47,52,77,210,18,190,124,63,61,168,9,22,35,148,111,94],[188,247,59,63,51,250,190,105,249,239,62,236,217,63,119,243,120,72,146,49,189,170,25,44,158,199,141,134,162,237,18,165],[26,95,238,244,118,86,201,205,153,159,137,148,125,193,37,62,150,179,155,124,139,148,116,35,196,67,147,42,80,172,75,9],[126,237,152,210,30,49,57,190,136,237,91,146,165,97,118,32,125,159,50,138,15,160,84,93,117,191,117,231,241,35,172,65]],{from: accounts[0]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+399,{from:accounts[0]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[201,49,71,236,69,28,7,70,177,209,30,55,53,98,195,221,31,197,128,215,211,24,25,112,58,57,240,203,80,255,19,74],[241,218,163,197,89,216,2,103,196,65,207,33,231,91,151,13,64,218,216,201,71,124,155,194,155,113,175,41,1,215,137,189],[175,97,197,126,180,179,14,141,183,39,145,223,158,130,86,148,240,124,114,217,44,63,225,150,214,50,103,148,182,6,38,18],[244,223,98,130,226,190,98,55,21,150,16,175,124,136,3,14,227,86,229,166,154,219,208,97,164,169,101,251,135,51,203,77]], [[66,48,154,186,110,138,97,78,198,73,140,11,95,165,139,130,47,52,77,210,18,190,124,63,61,168,9,22,35,148,111,94],[188,247,59,63,51,250,190,105,249,239,62,236,217,63,119,243,120,72,146,49,189,170,25,44,158,199,141,134,162,237,18,165],[26,95,238,244,118,86,201,205,153,159,137,148,125,193,37,62,150,179,155,124,139,148,116,35,196,67,147,42,80,172,75,9],[126,237,152,210,30,49,57,190,136,237,91,146,165,97,118,32,125,159,50,138,15,160,84,93,117,191,117,231,241,35,172,65]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+399,{from:accounts[0]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[145,198,188,161,11,86,149,156,57,135,18,6,137,79,16,30,186,187,184,219,50,239,65,222,239,168,108,158,3,190,47,176],[17,247,222,67,25,242,139,113,224,208,239,187,175,196,196,200,228,190,190,215,248,108,92,107,44,82,38,104,217,63,125,148],[102,217,199,55,72,101,120,178,212,111,151,1,43,190,196,150,163,82,241,243,152,212,23,120,79,149,187,71,225,70,166,147],[217,130,169,195,191,177,134,1,164,170,108,212,229,218,13,145,109,50,216,68,81,185,113,141,186,251,38,154,165,130,9,89],[247,163,203,133,190,252,234,109,3,118,194,30,211,114,161,221,44,122,98,191,72,61,7,8,219,122,143,168,240,162,93,2]], [[66,48,154,186,110,138,97,78,198,73,140,11,95,165,139,130,47,52,77,210,18,190,124,63,61,168,9,22,35,148,111,94],[188,247,59,63,51,250,190,105,249,239,62,236,217,63,119,243,120,72,146,49,189,170,25,44,158,199,141,134,162,237,18,165],[26,95,238,244,118,86,201,205,153,159,137,148,125,193,37,62,150,179,155,124,139,148,116,35,196,67,147,42,80,172,75,9],[126,237,152,210,30,49,57,190,136,237,91,146,165,97,118,32,125,159,50,138,15,160,84,93,117,191,117,231,241,35,172,65]],{from: accounts[0]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+399,{from:accounts[0]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[66,48,154,186,110,138,97,78,198,73,140,11,95,165,139,130,47,52,77,210,18,190,124,63,61,168,9,22,35,148,111,94],[188,247,59,63,51,250,190,105,249,239,62,236,217,63,119,243,120,72,146,49,189,170,25,44,158,199,141,134,162,237,18,165],[26,95,238,244,118,86,201,205,153,159,137,148,125,193,37,62,150,179,155,124,139,148,116,35,196,67,147,42,80,172,75,9],[126,237,152,210,30,49,57,190,136,237,91,146,165,97,118,32,125,159,50,138,15,160,84,93,117,191,117,231,241,35,172,65]],{from: accounts[0]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+861,{from:accounts[0]});
    let result = await localOnChainVoting.finalizeVote("RevertWithReason",{from: accounts[0]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+861,{from:accounts[0]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("RevertWithReason",{from: accounts[9]}),'revert');
  });
});
