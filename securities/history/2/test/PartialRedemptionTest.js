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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[4],66,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[4],66,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[1],26,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[1],26,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[1],{from:accounts[4]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[1],{from:accounts[4]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[7],254,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[7],254,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[9],{from:accounts[6]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[9],{from:accounts[6]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[2],3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[2],3,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+76,{from:accounts[8]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[4],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+76,{from:accounts[8]}');
  });
  
  it('Should execute redeemTokens(address[],uint256[]) WHEN msg.sender==_owner,_holders.length==_numberOfTokens.length,_holders.length>0', async () => {
    let result = await contractPartialRedemption.redeemTokens([accounts[6],accounts[5],accounts[0],accounts[5],accounts[5],accounts[3],accounts[7],accounts[8],accounts[1],accounts[6],accounts[1],accounts[5],accounts[0],accounts[6],accounts[4],accounts[6],accounts[6],accounts[8],accounts[0],accounts[9],accounts[3],accounts[2],accounts[3],accounts[0],accounts[4],accounts[8],accounts[9],accounts[6],accounts[9],accounts[7],accounts[9],accounts[1],accounts[7],accounts[4],accounts[3],accounts[2],accounts[9],accounts[2],accounts[5],accounts[2],accounts[8],accounts[1],accounts[8],accounts[3],accounts[8],accounts[5],accounts[0],accounts[2],accounts[4],accounts[2],accounts[7],accounts[3],accounts[8],accounts[0],accounts[5],accounts[7],accounts[2],accounts[1],accounts[1],accounts[9],accounts[8],accounts[5],accounts[5],accounts[0],accounts[9],accounts[2],accounts[6],accounts[9],accounts[2],accounts[4],accounts[3],accounts[8],accounts[2],accounts[4],accounts[6],accounts[5],accounts[3],accounts[5],accounts[7],accounts[1],accounts[8],accounts[7],accounts[6],accounts[8],accounts[4],accounts[2],accounts[1],accounts[5],accounts[0],accounts[8],accounts[8],accounts[7],accounts[5],accounts[4],accounts[5],accounts[6],accounts[1]], [2014223715,1532892064,10001,0,10000,1532892062,257,65,10000,27,6,29,64,1336,257,256,254,6,26,64,2014223714,28,1532892064,65,1337,64,0,1337,10001,254,3,65,1532892064,5,97,2014223715,254,255,95,26,6,1337,1532892064,96,1532892063,1338,255,254,97,1532892064,1532892063,5,2,10000,2,29,64,2014223716,10001,1532892064,6,96,29,66,2,96,66,10000,1532892063,28,1336,2014223715,97,4,66,1337,64,1,1338,1532892064,256,1,1532892063,28,3,2014223714,1337,5,26,2014223715,6,5,5,29,257,29,3],{from: accounts[0]});
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[6],accounts[5],accounts[0],accounts[5],accounts[5],accounts[3],accounts[7],accounts[8],accounts[1],accounts[6],accounts[1],accounts[5],accounts[0],accounts[6],accounts[4],accounts[6],accounts[6],accounts[8],accounts[0],accounts[9],accounts[3],accounts[2],accounts[3],accounts[0],accounts[4],accounts[8],accounts[9],accounts[6],accounts[9],accounts[7],accounts[9],accounts[1],accounts[7],accounts[4],accounts[3],accounts[2],accounts[9],accounts[2],accounts[5],accounts[2],accounts[8],accounts[1],accounts[8],accounts[3],accounts[8],accounts[5],accounts[0],accounts[2],accounts[4],accounts[2],accounts[7],accounts[3],accounts[8],accounts[0],accounts[5],accounts[7],accounts[2],accounts[1],accounts[1],accounts[9],accounts[8],accounts[5],accounts[5],accounts[0],accounts[9],accounts[2],accounts[6],accounts[9],accounts[2],accounts[4],accounts[3],accounts[8],accounts[2],accounts[4],accounts[6],accounts[5],accounts[3],accounts[5],accounts[7],accounts[1],accounts[8],accounts[7],accounts[6],accounts[8],accounts[4],accounts[2],accounts[1],accounts[5],accounts[0],accounts[8],accounts[8],accounts[7],accounts[5],accounts[4],accounts[5],accounts[6],accounts[1]], [2014223715,1532892064,10001,0,10000,1532892062,257,65,10000,27,6,29,64,1336,257,256,254,6,26,64,2014223714,28,1532892064,65,1337,64,0,1337,10001,254,3,65,1532892064,5,97,2014223715,254,255,95,26,6,1337,1532892064,96,1532892063,1338,255,254,97,1532892064,1532892063,5,2,10000,2,29,64,2014223716,10001,1532892064,6,96,29,66,2,96,66,10000,1532892063,28,1336,2014223715,97,4,66,1337,64,1,1338,1532892064,256,1,1532892063,28,3,2014223714,1337,5,26,2014223715,6,5,5,29,257,29,3],{from: accounts[9]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length == _numberOfTokens.length', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[1],accounts[7],accounts[1],accounts[0],accounts[1],accounts[4],accounts[7],accounts[1],accounts[0],accounts[8],accounts[4],accounts[2],accounts[2],accounts[0],accounts[8],accounts[9],accounts[7],accounts[7],accounts[0],accounts[6],accounts[9],accounts[1],accounts[1],accounts[2],accounts[7],accounts[3],accounts[8],accounts[3],accounts[3],accounts[1],accounts[2],accounts[5],accounts[3],accounts[7],accounts[1],accounts[6],accounts[4],accounts[5],accounts[1],accounts[7],accounts[2],accounts[4],accounts[9],accounts[1],accounts[6],accounts[8],accounts[9],accounts[4],accounts[8],accounts[1],accounts[7],accounts[9],accounts[2],accounts[9],accounts[0],accounts[8],accounts[3],accounts[8],accounts[4],accounts[9],accounts[9],accounts[1],accounts[8],accounts[4],accounts[6],accounts[7],accounts[7],accounts[2],accounts[1],accounts[7],accounts[6],accounts[0],accounts[6],accounts[4],accounts[0],accounts[3],accounts[5],accounts[1],accounts[0],accounts[9],accounts[0],accounts[3],accounts[2],accounts[8],accounts[7],accounts[9],accounts[7],accounts[7],accounts[4],accounts[8],accounts[6],accounts[9],accounts[9],accounts[2],accounts[9],accounts[5],accounts[2],accounts[3]], [2014223715,1532892064,10001,0,10000,1532892062,257,65,10000,27,6,29,64,1336,257,256,254,6,26,64,2014223714,28,1532892064,65,1337,64,0,1337,10001,254,3,65,1532892064,5,97,2014223715,254,255,95,26,6,1337,1532892064,96,1532892063,1338,255,254,97,1532892064,1532892063,5,2,10000,2,29,64,2014223716,10001,1532892064,6,96,29,66,2,96,66,10000,1532892063,28,1336,2014223715,97,4,66,1337,64,1,1338,1532892064,256,1,1532892063,28,3,2014223714,1337,5,26,2014223715,6,5,5,29,257,29,3],{from: accounts[0]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length > 0', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([], [2014223715,1532892064,10001,0,10000,1532892062,257,65,10000,27,6,29,64,1336,257,256,254,6,26,64,2014223714,28,1532892064,65,1337,64,0,1337,10001,254,3,65,1532892064,5,97,2014223715,254,255,95,26,6,1337,1532892064,96,1532892063,1338,255,254,97,1532892064,1532892063,5,2,10000,2,29,64,2014223716,10001,1532892064,6,96,29,66,2,96,66,10000,1532892063,28,1336,2014223715,97,4,66,1337,64,1,1338,1532892064,256,1,1532892063,28,3,2014223714,1337,5,26,2014223715,6,5,5,29,257,29,3],{from: accounts[0]}),'revert');
  });
});
