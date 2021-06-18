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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[1],96,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[1],96,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[6],65,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[6],65,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[4],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[4],{from:accounts[1]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[8],97,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[8],97,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[5],{from:accounts[0]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(6,contractRedeemableToken.address,contractPaymentTokenMock.address,accounts[1],27,9999,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(6,contractRedeemableToken.address,contractPaymentTokenMock.address,accounts[1],27,9999,{from:accounts[0]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[0],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[0],10000,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[9],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+166,{from:accounts[3]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractPaymentTokenMock.address,accounts[9],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+166,{from:accounts[3]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+809,{from:accounts[3]});
    let result = await localOnChainVoting.submitUserVotes([[100,241,98,20,85,185,215,24,96,108,254,32,214,204,252,124,140,46,15,212,216,130,142,135,9,80,76,237,48,208,217,168],[149,226,220,49,125,235,3,230,38,246,195,233,182,158,235,40,120,190,38,20,54,35,58,149,253,211,188,152,197,101,125,229]], [[123,110,234,241,190,227,161,221,63,134,200,221,139,215,111,196,79,251,171,195,27,145,191,15,43,131,166,132,43,237,188,27],[171,55,211,242,208,127,1,99,181,59,76,149,249,252,63,50,94,70,4,118,200,78,211,171,201,228,79,34,192,44,128,169]],{from: accounts[3]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+809,{from:accounts[3]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[100,241,98,20,85,185,215,24,96,108,254,32,214,204,252,124,140,46,15,212,216,130,142,135,9,80,76,237,48,208,217,168],[149,226,220,49,125,235,3,230,38,246,195,233,182,158,235,40,120,190,38,20,54,35,58,149,253,211,188,152,197,101,125,229]], [[123,110,234,241,190,227,161,221,63,134,200,221,139,215,111,196,79,251,171,195,27,145,191,15,43,131,166,132,43,237,188,27],[171,55,211,242,208,127,1,99,181,59,76,149,249,252,63,50,94,70,4,118,200,78,211,171,201,228,79,34,192,44,128,169]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+809,{from:accounts[3]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[38,209,210,30,60,89,10,197,231,73,75,226,63,31,53,70,22,29,47,241,162,174,183,152,132,210,107,52,212,195,45,143],[91,230,28,66,181,231,179,145,45,0,204,202,45,4,132,31,80,178,249,228,73,88,22,215,95,13,147,17,0,86,65,246],[188,137,236,235,252,28,140,26,112,221,45,196,254,204,30,158,70,50,101,48,73,96,120,209,243,117,120,73,239,124,224,124]], [[123,110,234,241,190,227,161,221,63,134,200,221,139,215,111,196,79,251,171,195,27,145,191,15,43,131,166,132,43,237,188,27],[171,55,211,242,208,127,1,99,181,59,76,149,249,252,63,50,94,70,4,118,200,78,211,171,201,228,79,34,192,44,128,169]],{from: accounts[3]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+809,{from:accounts[3]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[123,110,234,241,190,227,161,221,63,134,200,221,139,215,111,196,79,251,171,195,27,145,191,15,43,131,166,132,43,237,188,27],[171,55,211,242,208,127,1,99,181,59,76,149,249,252,63,50,94,70,4,118,200,78,211,171,201,228,79,34,192,44,128,169]],{from: accounts[3]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+339,{from:accounts[3]});
    let result = await localOnChainVoting.finalizeVote("PayableExample",{from: accounts[3]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+339,{from:accounts[3]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("PayableExample",{from: accounts[9]}),'revert');
  });
});
