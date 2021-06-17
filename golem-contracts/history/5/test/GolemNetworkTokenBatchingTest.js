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
    contractGNTAllocation = await GNTAllocation.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[1],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[2],accounts[7],(await web3.eth.getBlockNumber())+90,(await web3.eth.getBlockNumber())+90+745,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[2],accounts[7],(await web3.eth.getBlockNumber())+90,(await web3.eth.getBlockNumber())+90+745,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],83,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],83,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[1],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[5],accounts[4],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[5],accounts[4],10000,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[238,122,23,134,225,105,146,60,157,214,23,30,74,160,55,120,210,47,167,187,134,199,246,215,111,219,240,15,52,26,142,118],[178,48,155,132,208,207,247,210,94,12,214,69,249,128,148,137,103,138,79,163,164,129,151,189,38,189,197,112,73,77,133,98],[53,83,68,72,18,96,22,255,205,48,233,137,212,216,153,61,220,53,204,140,213,66,180,152,65,98,14,148,34,136,175,77],[188,226,50,185,229,8,143,236,238,229,13,172,8,213,136,164,216,242,245,183,50,114,165,154,189,57,216,217,191,166,47,98],[91,23,184,204,109,132,35,178,105,166,176,204,160,11,2,183,215,241,240,124,58,60,150,111,145,93,175,242,25,127,139,31],[108,37,14,25,110,21,209,171,166,71,188,136,13,228,81,233,229,81,199,250,84,142,107,250,96,55,46,76,160,56,18,25],[108,184,179,54,43,98,203,144,5,217,154,121,149,116,66,243,237,109,12,167,101,37,150,48,81,191,11,113,226,230,83,11]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-231,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[238,122,23,134,225,105,146,60,157,214,23,30,74,160,55,120,210,47,167,187,134,199,246,215,111,219,240,15,52,26,142,118],[178,48,155,132,208,207,247,210,94,12,214,69,249,128,148,137,103,138,79,163,164,129,151,189,38,189,197,112,73,77,133,98],[53,83,68,72,18,96,22,255,205,48,233,137,212,216,153,61,220,53,204,140,213,66,180,152,65,98,14,148,34,136,175,77],[188,226,50,185,229,8,143,236,238,229,13,172,8,213,136,164,216,242,245,183,50,114,165,154,189,57,216,217,191,166,47,98],[91,23,184,204,109,132,35,178,105,166,176,204,160,11,2,183,215,241,240,124,58,60,150,111,145,93,175,242,25,127,139,31],[108,37,14,25,110,21,209,171,166,71,188,136,13,228,81,233,229,81,199,250,84,142,107,250,96,55,46,76,160,56,18,25],[108,184,179,54,43,98,203,144,5,217,154,121,149,116,66,243,237,109,12,167,101,37,150,48,81,191,11,113,226,230,83,11]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[8], 160, [105,225,39,239,124,194,33,215,121,154,180,177,44,89,130,245,103,16,148,235,217,47,227,37,149,120,199,254,126,97,159,48],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 160, [105,225,39,239,124,194,33,215,121,154,180,177,44,89,130,245,103,16,148,235,217,47,227,37,149,120,199,254,126,97,159,48],{from: accounts[0]}),'revert');
  });
});
