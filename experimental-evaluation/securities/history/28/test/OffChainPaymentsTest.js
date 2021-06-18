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
  
  it('Should execute recordPayments(address[],uint256[],uint256[],bytes32[]) WHEN msg.sender==_owner,_securityHolders.length>0,_securityHolders.length==_offchainPaymentHashes.length,_securityHolders.length==_paymentTimestamps.length,_securityHolders.length==_paymentValues.length', async () => {
    let result = await contractOffChainPayments.recordPayments([accounts[4],accounts[0],accounts[8]], [1337,97,5], [0,2014223714,95], [[243,152,185,137,207,229,138,36,149,156,30,218,121,184,242,208,66,47,182,223,229,139,218,252,179,187,210,3,160,52,106,204],[61,10,47,141,111,215,1,120,91,195,78,246,91,133,231,178,64,126,157,62,251,75,205,35,194,167,165,87,100,208,179,85],[195,115,66,19,20,28,127,108,208,113,125,119,93,56,147,236,106,140,130,47,202,92,137,236,115,109,47,45,164,2,255,183]],{from: accounts[4]});
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[4],accounts[0],accounts[8]], [1337,97,5], [0,2014223714,95], [[243,152,185,137,207,229,138,36,149,156,30,218,121,184,242,208,66,47,182,223,229,139,218,252,179,187,210,3,160,52,106,204],[61,10,47,141,111,215,1,120,91,195,78,246,91,133,231,178,64,126,157,62,251,75,205,35,194,167,165,87,100,208,179,85],[195,115,66,19,20,28,127,108,208,113,125,119,93,56,147,236,106,140,130,47,202,92,137,236,115,109,47,45,164,2,255,183]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length > 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([], [1337,97,5], [0,2014223714,95], [[243,152,185,137,207,229,138,36,149,156,30,218,121,184,242,208,66,47,182,223,229,139,218,252,179,187,210,3,160,52,106,204],[61,10,47,141,111,215,1,120,91,195,78,246,91,133,231,178,64,126,157,62,251,75,205,35,194,167,165,87,100,208,179,85],[195,115,66,19,20,28,127,108,208,113,125,119,93,56,147,236,106,140,130,47,202,92,137,236,115,109,47,45,164,2,255,183]],{from: accounts[4]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _offchainPaymentHashes.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[6],accounts[1],accounts[0],accounts[6]], [1337,97,5], [0,2014223714,95], [[243,152,185,137,207,229,138,36,149,156,30,218,121,184,242,208,66,47,182,223,229,139,218,252,179,187,210,3,160,52,106,204],[61,10,47,141,111,215,1,120,91,195,78,246,91,133,231,178,64,126,157,62,251,75,205,35,194,167,165,87,100,208,179,85],[195,115,66,19,20,28,127,108,208,113,125,119,93,56,147,236,106,140,130,47,202,92,137,236,115,109,47,45,164,2,255,183]],{from: accounts[4]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentTimestamps.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[2],accounts[3],accounts[2],accounts[8]], [1337,97,5], [0,2014223714,95], [[243,152,185,137,207,229,138,36,149,156,30,218,121,184,242,208,66,47,182,223,229,139,218,252,179,187,210,3,160,52,106,204],[61,10,47,141,111,215,1,120,91,195,78,246,91,133,231,178,64,126,157,62,251,75,205,35,194,167,165,87,100,208,179,85],[195,115,66,19,20,28,127,108,208,113,125,119,93,56,147,236,106,140,130,47,202,92,137,236,115,109,47,45,164,2,255,183]],{from: accounts[4]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentValues.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[7],accounts[8],accounts[9],accounts[6]], [1337,97,5], [0,2014223714,95], [[243,152,185,137,207,229,138,36,149,156,30,218,121,184,242,208,66,47,182,223,229,139,218,252,179,187,210,3,160,52,106,204],[61,10,47,141,111,215,1,120,91,195,78,246,91,133,231,178,64,126,157,62,251,75,205,35,194,167,165,87,100,208,179,85],[195,115,66,19,20,28,127,108,208,113,125,119,93,56,147,236,106,140,130,47,202,92,137,236,115,109,47,45,164,2,255,183]],{from: accounts[4]}),'revert');
  });
  it('Should execute lookUpPaymentIndex(address,bytes32) WHEN _securityHolder!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractOffChainPayments.lookUpPaymentIndex(accounts[8], [186,63,192,242,96,184,84,136,217,9,187,36,133,121,125,210,148,72,192,110,142,67,208,95,196,245,29,212,67,228,106,216],{from: accounts[0]});
  });
  it('Should fail lookUpPaymentIndex(address,bytes32) when NOT comply with: _securityHolder != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.lookUpPaymentIndex("0x0000000000000000000000000000000000000000", [186,63,192,242,96,184,84,136,217,9,187,36,133,121,125,210,148,72,192,110,142,67,208,95,196,245,29,212,67,228,106,216],{from: accounts[0]}),'revert');
  });
  it('Should execute challengePayment(uint256,uint256)', async () => {
    let result = await contractOffChainPayments.challengePayment(10001, 5,{from: accounts[0]});
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue==_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[5], 256, [153,65,189,168,13,237,156,104,92,57,15,238,52,196,11,103,164,47,74,222,164,121,166,176,179,248,218,133,224,50,236,216], 28,{from: accounts[4]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[5], 256, [153,65,189,168,13,237,156,104,92,57,15,238,52,196,11,103,164,47,74,222,164,121,166,176,179,248,218,133,224,50,236,216], 28,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[5], -1, [153,65,189,168,13,237,156,104,92,57,15,238,52,196,11,103,164,47,74,222,164,121,166,176,179,248,218,133,224,50,236,216], 28,{from: accounts[4]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue!=_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[4], 257, [25,125,159,154,252,37,228,215,18,5,90,189,253,3,172,211,173,231,210,189,137,88,14,169,131,15,185,249,2,106,177,225], 10001,{from: accounts[4]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[4], 257, [25,125,159,154,252,37,228,215,18,5,90,189,253,3,172,211,173,231,210,189,137,88,14,169,131,15,185,249,2,106,177,225], 10001,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[4], -1, [25,125,159,154,252,37,228,215,18,5,90,189,253,3,172,211,173,231,210,189,137,88,14,169,131,15,185,249,2,106,177,225], 10001,{from: accounts[4]}),'revert');
  });
});
