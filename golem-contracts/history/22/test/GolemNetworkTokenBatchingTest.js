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

contract("GolemNetworkTokenBatching",(accounts)=>{
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
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[124,133,74,211,7,191,77,70,21,246,125,92,230,212,44,16,130,82,66,203,219,182,203,96,107,247,10,31,123,114,30,116],[119,200,20,219,216,131,4,13,12,182,124,250,234,241,59,76,158,53,199,127,123,18,167,8,172,116,8,101,248,184,91,53],[132,203,194,138,236,173,58,87,225,146,202,57,206,145,142,88,143,104,31,120,181,91,185,158,22,26,17,117,198,243,239,206],[155,247,50,185,240,108,140,90,211,113,188,140,214,253,10,143,94,248,17,37,95,128,20,12,94,6,246,238,151,4,76,203],[96,236,166,60,55,153,150,193,255,36,166,59,124,40,137,147,185,119,81,216,205,206,127,33,38,215,196,65,20,143,107,151],[248,6,43,128,31,199,171,52,214,140,30,193,65,128,60,56,75,169,236,55,191,81,211,202,39,186,41,209,157,190,32,232]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-10,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[124,133,74,211,7,191,77,70,21,246,125,92,230,212,44,16,130,82,66,203,219,182,203,96,107,247,10,31,123,114,30,116],[119,200,20,219,216,131,4,13,12,182,124,250,234,241,59,76,158,53,199,127,123,18,167,8,172,116,8,101,248,184,91,53],[132,203,194,138,236,173,58,87,225,146,202,57,206,145,142,88,143,104,31,120,181,91,185,158,22,26,17,117,198,243,239,206],[155,247,50,185,240,108,140,90,211,113,188,140,214,253,10,143,94,248,17,37,95,128,20,12,94,6,246,238,151,4,76,203],[96,236,166,60,55,153,150,193,255,36,166,59,124,40,137,147,185,119,81,216,205,206,127,33,38,215,196,65,20,143,107,151],[248,6,43,128,31,199,171,52,214,140,30,193,65,128,60,56,75,169,236,55,191,81,211,202,39,186,41,209,157,190,32,232]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[3], 19, [238,168,16,181,8,10,80,238,25,137,78,242,177,9,37,66,89,252,83,216,8,38,58,79,113,105,48,14,16,224,86,43],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 19, [238,168,16,181,8,10,80,238,25,137,78,242,177,9,37,66,89,252,83,216,8,38,58,79,113,105,48,14,16,224,86,43],{from: accounts[0]}),'revert');
  });
});
