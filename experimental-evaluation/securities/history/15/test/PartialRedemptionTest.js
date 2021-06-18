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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[4],28,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[4],28,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[4],255,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[4],255,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[1],{from:accounts[8]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[1],{from:accounts[8]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[3],1532892063,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[3],1532892063,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[5],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[5],{from:accounts[1]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(29,contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[0],65,1338,{from:accounts[5]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(29,contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[0],65,1338,{from:accounts[5]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[9],29,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableToken.address,accounts[9],29,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+205,{from:accounts[8]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[3],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+205,{from:accounts[8]}');
  });
  
  it('Should execute redeemTokens(address[],uint256[]) WHEN msg.sender==_owner,_holders.length==_numberOfTokens.length,_holders.length>0', async () => {
    let result = await contractPartialRedemption.redeemTokens([accounts[7],accounts[7],accounts[9],accounts[1],accounts[4],accounts[0],accounts[3],accounts[4],accounts[8],accounts[1],accounts[6],accounts[5],accounts[2],accounts[8],accounts[9],accounts[8],accounts[4],accounts[1],accounts[5],accounts[2],accounts[8],accounts[2],accounts[4],accounts[4],accounts[3],accounts[4],accounts[3],accounts[5],accounts[0],accounts[6],accounts[6],accounts[2],accounts[3],accounts[8],accounts[2],accounts[3],accounts[0],accounts[5],accounts[2],accounts[8],accounts[7],accounts[0],accounts[4],accounts[6],accounts[5],accounts[3],accounts[0],accounts[2],accounts[2],accounts[6],accounts[1],accounts[2],accounts[1],accounts[2],accounts[5],accounts[0],accounts[2],accounts[3],accounts[1],accounts[4],accounts[7],accounts[5],accounts[5],accounts[7],accounts[2],accounts[2],accounts[6],accounts[6],accounts[2],accounts[5],accounts[3],accounts[6],accounts[4],accounts[2],accounts[5],accounts[3],accounts[3],accounts[0],accounts[5],accounts[0],accounts[9],accounts[6],accounts[9],accounts[9],accounts[3],accounts[0],accounts[5],accounts[1],accounts[6],accounts[7],accounts[9],accounts[9],accounts[4],accounts[6],accounts[1],accounts[2],accounts[3]], [27,10000,2,2,29,29,254,2014223715,9999,66,64,9999,2,3,10000,5,27,27,2014223714,257,26,65,10001,254,28,5,65,5,10000,255,1532892062,2014223715,28,3,1336,29,6,1532892063,1532892063,0,1336,66,3,65,66,257,4,1336,254,96,27,26,2014223715,66,2014223716,1337,257,254,1337,64,26,28,5,28,65,29,1338,5,5,1337,2014223714,1337,28,1532892063,257,2014223715,29,255,5,2014223715,2014223714,29,1532892063,10001,9999,29,3,2,29,4,97,256,65,1532892062,3,96,2],{from: accounts[0]});
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[7],accounts[7],accounts[9],accounts[1],accounts[4],accounts[0],accounts[3],accounts[4],accounts[8],accounts[1],accounts[6],accounts[5],accounts[2],accounts[8],accounts[9],accounts[8],accounts[4],accounts[1],accounts[5],accounts[2],accounts[8],accounts[2],accounts[4],accounts[4],accounts[3],accounts[4],accounts[3],accounts[5],accounts[0],accounts[6],accounts[6],accounts[2],accounts[3],accounts[8],accounts[2],accounts[3],accounts[0],accounts[5],accounts[2],accounts[8],accounts[7],accounts[0],accounts[4],accounts[6],accounts[5],accounts[3],accounts[0],accounts[2],accounts[2],accounts[6],accounts[1],accounts[2],accounts[1],accounts[2],accounts[5],accounts[0],accounts[2],accounts[3],accounts[1],accounts[4],accounts[7],accounts[5],accounts[5],accounts[7],accounts[2],accounts[2],accounts[6],accounts[6],accounts[2],accounts[5],accounts[3],accounts[6],accounts[4],accounts[2],accounts[5],accounts[3],accounts[3],accounts[0],accounts[5],accounts[0],accounts[9],accounts[6],accounts[9],accounts[9],accounts[3],accounts[0],accounts[5],accounts[1],accounts[6],accounts[7],accounts[9],accounts[9],accounts[4],accounts[6],accounts[1],accounts[2],accounts[3]], [27,10000,2,2,29,29,254,2014223715,9999,66,64,9999,2,3,10000,5,27,27,2014223714,257,26,65,10001,254,28,5,65,5,10000,255,1532892062,2014223715,28,3,1336,29,6,1532892063,1532892063,0,1336,66,3,65,66,257,4,1336,254,96,27,26,2014223715,66,2014223716,1337,257,254,1337,64,26,28,5,28,65,29,1338,5,5,1337,2014223714,1337,28,1532892063,257,2014223715,29,255,5,2014223715,2014223714,29,1532892063,10001,9999,29,3,2,29,4,97,256,65,1532892062,3,96,2],{from: accounts[9]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length == _numberOfTokens.length', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[9],accounts[9],accounts[7],accounts[6],accounts[0],accounts[9],accounts[0],accounts[3],accounts[9],accounts[6],accounts[0],accounts[8],accounts[6],accounts[9],accounts[7],accounts[4],accounts[0],accounts[1],accounts[8],accounts[8],accounts[0],accounts[2],accounts[9],accounts[8],accounts[2],accounts[1],accounts[1],accounts[7],accounts[9],accounts[8],accounts[5],accounts[2],accounts[0],accounts[7],accounts[1],accounts[0],accounts[2],accounts[2],accounts[0],accounts[2],accounts[2],accounts[2],accounts[5],accounts[3],accounts[6],accounts[8],accounts[2],accounts[1],accounts[0],accounts[1],accounts[9],accounts[7],accounts[2],accounts[8],accounts[8],accounts[7],accounts[6],accounts[9],accounts[8],accounts[5],accounts[2],accounts[4],accounts[5],accounts[5],accounts[4],accounts[6],accounts[6],accounts[3],accounts[2],accounts[1],accounts[2],accounts[5],accounts[7],accounts[7],accounts[0],accounts[3],accounts[3],accounts[5],accounts[0],accounts[4],accounts[1],accounts[2],accounts[7],accounts[2],accounts[8],accounts[5],accounts[2],accounts[4],accounts[2],accounts[5],accounts[5],accounts[6],accounts[4],accounts[6],accounts[4],accounts[8],accounts[4],accounts[0]], [27,10000,2,2,29,29,254,2014223715,9999,66,64,9999,2,3,10000,5,27,27,2014223714,257,26,65,10001,254,28,5,65,5,10000,255,1532892062,2014223715,28,3,1336,29,6,1532892063,1532892063,0,1336,66,3,65,66,257,4,1336,254,96,27,26,2014223715,66,2014223716,1337,257,254,1337,64,26,28,5,28,65,29,1338,5,5,1337,2014223714,1337,28,1532892063,257,2014223715,29,255,5,2014223715,2014223714,29,1532892063,10001,9999,29,3,2,29,4,97,256,65,1532892062,3,96,2],{from: accounts[0]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length > 0', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([], [27,10000,2,2,29,29,254,2014223715,9999,66,64,9999,2,3,10000,5,27,27,2014223714,257,26,65,10001,254,28,5,65,5,10000,255,1532892062,2014223715,28,3,1336,29,6,1532892063,1532892063,0,1336,66,3,65,66,257,4,1336,254,96,27,26,2014223715,66,2014223716,1337,257,254,1337,64,26,28,5,28,65,29,1338,5,5,1337,2014223714,1337,28,1532892063,257,2014223715,29,255,5,2014223715,2014223714,29,1532892063,10001,9999,29,3,2,29,4,97,256,65,1532892062,3,96,2],{from: accounts[0]}),'revert');
  });
});
