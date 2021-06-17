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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[7],(await web3.eth.getBlockNumber())+7,(await web3.eth.getBlockNumber())+7+876,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[7],(await web3.eth.getBlockNumber())+7,(await web3.eth.getBlockNumber())+7+876,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[1],1001,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[1],1001,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[4],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[3],82,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[3],82,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[41,21,168,229,184,67,127,142,230,62,234,240,247,211,1,26,109,14,235,185,194,199,218,86,34,7,198,75,215,60,190,110],[76,151,224,98,76,178,120,142,142,8,228,71,224,13,75,128,39,103,201,142,205,6,239,96,238,111,152,134,94,1,185,190],[197,122,3,99,25,15,73,201,92,61,128,250,37,169,114,181,6,29,83,143,116,174,139,49,233,64,87,72,148,205,110,214],[239,171,19,246,187,118,106,6,166,77,117,40,174,198,242,182,231,140,219,129,191,134,2,147,24,227,54,202,212,150,89,7],[117,8,206,131,137,185,94,200,63,168,160,245,223,132,141,5,25,49,159,127,136,169,235,124,74,50,176,190,102,230,118,245],[162,149,147,80,169,193,230,231,5,243,5,11,211,140,237,217,101,101,184,78,142,5,144,201,78,103,80,29,24,153,84,85],[211,132,181,82,255,109,205,111,8,124,183,33,130,102,153,157,178,197,78,91,201,155,34,222,216,225,98,253,215,191,165,163],[215,69,148,252,253,232,121,142,242,71,141,68,99,164,197,19,106,198,71,205,47,220,163,121,16,49,223,244,177,165,44,44],[252,18,12,19,188,141,67,24,137,243,254,198,107,101,254,119,7,123,128,171,178,191,136,169,68,145,19,153,9,100,25,60],[59,74,213,218,10,25,220,92,51,173,7,130,96,202,131,110,71,31,138,79,194,252,219,220,46,64,13,127,8,231,147,245]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-434,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[41,21,168,229,184,67,127,142,230,62,234,240,247,211,1,26,109,14,235,185,194,199,218,86,34,7,198,75,215,60,190,110],[76,151,224,98,76,178,120,142,142,8,228,71,224,13,75,128,39,103,201,142,205,6,239,96,238,111,152,134,94,1,185,190],[197,122,3,99,25,15,73,201,92,61,128,250,37,169,114,181,6,29,83,143,116,174,139,49,233,64,87,72,148,205,110,214],[239,171,19,246,187,118,106,6,166,77,117,40,174,198,242,182,231,140,219,129,191,134,2,147,24,227,54,202,212,150,89,7],[117,8,206,131,137,185,94,200,63,168,160,245,223,132,141,5,25,49,159,127,136,169,235,124,74,50,176,190,102,230,118,245],[162,149,147,80,169,193,230,231,5,243,5,11,211,140,237,217,101,101,184,78,142,5,144,201,78,103,80,29,24,153,84,85],[211,132,181,82,255,109,205,111,8,124,183,33,130,102,153,157,178,197,78,91,201,155,34,222,216,225,98,253,215,191,165,163],[215,69,148,252,253,232,121,142,242,71,141,68,99,164,197,19,106,198,71,205,47,220,163,121,16,49,223,244,177,165,44,44],[252,18,12,19,188,141,67,24,137,243,254,198,107,101,254,119,7,123,128,171,178,191,136,169,68,145,19,153,9,100,25,60],[59,74,213,218,10,25,220,92,51,173,7,130,96,202,131,110,71,31,138,79,194,252,219,220,46,64,13,127,8,231,147,245]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[7], 255, [229,130,0,188,171,212,221,223,0,9,27,203,22,123,123,88,252,113,233,246,163,35,7,132,34,13,200,175,93,107,107,24],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 255, [229,130,0,188,171,212,221,223,0,9,27,203,22,123,123,88,252,113,233,246,163,35,7,132,34,13,200,175,93,107,107,24],{from: accounts[0]}),'revert');
  });
});
