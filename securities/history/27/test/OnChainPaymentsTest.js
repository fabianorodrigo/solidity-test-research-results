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
const ProxyFixedPriceTender = artifacts.require("ProxyFixedPriceTender");

contract("OnChainPayments",(accounts)=>{
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
  
  it('Should execute makePayments(address[],uint256) WHEN msg.sender==_owner,_securityHolders.length>0,_paymentPerSecurity>0', async () => {
    let result = await contractOnChainPayments.makePayments([accounts[8],accounts[0],accounts[0],accounts[5],accounts[6],accounts[0],accounts[8],accounts[0],accounts[9],accounts[6],accounts[1],accounts[3],accounts[5],accounts[3],accounts[4],accounts[0],accounts[9],accounts[1],accounts[8],accounts[4],accounts[6],accounts[5],accounts[9],accounts[8],accounts[6],accounts[9],accounts[1],accounts[0],accounts[8],accounts[1],accounts[1],accounts[3],accounts[4],accounts[0],accounts[2],accounts[4],accounts[6],accounts[3],accounts[0],accounts[1],accounts[9],accounts[8],accounts[0],accounts[4],accounts[4],accounts[9],accounts[4],accounts[6],accounts[3],accounts[3],accounts[1],accounts[5],accounts[1],accounts[5],accounts[2],accounts[4],accounts[6],accounts[9],accounts[5],accounts[7],accounts[9],accounts[7],accounts[7],accounts[2],accounts[8],accounts[7],accounts[5],accounts[2],accounts[1],accounts[7],accounts[7],accounts[0],accounts[8],accounts[4],accounts[0],accounts[1],accounts[8],accounts[0],accounts[8],accounts[3],accounts[8],accounts[2],accounts[7],accounts[6],accounts[7],accounts[2],accounts[2],accounts[0],accounts[4],accounts[1],accounts[6],accounts[9],accounts[4],accounts[2],accounts[5],accounts[2]], 254,{from: accounts[9]});
  });
  it('Should fail makePayments(address[],uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.makePayments([accounts[8],accounts[0],accounts[0],accounts[5],accounts[6],accounts[0],accounts[8],accounts[0],accounts[9],accounts[6],accounts[1],accounts[3],accounts[5],accounts[3],accounts[4],accounts[0],accounts[9],accounts[1],accounts[8],accounts[4],accounts[6],accounts[5],accounts[9],accounts[8],accounts[6],accounts[9],accounts[1],accounts[0],accounts[8],accounts[1],accounts[1],accounts[3],accounts[4],accounts[0],accounts[2],accounts[4],accounts[6],accounts[3],accounts[0],accounts[1],accounts[9],accounts[8],accounts[0],accounts[4],accounts[4],accounts[9],accounts[4],accounts[6],accounts[3],accounts[3],accounts[1],accounts[5],accounts[1],accounts[5],accounts[2],accounts[4],accounts[6],accounts[9],accounts[5],accounts[7],accounts[9],accounts[7],accounts[7],accounts[2],accounts[8],accounts[7],accounts[5],accounts[2],accounts[1],accounts[7],accounts[7],accounts[0],accounts[8],accounts[4],accounts[0],accounts[1],accounts[8],accounts[0],accounts[8],accounts[3],accounts[8],accounts[2],accounts[7],accounts[6],accounts[7],accounts[2],accounts[2],accounts[0],accounts[4],accounts[1],accounts[6],accounts[9],accounts[4],accounts[2],accounts[5],accounts[2]], 254,{from: accounts[8]}),'revert');
  });
  it('Should fail makePayments(address[],uint256) when NOT comply with: _securityHolders.length > 0', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.makePayments([], 254,{from: accounts[9]}),'revert');
  });
  it('Should fail makePayments(address[],uint256) when NOT comply with: _paymentPerSecurity > 0', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.makePayments([accounts[8],accounts[0],accounts[0],accounts[5],accounts[6],accounts[0],accounts[8],accounts[0],accounts[9],accounts[6],accounts[1],accounts[3],accounts[5],accounts[3],accounts[4],accounts[0],accounts[9],accounts[1],accounts[8],accounts[4],accounts[6],accounts[5],accounts[9],accounts[8],accounts[6],accounts[9],accounts[1],accounts[0],accounts[8],accounts[1],accounts[1],accounts[3],accounts[4],accounts[0],accounts[2],accounts[4],accounts[6],accounts[3],accounts[0],accounts[1],accounts[9],accounts[8],accounts[0],accounts[4],accounts[4],accounts[9],accounts[4],accounts[6],accounts[3],accounts[3],accounts[1],accounts[5],accounts[1],accounts[5],accounts[2],accounts[4],accounts[6],accounts[9],accounts[5],accounts[7],accounts[9],accounts[7],accounts[7],accounts[2],accounts[8],accounts[7],accounts[5],accounts[2],accounts[1],accounts[7],accounts[7],accounts[0],accounts[8],accounts[4],accounts[0],accounts[1],accounts[8],accounts[0],accounts[8],accounts[3],accounts[8],accounts[2],accounts[7],accounts[6],accounts[7],accounts[2],accounts[2],accounts[0],accounts[4],accounts[1],accounts[6],accounts[9],accounts[4],accounts[2],accounts[5],accounts[2]], 0,{from: accounts[9]}),'revert');
  });
  it('Should execute lookUpPaymentIndex(address,uint256,uint256) WHEN _timestamp!=0,_securityHolder!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractOnChainPayments.lookUpPaymentIndex(accounts[3], 26, 96,{from: accounts[0]});
  });
  it('Should fail lookUpPaymentIndex(address,uint256,uint256) when NOT comply with: _timestamp != 0', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.lookUpPaymentIndex(accounts[3], 0, 96,{from: accounts[0]}),'revert');
  });
  it('Should fail lookUpPaymentIndex(address,uint256,uint256) when NOT comply with: _securityHolder != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.lookUpPaymentIndex("0x0000000000000000000000000000000000000000", 26, 96,{from: accounts[0]}),'revert');
  });
  it('Should execute challengePayment(uint256,uint256)', async () => {
    let result = await contractOnChainPayments.challengePayment(2014223714, 26,{from: accounts[0]});
  });
  it('Should execute resolveChallenge(address,uint256,uint256) WHEN currentValue==_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOnChainPayments.resolveChallenge(accounts[6], 257, 2014223715,{from: accounts[9]});
  });
  it('Should fail resolveChallenge(address,uint256,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.resolveChallenge(accounts[6], 257, 2014223715,{from: accounts[8]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.resolveChallenge(accounts[6], -1, 2014223715,{from: accounts[9]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,uint256) WHEN _newValue>currentValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOnChainPayments.resolveChallenge(accounts[3], 1532892062, 1532892063,{from: accounts[9]});
  });
  it('Should fail resolveChallenge(address,uint256,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.resolveChallenge(accounts[3], 1532892062, 1532892063,{from: accounts[8]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.resolveChallenge(accounts[3], -1, 1532892063,{from: accounts[9]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,uint256) WHEN _newValue<=currentValue,currentValue!=_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOnChainPayments.resolveChallenge(accounts[1], 255, 29,{from: accounts[9]});
  });
  it('Should fail resolveChallenge(address,uint256,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.resolveChallenge(accounts[1], 255, 29,{from: accounts[8]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOnChainPayments.resolveChallenge(accounts[1], -1, 29,{from: accounts[9]}),'revert');
  });
});
