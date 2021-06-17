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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[7],3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[7],3,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[8],9999,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[8],9999,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[5],{from:accounts[7]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[5],{from:accounts[7]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[0],95,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[0],95,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[4],{from:accounts[3]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[4],{from:accounts[3]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(2014223715,contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[0],27,65,{from:accounts[4]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(2014223715,contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[0],27,65,{from:accounts[4]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[7],95,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[7],95,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+413,{from:accounts[7]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+413,{from:accounts[7]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("UsesExample",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+688,{from:accounts[7]});
    let result = await localOnChainVoting.submitUserVotes([[71,178,26,148,132,88,85,27,34,37,105,24,71,144,109,196,170,177,134,57,107,152,126,219,100,175,0,60,210,195,233,55],[56,169,117,23,24,119,83,90,11,2,153,144,164,10,48,168,253,225,241,52,12,250,70,231,28,169,60,86,227,10,105,202],[241,238,80,153,223,97,190,253,138,113,151,17,126,134,144,31,99,221,4,143,125,101,74,51,204,100,253,216,113,33,83,254],[176,108,159,109,5,113,133,130,104,61,237,83,44,55,217,179,195,114,12,176,178,21,28,23,52,77,174,183,227,252,5,61],[140,163,164,190,17,140,62,47,151,217,218,208,42,55,28,251,64,70,138,153,209,189,24,203,199,84,113,173,223,186,134,95]], [[249,74,222,146,58,182,34,188,197,150,180,80,196,38,178,192,237,24,60,101,183,163,41,98,13,198,205,131,92,167,230,216],[15,255,246,166,209,165,126,246,184,96,68,41,107,174,50,73,108,239,113,19,203,234,133,0,97,169,113,179,141,44,110,43],[214,185,114,208,154,40,184,200,34,190,223,64,225,2,71,155,105,184,76,159,42,145,151,18,30,244,86,165,171,104,104,25],[107,251,147,198,11,166,163,38,154,125,182,114,178,240,62,86,136,129,66,103,207,59,33,119,59,99,222,95,205,172,195,50],[251,35,70,197,29,159,210,18,16,60,167,92,159,163,39,13,101,222,61,151,29,125,179,46,1,40,130,159,200,225,247,58]],{from: accounts[7]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+688,{from:accounts[7]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[71,178,26,148,132,88,85,27,34,37,105,24,71,144,109,196,170,177,134,57,107,152,126,219,100,175,0,60,210,195,233,55],[56,169,117,23,24,119,83,90,11,2,153,144,164,10,48,168,253,225,241,52,12,250,70,231,28,169,60,86,227,10,105,202],[241,238,80,153,223,97,190,253,138,113,151,17,126,134,144,31,99,221,4,143,125,101,74,51,204,100,253,216,113,33,83,254],[176,108,159,109,5,113,133,130,104,61,237,83,44,55,217,179,195,114,12,176,178,21,28,23,52,77,174,183,227,252,5,61],[140,163,164,190,17,140,62,47,151,217,218,208,42,55,28,251,64,70,138,153,209,189,24,203,199,84,113,173,223,186,134,95]], [[249,74,222,146,58,182,34,188,197,150,180,80,196,38,178,192,237,24,60,101,183,163,41,98,13,198,205,131,92,167,230,216],[15,255,246,166,209,165,126,246,184,96,68,41,107,174,50,73,108,239,113,19,203,234,133,0,97,169,113,179,141,44,110,43],[214,185,114,208,154,40,184,200,34,190,223,64,225,2,71,155,105,184,76,159,42,145,151,18,30,244,86,165,171,104,104,25],[107,251,147,198,11,166,163,38,154,125,182,114,178,240,62,86,136,129,66,103,207,59,33,119,59,99,222,95,205,172,195,50],[251,35,70,197,29,159,210,18,16,60,167,92,159,163,39,13,101,222,61,151,29,125,179,46,1,40,130,159,200,225,247,58]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+688,{from:accounts[7]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[144,143,141,77,166,246,209,146,47,209,34,166,37,109,252,70,102,152,0,114,134,221,120,242,8,119,120,63,213,213,238,97],[160,237,241,240,109,76,75,102,39,138,54,135,18,7,99,80,2,197,44,73,5,36,44,59,236,137,196,162,215,188,118,209],[193,243,189,252,24,193,232,237,41,238,21,149,99,219,168,60,106,41,239,198,193,217,144,46,124,31,181,162,144,201,181,65],[105,209,161,93,154,242,148,116,235,166,243,126,237,254,126,86,9,96,100,124,120,130,144,116,249,249,33,59,41,239,72,229],[85,177,242,137,166,166,143,238,137,243,208,57,94,201,29,166,41,197,189,98,38,218,186,161,28,194,49,29,212,208,148,173],[208,144,110,223,227,99,30,254,164,8,67,131,214,238,157,252,111,20,94,152,136,169,0,163,28,75,59,67,152,84,225,217]], [[249,74,222,146,58,182,34,188,197,150,180,80,196,38,178,192,237,24,60,101,183,163,41,98,13,198,205,131,92,167,230,216],[15,255,246,166,209,165,126,246,184,96,68,41,107,174,50,73,108,239,113,19,203,234,133,0,97,169,113,179,141,44,110,43],[214,185,114,208,154,40,184,200,34,190,223,64,225,2,71,155,105,184,76,159,42,145,151,18,30,244,86,165,171,104,104,25],[107,251,147,198,11,166,163,38,154,125,182,114,178,240,62,86,136,129,66,103,207,59,33,119,59,99,222,95,205,172,195,50],[251,35,70,197,29,159,210,18,16,60,167,92,159,163,39,13,101,222,61,151,29,125,179,46,1,40,130,159,200,225,247,58]],{from: accounts[7]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+688,{from:accounts[7]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[249,74,222,146,58,182,34,188,197,150,180,80,196,38,178,192,237,24,60,101,183,163,41,98,13,198,205,131,92,167,230,216],[15,255,246,166,209,165,126,246,184,96,68,41,107,174,50,73,108,239,113,19,203,234,133,0,97,169,113,179,141,44,110,43],[214,185,114,208,154,40,184,200,34,190,223,64,225,2,71,155,105,184,76,159,42,145,151,18,30,244,86,165,171,104,104,25],[107,251,147,198,11,166,163,38,154,125,182,114,178,240,62,86,136,129,66,103,207,59,33,119,59,99,222,95,205,172,195,50],[251,35,70,197,29,159,210,18,16,60,167,92,159,163,39,13,101,222,61,151,29,125,179,46,1,40,130,159,200,225,247,58]],{from: accounts[7]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+812,{from:accounts[7]});
    let result = await localOnChainVoting.finalizeVote("UsesExample",{from: accounts[7]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+812,{from:accounts[7]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("UsesExample",{from: accounts[9]}),'revert');
  });
});
