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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[4],accounts[1],(await web3.eth.getBlockNumber())+542,(await web3.eth.getBlockNumber())+542+535,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[4],accounts[1],(await web3.eth.getBlockNumber())+542,(await web3.eth.getBlockNumber())+542+535,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[1],19,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[1],19,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[5],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[2],160,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[2],160,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[125,98,6,70,11,16,3,152,175,98,200,152,253,99,181,55,126,163,9,180,233,187,74,49,8,75,107,98,143,229,145,44],[246,164,193,122,48,90,217,191,115,16,63,216,89,246,193,62,25,166,82,13,224,212,220,154,177,171,94,59,45,213,253,19],[232,123,184,159,35,153,97,255,179,75,252,49,209,234,166,217,103,84,44,86,164,126,240,185,1,31,130,48,205,42,91,40],[83,76,8,105,87,156,1,249,155,147,151,224,28,253,140,110,134,14,0,251,253,38,175,150,45,146,231,205,32,87,80,185],[233,7,27,70,33,121,222,145,76,162,170,32,8,160,154,29,9,65,81,103,83,90,176,62,154,224,218,127,110,214,188,99],[228,144,86,201,124,215,251,218,203,114,197,226,123,148,244,246,30,63,241,0,66,89,175,227,240,250,44,184,149,43,121,86],[157,211,133,229,178,119,174,41,116,221,27,109,3,29,161,171,196,4,27,103,215,215,226,132,172,64,65,240,32,175,25,141],[146,78,3,113,163,159,195,26,190,167,42,94,176,235,103,85,159,41,182,129,107,95,216,24,170,6,227,76,18,86,172,191]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-759,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[125,98,6,70,11,16,3,152,175,98,200,152,253,99,181,55,126,163,9,180,233,187,74,49,8,75,107,98,143,229,145,44],[246,164,193,122,48,90,217,191,115,16,63,216,89,246,193,62,25,166,82,13,224,212,220,154,177,171,94,59,45,213,253,19],[232,123,184,159,35,153,97,255,179,75,252,49,209,234,166,217,103,84,44,86,164,126,240,185,1,31,130,48,205,42,91,40],[83,76,8,105,87,156,1,249,155,147,151,224,28,253,140,110,134,14,0,251,253,38,175,150,45,146,231,205,32,87,80,185],[233,7,27,70,33,121,222,145,76,162,170,32,8,160,154,29,9,65,81,103,83,90,176,62,154,224,218,127,110,214,188,99],[228,144,86,201,124,215,251,218,203,114,197,226,123,148,244,246,30,63,241,0,66,89,175,227,240,250,44,184,149,43,121,86],[157,211,133,229,178,119,174,41,116,221,27,109,3,29,161,171,196,4,27,103,215,215,226,132,172,64,65,240,32,175,25,141],[146,78,3,113,163,159,195,26,190,167,42,94,176,235,103,85,159,41,182,129,107,95,216,24,170,6,227,76,18,86,172,191]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[4], 11, [53,173,84,226,212,38,190,152,207,159,68,87,157,181,238,165,24,125,138,171,63,75,150,224,181,136,136,156,114,173,60,60],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 11, [53,173,84,226,212,38,190,152,207,159,68,87,157,181,238,165,24,125,138,171,63,75,150,224,181,136,136,156,114,173,60,60],{from: accounts[0]}),'revert');
  });
});
