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
  let contractGolemNetworkTokenBatching = null;
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
    contractGNTAllocation = await GNTAllocation.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[3],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[1],accounts[2],(await web3.eth.getBlockNumber())+23,(await web3.eth.getBlockNumber())+23+530,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[1],accounts[2],(await web3.eth.getBlockNumber())+23,(await web3.eth.getBlockNumber())+23+530,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[6],1338,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[6],1338,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractGolemNetworkTokenBatching.address,accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractGolemNetworkTokenBatching.address,accounts[7],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[5],18,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[5],18,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[240,79,170,40,69,147,159,27,85,114,130,234,179,187,105,119,62,83,224,103,232,135,166,64,29,44,42,106,158,229,72,54],[60,231,66,178,115,138,111,151,179,122,130,143,36,19,18,85,255,123,149,172,163,168,238,63,147,211,43,196,31,149,195,149],[183,203,158,72,11,64,41,80,36,12,209,162,178,79,253,188,201,221,48,46,65,225,226,224,110,165,47,103,225,46,139,220],[252,29,109,137,93,146,25,78,140,22,206,129,248,169,203,39,92,41,192,113,233,131,23,65,224,60,112,83,11,45,121,45],[45,23,57,211,164,166,70,84,180,206,240,40,186,149,158,184,44,93,186,179,121,103,221,166,32,1,183,135,14,230,105,242]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-351,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[240,79,170,40,69,147,159,27,85,114,130,234,179,187,105,119,62,83,224,103,232,135,166,64,29,44,42,106,158,229,72,54],[60,231,66,178,115,138,111,151,179,122,130,143,36,19,18,85,255,123,149,172,163,168,238,63,147,211,43,196,31,149,195,149],[183,203,158,72,11,64,41,80,36,12,209,162,178,79,253,188,201,221,48,46,65,225,226,224,110,165,47,103,225,46,139,220],[252,29,109,137,93,146,25,78,140,22,206,129,248,169,203,39,92,41,192,113,233,131,23,65,224,60,112,83,11,45,121,45],[45,23,57,211,164,166,70,84,180,206,240,40,186,149,158,184,44,93,186,179,121,103,221,166,32,1,183,135,14,230,105,242]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[9], 10001, [42,37,80,8,244,212,14,59,103,193,89,166,183,125,92,189,177,204,150,29,232,108,49,24,189,2,179,65,126,173,173,97],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 10001, [42,37,80,8,244,212,14,59,103,193,89,166,183,125,92,189,177,204,150,29,232,108,49,24,189,2,179,65,126,173,173,97],{from: accounts[0]}),'revert');
  });
});
