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
  
  it('Should execute recordPayments(address[],uint256[],uint256[],bytes32[]) WHEN msg.sender==_owner,_securityHolders.length>0,_securityHolders.length==_offchainPaymentHashes.length,_securityHolders.length==_paymentTimestamps.length,_securityHolders.length==_paymentValues.length', async () => {
    let result = await contractOffChainPayments.recordPayments([accounts[7],accounts[5]], [6,255], [9999,95], [[102,189,181,152,45,158,183,48,243,37,245,134,201,88,106,177,167,182,218,16,110,135,225,189,120,49,162,49,97,167,208,142],[1,235,165,111,118,112,50,113,146,51,135,4,196,175,235,212,187,106,94,39,160,180,149,159,122,77,243,36,166,139,63,213]],{from: accounts[2]});
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[7],accounts[5]], [6,255], [9999,95], [[102,189,181,152,45,158,183,48,243,37,245,134,201,88,106,177,167,182,218,16,110,135,225,189,120,49,162,49,97,167,208,142],[1,235,165,111,118,112,50,113,146,51,135,4,196,175,235,212,187,106,94,39,160,180,149,159,122,77,243,36,166,139,63,213]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length > 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([], [6,255], [9999,95], [[102,189,181,152,45,158,183,48,243,37,245,134,201,88,106,177,167,182,218,16,110,135,225,189,120,49,162,49,97,167,208,142],[1,235,165,111,118,112,50,113,146,51,135,4,196,175,235,212,187,106,94,39,160,180,149,159,122,77,243,36,166,139,63,213]],{from: accounts[2]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _offchainPaymentHashes.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[8],accounts[5],accounts[0]], [6,255], [9999,95], [[102,189,181,152,45,158,183,48,243,37,245,134,201,88,106,177,167,182,218,16,110,135,225,189,120,49,162,49,97,167,208,142],[1,235,165,111,118,112,50,113,146,51,135,4,196,175,235,212,187,106,94,39,160,180,149,159,122,77,243,36,166,139,63,213]],{from: accounts[2]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentTimestamps.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[0],accounts[2],accounts[0]], [6,255], [9999,95], [[102,189,181,152,45,158,183,48,243,37,245,134,201,88,106,177,167,182,218,16,110,135,225,189,120,49,162,49,97,167,208,142],[1,235,165,111,118,112,50,113,146,51,135,4,196,175,235,212,187,106,94,39,160,180,149,159,122,77,243,36,166,139,63,213]],{from: accounts[2]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentValues.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[2],accounts[4],accounts[8]], [6,255], [9999,95], [[102,189,181,152,45,158,183,48,243,37,245,134,201,88,106,177,167,182,218,16,110,135,225,189,120,49,162,49,97,167,208,142],[1,235,165,111,118,112,50,113,146,51,135,4,196,175,235,212,187,106,94,39,160,180,149,159,122,77,243,36,166,139,63,213]],{from: accounts[2]}),'revert');
  });
  it('Should execute lookUpPaymentIndex(address,bytes32) WHEN _securityHolder!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractOffChainPayments.lookUpPaymentIndex(accounts[0], [125,95,225,120,53,89,106,140,6,211,55,229,20,98,110,254,12,240,202,5,135,43,112,98,48,104,53,197,79,43,255,104],{from: accounts[0]});
  });
  it('Should fail lookUpPaymentIndex(address,bytes32) when NOT comply with: _securityHolder != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.lookUpPaymentIndex("0x0000000000000000000000000000000000000000", [125,95,225,120,53,89,106,140,6,211,55,229,20,98,110,254,12,240,202,5,135,43,112,98,48,104,53,197,79,43,255,104],{from: accounts[0]}),'revert');
  });
  it('Should execute challengePayment(uint256,uint256)', async () => {
    let result = await contractOffChainPayments.challengePayment(6, 26,{from: accounts[0]});
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue==_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[2], 65, [157,182,168,104,233,6,1,144,252,56,229,27,253,137,102,181,111,110,118,249,228,31,76,178,150,20,192,125,190,89,24,169], 10000,{from: accounts[2]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[2], 65, [157,182,168,104,233,6,1,144,252,56,229,27,253,137,102,181,111,110,118,249,228,31,76,178,150,20,192,125,190,89,24,169], 10000,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[2], -1, [157,182,168,104,233,6,1,144,252,56,229,27,253,137,102,181,111,110,118,249,228,31,76,178,150,20,192,125,190,89,24,169], 10000,{from: accounts[2]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue!=_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[9], 3, [30,92,6,64,110,148,227,101,39,242,157,20,8,6,140,78,40,237,52,196,177,211,29,68,53,203,61,192,104,41,72,12], 255,{from: accounts[2]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[9], 3, [30,92,6,64,110,148,227,101,39,242,157,20,8,6,140,78,40,237,52,196,177,211,29,68,53,203,61,192,104,41,72,12], 255,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[9], -1, [30,92,6,64,110,148,227,101,39,242,157,20,8,6,140,78,40,237,52,196,177,211,29,68,53,203,61,192,104,41,72,12], 255,{from: accounts[2]}),'revert');
  });
});
