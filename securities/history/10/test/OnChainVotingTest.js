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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[1],27,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[1],27,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[6],26,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[6],26,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[4],{from:accounts[3]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[4],{from:accounts[3]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[3],2014223714,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[3],2014223714,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],{from:accounts[1]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(27,contractRedeemableToken.address,contractRedeemableTokenMock.address,contractECDSA.address,4,1,{from:accounts[9]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(27,contractRedeemableToken.address,contractRedeemableTokenMock.address,contractECDSA.address,4,1,{from:accounts[9]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[3],9999,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[3],9999,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+864,{from:accounts[5]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+864,{from:accounts[5]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("IsLibrary",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[9],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+743,{from:accounts[5]});
    let result = await localOnChainVoting.submitUserVotes([[175,109,219,141,247,41,194,16,3,137,84,136,182,99,97,55,12,142,24,84,226,162,89,58,108,91,145,224,234,203,115,69],[100,70,80,107,71,65,149,180,118,189,58,202,122,118,183,109,242,111,83,9,1,151,59,47,17,43,213,84,157,24,185,111],[236,31,43,21,61,32,196,40,53,195,244,46,217,93,79,21,200,151,249,114,65,160,204,17,9,91,164,61,154,232,68,176],[221,142,57,203,198,8,69,25,34,19,76,114,0,141,191,57,244,203,72,80,103,220,42,183,46,222,62,210,217,130,135,125]], [[58,85,87,162,189,170,211,139,139,248,203,237,200,185,185,137,224,48,94,126,219,207,131,236,88,217,233,102,64,157,10,51],[76,90,19,132,244,182,0,166,187,104,46,219,12,245,9,93,158,203,23,27,194,236,112,229,141,186,82,93,19,245,155,159],[163,87,131,139,76,137,130,128,11,211,233,193,123,249,147,90,52,60,232,132,156,99,88,59,25,149,91,4,48,4,176,233],[72,207,205,88,77,90,165,66,105,227,140,228,99,201,171,1,192,100,27,226,194,208,217,171,220,101,83,34,233,74,132,88]],{from: accounts[5]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[9],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+743,{from:accounts[5]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[175,109,219,141,247,41,194,16,3,137,84,136,182,99,97,55,12,142,24,84,226,162,89,58,108,91,145,224,234,203,115,69],[100,70,80,107,71,65,149,180,118,189,58,202,122,118,183,109,242,111,83,9,1,151,59,47,17,43,213,84,157,24,185,111],[236,31,43,21,61,32,196,40,53,195,244,46,217,93,79,21,200,151,249,114,65,160,204,17,9,91,164,61,154,232,68,176],[221,142,57,203,198,8,69,25,34,19,76,114,0,141,191,57,244,203,72,80,103,220,42,183,46,222,62,210,217,130,135,125]], [[58,85,87,162,189,170,211,139,139,248,203,237,200,185,185,137,224,48,94,126,219,207,131,236,88,217,233,102,64,157,10,51],[76,90,19,132,244,182,0,166,187,104,46,219,12,245,9,93,158,203,23,27,194,236,112,229,141,186,82,93,19,245,155,159],[163,87,131,139,76,137,130,128,11,211,233,193,123,249,147,90,52,60,232,132,156,99,88,59,25,149,91,4,48,4,176,233],[72,207,205,88,77,90,165,66,105,227,140,228,99,201,171,1,192,100,27,226,194,208,217,171,220,101,83,34,233,74,132,88]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[9],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+743,{from:accounts[5]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[29,56,68,70,22,39,70,207,143,169,229,51,43,53,170,243,2,201,59,28,54,63,35,217,235,93,92,176,50,81,2,225],[248,63,78,162,236,129,119,52,173,143,244,178,235,58,104,47,82,24,224,199,106,172,65,132,214,249,207,8,102,244,46,49],[48,180,241,138,222,236,238,80,189,51,94,250,167,225,85,140,121,198,178,218,106,88,47,241,23,194,47,74,142,185,109,106],[242,245,218,219,216,12,178,230,46,190,211,70,223,83,224,103,110,27,93,70,19,45,254,182,80,14,131,252,47,148,56,49],[222,191,25,142,207,37,135,152,146,149,66,110,42,66,140,89,1,175,238,141,31,93,2,197,39,10,39,52,131,129,213,35]], [[58,85,87,162,189,170,211,139,139,248,203,237,200,185,185,137,224,48,94,126,219,207,131,236,88,217,233,102,64,157,10,51],[76,90,19,132,244,182,0,166,187,104,46,219,12,245,9,93,158,203,23,27,194,236,112,229,141,186,82,93,19,245,155,159],[163,87,131,139,76,137,130,128,11,211,233,193,123,249,147,90,52,60,232,132,156,99,88,59,25,149,91,4,48,4,176,233],[72,207,205,88,77,90,165,66,105,227,140,228,99,201,171,1,192,100,27,226,194,208,217,171,220,101,83,34,233,74,132,88]],{from: accounts[5]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[9],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+743,{from:accounts[5]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[58,85,87,162,189,170,211,139,139,248,203,237,200,185,185,137,224,48,94,126,219,207,131,236,88,217,233,102,64,157,10,51],[76,90,19,132,244,182,0,166,187,104,46,219,12,245,9,93,158,203,23,27,194,236,112,229,141,186,82,93,19,245,155,159],[163,87,131,139,76,137,130,128,11,211,233,193,123,249,147,90,52,60,232,132,156,99,88,59,25,149,91,4,48,4,176,233],[72,207,205,88,77,90,165,66,105,227,140,228,99,201,171,1,192,100,27,226,194,208,217,171,220,101,83,34,233,74,132,88]],{from: accounts[5]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+715,{from:accounts[5]});
    let result = await localOnChainVoting.finalizeVote("RevertWithReason",{from: accounts[5]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+715,{from:accounts[5]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("RevertWithReason",{from: accounts[9]}),'revert');
  });
});
