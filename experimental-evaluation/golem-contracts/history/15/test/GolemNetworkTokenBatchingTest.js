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
    contractGNTAllocation = await GNTAllocation.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[5],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[1],accounts[1],(await web3.eth.getBlockNumber())+943,(await web3.eth.getBlockNumber())+943+863,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[1],accounts[1],(await web3.eth.getBlockNumber())+943,(await web3.eth.getBlockNumber())+943+863,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[7],14,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[7],14,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[8],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[9],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[9],10000,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[85,118,128,28,99,228,32,28,51,168,48,114,62,185,153,108,17,243,137,0,222,199,168,95,80,146,64,161,237,112,112,59],[200,188,199,35,194,57,169,7,173,3,216,64,35,237,224,80,73,136,84,249,12,126,19,217,121,193,120,67,15,26,99,158]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-850,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[85,118,128,28,99,228,32,28,51,168,48,114,62,185,153,108,17,243,137,0,222,199,168,95,80,146,64,161,237,112,112,59],[200,188,199,35,194,57,169,7,173,3,216,64,35,237,224,80,73,136,84,249,12,126,19,217,121,193,120,67,15,26,99,158]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[5], 20, [13,90,121,32,70,34,92,113,72,128,236,123,86,103,98,227,83,86,73,189,226,166,90,16,157,203,43,109,119,96,236,169],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 20, [13,90,121,32,70,34,92,113,72,128,236,123,86,103,98,227,83,86,73,189,226,166,90,16,157,203,43,109,119,96,236,169],{from: accounts[0]}),'revert');
  });
});
