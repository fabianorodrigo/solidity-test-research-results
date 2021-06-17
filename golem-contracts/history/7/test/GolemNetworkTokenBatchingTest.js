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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[9],(await web3.eth.getBlockNumber())+234,(await web3.eth.getBlockNumber())+234+313,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[9],(await web3.eth.getBlockNumber())+234,(await web3.eth.getBlockNumber())+234+313,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[5],11,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[5],11,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractTokenProxy.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractTokenProxy.address,accounts[2],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[4],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[4],6,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[222,72,114,41,79,133,167,73,168,121,64,140,240,255,214,229,166,11,73,118,107,11,200,99,106,64,250,141,182,116,68,245],[108,39,31,10,57,215,52,6,181,10,173,202,220,39,96,196,6,175,199,134,157,231,175,1,199,167,26,207,233,23,36,137],[125,194,205,157,162,162,78,222,241,181,150,214,48,149,140,198,106,24,39,246,47,211,196,100,67,214,203,54,187,30,10,234],[175,235,210,183,28,82,152,236,92,169,232,158,10,109,113,133,173,66,77,169,126,241,233,241,165,0,156,79,219,247,180,98],[226,162,148,154,75,204,124,181,123,131,235,235,189,193,186,195,32,175,4,87,29,128,212,168,95,132,80,248,126,194,21,71],[128,13,82,38,20,78,86,82,127,24,189,194,198,199,184,211,175,50,94,6,167,78,190,157,22,183,113,97,44,120,123,65],[119,141,207,222,100,47,211,99,14,152,108,58,189,149,91,77,213,170,40,73,203,116,176,159,145,223,203,172,88,122,244,81],[68,190,30,62,225,47,114,151,167,142,182,111,148,3,238,120,66,160,51,179,66,212,95,140,244,152,101,150,47,168,32,174],[47,255,196,89,185,209,89,12,154,63,158,2,3,109,50,82,200,197,129,124,30,188,184,13,148,10,195,65,94,228,131,34]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-635,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[222,72,114,41,79,133,167,73,168,121,64,140,240,255,214,229,166,11,73,118,107,11,200,99,106,64,250,141,182,116,68,245],[108,39,31,10,57,215,52,6,181,10,173,202,220,39,96,196,6,175,199,134,157,231,175,1,199,167,26,207,233,23,36,137],[125,194,205,157,162,162,78,222,241,181,150,214,48,149,140,198,106,24,39,246,47,211,196,100,67,214,203,54,187,30,10,234],[175,235,210,183,28,82,152,236,92,169,232,158,10,109,113,133,173,66,77,169,126,241,233,241,165,0,156,79,219,247,180,98],[226,162,148,154,75,204,124,181,123,131,235,235,189,193,186,195,32,175,4,87,29,128,212,168,95,132,80,248,126,194,21,71],[128,13,82,38,20,78,86,82,127,24,189,194,198,199,184,211,175,50,94,6,167,78,190,157,22,183,113,97,44,120,123,65],[119,141,207,222,100,47,211,99,14,152,108,58,189,149,91,77,213,170,40,73,203,116,176,159,145,223,203,172,88,122,244,81],[68,190,30,62,225,47,114,151,167,142,182,111,148,3,238,120,66,160,51,179,66,212,95,140,244,152,101,150,47,168,32,174],[47,255,196,89,185,209,89,12,154,63,158,2,3,109,50,82,200,197,129,124,30,188,184,13,148,10,195,65,94,228,131,34]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[1], 159, [177,216,127,125,146,128,79,155,14,75,247,10,181,161,153,154,232,10,21,10,157,98,29,56,15,128,100,29,149,51,54,255],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 159, [177,216,127,125,146,128,79,155,14,75,247,10,181,161,153,154,232,10,21,10,157,98,29,56,15,128,100,29,149,51,54,255],{from: accounts[0]}),'revert');
  });
});
