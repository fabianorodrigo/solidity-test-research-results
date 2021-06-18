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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[0],64,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[0],64,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[6],1532892062,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[6],1532892062,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[9],{from:accounts[5]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[9],{from:accounts[5]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[4],1,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[4],1,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[0],{from:accounts[6]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[0],{from:accounts[6]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(1337,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[0],5,5,{from:accounts[9]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(1337,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[0],5,5,{from:accounts[9]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[5],5,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[5],5,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+514,{from:accounts[3]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+514,{from:accounts[3]}');
  });
  
  it('Should execute placeVote(string) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<endTime', async () => {
    let result = await contractOnChainVoting.placeVote("Example",{from: accounts[0]});
  });
  it('Should execute submitUserVotes(bytes32[],bytes32[]) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,_usersSaltHash.length==_usersVote.length,_usersSaltHash.length!=0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+0,{from:accounts[3]});
    let result = await localOnChainVoting.submitUserVotes([[217,161,12,221,245,105,40,201,119,216,170,81,18,218,183,91,0,172,99,41,90,248,13,43,108,74,94,123,93,230,25,173],[211,65,207,170,134,141,252,153,66,129,235,73,99,239,24,94,29,81,246,30,186,42,201,27,41,171,225,8,77,87,83,26],[26,98,79,145,242,148,73,180,132,73,248,252,121,55,147,139,84,139,81,94,166,99,200,236,57,132,89,87,45,247,125,167],[82,40,221,237,207,250,5,5,140,89,185,93,123,244,69,113,45,89,255,93,73,169,196,160,199,36,232,190,45,140,101,110],[252,128,35,169,43,177,41,181,252,221,229,27,164,102,71,211,242,222,152,102,125,176,89,116,89,8,185,43,103,185,172,179],[167,185,76,83,66,249,3,16,92,23,102,129,248,242,43,72,161,237,122,88,140,157,218,135,121,55,231,30,134,222,246,31]], [[4,247,197,225,65,195,44,226,203,251,193,148,201,161,94,197,46,167,248,247,100,12,170,28,170,42,78,125,206,195,252,193],[50,220,232,126,237,57,127,20,108,205,228,197,167,96,28,14,119,79,22,159,43,187,179,25,209,239,32,232,104,51,148,172],[241,15,105,95,39,107,111,192,232,65,110,171,47,15,159,84,210,140,0,171,87,1,25,123,49,229,132,179,93,46,181,78],[76,229,169,118,2,230,152,3,235,86,163,167,120,48,156,27,223,21,244,11,65,58,194,77,212,173,220,56,41,40,147,174],[251,83,53,200,238,126,206,50,152,22,171,180,253,108,164,233,163,138,34,177,66,215,38,67,208,14,181,109,162,27,106,214],[107,112,225,133,101,237,145,218,177,41,119,191,188,104,111,254,238,51,243,116,164,225,203,247,165,181,158,52,212,61,247,97]],{from: accounts[3]});
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+0,{from:accounts[3]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[217,161,12,221,245,105,40,201,119,216,170,81,18,218,183,91,0,172,99,41,90,248,13,43,108,74,94,123,93,230,25,173],[211,65,207,170,134,141,252,153,66,129,235,73,99,239,24,94,29,81,246,30,186,42,201,27,41,171,225,8,77,87,83,26],[26,98,79,145,242,148,73,180,132,73,248,252,121,55,147,139,84,139,81,94,166,99,200,236,57,132,89,87,45,247,125,167],[82,40,221,237,207,250,5,5,140,89,185,93,123,244,69,113,45,89,255,93,73,169,196,160,199,36,232,190,45,140,101,110],[252,128,35,169,43,177,41,181,252,221,229,27,164,102,71,211,242,222,152,102,125,176,89,116,89,8,185,43,103,185,172,179],[167,185,76,83,66,249,3,16,92,23,102,129,248,242,43,72,161,237,122,88,140,157,218,135,121,55,231,30,134,222,246,31]], [[4,247,197,225,65,195,44,226,203,251,193,148,201,161,94,197,46,167,248,247,100,12,170,28,170,42,78,125,206,195,252,193],[50,220,232,126,237,57,127,20,108,205,228,197,167,96,28,14,119,79,22,159,43,187,179,25,209,239,32,232,104,51,148,172],[241,15,105,95,39,107,111,192,232,65,110,171,47,15,159,84,210,140,0,171,87,1,25,123,49,229,132,179,93,46,181,78],[76,229,169,118,2,230,152,3,235,86,163,167,120,48,156,27,223,21,244,11,65,58,194,77,212,173,220,56,41,40,147,174],[251,83,53,200,238,126,206,50,152,22,171,180,253,108,164,233,163,138,34,177,66,215,38,67,208,14,181,109,162,27,106,214],[107,112,225,133,101,237,145,218,177,41,119,191,188,104,111,254,238,51,243,116,164,225,203,247,165,181,158,52,212,61,247,97]],{from: accounts[9]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length == _usersVote.length', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+0,{from:accounts[3]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([[112,143,151,8,114,181,247,208,43,230,4,62,119,120,176,70,249,229,20,112,201,83,182,90,107,229,99,210,66,115,123,89],[255,142,137,239,193,234,234,62,94,135,23,131,56,122,156,98,1,240,101,138,8,43,30,164,63,164,107,197,132,191,2,189],[17,169,104,60,96,50,135,110,56,194,4,45,225,32,86,125,109,151,64,147,173,39,230,94,185,160,197,114,224,198,2,211],[12,132,115,27,243,200,156,20,179,195,100,98,163,148,210,128,88,165,198,177,215,197,135,98,92,116,65,49,107,187,139,30],[121,126,46,33,177,208,21,14,110,236,47,45,91,140,226,152,47,48,144,24,205,230,59,206,14,238,119,95,246,56,178,160],[183,59,144,81,200,219,80,96,164,114,62,76,229,195,203,116,111,247,227,209,181,107,154,188,177,252,36,222,92,173,179,164],[38,80,115,61,106,20,252,146,74,153,5,76,160,68,100,84,172,2,156,112,193,112,77,97,19,36,33,237,40,50,211,71]], [[4,247,197,225,65,195,44,226,203,251,193,148,201,161,94,197,46,167,248,247,100,12,170,28,170,42,78,125,206,195,252,193],[50,220,232,126,237,57,127,20,108,205,228,197,167,96,28,14,119,79,22,159,43,187,179,25,209,239,32,232,104,51,148,172],[241,15,105,95,39,107,111,192,232,65,110,171,47,15,159,84,210,140,0,171,87,1,25,123,49,229,132,179,93,46,181,78],[76,229,169,118,2,230,152,3,235,86,163,167,120,48,156,27,223,21,244,11,65,58,194,77,212,173,220,56,41,40,147,174],[251,83,53,200,238,126,206,50,152,22,171,180,253,108,164,233,163,138,34,177,66,215,38,67,208,14,181,109,162,27,106,214],[107,112,225,133,101,237,145,218,177,41,119,191,188,104,111,254,238,51,243,116,164,225,203,247,165,181,158,52,212,61,247,97]],{from: accounts[3]}),'revert');
  });
  it('Should fail submitUserVotes(bytes32[],bytes32[]) when NOT comply with: _usersSaltHash.length != 0', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+0,{from:accounts[3]});
    let result = await truffleAssert.fails(localOnChainVoting.submitUserVotes([], [[4,247,197,225,65,195,44,226,203,251,193,148,201,161,94,197,46,167,248,247,100,12,170,28,170,42,78,125,206,195,252,193],[50,220,232,126,237,57,127,20,108,205,228,197,167,96,28,14,119,79,22,159,43,187,179,25,209,239,32,232,104,51,148,172],[241,15,105,95,39,107,111,192,232,65,110,171,47,15,159,84,210,140,0,171,87,1,25,123,49,229,132,179,93,46,181,78],[76,229,169,118,2,230,152,3,235,86,163,167,120,48,156,27,223,21,244,11,65,58,194,77,212,173,220,56,41,40,147,174],[251,83,53,200,238,126,206,50,152,22,171,180,253,108,164,233,163,138,34,177,66,215,38,67,208,14,181,109,162,27,106,214],[107,112,225,133,101,237,145,218,177,41,119,191,188,104,111,254,238,51,243,116,164,225,203,247,165,181,158,52,212,61,247,97]],{from: accounts[3]}),'revert');
  });
  it('Should execute finalizeVote(string) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=endTime,submissionsCount==votesCount', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+37,{from:accounts[3]});
    let result = await localOnChainVoting.finalizeVote("mqkobs",{from: accounts[3]});
  });
  it('Should fail finalizeVote(string) when NOT comply with: msg.sender == _owner', async () => {
    let localOnChainVoting = await OnChainVoting.new(contractPaymentTokenMock.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+37,{from:accounts[3]});
    let result = await truffleAssert.fails(localOnChainVoting.finalizeVote("mqkobs",{from: accounts[9]}),'revert');
  });
});
