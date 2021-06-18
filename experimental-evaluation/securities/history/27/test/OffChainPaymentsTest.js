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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[6],9999,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[6],9999,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[5],254,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[5],254,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[1],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[1],{from:accounts[1]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[5],255,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[5],255,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[2],{from:accounts[9]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[2],{from:accounts[9]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(254,contractPaymentTokenMock.address,contractRedeemableTokenMock.address,contractRedeemableToken.address,4,10000,{from:accounts[6]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(254,contractPaymentTokenMock.address,contractRedeemableTokenMock.address,contractRedeemableToken.address,4,10000,{from:accounts[6]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[6],95,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[6],95,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+934,{from:accounts[9]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableTokenMock.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+934,{from:accounts[9]}');
  });
  
  it('Should execute recordPayments(address[],uint256[],uint256[],bytes32[]) WHEN msg.sender==_owner,_securityHolders.length>0,_securityHolders.length==_offchainPaymentHashes.length,_securityHolders.length==_paymentTimestamps.length,_securityHolders.length==_paymentValues.length', async () => {
    let result = await contractOffChainPayments.recordPayments([accounts[6]], [1532892062], [28], [[94,157,253,73,143,192,173,85,182,192,76,222,45,176,38,253,234,114,134,144,207,81,106,242,192,162,162,76,231,89,44,162]],{from: accounts[1]});
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[6]], [1532892062], [28], [[94,157,253,73,143,192,173,85,182,192,76,222,45,176,38,253,234,114,134,144,207,81,106,242,192,162,162,76,231,89,44,162]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length > 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([], [1532892062], [28], [[94,157,253,73,143,192,173,85,182,192,76,222,45,176,38,253,234,114,134,144,207,81,106,242,192,162,162,76,231,89,44,162]],{from: accounts[1]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _offchainPaymentHashes.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[1],accounts[7]], [1532892062], [28], [[94,157,253,73,143,192,173,85,182,192,76,222,45,176,38,253,234,114,134,144,207,81,106,242,192,162,162,76,231,89,44,162]],{from: accounts[1]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentTimestamps.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[7],accounts[0]], [1532892062], [28], [[94,157,253,73,143,192,173,85,182,192,76,222,45,176,38,253,234,114,134,144,207,81,106,242,192,162,162,76,231,89,44,162]],{from: accounts[1]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentValues.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[6],accounts[8]], [1532892062], [28], [[94,157,253,73,143,192,173,85,182,192,76,222,45,176,38,253,234,114,134,144,207,81,106,242,192,162,162,76,231,89,44,162]],{from: accounts[1]}),'revert');
  });
  it('Should execute lookUpPaymentIndex(address,bytes32) WHEN _securityHolder!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractOffChainPayments.lookUpPaymentIndex(accounts[8], [93,130,170,139,168,16,189,164,191,146,198,189,193,159,200,10,127,191,180,14,125,209,54,175,226,196,180,203,212,108,1,86],{from: accounts[0]});
  });
  it('Should fail lookUpPaymentIndex(address,bytes32) when NOT comply with: _securityHolder != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.lookUpPaymentIndex("0x0000000000000000000000000000000000000000", [93,130,170,139,168,16,189,164,191,146,198,189,193,159,200,10,127,191,180,14,125,209,54,175,226,196,180,203,212,108,1,86],{from: accounts[0]}),'revert');
  });
  it('Should execute challengePayment(uint256,uint256)', async () => {
    let result = await contractOffChainPayments.challengePayment(2014223714, 2014223716,{from: accounts[0]});
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue==_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[1], 2, [23,135,188,29,69,139,248,120,29,159,132,81,64,6,249,33,20,203,63,215,193,99,67,11,4,82,91,222,126,5,255,170], 257,{from: accounts[1]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[1], 2, [23,135,188,29,69,139,248,120,29,159,132,81,64,6,249,33,20,203,63,215,193,99,67,11,4,82,91,222,126,5,255,170], 257,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[1], -1, [23,135,188,29,69,139,248,120,29,159,132,81,64,6,249,33,20,203,63,215,193,99,67,11,4,82,91,222,126,5,255,170], 257,{from: accounts[1]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue!=_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[3], 28, [168,67,195,20,95,167,117,58,163,49,130,29,42,124,205,180,95,122,161,254,85,141,37,10,255,247,93,196,217,219,192,212], 2014223716,{from: accounts[1]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[3], 28, [168,67,195,20,95,167,117,58,163,49,130,29,42,124,205,180,95,122,161,254,85,141,37,10,255,247,93,196,217,219,192,212], 2014223716,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[3], -1, [168,67,195,20,95,167,117,58,163,49,130,29,42,124,205,180,95,122,161,254,85,141,37,10,255,247,93,196,217,219,192,212], 2014223716,{from: accounts[1]}),'revert');
  });
});
