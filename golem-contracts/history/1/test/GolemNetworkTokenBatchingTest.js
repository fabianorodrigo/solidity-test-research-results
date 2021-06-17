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
    contractGNTAllocation = await GNTAllocation.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[7],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[8],accounts[8],(await web3.eth.getBlockNumber())+836,(await web3.eth.getBlockNumber())+836+897,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[8],accounts[8],(await web3.eth.getBlockNumber())+836,(await web3.eth.getBlockNumber())+836+897,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[4],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[4],6,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[0],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[9],accounts[3],4,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[9],accounts[3],4,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[143,10,103,47,215,197,67,27,166,86,231,161,46,129,56,234,222,25,177,118,2,188,51,232,168,9,212,173,213,176,4,183],[30,237,157,189,47,107,164,57,34,27,161,123,20,81,51,163,23,121,117,114,86,55,151,169,127,216,12,196,91,127,64,236],[86,114,157,50,13,206,16,166,233,193,122,112,253,5,34,72,71,144,232,187,148,46,123,68,210,114,219,207,53,223,208,244],[3,47,64,85,210,172,9,49,177,107,215,28,24,253,233,254,38,254,233,159,112,213,199,61,158,8,130,160,83,212,112,94],[71,147,147,117,249,253,63,21,49,14,156,58,60,236,169,85,175,235,193,177,122,223,32,190,23,1,175,68,28,136,67,182],[252,160,21,133,244,209,166,132,218,53,155,22,160,32,169,87,29,231,233,99,55,223,104,158,3,22,11,174,129,121,199,18]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-568,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[143,10,103,47,215,197,67,27,166,86,231,161,46,129,56,234,222,25,177,118,2,188,51,232,168,9,212,173,213,176,4,183],[30,237,157,189,47,107,164,57,34,27,161,123,20,81,51,163,23,121,117,114,86,55,151,169,127,216,12,196,91,127,64,236],[86,114,157,50,13,206,16,166,233,193,122,112,253,5,34,72,71,144,232,187,148,46,123,68,210,114,219,207,53,223,208,244],[3,47,64,85,210,172,9,49,177,107,215,28,24,253,233,254,38,254,233,159,112,213,199,61,158,8,130,160,83,212,112,94],[71,147,147,117,249,253,63,21,49,14,156,58,60,236,169,85,175,235,193,177,122,223,32,190,23,1,175,68,28,136,67,182],[252,160,21,133,244,209,166,132,218,53,155,22,160,32,169,87,29,231,233,99,55,223,104,158,3,22,11,174,129,121,199,18]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[8], 159, [118,107,182,64,245,33,123,116,194,146,193,20,198,215,85,61,59,250,21,38,178,187,233,113,234,34,151,250,134,25,63,49],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 159, [118,107,182,64,245,33,123,116,194,146,193,20,198,215,85,61,59,250,21,38,178,187,233,113,234,34,151,250,134,25,63,49],{from: accounts[0]}),'revert');
  });
});
