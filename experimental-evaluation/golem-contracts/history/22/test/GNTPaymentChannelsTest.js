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
  let contractGolemNetworkTokenBatching = null;
  let contractTokenProxy = null;
  let contractGate = null;
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
    contractGNTAllocation = await GNTAllocation.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[0],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[6],accounts[3],(await web3.eth.getBlockNumber())+482,(await web3.eth.getBlockNumber())+482+448,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[6],accounts[3],(await web3.eth.getBlockNumber())+482,(await web3.eth.getBlockNumber())+482+448,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[9],20,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[9],20,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBurnableToken.address,accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBurnableToken.address,accounts[0],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[4],81,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[4],81,{from:accounts[0]}');
  });
  
  it('Should execute getDeposited(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getDeposited(accounts[7], accounts[2],{from: accounts[0]});
  });
  it('Should execute getWithdrawn(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getWithdrawn(accounts[7], accounts[9],{from: accounts[0]});
  });
  it('Should execute isLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isLocked(accounts[5], accounts[2],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isTimeLocked(accounts[2], accounts[5],{from: accounts[0]});
  });
  it('Should execute isValidSig(address,address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.isValidSig(accounts[8], accounts[5], 99, 99, [29,247,54,102,188,246,116,230,51,16,154,248,229,159,40,82,42,101,26,180,221,90,66,182,6,6,212,93,160,50,77,103], [198,231,37,95,74,55,189,106,185,59,147,12,80,244,171,236,167,88,211,236,142,226,115,248,89,152,138,214,113,142,24,219],{from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN _data.length==20', async () => {
    let result = await contractGNTPaymentChannels.onTokenReceived(accounts[0], 10, [202,59,104,114,245,65,227,122,100,57,195,24,153,209,120,132,219,176,204,179],{from: accounts[0]});
  });
  it('Should fail onTokenReceived(address,uint256,bytes) when NOT comply with: _data.length == 20', async () => {
    let result = await truffleAssert.fails(contractGNTPaymentChannels.onTokenReceived(accounts[0], 10, [24,206,74,204,195,211,0,88,234,75,165,226,184,248,238,46,98,189,249,73,79],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw(address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.withdraw(accounts[7], 11, 2, [155,32,30,185,246,32,153,111,173,237,74,109,192,7,245,100,187,19,145,51,47,73,152,115,113,110,32,98,23,139,248,157], [75,204,222,44,205,103,63,231,117,43,21,175,63,106,146,195,183,54,13,55,29,29,48,244,188,146,225,242,103,72,197,122],{from: accounts[0]});
  });
  it('Should execute unlock(address)', async () => {
    let result = await contractGNTPaymentChannels.unlock(accounts[9],{from: accounts[0]});
  });
  it('Should execute close(address)', async () => {
    let result = await contractGNTPaymentChannels.close(accounts[6],{from: accounts[0]});
  });
});
