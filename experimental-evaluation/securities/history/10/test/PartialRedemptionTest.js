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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[1],27,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[1],27,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[6],26,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[6],26,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[4],{from:accounts[3]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[4],{from:accounts[3]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[3],2014223714,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[3],2014223714,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],{from:accounts[1]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[5],{from:accounts[1]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(27,contractRedeemableToken.address,contractRedeemableTokenMock.address,contractECDSA.address,4,1,{from:accounts[9]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(27,contractRedeemableToken.address,contractRedeemableTokenMock.address,contractECDSA.address,4,1,{from:accounts[9]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[3],9999,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractRedeemableToken.address,contractRedeemableTokenMock.address,accounts[3],9999,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+864,{from:accounts[5]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableToken.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+864,{from:accounts[5]}');
  });
  
  it('Should execute redeemTokens(address[],uint256[]) WHEN msg.sender==_owner,_holders.length==_numberOfTokens.length,_holders.length>0', async () => {
    let result = await contractPartialRedemption.redeemTokens([accounts[8],accounts[6],accounts[8],accounts[0]], [28,9999,95,1532892063],{from: accounts[0]});
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[8],accounts[6],accounts[8],accounts[0]], [28,9999,95,1532892063],{from: accounts[9]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length == _numberOfTokens.length', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([accounts[6],accounts[3],accounts[1],accounts[3],accounts[8]], [28,9999,95,1532892063],{from: accounts[0]}),'revert');
  });
  it('Should fail redeemTokens(address[],uint256[]) when NOT comply with: _holders.length > 0', async () => {
    let result = await truffleAssert.fails(contractPartialRedemption.redeemTokens([], [28,9999,95,1532892063],{from: accounts[0]}),'revert');
  });
});
