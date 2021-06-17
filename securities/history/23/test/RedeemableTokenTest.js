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

contract("RedeemableToken",(accounts)=>{
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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[6],3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[6],3,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[7],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[7],29,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[6],{from:accounts[3]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[6],{from:accounts[3]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[8],97,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[8],97,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[4],{from:accounts[3]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[4],{from:accounts[3]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(9999,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[5],1,26,{from:accounts[4]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(9999,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[5],1,26,{from:accounts[4]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[1],10001,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[1],10001,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+614,{from:accounts[0]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[8],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+614,{from:accounts[0]}');
  });
  
  it('Should execute setRedemption(address) WHEN msg.sender==_owner,_redemption!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractRedeemableToken.setRedemption(accounts[6],{from: accounts[0]});
  });
  it('Should fail setRedemption(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractRedeemableToken.setRedemption(accounts[6],{from: accounts[9]}),'revert');
  });
  it('Should fail setRedemption(address) when NOT comply with: _redemption != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractRedeemableToken.setRedemption("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute redeemAllTokens(address) WHEN msg.sender==redemption,msg.sender==_owner,balance>0', async () => {
    await contractRedeemableToken.setRedemption(accounts[8],{from:accounts[0]});
    let result = await contractRedeemableToken.redeemAllTokens(accounts[7],{from: accounts[0]});
  });
  it('Should fail redeemAllTokens(address) when NOT comply with: msg.sender == redemption', async () => {
    await contractRedeemableToken.setRedemption(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractRedeemableToken.redeemAllTokens(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should fail redeemAllTokens(address) when NOT comply with: msg.sender == _owner', async () => {
    await contractRedeemableToken.setRedemption(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractRedeemableToken.redeemAllTokens(accounts[7],{from: accounts[9]}),'revert');
  });
  it('Should execute redeemPartialTokens(address,uint256) WHEN msg.sender==redemption,msg.sender==_owner', async () => {
    await contractRedeemableToken.setRedemption(accounts[0],{from:accounts[0]});
    let result = await contractRedeemableToken.redeemPartialTokens(accounts[5], 2014223716,{from: accounts[0]});
  });
  it('Should fail redeemPartialTokens(address,uint256) when NOT comply with: msg.sender == redemption', async () => {
    await contractRedeemableToken.setRedemption(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractRedeemableToken.redeemPartialTokens(accounts[5], 2014223716,{from: accounts[9]}),'revert');
  });
  it('Should fail redeemPartialTokens(address,uint256) when NOT comply with: msg.sender == _owner', async () => {
    await contractRedeemableToken.setRedemption(accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractRedeemableToken.redeemPartialTokens(accounts[5], 2014223716,{from: accounts[9]}),'revert');
  });
});
