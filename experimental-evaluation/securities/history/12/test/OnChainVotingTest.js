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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[9],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[9],29,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[9],1,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[9],1,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[1],{from:accounts[9]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[1],{from:accounts[9]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[1],66,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[1],66,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[2],{from:accounts[2]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[2],{from:accounts[2]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(10001,contractRedeemableToken.address,contractRedeemableTokenMock.address,contractMath.address,0,10000,{from:accounts[1]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(10001,contractRedeemableToken.address,contractRedeemableTokenMock.address,contractMath.address,0,10000,{from:accounts[1]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[4],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[4],6,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[5],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+31,{from:accounts[8]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[5],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+31,{from:accounts[8]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("\x19Ethereum Signed Message:\n32",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+77,{from:accounts[8]});
    let result = await localOnChainVoting.submitUserVotes([[196,101,62,210,141,252,194,213,148,171,43,152,157,33,42,63,132,20,186,235,184,246,43,68,239,236,29,254,36,170,104,85],[167,64,181,40,241,175,210,93,193,36,119,45,213,172,16,59,111,196,45,50,80,105,196,207,74,7,63,122,128,99,146,157],[199,199,171,253,233,178,131,219,1,167,199,64,137,141,174,74,143,4,123,83,255,204,117,247,229,4,3,44,142,17,99,96],[252,164,53,93,134,77,14,180,34,127,163,243,119,32,2,9,95,73,255,171,125,16,142,92,61,44,40,226,42,235,180,13],[30,98,9,178,25,29,41,210,116,165,43,49,161,249,217,238,167,134,173,120,99,233,62,16,226,113,217,145,2,225,146,183]], [[204,104,92,250,229,86,99,147,241,102,88,204,49,9,164,159,51,102,220,80,242,178,23,235,155,94,48,83,253,192,8,86],[225,199,243,44,180,254,102,44,90,140,194,84,128,190,146,166,48,183,69,117,27,142,2,243,90,232,59,39,221,162,105,19],[12,66,13,71,102,214,249,81,194,174,94,93,40,118,242,144,45,240,106,131,10,0,32,64,65,67,220,111,27,103,93,101],[152,185,183,205,230,62,84,19,118,184,187,29,186,16,11,124,172,5,84,182,134,89,161,11,212,56,39,159,136,24,215,252],[255,227,184,115,225,226,120,197,241,159,121,58,78,212,51,92,21,138,228,3,214,94,134,32,214,10,171,25,176,49,162,172]],{from: accounts[8]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+77,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[196,101,62,210,141,252,194,213,148,171,43,152,157,33,42,63,132,20,186,235,184,246,43,68,239,236,29,254,36,170,104,85],[167,64,181,40,241,175,210,93,193,36,119,45,213,172,16,59,111,196,45,50,80,105,196,207,74,7,63,122,128,99,146,157],[199,199,171,253,233,178,131,219,1,167,199,64,137,141,174,74,143,4,123,83,255,204,117,247,229,4,3,44,142,17,99,96],[252,164,53,93,134,77,14,180,34,127,163,243,119,32,2,9,95,73,255,171,125,16,142,92,61,44,40,226,42,235,180,13],[30,98,9,178,25,29,41,210,116,165,43,49,161,249,217,238,167,134,173,120,99,233,62,16,226,113,217,145,2,225,146,183]], [[204,104,92,250,229,86,99,147,241,102,88,204,49,9,164,159,51,102,220,80,242,178,23,235,155,94,48,83,253,192,8,86],[225,199,243,44,180,254,102,44,90,140,194,84,128,190,146,166,48,183,69,117,27,142,2,243,90,232,59,39,221,162,105,19],[12,66,13,71,102,214,249,81,194,174,94,93,40,118,242,144,45,240,106,131,10,0,32,64,65,67,220,111,27,103,93,101],[152,185,183,205,230,62,84,19,118,184,187,29,186,16,11,124,172,5,84,182,134,89,161,11,212,56,39,159,136,24,215,252],[255,227,184,115,225,226,120,197,241,159,121,58,78,212,51,92,21,138,228,3,214,94,134,32,214,10,171,25,176,49,162,172]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+77,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[222,52,25,16,191,47,4,53,144,232,190,255,7,253,92,36,4,72,14,188,105,48,124,225,62,188,130,254,130,195,111,238],[45,103,62,121,252,84,64,146,194,53,143,85,220,148,199,215,52,100,38,182,243,232,24,65,235,149,194,151,94,35,18,248],[146,78,185,28,72,109,104,51,103,221,168,167,205,142,192,230,193,228,240,93,39,3,247,137,45,250,16,197,35,120,204,90],[94,146,161,49,222,157,87,27,146,146,247,229,55,167,240,239,190,157,229,131,191,239,50,184,246,193,155,202,173,38,29,237],[120,25,72,242,52,238,20,209,252,49,193,9,118,93,255,159,177,86,156,40,77,50,64,197,190,86,123,190,160,17,194,154],[223,193,199,100,125,40,219,112,147,62,137,220,144,145,250,119,8,249,243,212,205,239,2,118,41,211,78,234,15,194,218,85]], [[204,104,92,250,229,86,99,147,241,102,88,204,49,9,164,159,51,102,220,80,242,178,23,235,155,94,48,83,253,192,8,86],[225,199,243,44,180,254,102,44,90,140,194,84,128,190,146,166,48,183,69,117,27,142,2,243,90,232,59,39,221,162,105,19],[12,66,13,71,102,214,249,81,194,174,94,93,40,118,242,144,45,240,106,131,10,0,32,64,65,67,220,111,27,103,93,101],[152,185,183,205,230,62,84,19,118,184,187,29,186,16,11,124,172,5,84,182,134,89,161,11,212,56,39,159,136,24,215,252],[255,227,184,115,225,226,120,197,241,159,121,58,78,212,51,92,21,138,228,3,214,94,134,32,214,10,171,25,176,49,162,172]],{from: accounts[8]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+77,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[204,104,92,250,229,86,99,147,241,102,88,204,49,9,164,159,51,102,220,80,242,178,23,235,155,94,48,83,253,192,8,86],[225,199,243,44,180,254,102,44,90,140,194,84,128,190,146,166,48,183,69,117,27,142,2,243,90,232,59,39,221,162,105,19],[12,66,13,71,102,214,249,81,194,174,94,93,40,118,242,144,45,240,106,131,10,0,32,64,65,67,220,111,27,103,93,101],[152,185,183,205,230,62,84,19,118,184,187,29,186,16,11,124,172,5,84,182,134,89,161,11,212,56,39,159,136,24,215,252],[255,227,184,115,225,226,120,197,241,159,121,58,78,212,51,92,21,138,228,3,214,94,134,32,214,10,171,25,176,49,162,172]],{from: accounts[8]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+228,{from:accounts[8]});
    let result = await localOnChainVoting.finalizeVote("Example",{from: accounts[8]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+228,{from:accounts[8]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("Example",{from: accounts[9]}),'revert');
  });
});
