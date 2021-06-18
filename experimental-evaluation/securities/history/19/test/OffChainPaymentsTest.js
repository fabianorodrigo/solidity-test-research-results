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
    contractPaymentTokenMock = await PaymentTokenMock.new(accounts[2],96,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PaymentTokenMock.new(accounts[2],96,{from:accounts[0]}');
    contractRedeemableTokenMock = await RedeemableTokenMock.new(accounts[5],26,{from:accounts[0]});
    if(trace) console.log('SUCESSO: RedeemableTokenMock.new(accounts[5],26,{from:accounts[0]}');
    OffChainPayments.link("SafeMath",contractSafeMath.address);
     OffChainPayments.link("ECDSA",contractECDSA.address);
    contractOffChainPayments = await OffChainPayments.new(accounts[7],{from:accounts[3]});
    if(trace) console.log('SUCESSO: OffChainPayments.new(accounts[7],{from:accounts[3]}');
    PartialRedemption.link("SafeMath",contractSafeMath.address);
    contractPartialRedemption = await PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[1],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: PartialRedemption.new(contractRedeemableToken.address,contractRedeemableToken.address,accounts[1],1337,{from:accounts[0]}');
    OnChainPayments.link("SafeMath",contractSafeMath.address);
     OnChainPayments.link("ECDSA",contractECDSA.address);
    contractOnChainPayments = await OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[4],{from:accounts[4]});
    if(trace) console.log('SUCESSO: OnChainPayments.new(contractRedeemableTokenMock.address,contractRedeemableTokenMock.address,accounts[4],{from:accounts[4]}');
    FixedPriceTender.link("Math",contractMath.address);
     FixedPriceTender.link("SafeMath",contractSafeMath.address);
    contractFixedPriceTender = await FixedPriceTender.new(254,contractRedeemableToken.address,contractPaymentTokenMock.address,accounts[0],4,3,{from:accounts[7]});
    if(trace) console.log('SUCESSO: FixedPriceTender.new(254,contractRedeemableToken.address,contractPaymentTokenMock.address,accounts[0],4,3,{from:accounts[7]}');
    FullRedemption.link("SafeMath",contractSafeMath.address);
    contractFullRedemption = await FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[5],1532892063,{from:accounts[0]});
    if(trace) console.log('SUCESSO: FullRedemption.new(contractPaymentTokenMock.address,contractRedeemableTokenMock.address,accounts[5],1532892063,{from:accounts[0]}');
    OnChainVoting.link("SafeMath",contractSafeMath.address);
    contractOnChainVoting = await OnChainVoting.new(contractRedeemableTokenMock.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+298,{from:accounts[9]});
    if(trace) console.log('SUCESSO: OnChainVoting.new(contractRedeemableTokenMock.address,accounts[2],(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+298,{from:accounts[9]}');
  });
  
  it('Should execute recordPayments(address[],uint256[],uint256[],bytes32[]) WHEN msg.sender==_owner,_securityHolders.length>0,_securityHolders.length==_offchainPaymentHashes.length,_securityHolders.length==_paymentTimestamps.length,_securityHolders.length==_paymentValues.length', async () => {
    let result = await contractOffChainPayments.recordPayments([accounts[9],accounts[2],accounts[3],accounts[0]], [26,5,29,254], [257,64,2,1], [[67,12,204,32,78,130,11,241,131,67,170,221,89,118,41,254,115,71,132,33,179,109,186,72,45,4,156,1,187,84,41,75],[55,86,210,136,212,180,216,60,211,232,231,129,246,137,55,211,198,148,196,130,115,156,203,186,122,170,254,12,70,59,171,174],[184,253,63,191,240,195,144,231,149,232,219,185,212,215,45,250,162,202,230,40,31,142,52,126,29,136,104,211,149,133,47,86],[139,196,78,242,219,205,1,254,154,184,134,119,53,123,181,250,159,73,148,185,60,166,27,10,174,172,227,244,95,148,33,58]],{from: accounts[3]});
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[9],accounts[2],accounts[3],accounts[0]], [26,5,29,254], [257,64,2,1], [[67,12,204,32,78,130,11,241,131,67,170,221,89,118,41,254,115,71,132,33,179,109,186,72,45,4,156,1,187,84,41,75],[55,86,210,136,212,180,216,60,211,232,231,129,246,137,55,211,198,148,196,130,115,156,203,186,122,170,254,12,70,59,171,174],[184,253,63,191,240,195,144,231,149,232,219,185,212,215,45,250,162,202,230,40,31,142,52,126,29,136,104,211,149,133,47,86],[139,196,78,242,219,205,1,254,154,184,134,119,53,123,181,250,159,73,148,185,60,166,27,10,174,172,227,244,95,148,33,58]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length > 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([], [26,5,29,254], [257,64,2,1], [[67,12,204,32,78,130,11,241,131,67,170,221,89,118,41,254,115,71,132,33,179,109,186,72,45,4,156,1,187,84,41,75],[55,86,210,136,212,180,216,60,211,232,231,129,246,137,55,211,198,148,196,130,115,156,203,186,122,170,254,12,70,59,171,174],[184,253,63,191,240,195,144,231,149,232,219,185,212,215,45,250,162,202,230,40,31,142,52,126,29,136,104,211,149,133,47,86],[139,196,78,242,219,205,1,254,154,184,134,119,53,123,181,250,159,73,148,185,60,166,27,10,174,172,227,244,95,148,33,58]],{from: accounts[3]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _offchainPaymentHashes.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[3],accounts[8],accounts[1],accounts[6],accounts[9]], [26,5,29,254], [257,64,2,1], [[67,12,204,32,78,130,11,241,131,67,170,221,89,118,41,254,115,71,132,33,179,109,186,72,45,4,156,1,187,84,41,75],[55,86,210,136,212,180,216,60,211,232,231,129,246,137,55,211,198,148,196,130,115,156,203,186,122,170,254,12,70,59,171,174],[184,253,63,191,240,195,144,231,149,232,219,185,212,215,45,250,162,202,230,40,31,142,52,126,29,136,104,211,149,133,47,86],[139,196,78,242,219,205,1,254,154,184,134,119,53,123,181,250,159,73,148,185,60,166,27,10,174,172,227,244,95,148,33,58]],{from: accounts[3]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentTimestamps.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[8],accounts[0],accounts[4],accounts[3],accounts[6]], [26,5,29,254], [257,64,2,1], [[67,12,204,32,78,130,11,241,131,67,170,221,89,118,41,254,115,71,132,33,179,109,186,72,45,4,156,1,187,84,41,75],[55,86,210,136,212,180,216,60,211,232,231,129,246,137,55,211,198,148,196,130,115,156,203,186,122,170,254,12,70,59,171,174],[184,253,63,191,240,195,144,231,149,232,219,185,212,215,45,250,162,202,230,40,31,142,52,126,29,136,104,211,149,133,47,86],[139,196,78,242,219,205,1,254,154,184,134,119,53,123,181,250,159,73,148,185,60,166,27,10,174,172,227,244,95,148,33,58]],{from: accounts[3]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentValues.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[4],accounts[9],accounts[6],accounts[8],accounts[0]], [26,5,29,254], [257,64,2,1], [[67,12,204,32,78,130,11,241,131,67,170,221,89,118,41,254,115,71,132,33,179,109,186,72,45,4,156,1,187,84,41,75],[55,86,210,136,212,180,216,60,211,232,231,129,246,137,55,211,198,148,196,130,115,156,203,186,122,170,254,12,70,59,171,174],[184,253,63,191,240,195,144,231,149,232,219,185,212,215,45,250,162,202,230,40,31,142,52,126,29,136,104,211,149,133,47,86],[139,196,78,242,219,205,1,254,154,184,134,119,53,123,181,250,159,73,148,185,60,166,27,10,174,172,227,244,95,148,33,58]],{from: accounts[3]}),'revert');
  });
  it('Should execute lookUpPaymentIndex(address,bytes32) WHEN _securityHolder!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractOffChainPayments.lookUpPaymentIndex(accounts[3], [34,245,148,142,218,13,65,84,103,56,232,10,63,24,232,180,91,89,44,79,228,103,127,167,83,110,177,131,0,128,101,69],{from: accounts[0]});
  });
  it('Should fail lookUpPaymentIndex(address,bytes32) when NOT comply with: _securityHolder != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.lookUpPaymentIndex("0x0000000000000000000000000000000000000000", [34,245,148,142,218,13,65,84,103,56,232,10,63,24,232,180,91,89,44,79,228,103,127,167,83,110,177,131,0,128,101,69],{from: accounts[0]}),'revert');
  });
  it('Should execute challengePayment(uint256,uint256)', async () => {
    let result = await contractOffChainPayments.challengePayment(1337, 1532892064,{from: accounts[0]});
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue==_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[6], 2014223714, [217,101,212,192,138,120,9,196,70,111,111,127,29,220,64,141,11,102,172,218,177,16,100,192,106,226,35,209,96,162,37,132], 2014223715,{from: accounts[3]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[6], 2014223714, [217,101,212,192,138,120,9,196,70,111,111,127,29,220,64,141,11,102,172,218,177,16,100,192,106,226,35,209,96,162,37,132], 2014223715,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[6], -1, [217,101,212,192,138,120,9,196,70,111,111,127,29,220,64,141,11,102,172,218,177,16,100,192,106,226,35,209,96,162,37,132], 2014223715,{from: accounts[3]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue!=_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[4], 6, [241,21,41,226,67,210,183,20,87,230,92,57,80,150,107,213,167,186,236,2,39,73,6,17,140,166,166,63,133,52,6,206], 2014223715,{from: accounts[3]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[4], 6, [241,21,41,226,67,210,183,20,87,230,92,57,80,150,107,213,167,186,236,2,39,73,6,17,140,166,166,63,133,52,6,206], 2014223715,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[4], -1, [241,21,41,226,67,210,183,20,87,230,92,57,80,150,107,213,167,186,236,2,39,73,6,17,140,166,166,63,133,52,6,206], 2014223715,{from: accounts[3]}),'revert');
  });
});
