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

contract("FullRedemption",(accounts)=>{
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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[4],2014223716,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[4],2014223716,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[3],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[3],10000,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[1],{from:accounts[4]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[1],{from:accounts[4]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[6],255,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[6],255,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[6],{from:accounts[6]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableToken.address,accounts[6],{from:accounts[6]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(1336,contractPaymentTokenMock.address,contractPaymentTokenMock.address,contractMath.address,10001,2014223714,{from:accounts[1]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(1336,contractPaymentTokenMock.address,contractPaymentTokenMock.address,contractMath.address,10001,2014223714,{from:accounts[1]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[9],2014223716,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[9],2014223716,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[0],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+667,{from:accounts[7]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[0],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+667,{from:accounts[7]}');
  });
  
  it('Should execute setup() WHEN isSetUp!=true', async () => {
    let result = await contractFullRedemption.setup({from: accounts[0]});
  });
  it('Should execute redeemTokens(address[]) WHEN msg.sender==_owner,isSetUp==true,_holders.length>0', async () => {
    await contractFullRedemption.setup({from:accounts[0]});
    let result = await contractFullRedemption.redeemTokens([accounts[0],accounts[5],accounts[7],accounts[4],accounts[9],accounts[5],accounts[8],accounts[4],accounts[9],accounts[9],accounts[8],accounts[5],accounts[7],accounts[8],accounts[1],accounts[5],accounts[1],accounts[7],accounts[7],accounts[1],accounts[3],accounts[2],accounts[1],accounts[7],accounts[1],accounts[4],accounts[6],accounts[4],accounts[1],accounts[2],accounts[3],accounts[5],accounts[1],accounts[7],accounts[9],accounts[7],accounts[2],accounts[8],accounts[2],accounts[0],accounts[9],accounts[1],accounts[1],accounts[0],accounts[1],accounts[6],accounts[4],accounts[8],accounts[4],accounts[9],accounts[4],accounts[2],accounts[9],accounts[6],accounts[6],accounts[1],accounts[1],accounts[4],accounts[5],accounts[7],accounts[1],accounts[2],accounts[1],accounts[8]],{from: accounts[0]});
  });
  it('Should fail redeemTokens(address[]) when NOT comply with: msg.sender == _owner', async () => {
    await contractFullRedemption.setup({from:accounts[0]});
    let result = await truffleAssert.fails(contractFullRedemption.redeemTokens([accounts[0],accounts[5],accounts[7],accounts[4],accounts[9],accounts[5],accounts[8],accounts[4],accounts[9],accounts[9],accounts[8],accounts[5],accounts[7],accounts[8],accounts[1],accounts[5],accounts[1],accounts[7],accounts[7],accounts[1],accounts[3],accounts[2],accounts[1],accounts[7],accounts[1],accounts[4],accounts[6],accounts[4],accounts[1],accounts[2],accounts[3],accounts[5],accounts[1],accounts[7],accounts[9],accounts[7],accounts[2],accounts[8],accounts[2],accounts[0],accounts[9],accounts[1],accounts[1],accounts[0],accounts[1],accounts[6],accounts[4],accounts[8],accounts[4],accounts[9],accounts[4],accounts[2],accounts[9],accounts[6],accounts[6],accounts[1],accounts[1],accounts[4],accounts[5],accounts[7],accounts[1],accounts[2],accounts[1],accounts[8]],{from: accounts[9]}),'revert');
  });
  it('Should fail redeemTokens(address[]) when NOT comply with: isSetUp == true', async () => {
    let result = await truffleAssert.fails(contractFullRedemption.redeemTokens([accounts[0],accounts[5],accounts[7],accounts[4],accounts[9],accounts[5],accounts[8],accounts[4],accounts[9],accounts[9],accounts[8],accounts[5],accounts[7],accounts[8],accounts[1],accounts[5],accounts[1],accounts[7],accounts[7],accounts[1],accounts[3],accounts[2],accounts[1],accounts[7],accounts[1],accounts[4],accounts[6],accounts[4],accounts[1],accounts[2],accounts[3],accounts[5],accounts[1],accounts[7],accounts[9],accounts[7],accounts[2],accounts[8],accounts[2],accounts[0],accounts[9],accounts[1],accounts[1],accounts[0],accounts[1],accounts[6],accounts[4],accounts[8],accounts[4],accounts[9],accounts[4],accounts[2],accounts[9],accounts[6],accounts[6],accounts[1],accounts[1],accounts[4],accounts[5],accounts[7],accounts[1],accounts[2],accounts[1],accounts[8]],{from: accounts[0]}),'revert');
  });
  it('Should fail redeemTokens(address[]) when NOT comply with: _holders.length > 0', async () => {
    await contractFullRedemption.setup({from:accounts[0]});
    let result = await truffleAssert.fails(contractFullRedemption.redeemTokens([],{from: accounts[0]}),'revert');
  });
});
