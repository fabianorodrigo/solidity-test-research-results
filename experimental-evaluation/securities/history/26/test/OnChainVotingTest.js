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
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("IsLibrary",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+942,{from:accounts[2]});
    let result = await localOnChainVoting.submitUserVotes([[226,144,80,160,225,76,252,208,37,134,181,103,25,47,178,131,140,255,169,11,58,247,233,18,90,155,103,130,153,101,149,73],[195,29,202,251,125,239,39,109,226,254,225,219,209,170,204,34,80,19,186,109,149,222,137,42,77,1,35,21,129,246,147,7],[180,175,4,28,162,185,52,222,86,90,136,183,65,13,214,172,157,208,50,252,130,84,143,135,127,130,223,173,103,137,22,26],[57,180,194,122,137,200,151,152,4,142,57,166,100,83,170,165,85,216,159,136,208,53,232,92,22,94,241,13,250,150,133,178],[205,63,180,222,122,115,159,74,188,13,151,30,70,201,181,118,80,63,159,164,74,174,113,102,74,185,158,99,220,184,187,244],[171,145,151,89,242,255,166,181,33,13,27,128,220,38,173,181,43,159,11,205,181,239,82,8,125,113,149,127,157,213,64,179]], [[25,26,25,135,239,123,94,114,33,67,41,52,42,180,122,247,125,213,71,19,59,91,132,204,222,27,25,138,170,99,41,59],[40,19,20,72,155,218,145,153,71,56,58,190,78,212,91,12,2,208,113,41,163,139,238,25,237,120,221,156,65,6,66,221],[21,178,168,96,0,175,37,182,195,92,8,156,126,186,247,100,8,22,166,55,83,226,241,134,32,246,134,54,115,24,151,100],[169,183,71,120,126,66,241,216,206,212,11,174,108,102,148,77,126,69,34,31,97,228,253,187,97,30,59,196,43,21,132,39],[233,145,184,95,193,134,33,69,164,43,118,159,161,59,172,143,128,21,19,255,145,111,51,117,199,255,224,51,175,151,116,193],[244,142,67,3,33,50,58,11,191,224,172,232,253,135,25,99,82,27,159,196,189,109,154,94,77,252,82,21,245,68,100,211]],{from: accounts[2]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+942,{from:accounts[2]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[226,144,80,160,225,76,252,208,37,134,181,103,25,47,178,131,140,255,169,11,58,247,233,18,90,155,103,130,153,101,149,73],[195,29,202,251,125,239,39,109,226,254,225,219,209,170,204,34,80,19,186,109,149,222,137,42,77,1,35,21,129,246,147,7],[180,175,4,28,162,185,52,222,86,90,136,183,65,13,214,172,157,208,50,252,130,84,143,135,127,130,223,173,103,137,22,26],[57,180,194,122,137,200,151,152,4,142,57,166,100,83,170,165,85,216,159,136,208,53,232,92,22,94,241,13,250,150,133,178],[205,63,180,222,122,115,159,74,188,13,151,30,70,201,181,118,80,63,159,164,74,174,113,102,74,185,158,99,220,184,187,244],[171,145,151,89,242,255,166,181,33,13,27,128,220,38,173,181,43,159,11,205,181,239,82,8,125,113,149,127,157,213,64,179]], [[25,26,25,135,239,123,94,114,33,67,41,52,42,180,122,247,125,213,71,19,59,91,132,204,222,27,25,138,170,99,41,59],[40,19,20,72,155,218,145,153,71,56,58,190,78,212,91,12,2,208,113,41,163,139,238,25,237,120,221,156,65,6,66,221],[21,178,168,96,0,175,37,182,195,92,8,156,126,186,247,100,8,22,166,55,83,226,241,134,32,246,134,54,115,24,151,100],[169,183,71,120,126,66,241,216,206,212,11,174,108,102,148,77,126,69,34,31,97,228,253,187,97,30,59,196,43,21,132,39],[233,145,184,95,193,134,33,69,164,43,118,159,161,59,172,143,128,21,19,255,145,111,51,117,199,255,224,51,175,151,116,193],[244,142,67,3,33,50,58,11,191,224,172,232,253,135,25,99,82,27,159,196,189,109,154,94,77,252,82,21,245,68,100,211]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+942,{from:accounts[2]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[108,90,35,99,29,215,74,237,171,62,225,216,202,90,103,177,56,0,204,127,169,182,125,30,62,110,156,85,161,29,205,233],[46,7,180,178,244,72,10,2,74,123,58,153,225,225,200,10,237,43,119,5,191,107,129,20,36,29,35,128,152,137,87,180],[188,163,124,231,37,12,144,122,29,153,87,3,216,35,104,183,157,12,196,203,223,177,57,186,224,135,7,247,33,17,120,180],[187,80,146,146,113,180,199,182,12,20,25,217,169,229,172,100,54,196,237,68,119,40,31,198,248,91,112,188,214,178,90,235],[81,218,91,191,61,20,68,214,252,159,173,50,28,202,95,242,165,130,236,102,154,209,92,123,185,8,32,46,202,151,243,103],[243,96,145,162,33,92,167,63,171,108,184,47,76,118,194,116,130,164,65,211,3,157,81,178,151,146,38,193,242,102,86,85],[32,239,70,82,247,208,196,237,235,247,251,179,10,218,33,49,226,40,215,178,83,163,77,134,206,114,151,171,185,107,115,35]], [[25,26,25,135,239,123,94,114,33,67,41,52,42,180,122,247,125,213,71,19,59,91,132,204,222,27,25,138,170,99,41,59],[40,19,20,72,155,218,145,153,71,56,58,190,78,212,91,12,2,208,113,41,163,139,238,25,237,120,221,156,65,6,66,221],[21,178,168,96,0,175,37,182,195,92,8,156,126,186,247,100,8,22,166,55,83,226,241,134,32,246,134,54,115,24,151,100],[169,183,71,120,126,66,241,216,206,212,11,174,108,102,148,77,126,69,34,31,97,228,253,187,97,30,59,196,43,21,132,39],[233,145,184,95,193,134,33,69,164,43,118,159,161,59,172,143,128,21,19,255,145,111,51,117,199,255,224,51,175,151,116,193],[244,142,67,3,33,50,58,11,191,224,172,232,253,135,25,99,82,27,159,196,189,109,154,94,77,252,82,21,245,68,100,211]],{from: accounts[2]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+942,{from:accounts[2]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[25,26,25,135,239,123,94,114,33,67,41,52,42,180,122,247,125,213,71,19,59,91,132,204,222,27,25,138,170,99,41,59],[40,19,20,72,155,218,145,153,71,56,58,190,78,212,91,12,2,208,113,41,163,139,238,25,237,120,221,156,65,6,66,221],[21,178,168,96,0,175,37,182,195,92,8,156,126,186,247,100,8,22,166,55,83,226,241,134,32,246,134,54,115,24,151,100],[169,183,71,120,126,66,241,216,206,212,11,174,108,102,148,77,126,69,34,31,97,228,253,187,97,30,59,196,43,21,132,39],[233,145,184,95,193,134,33,69,164,43,118,159,161,59,172,143,128,21,19,255,145,111,51,117,199,255,224,51,175,151,116,193],[244,142,67,3,33,50,58,11,191,224,172,232,253,135,25,99,82,27,159,196,189,109,154,94,77,252,82,21,245,68,100,211]],{from: accounts[2]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+994,{from:accounts[2]});
    let result = await localOnChainVoting.finalizeVote("IsLibrary",{from: accounts[2]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+994,{from:accounts[2]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("IsLibrary",{from: accounts[9]}),'revert');
  });
});
