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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[4],66,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[4],66,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[1],26,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[1],26,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[1],{from:accounts[4]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[1],{from:accounts[4]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[7],254,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[7],254,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[9],{from:accounts[6]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[9],{from:accounts[6]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[2],3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[2],3,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+76,{from:accounts[8]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+76,{from:accounts[8]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("IsLibrary",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+885,{from:accounts[8]});
    let result = await localOnChainVoting.submitUserVotes([[152,92,50,152,133,251,8,172,17,253,202,215,199,89,37,42,181,145,74,175,206,20,63,254,139,179,150,33,114,143,14,150],[246,250,206,140,203,60,207,251,200,156,61,11,86,245,24,50,4,205,236,60,109,164,172,75,35,176,228,55,33,251,125,248],[252,147,113,144,57,48,232,64,88,57,188,246,112,16,42,225,199,27,72,56,98,151,235,140,212,22,70,245,245,23,208,230]], [[69,83,37,215,190,180,194,86,9,167,211,176,219,134,197,20,179,98,191,164,11,51,50,100,71,123,128,103,132,89,135,201],[112,66,0,35,208,70,115,78,24,222,8,95,124,145,130,183,155,51,180,174,173,238,217,87,8,227,90,69,186,55,56,248],[76,217,232,7,231,46,249,26,229,53,73,47,253,26,69,107,62,181,69,135,213,67,40,132,151,1,151,14,121,169,151,154]],{from: accounts[8]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+885,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[152,92,50,152,133,251,8,172,17,253,202,215,199,89,37,42,181,145,74,175,206,20,63,254,139,179,150,33,114,143,14,150],[246,250,206,140,203,60,207,251,200,156,61,11,86,245,24,50,4,205,236,60,109,164,172,75,35,176,228,55,33,251,125,248],[252,147,113,144,57,48,232,64,88,57,188,246,112,16,42,225,199,27,72,56,98,151,235,140,212,22,70,245,245,23,208,230]], [[69,83,37,215,190,180,194,86,9,167,211,176,219,134,197,20,179,98,191,164,11,51,50,100,71,123,128,103,132,89,135,201],[112,66,0,35,208,70,115,78,24,222,8,95,124,145,130,183,155,51,180,174,173,238,217,87,8,227,90,69,186,55,56,248],[76,217,232,7,231,46,249,26,229,53,73,47,253,26,69,107,62,181,69,135,213,67,40,132,151,1,151,14,121,169,151,154]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+885,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[171,173,40,162,141,194,102,84,199,131,144,68,115,38,14,174,81,65,190,160,215,191,38,45,62,141,30,8,61,198,231,14],[130,168,217,199,171,245,236,21,12,211,55,47,91,68,254,239,129,167,127,146,223,44,91,85,71,162,203,100,247,232,233,54],[93,181,131,252,247,205,73,143,212,53,35,194,238,211,173,69,73,49,41,102,162,203,102,32,157,9,125,79,212,15,13,154],[181,68,72,229,190,212,127,200,247,103,131,86,234,155,212,21,207,119,205,98,234,22,252,240,146,151,158,86,171,161,82,109]], [[69,83,37,215,190,180,194,86,9,167,211,176,219,134,197,20,179,98,191,164,11,51,50,100,71,123,128,103,132,89,135,201],[112,66,0,35,208,70,115,78,24,222,8,95,124,145,130,183,155,51,180,174,173,238,217,87,8,227,90,69,186,55,56,248],[76,217,232,7,231,46,249,26,229,53,73,47,253,26,69,107,62,181,69,135,213,67,40,132,151,1,151,14,121,169,151,154]],{from: accounts[8]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[6],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+885,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[69,83,37,215,190,180,194,86,9,167,211,176,219,134,197,20,179,98,191,164,11,51,50,100,71,123,128,103,132,89,135,201],[112,66,0,35,208,70,115,78,24,222,8,95,124,145,130,183,155,51,180,174,173,238,217,87,8,227,90,69,186,55,56,248],[76,217,232,7,231,46,249,26,229,53,73,47,253,26,69,107,62,181,69,135,213,67,40,132,151,1,151,14,121,169,151,154]],{from: accounts[8]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[7],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+139,{from:accounts[8]});
    let result = await localOnChainVoting.finalizeVote("IsLibrary",{from: accounts[8]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[7],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+139,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("IsLibrary",{from: accounts[9]}),'revert');
  });
});
