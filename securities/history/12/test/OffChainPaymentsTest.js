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

contract("OffChainPayments",(accounts)=>{
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
  
  it('Should execute recordPayments(address[],uint256[],uint256[],bytes32[]) WHEN msg.sender==_owner,_securityHolders.length>0,_securityHolders.length==_offchainPaymentHashes.length,_securityHolders.length==_paymentTimestamps.length,_securityHolders.length==_paymentValues.length', async () => {
    let result = await contractOffChainPayments.recordPayments([accounts[9],accounts[2],accounts[9],accounts[9]], [26,27,1532892064,97], [1532892064,10001,254,256], [[60,120,65,78,19,156,80,86,127,224,248,101,191,214,114,228,240,127,92,233,59,5,59,13,145,85,45,118,37,106,221,15],[27,121,248,241,86,223,167,208,93,36,187,130,4,161,75,102,65,197,237,29,77,36,143,51,120,58,113,40,12,140,178,48],[32,4,129,19,10,40,215,190,121,63,168,75,156,114,222,103,108,19,78,3,70,110,110,52,225,6,18,171,79,116,67,154],[110,231,237,44,39,87,163,144,211,122,19,72,237,160,131,168,12,152,45,53,48,18,161,227,68,124,75,0,191,249,123,21]],{from: accounts[9]});
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[9],accounts[2],accounts[9],accounts[9]], [26,27,1532892064,97], [1532892064,10001,254,256], [[60,120,65,78,19,156,80,86,127,224,248,101,191,214,114,228,240,127,92,233,59,5,59,13,145,85,45,118,37,106,221,15],[27,121,248,241,86,223,167,208,93,36,187,130,4,161,75,102,65,197,237,29,77,36,143,51,120,58,113,40,12,140,178,48],[32,4,129,19,10,40,215,190,121,63,168,75,156,114,222,103,108,19,78,3,70,110,110,52,225,6,18,171,79,116,67,154],[110,231,237,44,39,87,163,144,211,122,19,72,237,160,131,168,12,152,45,53,48,18,161,227,68,124,75,0,191,249,123,21]],{from: accounts[8]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length > 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([], [26,27,1532892064,97], [1532892064,10001,254,256], [[60,120,65,78,19,156,80,86,127,224,248,101,191,214,114,228,240,127,92,233,59,5,59,13,145,85,45,118,37,106,221,15],[27,121,248,241,86,223,167,208,93,36,187,130,4,161,75,102,65,197,237,29,77,36,143,51,120,58,113,40,12,140,178,48],[32,4,129,19,10,40,215,190,121,63,168,75,156,114,222,103,108,19,78,3,70,110,110,52,225,6,18,171,79,116,67,154],[110,231,237,44,39,87,163,144,211,122,19,72,237,160,131,168,12,152,45,53,48,18,161,227,68,124,75,0,191,249,123,21]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _offchainPaymentHashes.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[8],accounts[0],accounts[5],accounts[7],accounts[1]], [26,27,1532892064,97], [1532892064,10001,254,256], [[60,120,65,78,19,156,80,86,127,224,248,101,191,214,114,228,240,127,92,233,59,5,59,13,145,85,45,118,37,106,221,15],[27,121,248,241,86,223,167,208,93,36,187,130,4,161,75,102,65,197,237,29,77,36,143,51,120,58,113,40,12,140,178,48],[32,4,129,19,10,40,215,190,121,63,168,75,156,114,222,103,108,19,78,3,70,110,110,52,225,6,18,171,79,116,67,154],[110,231,237,44,39,87,163,144,211,122,19,72,237,160,131,168,12,152,45,53,48,18,161,227,68,124,75,0,191,249,123,21]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentTimestamps.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[2],accounts[2],accounts[4],accounts[8],accounts[7]], [26,27,1532892064,97], [1532892064,10001,254,256], [[60,120,65,78,19,156,80,86,127,224,248,101,191,214,114,228,240,127,92,233,59,5,59,13,145,85,45,118,37,106,221,15],[27,121,248,241,86,223,167,208,93,36,187,130,4,161,75,102,65,197,237,29,77,36,143,51,120,58,113,40,12,140,178,48],[32,4,129,19,10,40,215,190,121,63,168,75,156,114,222,103,108,19,78,3,70,110,110,52,225,6,18,171,79,116,67,154],[110,231,237,44,39,87,163,144,211,122,19,72,237,160,131,168,12,152,45,53,48,18,161,227,68,124,75,0,191,249,123,21]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentValues.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[6],accounts[8],accounts[6],accounts[7],accounts[0]], [26,27,1532892064,97], [1532892064,10001,254,256], [[60,120,65,78,19,156,80,86,127,224,248,101,191,214,114,228,240,127,92,233,59,5,59,13,145,85,45,118,37,106,221,15],[27,121,248,241,86,223,167,208,93,36,187,130,4,161,75,102,65,197,237,29,77,36,143,51,120,58,113,40,12,140,178,48],[32,4,129,19,10,40,215,190,121,63,168,75,156,114,222,103,108,19,78,3,70,110,110,52,225,6,18,171,79,116,67,154],[110,231,237,44,39,87,163,144,211,122,19,72,237,160,131,168,12,152,45,53,48,18,161,227,68,124,75,0,191,249,123,21]],{from: accounts[9]}),'revert');
  });
  it('Should execute lookUpPaymentIndex(address,bytes32) WHEN _securityHolder!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractOffChainPayments.lookUpPaymentIndex(accounts[9], [234,164,215,233,46,175,61,184,167,196,249,122,179,128,91,144,73,87,173,0,233,192,86,99,124,112,91,161,198,93,47,169],{from: accounts[0]});
  });
  it('Should fail lookUpPaymentIndex(address,bytes32) when NOT comply with: _securityHolder != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.lookUpPaymentIndex("0x0000000000000000000000000000000000000000", [234,164,215,233,46,175,61,184,167,196,249,122,179,128,91,144,73,87,173,0,233,192,86,99,124,112,91,161,198,93,47,169],{from: accounts[0]}),'revert');
  });
  it('Should execute challengePayment(uint256,uint256)', async () => {
    let result = await contractOffChainPayments.challengePayment(254, 2014223716,{from: accounts[0]});
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue==_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[0], 10001, [180,203,9,177,68,188,208,15,172,34,157,204,211,25,161,118,106,220,127,72,93,53,166,34,222,26,237,77,79,242,112,104], 0,{from: accounts[9]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[0], 10001, [180,203,9,177,68,188,208,15,172,34,157,204,211,25,161,118,106,220,127,72,93,53,166,34,222,26,237,77,79,242,112,104], 0,{from: accounts[8]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[0], -1, [180,203,9,177,68,188,208,15,172,34,157,204,211,25,161,118,106,220,127,72,93,53,166,34,222,26,237,77,79,242,112,104], 0,{from: accounts[9]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue!=_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[2], 29, [220,47,249,139,244,107,195,122,78,47,236,63,15,27,219,26,109,225,42,130,93,208,13,181,68,175,186,181,154,123,11,203], 27,{from: accounts[9]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[2], 29, [220,47,249,139,244,107,195,122,78,47,236,63,15,27,219,26,109,225,42,130,93,208,13,181,68,175,186,181,154,123,11,203], 27,{from: accounts[8]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[2], -1, [220,47,249,139,244,107,195,122,78,47,236,63,15,27,219,26,109,225,42,130,93,208,13,181,68,175,186,181,154,123,11,203], 27,{from: accounts[9]}),'revert');
  });
});
