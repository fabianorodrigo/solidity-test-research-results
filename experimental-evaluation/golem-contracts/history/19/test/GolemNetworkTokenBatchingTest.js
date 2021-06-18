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
    contractGNTAllocation = await GNTAllocation.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[4],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[0],accounts[4],(await web3.eth.getBlockNumber())+272,(await web3.eth.getBlockNumber())+272+53,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[0],accounts[4],(await web3.eth.getBlockNumber())+272,(await web3.eth.getBlockNumber())+272+53,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[2],1338,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[2],1338,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractTokenProxy.address,accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractTokenProxy.address,accounts[3],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[4],1000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[4],1000,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[113,29,153,12,37,111,171,215,71,250,139,231,32,112,68,15,180,112,133,171,49,189,183,195,52,5,158,127,17,199,133,19],[67,241,12,86,121,3,181,83,41,115,2,70,215,114,184,207,116,176,52,123,181,249,78,41,147,227,111,57,114,165,65,83]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-194,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[113,29,153,12,37,111,171,215,71,250,139,231,32,112,68,15,180,112,133,171,49,189,183,195,52,5,158,127,17,199,133,19],[67,241,12,86,121,3,181,83,41,115,2,70,215,114,184,207,116,176,52,123,181,249,78,41,147,227,111,57,114,165,65,83]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[8], 160, [186,243,101,31,213,82,202,151,122,209,63,235,148,221,15,168,5,164,28,243,60,121,129,157,39,232,252,28,121,166,226,190],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 160, [186,243,101,31,213,82,202,151,122,209,63,235,148,221,15,168,5,164,28,243,60,121,129,157,39,232,252,28,121,166,226,190],{from: accounts[0]}),'revert');
  });
});
