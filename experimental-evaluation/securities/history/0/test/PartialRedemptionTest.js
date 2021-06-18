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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[5],1,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[5],1,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[9],66,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[9],66,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[4],{from:accounts[2]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[4],{from:accounts[2]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[3],2014223715,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[3],2014223715,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[6],{from:accounts[6]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractPaymentTokenMock.address,accounts[6],{from:accounts[6]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(2,contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[0],27,0,{from:accounts[5]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(2,contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[0],27,0,{from:accounts[5]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[9],10001,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[9],10001,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[0],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+194,{from:accounts[2]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[0],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+194,{from:accounts[2]}');
  });
  
  it('Should execute redeemTokens(address[],uint256[]) WHEN msg.sender==_owner,_holders.length==_numberOfTokens.length,_holders.length>0', async () => {
    let result = await contractPartialRedemption.redeemTokens([accounts[1],accounts[0],accounts[3],accounts[7],accounts[5],accounts[1],accounts[3],accounts[8],accounts[8],accounts[5],accounts[7],accounts[1],accounts[0],accounts[2],accounts[4],accounts[9],accounts[0],accounts[0],accounts[3],accounts[5],accounts[1],accounts[0],accounts[1],accounts[1],accounts[5],accounts[6],accounts[1],accounts[3],accounts[4],accounts[3],accounts[8],accounts[7],accounts[9],accounts[1],accounts[3],accounts[0],accounts[4],accounts[9],accounts[2],accounts[8],accounts[2],accounts[5],accounts[4],accounts[2],accounts[7],accounts[4],accounts[2],accounts[6],accounts[4],accounts[0],accounts[0],accounts[0],accounts[0],accounts[8],accounts[9],accounts[0],accounts[0],accounts[0],accounts[6],accounts[3],accounts[3],accounts[3],accounts[9],accounts[1]], [96,64,26,95,2014223716,3,1532892062,254,26,254,66,254,0,254,2,1336,2014223715,257,65,2,256,1532892063,2014223714,97,1337,97,65,2014223716,10001,95,1532892064,1532892062,96,95,2014223716,5,255,97,97,256,26,255,95,256,1338,2014223715,255,95,2014223716,1336,97,1338,2014223715,3,27,1532892063,1532892064,4,10000,257,10000,26,95,255],{from: accounts[0]});
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[1],accounts[0],accounts[3],accounts[7],accounts[5],accounts[1],accounts[3],accounts[8],accounts[8],accounts[5],accounts[7],accounts[1],accounts[0],accounts[2],accounts[4],accounts[9],accounts[0],accounts[0],accounts[3],accounts[5],accounts[1],accounts[0],accounts[1],accounts[1],accounts[5],accounts[6],accounts[1],accounts[3],accounts[4],accounts[3],accounts[8],accounts[7],accounts[9],accounts[1],accounts[3],accounts[0],accounts[4],accounts[9],accounts[2],accounts[8],accounts[2],accounts[5],accounts[4],accounts[2],accounts[7],accounts[4],accounts[2],accounts[6],accounts[4],accounts[0],accounts[0],accounts[0],accounts[0],accounts[8],accounts[9],accounts[0],accounts[0],accounts[0],accounts[6],accounts[3],accounts[3],accounts[3],accounts[9],accounts[1]], [96,64,26,95,2014223716,3,1532892062,254,26,254,66,254,0,254,2,1336,2014223715,257,65,2,256,1532892063,2014223714,97,1337,97,65,2014223716,10001,95,1532892064,1532892062,96,95,2014223716,5,255,97,97,256,26,255,95,256,1338,2014223715,255,95,2014223716,1336,97,1338,2014223715,3,27,1532892063,1532892064,4,10000,257,10000,26,95,255],{from: accounts[9]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length == _numberOfTokens.length', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[7],accounts[9],accounts[1],accounts[6],accounts[2],accounts[4],accounts[6],accounts[2],accounts[0],accounts[0],accounts[9],accounts[7],accounts[4],accounts[8],accounts[0],accounts[7],accounts[0],accounts[9],accounts[8],accounts[0],accounts[3],accounts[9],accounts[9],accounts[2],accounts[1],accounts[5],accounts[2],accounts[1],accounts[6],accounts[1],accounts[6],accounts[0],accounts[6],accounts[7],accounts[2],accounts[3],accounts[6],accounts[9],accounts[5],accounts[3],accounts[1],accounts[8],accounts[4],accounts[3],accounts[3],accounts[3],accounts[4],accounts[5],accounts[4],accounts[9],accounts[3],accounts[1],accounts[4],accounts[9],accounts[2],accounts[4],accounts[7],accounts[7],accounts[3],accounts[6],accounts[6],accounts[9],accounts[6],accounts[9],accounts[8]], [96,64,26,95,2014223716,3,1532892062,254,26,254,66,254,0,254,2,1336,2014223715,257,65,2,256,1532892063,2014223714,97,1337,97,65,2014223716,10001,95,1532892064,1532892062,96,95,2014223716,5,255,97,97,256,26,255,95,256,1338,2014223715,255,95,2014223716,1336,97,1338,2014223715,3,27,1532892063,1532892064,4,10000,257,10000,26,95,255],{from: accounts[0]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length > 0', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([], [96,64,26,95,2014223716,3,1532892062,254,26,254,66,254,0,254,2,1336,2014223715,257,65,2,256,1532892063,2014223714,97,1337,97,65,2014223716,10001,95,1532892064,1532892062,96,95,2014223716,5,255,97,97,256,26,255,95,256,1338,2014223715,255,95,2014223716,1336,97,1338,2014223715,3,27,1532892063,1532892064,4,10000,257,10000,26,95,255],{from: accounts[0]}),'revert');
  });
});
