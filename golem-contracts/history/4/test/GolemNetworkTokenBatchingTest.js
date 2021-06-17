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
    contractGNTAllocation = await GNTAllocation.new(accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[6],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[1],accounts[1],(await web3.eth.getBlockNumber())+709,(await web3.eth.getBlockNumber())+709+166,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[1],accounts[1],(await web3.eth.getBlockNumber())+709,(await web3.eth.getBlockNumber())+709+166,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[9],5,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[9],5,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBurnableToken.address,accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBurnableToken.address,accounts[1],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[3],accounts[6],19,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[3],accounts[6],19,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[38,176,25,5,243,242,140,230,233,89,249,65,197,70,172,148,155,104,37,122,20,217,198,39,43,175,110,106,51,53,73,238],[203,165,41,21,63,150,2,1,251,27,92,163,235,13,124,242,205,162,59,242,63,168,129,17,230,9,42,180,155,42,55,42],[243,143,60,195,140,97,204,33,29,141,201,140,234,206,36,180,25,3,151,210,230,8,25,185,66,115,55,38,241,125,118,19],[78,193,71,101,211,126,63,185,39,152,200,62,225,119,17,39,123,148,20,51,26,124,223,60,93,2,51,238,182,77,235,110],[57,192,82,228,217,187,39,175,52,216,137,133,33,180,94,138,199,112,9,214,194,247,130,166,127,179,35,66,75,79,171,161],[138,114,47,170,180,73,127,128,112,157,232,177,170,156,77,93,67,208,36,236,131,127,34,233,7,175,75,124,159,102,113,136],[230,40,234,28,93,164,166,33,29,234,239,2,50,20,108,243,84,138,153,195,79,211,53,169,51,47,37,249,167,228,136,226]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-386,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[38,176,25,5,243,242,140,230,233,89,249,65,197,70,172,148,155,104,37,122,20,217,198,39,43,175,110,106,51,53,73,238],[203,165,41,21,63,150,2,1,251,27,92,163,235,13,124,242,205,162,59,242,63,168,129,17,230,9,42,180,155,42,55,42],[243,143,60,195,140,97,204,33,29,141,201,140,234,206,36,180,25,3,151,210,230,8,25,185,66,115,55,38,241,125,118,19],[78,193,71,101,211,126,63,185,39,152,200,62,225,119,17,39,123,148,20,51,26,124,223,60,93,2,51,238,182,77,235,110],[57,192,82,228,217,187,39,175,52,216,137,133,33,180,94,138,199,112,9,214,194,247,130,166,127,179,35,66,75,79,171,161],[138,114,47,170,180,73,127,128,112,157,232,177,170,156,77,93,67,208,36,236,131,127,34,233,7,175,75,124,159,102,113,136],[230,40,234,28,93,164,166,33,29,234,239,2,50,20,108,243,84,138,153,195,79,211,53,169,51,47,37,249,167,228,136,226]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[1], 82, [148,200,238,76,84,83,123,45,153,77,225,93,89,140,145,70,28,210,42,146,51,5,96,245,81,231,126,65,88,32,173,91],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 82, [148,200,238,76,84,83,123,45,153,77,225,93,89,140,145,70,28,210,42,146,51,5,96,245,81,231,126,65,88,32,173,91],{from: accounts[0]}),'revert');
  });
});
