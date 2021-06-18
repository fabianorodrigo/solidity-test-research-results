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
    contractGNTAllocation = await GNTAllocation.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[6],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[2],accounts[1],(await web3.eth.getBlockNumber())+177,(await web3.eth.getBlockNumber())+177+94,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[2],accounts[1],(await web3.eth.getBlockNumber())+177,(await web3.eth.getBlockNumber())+177+94,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[1],21,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[1],21,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[5],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[3],5,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[3],5,{from:accounts[0]}');
  });
  
  it('Should execute getDeposited(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getDeposited(accounts[7], accounts[3],{from: accounts[0]});
  });
  it('Should execute getWithdrawn(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getWithdrawn(accounts[0], accounts[9],{from: accounts[0]});
  });
  it('Should execute isLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isLocked(accounts[4], accounts[2],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isTimeLocked(accounts[8], accounts[1],{from: accounts[0]});
  });
  it('Should execute isValidSig(address,address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.isValidSig(accounts[7], accounts[4], 101, 99, [12,90,71,28,125,141,76,149,118,255,160,99,106,128,10,51,156,189,9,32,208,118,183,90,142,116,41,234,146,217,191,127], [250,51,57,1,96,47,46,190,96,248,80,135,255,163,186,28,131,46,103,91,162,62,106,125,147,208,121,27,106,93,114,90],{from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN _data.length==20', async () => {
    let result = await contractGNTPaymentChannels.onTokenReceived(accounts[8], 83, [244,194,210,105,67,174,202,90,214,66,165,128,234,105,11,161,50,158,241,74],{from: accounts[0]});
  });
  it('Should fail onTokenReceived(address,uint256,bytes) when NOT comply with: _data.length == 20', async () => {
    let result = await truffleAssert.fails(contractGNTPaymentChannels.onTokenReceived(accounts[8], 83, [189,149,208,203,244,172,234,98,82,249,21,235,8,179,101,109,172,80,109,109,126],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw(address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.withdraw(accounts[4], 256, 160, [74,193,100,212,250,94,235,151,115,184,253,178,144,74,244,69,153,205,233,95,10,156,25,21,230,193,24,42,7,5,30,121], [214,69,12,203,193,162,17,188,46,148,125,230,161,220,156,246,235,196,130,164,33,91,163,193,81,243,111,193,91,225,240,3],{from: accounts[0]});
  });
  it('Should execute unlock(address)', async () => {
    let result = await contractGNTPaymentChannels.unlock(accounts[3],{from: accounts[0]});
  });
  it('Should execute close(address)', async () => {
    let result = await contractGNTPaymentChannels.close(accounts[2],{from: accounts[0]});
  });
});
