const truffleAssert = require('truffle-assertions');
const Faucet = artifacts.require("Faucet");
const GNTDeposit = artifacts.require("GNTDeposit");
const GNTPaymentChannels = artifacts.require("GNTPaymentChannels");
const GNTAllocation = artifacts.require("GNTAllocation");
const GolemNetworkToken = artifacts.require("GolemNetworkToken");
const GolemNetworkTokenBatching = artifacts.require("GolemNetworkTokenBatching");
const BasicToken = artifacts.require("BasicToken");
const BurnableToken = artifacts.require("BurnableToken");
const SafeMath = artifacts.require("SafeMath");
const StandardToken = artifacts.require("StandardToken");
const Gate = artifacts.require("Gate");
const TokenProxy = artifacts.require("TokenProxy");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("GNTPaymentChannels",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractBasicToken = null;
  let contractStandardToken = null;
  let contractBurnableToken = null;
  let contractGNTAllocation = null;
  let contractGolemNetworkToken = null;
  let contractGNTPaymentChannels = null;
  let contractFaucet = null;
  let contractTokenProxy = null;
  let contractGate = null;
  let contractGolemNetworkTokenBatching = null;
  let contractGNTDeposit = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    BasicToken.link("SafeMath",contractSafeMath.address);
    contractBasicToken = await BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BasicToken.new({from: accounts[0]}');
    contractStandardToken = await StandardToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: StandardToken.new({from: accounts[0]}');
    contractBurnableToken = await BurnableToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BurnableToken.new({from: accounts[0]}');
    contractGNTAllocation = await GNTAllocation.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[1],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[1],(await web3.eth.getBlockNumber())+531,(await web3.eth.getBlockNumber())+531+594,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[1],(await web3.eth.getBlockNumber())+531,(await web3.eth.getBlockNumber())+531+594,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[9],257,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[9],257,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[5],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[8],1000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[8],1000,{from:accounts[0]}');
  });
  
  it('Should execute getDeposited(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getDeposited(accounts[5], accounts[0],{from: accounts[0]});
  });
  it('Should execute getWithdrawn(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getWithdrawn(accounts[2], accounts[4],{from: accounts[0]});
  });
  it('Should execute isLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isLocked(accounts[9], accounts[8],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isTimeLocked(accounts[9], accounts[3],{from: accounts[0]});
  });
  it('Should execute isValidSig(address,address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.isValidSig(accounts[5], accounts[1], 3, 16, [31,52,104,103,174,35,95,161,151,22,103,231,53,81,57,63,75,123,246,140,14,159,43,105,136,168,176,116,235,205,108,44], [246,178,137,119,119,5,255,160,179,172,137,39,63,36,25,45,164,17,117,3,184,138,124,160,156,116,84,52,151,179,72,154],{from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN _data.length==20', async () => {
    let result = await contractGNTPaymentChannels.onTokenReceived(accounts[2], 1001, [48,4,255,111,84,243,141,242,255,130,253,212,163,155,200,157,115,29,25,224],{from: accounts[0]});
  });
  it('Should fail onTokenReceived(address,uint256,bytes) when NOT comply with: _data.length == 20', async () => {
    let result = await truffleAssert.fails(contractGNTPaymentChannels.onTokenReceived(accounts[2], 1001, [3,72,231,7,207,1,130,99,55,71,115,38,110,162,250,232,46,42,65,202,118],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw(address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.withdraw(accounts[5], 11, 82, [89,109,131,27,142,27,63,152,36,219,107,47,234,41,49,158,173,245,54,193,114,20,34,244,194,22,242,136,227,245,54,181], [178,227,107,169,66,28,151,45,9,226,173,222,226,218,10,94,236,45,218,89,229,230,173,94,113,70,63,146,174,191,8,210],{from: accounts[0]});
  });
  it('Should execute unlock(address)', async () => {
    let result = await contractGNTPaymentChannels.unlock(accounts[6],{from: accounts[0]});
  });
  it('Should execute close(address)', async () => {
    let result = await contractGNTPaymentChannels.close(accounts[9],{from: accounts[0]});
  });
});
