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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[2],96,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[2],96,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[5],26,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[5],26,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[7],{from:accounts[3]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[7],{from:accounts[3]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[1],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[1],1337,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[4],{from:accounts[4]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[4],{from:accounts[4]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(254,contractRedeemableToken.address,contractPaymentTokenMock.address,accounts[0],4,3,{from:accounts[7]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(254,contractRedeemableToken.address,contractPaymentTokenMock.address,accounts[0],4,3,{from:accounts[7]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[5],1532892063,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[5],1532892063,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+298,{from:accounts[9]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableTokenMock.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+298,{from:accounts[9]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("RevertWithReason",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+357,{from:accounts[9]});
    let result = await localOnChainVoting.submitUserVotes([[182,26,183,103,84,22,141,53,168,21,237,15,170,76,132,69,0,119,204,42,48,68,204,65,247,86,150,74,119,131,136,140],[44,142,248,9,147,141,74,51,8,32,139,95,196,154,219,120,58,239,238,114,127,129,10,128,125,82,59,74,169,227,197,88],[111,96,133,183,49,156,114,209,47,143,135,229,171,18,212,96,31,116,99,86,69,68,243,212,56,142,35,142,63,31,102,88],[23,216,208,9,17,80,74,3,110,90,132,125,194,125,171,30,163,225,129,23,58,157,31,219,85,190,166,114,35,216,40,1]], [[42,148,92,23,143,142,62,45,65,120,137,118,137,95,62,61,57,52,143,141,254,93,109,122,128,96,32,187,149,169,240,10],[191,242,233,169,52,34,127,237,214,22,113,153,61,49,247,128,175,150,168,195,21,247,56,233,164,80,162,113,176,177,108,218],[255,102,214,136,217,18,110,237,234,112,240,219,39,84,123,199,196,58,141,246,95,89,205,126,26,226,116,171,201,194,158,240],[139,131,221,245,113,182,81,213,124,166,20,230,44,8,194,79,83,67,7,51,74,159,249,28,110,234,219,206,183,197,63,98]],{from: accounts[9]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+357,{from:accounts[9]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[182,26,183,103,84,22,141,53,168,21,237,15,170,76,132,69,0,119,204,42,48,68,204,65,247,86,150,74,119,131,136,140],[44,142,248,9,147,141,74,51,8,32,139,95,196,154,219,120,58,239,238,114,127,129,10,128,125,82,59,74,169,227,197,88],[111,96,133,183,49,156,114,209,47,143,135,229,171,18,212,96,31,116,99,86,69,68,243,212,56,142,35,142,63,31,102,88],[23,216,208,9,17,80,74,3,110,90,132,125,194,125,171,30,163,225,129,23,58,157,31,219,85,190,166,114,35,216,40,1]], [[42,148,92,23,143,142,62,45,65,120,137,118,137,95,62,61,57,52,143,141,254,93,109,122,128,96,32,187,149,169,240,10],[191,242,233,169,52,34,127,237,214,22,113,153,61,49,247,128,175,150,168,195,21,247,56,233,164,80,162,113,176,177,108,218],[255,102,214,136,217,18,110,237,234,112,240,219,39,84,123,199,196,58,141,246,95,89,205,126,26,226,116,171,201,194,158,240],[139,131,221,245,113,182,81,213,124,166,20,230,44,8,194,79,83,67,7,51,74,159,249,28,110,234,219,206,183,197,63,98]],{from: accounts[8]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+357,{from:accounts[9]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[120,86,154,164,39,44,63,50,82,116,143,5,54,76,200,156,64,175,224,16,23,138,96,6,26,117,72,60,65,174,101,210],[14,217,184,225,76,59,71,201,242,78,73,177,91,130,10,250,178,56,27,252,79,218,146,124,43,1,194,36,10,136,145,185],[244,146,124,135,32,119,24,127,146,80,86,119,255,233,209,65,111,251,172,190,28,179,171,88,159,145,173,31,214,93,123,195],[191,11,75,64,16,99,37,194,97,80,173,51,68,161,132,159,228,72,200,8,146,217,84,162,28,115,181,44,37,232,58,133],[12,219,183,101,229,107,130,6,230,88,252,7,251,220,165,46,124,169,197,101,36,74,196,16,211,212,125,194,252,191,241,246]], [[42,148,92,23,143,142,62,45,65,120,137,118,137,95,62,61,57,52,143,141,254,93,109,122,128,96,32,187,149,169,240,10],[191,242,233,169,52,34,127,237,214,22,113,153,61,49,247,128,175,150,168,195,21,247,56,233,164,80,162,113,176,177,108,218],[255,102,214,136,217,18,110,237,234,112,240,219,39,84,123,199,196,58,141,246,95,89,205,126,26,226,116,171,201,194,158,240],[139,131,221,245,113,182,81,213,124,166,20,230,44,8,194,79,83,67,7,51,74,159,249,28,110,234,219,206,183,197,63,98]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+357,{from:accounts[9]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[42,148,92,23,143,142,62,45,65,120,137,118,137,95,62,61,57,52,143,141,254,93,109,122,128,96,32,187,149,169,240,10],[191,242,233,169,52,34,127,237,214,22,113,153,61,49,247,128,175,150,168,195,21,247,56,233,164,80,162,113,176,177,108,218],[255,102,214,136,217,18,110,237,234,112,240,219,39,84,123,199,196,58,141,246,95,89,205,126,26,226,116,171,201,194,158,240],[139,131,221,245,113,182,81,213,124,166,20,230,44,8,194,79,83,67,7,51,74,159,249,28,110,234,219,206,183,197,63,98]],{from: accounts[9]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+188,{from:accounts[9]});
    let result = await localOnChainVoting.finalizeVote("UsesExample",{from: accounts[9]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+188,{from:accounts[9]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("UsesExample",{from: accounts[8]}),'revert');
  });
});
