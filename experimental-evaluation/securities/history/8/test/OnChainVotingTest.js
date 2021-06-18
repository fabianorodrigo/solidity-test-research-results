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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[5],97,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[5],97,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[9],1532892062,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[9],1532892062,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[9],{from:accounts[4]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[9],{from:accounts[4]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[1],1338,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[1],1338,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[0],{from:accounts[7]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[0],{from:accounts[7]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(3,contractRedeemableToken.address,contractPaymentTokenMock.address,accounts[7],4,95,{from:accounts[9]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(3,contractRedeemableToken.address,contractPaymentTokenMock.address,accounts[7],4,95,{from:accounts[9]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[8],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[8],1337,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+402,{from:accounts[8]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+402,{from:accounts[8]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("PayableExample",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[7],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+226,{from:accounts[8]});
    let result = await localOnChainVoting.submitUserVotes([[154,69,245,47,115,88,18,202,59,223,197,85,245,93,181,0,205,116,227,118,236,8,89,65,61,83,254,155,203,233,189,191],[175,173,120,84,210,132,151,140,164,65,213,145,234,245,247,205,53,249,95,196,181,2,134,99,230,90,166,39,102,98,23,207],[39,39,148,111,0,123,160,129,101,44,122,71,28,19,236,67,118,102,208,207,92,81,36,102,13,12,58,172,244,119,236,247],[152,132,78,21,167,213,11,175,168,199,91,133,12,208,2,92,79,21,224,254,217,239,220,59,77,249,17,16,183,124,25,250],[39,98,0,155,201,162,8,209,82,75,39,121,163,200,177,236,233,125,43,94,209,232,196,231,131,103,41,144,109,209,168,108]], [[185,26,226,86,73,126,1,20,126,168,141,255,84,165,119,140,38,96,210,43,35,226,59,248,19,50,90,69,147,153,137,148],[127,198,37,229,93,22,124,26,57,196,106,173,25,75,79,31,141,169,95,83,164,217,108,88,159,44,111,87,3,216,170,25],[152,62,96,135,139,132,58,177,223,210,165,252,47,144,133,194,53,17,148,120,137,75,74,247,23,205,191,139,189,55,137,110],[85,148,95,112,242,108,21,249,206,28,4,176,171,119,63,143,109,12,48,177,113,224,76,142,129,22,235,150,169,167,154,54],[112,15,105,60,238,45,203,75,237,18,113,203,54,215,204,254,115,213,238,77,142,48,22,41,46,16,26,21,76,87,128,165]],{from: accounts[8]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[7],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+226,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[154,69,245,47,115,88,18,202,59,223,197,85,245,93,181,0,205,116,227,118,236,8,89,65,61,83,254,155,203,233,189,191],[175,173,120,84,210,132,151,140,164,65,213,145,234,245,247,205,53,249,95,196,181,2,134,99,230,90,166,39,102,98,23,207],[39,39,148,111,0,123,160,129,101,44,122,71,28,19,236,67,118,102,208,207,92,81,36,102,13,12,58,172,244,119,236,247],[152,132,78,21,167,213,11,175,168,199,91,133,12,208,2,92,79,21,224,254,217,239,220,59,77,249,17,16,183,124,25,250],[39,98,0,155,201,162,8,209,82,75,39,121,163,200,177,236,233,125,43,94,209,232,196,231,131,103,41,144,109,209,168,108]], [[185,26,226,86,73,126,1,20,126,168,141,255,84,165,119,140,38,96,210,43,35,226,59,248,19,50,90,69,147,153,137,148],[127,198,37,229,93,22,124,26,57,196,106,173,25,75,79,31,141,169,95,83,164,217,108,88,159,44,111,87,3,216,170,25],[152,62,96,135,139,132,58,177,223,210,165,252,47,144,133,194,53,17,148,120,137,75,74,247,23,205,191,139,189,55,137,110],[85,148,95,112,242,108,21,249,206,28,4,176,171,119,63,143,109,12,48,177,113,224,76,142,129,22,235,150,169,167,154,54],[112,15,105,60,238,45,203,75,237,18,113,203,54,215,204,254,115,213,238,77,142,48,22,41,46,16,26,21,76,87,128,165]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[7],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+226,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[203,194,204,228,218,18,83,120,127,32,12,43,229,149,253,248,171,244,118,186,127,47,11,29,3,178,60,220,39,221,46,127],[172,104,207,146,156,162,70,66,39,252,178,224,39,187,35,195,219,164,37,47,168,174,77,126,147,206,192,238,29,238,17,181],[224,138,76,177,52,184,144,156,24,57,105,39,166,49,198,34,159,224,3,2,52,31,210,185,177,139,5,161,156,83,165,231],[101,93,12,19,73,255,147,40,1,108,189,108,79,158,121,167,50,203,254,58,42,37,230,217,88,229,201,213,148,168,66,255],[221,69,230,130,36,112,167,38,46,52,189,79,235,34,30,121,246,142,90,36,17,28,234,31,172,235,199,177,11,41,210,8],[183,169,64,185,241,56,84,198,122,62,141,182,124,158,194,115,21,57,133,250,181,213,130,213,215,197,173,36,236,97,88,67]], [[185,26,226,86,73,126,1,20,126,168,141,255,84,165,119,140,38,96,210,43,35,226,59,248,19,50,90,69,147,153,137,148],[127,198,37,229,93,22,124,26,57,196,106,173,25,75,79,31,141,169,95,83,164,217,108,88,159,44,111,87,3,216,170,25],[152,62,96,135,139,132,58,177,223,210,165,252,47,144,133,194,53,17,148,120,137,75,74,247,23,205,191,139,189,55,137,110],[85,148,95,112,242,108,21,249,206,28,4,176,171,119,63,143,109,12,48,177,113,224,76,142,129,22,235,150,169,167,154,54],[112,15,105,60,238,45,203,75,237,18,113,203,54,215,204,254,115,213,238,77,142,48,22,41,46,16,26,21,76,87,128,165]],{from: accounts[8]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[7],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+226,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[185,26,226,86,73,126,1,20,126,168,141,255,84,165,119,140,38,96,210,43,35,226,59,248,19,50,90,69,147,153,137,148],[127,198,37,229,93,22,124,26,57,196,106,173,25,75,79,31,141,169,95,83,164,217,108,88,159,44,111,87,3,216,170,25],[152,62,96,135,139,132,58,177,223,210,165,252,47,144,133,194,53,17,148,120,137,75,74,247,23,205,191,139,189,55,137,110],[85,148,95,112,242,108,21,249,206,28,4,176,171,119,63,143,109,12,48,177,113,224,76,142,129,22,235,150,169,167,154,54],[112,15,105,60,238,45,203,75,237,18,113,203,54,215,204,254,115,213,238,77,142,48,22,41,46,16,26,21,76,87,128,165]],{from: accounts[8]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[5],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+451,{from:accounts[8]});
    let result = await localOnChainVoting.finalizeVote("Example",{from: accounts[8]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[5],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+451,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("Example",{from: accounts[9]}),'revert');
  });
});
