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

contract("PartialRedemption",(accounts)=>{
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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[0],2014223716,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[0],2014223716,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[7],27,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[7],27,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[1],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[1],{from:accounts[1]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],1532892064,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],1532892064,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[7],{from:accounts[3]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[7],{from:accounts[3]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(6,contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[6],27,28,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(6,contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[6],27,28,{from:accounts[0]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[1],1532892063,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[1],1532892063,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+653,{from:accounts[4]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableTokenMock.address,accounts[1],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+653,{from:accounts[4]}');
  });
  
  it('Should execute redeemTokens(address[],uint256[]) WHEN msg.sender==_owner,_holders.length==_numberOfTokens.length,_holders.length>0', async () => {
    let result = await contractPartialRedemption.redeemTokens([accounts[4],accounts[8],accounts[8],accounts[7],accounts[3],accounts[7],accounts[0],accounts[0],accounts[5],accounts[7],accounts[7],accounts[3],accounts[3],accounts[4],accounts[3],accounts[6],accounts[9],accounts[3],accounts[3],accounts[9],accounts[0],accounts[8],accounts[5],accounts[7],accounts[2],accounts[2],accounts[5],accounts[0],accounts[0],accounts[5],accounts[1],accounts[4],accounts[2],accounts[2],accounts[9],accounts[5],accounts[6],accounts[1],accounts[5],accounts[8],accounts[4],accounts[0],accounts[8],accounts[0],accounts[9],accounts[0],accounts[6],accounts[8],accounts[6],accounts[8],accounts[8],accounts[6],accounts[5],accounts[3],accounts[4],accounts[5],accounts[8],accounts[3],accounts[8],accounts[2],accounts[0],accounts[3],accounts[5],accounts[1],accounts[0],accounts[4],accounts[4],accounts[4],accounts[5],accounts[9],accounts[6],accounts[9],accounts[8],accounts[9],accounts[1],accounts[9],accounts[6],accounts[9],accounts[8],accounts[2],accounts[9],accounts[9],accounts[3],accounts[0],accounts[7],accounts[8],accounts[3],accounts[5],accounts[3],accounts[8],accounts[9],accounts[3],accounts[8],accounts[2],accounts[6],accounts[3]], [255,6,2,0,0,1532892064,1532892063,6,257,2014223714,64,2014223715,96,6,2,27,1338,256,1532892062,65,255,96,10000,3,2,6,64,10000,29,6,10001,4,5,66,27,3,65,1,65,27,29,95,0,2,1532892062,27,27,1338,64,64,1532892062,257,10000,2,28,1336,254,27,6,6,254,9999,1532892064,26,5,1532892062,3,10001,10001,0,6,1336,26,6,10000,66,97,1532892062,29,66,2,65,2014223714,2014223714,1336,64,27,2014223716,28,255,96,2,95,1532892062,256,1532892064],{from: accounts[0]});
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[4],accounts[8],accounts[8],accounts[7],accounts[3],accounts[7],accounts[0],accounts[0],accounts[5],accounts[7],accounts[7],accounts[3],accounts[3],accounts[4],accounts[3],accounts[6],accounts[9],accounts[3],accounts[3],accounts[9],accounts[0],accounts[8],accounts[5],accounts[7],accounts[2],accounts[2],accounts[5],accounts[0],accounts[0],accounts[5],accounts[1],accounts[4],accounts[2],accounts[2],accounts[9],accounts[5],accounts[6],accounts[1],accounts[5],accounts[8],accounts[4],accounts[0],accounts[8],accounts[0],accounts[9],accounts[0],accounts[6],accounts[8],accounts[6],accounts[8],accounts[8],accounts[6],accounts[5],accounts[3],accounts[4],accounts[5],accounts[8],accounts[3],accounts[8],accounts[2],accounts[0],accounts[3],accounts[5],accounts[1],accounts[0],accounts[4],accounts[4],accounts[4],accounts[5],accounts[9],accounts[6],accounts[9],accounts[8],accounts[9],accounts[1],accounts[9],accounts[6],accounts[9],accounts[8],accounts[2],accounts[9],accounts[9],accounts[3],accounts[0],accounts[7],accounts[8],accounts[3],accounts[5],accounts[3],accounts[8],accounts[9],accounts[3],accounts[8],accounts[2],accounts[6],accounts[3]], [255,6,2,0,0,1532892064,1532892063,6,257,2014223714,64,2014223715,96,6,2,27,1338,256,1532892062,65,255,96,10000,3,2,6,64,10000,29,6,10001,4,5,66,27,3,65,1,65,27,29,95,0,2,1532892062,27,27,1338,64,64,1532892062,257,10000,2,28,1336,254,27,6,6,254,9999,1532892064,26,5,1532892062,3,10001,10001,0,6,1336,26,6,10000,66,97,1532892062,29,66,2,65,2014223714,2014223714,1336,64,27,2014223716,28,255,96,2,95,1532892062,256,1532892064],{from: accounts[9]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length == _numberOfTokens.length', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[1],accounts[6],accounts[8],accounts[9],accounts[7],accounts[6],accounts[5],accounts[7],accounts[7],accounts[1],accounts[1],accounts[8],accounts[8],accounts[7],accounts[4],accounts[9],accounts[6],accounts[9],accounts[0],accounts[6],accounts[1],accounts[9],accounts[0],accounts[5],accounts[1],accounts[7],accounts[3],accounts[5],accounts[4],accounts[4],accounts[2],accounts[8],accounts[3],accounts[6],accounts[4],accounts[0],accounts[0],accounts[3],accounts[0],accounts[2],accounts[3],accounts[8],accounts[0],accounts[9],accounts[5],accounts[7],accounts[2],accounts[5],accounts[4],accounts[9],accounts[7],accounts[2],accounts[8],accounts[3],accounts[8],accounts[5],accounts[4],accounts[3],accounts[5],accounts[2],accounts[2],accounts[0],accounts[0],accounts[7],accounts[6],accounts[6],accounts[7],accounts[0],accounts[7],accounts[0],accounts[1],accounts[9],accounts[0],accounts[6],accounts[8],accounts[4],accounts[1],accounts[5],accounts[9],accounts[3],accounts[3],accounts[8],accounts[0],accounts[3],accounts[6],accounts[3],accounts[9],accounts[9],accounts[6],accounts[4],accounts[0],accounts[1],accounts[6],accounts[0],accounts[5],accounts[0],accounts[7]], [255,6,2,0,0,1532892064,1532892063,6,257,2014223714,64,2014223715,96,6,2,27,1338,256,1532892062,65,255,96,10000,3,2,6,64,10000,29,6,10001,4,5,66,27,3,65,1,65,27,29,95,0,2,1532892062,27,27,1338,64,64,1532892062,257,10000,2,28,1336,254,27,6,6,254,9999,1532892064,26,5,1532892062,3,10001,10001,0,6,1336,26,6,10000,66,97,1532892062,29,66,2,65,2014223714,2014223714,1336,64,27,2014223716,28,255,96,2,95,1532892062,256,1532892064],{from: accounts[0]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length > 0', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([], [255,6,2,0,0,1532892064,1532892063,6,257,2014223714,64,2014223715,96,6,2,27,1338,256,1532892062,65,255,96,10000,3,2,6,64,10000,29,6,10001,4,5,66,27,3,65,1,65,27,29,95,0,2,1532892062,27,27,1338,64,64,1532892062,257,10000,2,28,1336,254,27,6,6,254,9999,1532892064,26,5,1532892062,3,10001,10001,0,6,1336,26,6,10000,66,97,1532892062,29,66,2,65,2014223714,2014223714,1336,64,27,2014223716,28,255,96,2,95,1532892062,256,1532892064],{from: accounts[0]}),'revert');
  });
});
