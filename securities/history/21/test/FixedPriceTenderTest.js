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

contract("FixedPriceTender",(accounts)=>{
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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[1],95,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[1],95,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[7],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[7],29,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[6],{from:accounts[0]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[5],3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[5],3,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[4],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[4],{from:accounts[1]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(1,contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[1],26,5,{from:accounts[7]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(1,contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[1],26,5,{from:accounts[7]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],29,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+259,{from:accounts[1]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableTokenMock.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+259,{from:accounts[1]}');
  });
  
  it('Should execute paymentTokensReady() WHEN paymentReady!=true', async () => {
    let result = await contractFixedPriceTender.paymentTokensReady({from: accounts[0]});
  });
  it('Should execute updateOfferEndTime(uint256) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<offerEndTime,_newOfferEnd>=block.timestamp', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(27,contractRedeemableToken.address,contractRedeemableToken.address,accounts[8],64,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+277,{from:accounts[7]});
    let result = await localFixedPriceTender.updateOfferEndTime((await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+271,{from: accounts[7]});
  });
  it('Should fail updateOfferEndTime(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(27,contractRedeemableToken.address,contractRedeemableToken.address,accounts[8],64,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+277,{from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.updateOfferEndTime((await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+271,{from: accounts[9]}),'revert');
  });
  it('Should fail updateOfferEndTime(uint256) when NOT comply with: _newOfferEnd >= (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(27,contractRedeemableToken.address,contractRedeemableToken.address,accounts[8],64,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+277,{from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.updateOfferEndTime((await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-1,{from: accounts[7]}),'revert');
  });
  it('Should execute updatePaymentPerSecurity(uint256) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<offerEndTime,_newPaymentPerSecurity>0', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(3,contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[9],66,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+759,{from:accounts[7]});
    let result = await localFixedPriceTender.updatePaymentPerSecurity(10000,{from: accounts[7]});
  });
  it('Should fail updatePaymentPerSecurity(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(3,contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[9],66,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+759,{from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.updatePaymentPerSecurity(10000,{from: accounts[9]}),'revert');
  });
  it('Should fail updatePaymentPerSecurity(uint256) when NOT comply with: _newPaymentPerSecurity > 0', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(3,contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[9],66,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+759,{from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.updatePaymentPerSecurity(0,{from: accounts[7]}),'revert');
  });
  it('Should execute updateTotalToRepurchase(uint256) WHEN msg.sender==_owner,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<offerEndTime,_newTotalToRepurchase>=0', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(1532892062,contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[7],96,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+694,{from:accounts[7]});
    let result = await localFixedPriceTender.updateTotalToRepurchase(6,{from: accounts[7]});
  });
  it('Should fail updateTotalToRepurchase(uint256) when NOT comply with: msg.sender == _owner', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(1532892062,contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[7],96,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+694,{from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.updateTotalToRepurchase(6,{from: accounts[9]}),'revert');
  });
  it('Should fail updateTotalToRepurchase(uint256) when NOT comply with: _newTotalToRepurchase >= 0', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(1532892062,contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[7],96,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+694,{from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.updateTotalToRepurchase(-1,{from: accounts[7]}),'revert');
  });
  it('Should execute optInToTender(uint256) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<offerEndTime,paymentReady==true,_numberToTender>0', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(4,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[3],64,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+286,{from:accounts[7]});
    await localFixedPriceTender.paymentTokensReady({from:accounts[7]});
    let result = await localFixedPriceTender.optInToTender(257,{from: accounts[7]});
  });
  it('Should fail optInToTender(uint256) when NOT comply with: paymentReady == true', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(4,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[3],64,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+286,{from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.optInToTender(257,{from: accounts[7]}),'revert');
  });
  it('Should fail optInToTender(uint256) when NOT comply with: _numberToTender > 0', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(4,contractPaymentTokenMock.address,contractPaymentTokenMock.address,accounts[3],64,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+286,{from:accounts[7]});
    await localFixedPriceTender.paymentTokensReady({from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.optInToTender(0,{from: accounts[7]}),'revert');
  });
  it('Should execute optOutOfTender(uint256) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<offerEndTime,_numberToRemove>0', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(28,contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[7],26,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+734,{from:accounts[7]});
    let result = await localFixedPriceTender.optOutOfTender(5,{from: accounts[7]});
  });
  it('Should fail optOutOfTender(uint256) when NOT comply with: _numberToRemove > 0', async () => {
    let localFixedPriceTender = await FixedPriceTender.new(28,contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[7],26,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+734,{from:accounts[7]});
    let result = await truffleAssert.fails(localFixedPriceTender.optOutOfTender(0,{from: accounts[7]}),'revert');
  });
  it('Should execute finaliseTender(uint256) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=offerEndTime,nextTenderToAssess<orderedHolders.length,_batchSize>0', async () => {
    let result = await contractFixedPriceTender.finaliseTender(1532892063,{from: accounts[0]});
  });
  it('Should fail finaliseTender(uint256) when NOT comply with: _batchSize > 0', async () => {
    let result = await truffleAssert.fails(contractFixedPriceTender.finaliseTender(0,{from: accounts[0]}),'revert');
  });
});