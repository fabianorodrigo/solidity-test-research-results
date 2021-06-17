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
  
  it('Should execute recordPayments(address[],uint256[],uint256[],bytes32[]) WHEN msg.sender==_owner,_securityHolders.length>0,_securityHolders.length==_offchainPaymentHashes.length,_securityHolders.length==_paymentTimestamps.length,_securityHolders.length==_paymentValues.length', async () => {
    let result = await contractOffChainPayments.recordPayments([accounts[5],accounts[5],accounts[9],accounts[5],accounts[3]], [9999,27,3,9999,10000], [96,65,66,29,95], [[79,143,254,210,94,49,182,239,141,211,238,15,62,87,71,240,201,183,146,155,145,32,100,11,23,188,38,241,128,75,173,65],[177,192,103,81,173,192,254,77,52,112,131,175,153,129,218,144,88,28,112,83,104,6,52,149,48,14,251,248,140,22,238,159],[188,87,241,239,214,45,251,157,51,63,204,143,130,214,146,215,73,168,85,81,1,224,254,184,127,202,44,200,98,149,109,118],[181,148,161,118,243,19,201,130,21,75,46,53,134,27,125,125,11,171,109,252,93,89,44,79,250,123,193,195,166,29,53,25],[65,48,192,35,255,233,26,13,2,104,87,148,226,157,208,191,29,129,123,195,162,104,85,17,56,12,60,35,171,154,8,94]],{from: accounts[4]});
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[5],accounts[5],accounts[9],accounts[5],accounts[3]], [9999,27,3,9999,10000], [96,65,66,29,95], [[79,143,254,210,94,49,182,239,141,211,238,15,62,87,71,240,201,183,146,155,145,32,100,11,23,188,38,241,128,75,173,65],[177,192,103,81,173,192,254,77,52,112,131,175,153,129,218,144,88,28,112,83,104,6,52,149,48,14,251,248,140,22,238,159],[188,87,241,239,214,45,251,157,51,63,204,143,130,214,146,215,73,168,85,81,1,224,254,184,127,202,44,200,98,149,109,118],[181,148,161,118,243,19,201,130,21,75,46,53,134,27,125,125,11,171,109,252,93,89,44,79,250,123,193,195,166,29,53,25],[65,48,192,35,255,233,26,13,2,104,87,148,226,157,208,191,29,129,123,195,162,104,85,17,56,12,60,35,171,154,8,94]],{from: accounts[9]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length > 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([], [9999,27,3,9999,10000], [96,65,66,29,95], [[79,143,254,210,94,49,182,239,141,211,238,15,62,87,71,240,201,183,146,155,145,32,100,11,23,188,38,241,128,75,173,65],[177,192,103,81,173,192,254,77,52,112,131,175,153,129,218,144,88,28,112,83,104,6,52,149,48,14,251,248,140,22,238,159],[188,87,241,239,214,45,251,157,51,63,204,143,130,214,146,215,73,168,85,81,1,224,254,184,127,202,44,200,98,149,109,118],[181,148,161,118,243,19,201,130,21,75,46,53,134,27,125,125,11,171,109,252,93,89,44,79,250,123,193,195,166,29,53,25],[65,48,192,35,255,233,26,13,2,104,87,148,226,157,208,191,29,129,123,195,162,104,85,17,56,12,60,35,171,154,8,94]],{from: accounts[4]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _offchainPaymentHashes.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[4],accounts[6],accounts[8],accounts[7],accounts[8],accounts[7]], [9999,27,3,9999,10000], [96,65,66,29,95], [[79,143,254,210,94,49,182,239,141,211,238,15,62,87,71,240,201,183,146,155,145,32,100,11,23,188,38,241,128,75,173,65],[177,192,103,81,173,192,254,77,52,112,131,175,153,129,218,144,88,28,112,83,104,6,52,149,48,14,251,248,140,22,238,159],[188,87,241,239,214,45,251,157,51,63,204,143,130,214,146,215,73,168,85,81,1,224,254,184,127,202,44,200,98,149,109,118],[181,148,161,118,243,19,201,130,21,75,46,53,134,27,125,125,11,171,109,252,93,89,44,79,250,123,193,195,166,29,53,25],[65,48,192,35,255,233,26,13,2,104,87,148,226,157,208,191,29,129,123,195,162,104,85,17,56,12,60,35,171,154,8,94]],{from: accounts[4]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentTimestamps.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[6],accounts[3],accounts[2],accounts[8],accounts[0],accounts[7]], [9999,27,3,9999,10000], [96,65,66,29,95], [[79,143,254,210,94,49,182,239,141,211,238,15,62,87,71,240,201,183,146,155,145,32,100,11,23,188,38,241,128,75,173,65],[177,192,103,81,173,192,254,77,52,112,131,175,153,129,218,144,88,28,112,83,104,6,52,149,48,14,251,248,140,22,238,159],[188,87,241,239,214,45,251,157,51,63,204,143,130,214,146,215,73,168,85,81,1,224,254,184,127,202,44,200,98,149,109,118],[181,148,161,118,243,19,201,130,21,75,46,53,134,27,125,125,11,171,109,252,93,89,44,79,250,123,193,195,166,29,53,25],[65,48,192,35,255,233,26,13,2,104,87,148,226,157,208,191,29,129,123,195,162,104,85,17,56,12,60,35,171,154,8,94]],{from: accounts[4]}),'revert');
  });
  it('Should fail recordPayments(address[],uint256[],uint256[],bytes32[]) when NOT comply with: _securityHolders.length == _paymentValues.length', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.recordPayments([accounts[6],accounts[4],accounts[6],accounts[1],accounts[1],accounts[6]], [9999,27,3,9999,10000], [96,65,66,29,95], [[79,143,254,210,94,49,182,239,141,211,238,15,62,87,71,240,201,183,146,155,145,32,100,11,23,188,38,241,128,75,173,65],[177,192,103,81,173,192,254,77,52,112,131,175,153,129,218,144,88,28,112,83,104,6,52,149,48,14,251,248,140,22,238,159],[188,87,241,239,214,45,251,157,51,63,204,143,130,214,146,215,73,168,85,81,1,224,254,184,127,202,44,200,98,149,109,118],[181,148,161,118,243,19,201,130,21,75,46,53,134,27,125,125,11,171,109,252,93,89,44,79,250,123,193,195,166,29,53,25],[65,48,192,35,255,233,26,13,2,104,87,148,226,157,208,191,29,129,123,195,162,104,85,17,56,12,60,35,171,154,8,94]],{from: accounts[4]}),'revert');
  });
  it('Should execute lookUpPaymentIndex(address,bytes32) WHEN _securityHolder!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractOffChainPayments.lookUpPaymentIndex(accounts[2], [41,49,52,193,32,138,38,166,4,12,70,129,98,130,52,200,48,66,162,153,209,44,197,147,15,130,169,230,133,40,153,37],{from: accounts[0]});
  });
  it('Should fail lookUpPaymentIndex(address,bytes32) when NOT comply with: _securityHolder != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.lookUpPaymentIndex("0x0000000000000000000000000000000000000000", [41,49,52,193,32,138,38,166,4,12,70,129,98,130,52,200,48,66,162,153,209,44,197,147,15,130,169,230,133,40,153,37],{from: accounts[0]}),'revert');
  });
  it('Should execute challengePayment(uint256,uint256)', async () => {
    let result = await contractOffChainPayments.challengePayment(2014223715, 1,{from: accounts[0]});
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue==_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[0], 1, [135,242,88,69,253,123,154,109,96,201,20,17,146,90,106,17,124,215,220,70,217,103,165,67,219,235,198,165,132,105,65,186], 65,{from: accounts[4]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[0], 1, [135,242,88,69,253,123,154,109,96,201,20,17,146,90,106,17,124,215,220,70,217,103,165,67,219,235,198,165,132,105,65,186], 65,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[0], -1, [135,242,88,69,253,123,154,109,96,201,20,17,146,90,106,17,124,215,220,70,217,103,165,67,219,235,198,165,132,105,65,186], 65,{from: accounts[4]}),'revert');
  });
  it('Should execute resolveChallenge(address,uint256,bytes32,uint256) WHEN currentValue!=_newValue,msg.sender==_owner,_index>=0', async () => {
    let result = await contractOffChainPayments.resolveChallenge(accounts[9], 6, [184,224,71,163,155,219,195,119,119,195,83,117,206,239,129,149,3,18,163,119,67,20,138,165,41,108,148,85,249,192,198,103], 2014223716,{from: accounts[4]});
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[9], 6, [184,224,71,163,155,219,195,119,119,195,83,117,206,239,129,149,3,18,163,119,67,20,138,165,41,108,148,85,249,192,198,103], 2014223716,{from: accounts[9]}),'revert');
  });
  it('Should fail resolveChallenge(address,uint256,bytes32,uint256) when NOT comply with: _index >= 0', async () => {
    let result = await truffleAssert.fails(contractOffChainPayments.resolveChallenge(accounts[9], -1, [184,224,71,163,155,219,195,119,119,195,83,117,206,239,129,149,3,18,163,119,67,20,138,165,41,108,148,85,249,192,198,103], 2014223716,{from: accounts[4]}),'revert');
  });
});
