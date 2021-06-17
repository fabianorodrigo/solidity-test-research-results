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
    contractGNTAllocation = await GNTAllocation.new(accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[3],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[7],accounts[7],(await web3.eth.getBlockNumber())+159,(await web3.eth.getBlockNumber())+159+656,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[7],accounts[7],(await web3.eth.getBlockNumber())+159,(await web3.eth.getBlockNumber())+159+656,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[0],82,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[0],82,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBurnableToken.address,accounts[6],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBurnableToken.address,accounts[6],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[6],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[0],accounts[6],10000,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[57,57,128,194,32,186,51,92,87,187,179,162,252,144,146,188,126,42,229,205,105,105,231,109,29,172,111,21,202,118,196,72],[24,161,138,5,150,42,213,58,252,34,117,180,108,124,212,78,167,169,185,91,166,34,101,175,251,123,6,109,130,166,253,68],[21,38,43,141,61,158,82,242,176,142,162,210,50,34,117,49,195,111,100,149,9,135,42,49,74,70,37,33,130,247,252,64],[92,70,193,93,139,111,210,147,45,38,37,172,229,183,248,238,70,98,114,56,108,119,223,107,24,241,197,248,160,186,118,3],[49,177,16,9,226,80,208,251,43,99,202,118,105,218,155,186,187,251,204,174,34,34,122,235,244,13,219,124,107,9,204,8],[23,213,248,145,234,115,48,183,14,21,97,77,141,189,34,247,106,13,156,189,1,214,211,29,110,18,98,231,112,137,113,71]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-750,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[57,57,128,194,32,186,51,92,87,187,179,162,252,144,146,188,126,42,229,205,105,105,231,109,29,172,111,21,202,118,196,72],[24,161,138,5,150,42,213,58,252,34,117,180,108,124,212,78,167,169,185,91,166,34,101,175,251,123,6,109,130,166,253,68],[21,38,43,141,61,158,82,242,176,142,162,210,50,34,117,49,195,111,100,149,9,135,42,49,74,70,37,33,130,247,252,64],[92,70,193,93,139,111,210,147,45,38,37,172,229,183,248,238,70,98,114,56,108,119,223,107,24,241,197,248,160,186,118,3],[49,177,16,9,226,80,208,251,43,99,202,118,105,218,155,186,187,251,204,174,34,34,122,235,244,13,219,124,107,9,204,8],[23,213,248,145,234,115,48,183,14,21,97,77,141,189,34,247,106,13,156,189,1,214,211,29,110,18,98,231,112,137,113,71]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[2], 19, [70,126,195,170,61,253,108,77,206,238,20,215,128,64,16,58,18,19,35,140,89,54,202,114,94,221,33,206,55,130,244,147],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 19, [70,126,195,170,61,253,108,77,206,238,20,215,128,64,16,58,18,19,35,140,89,54,202,114,94,221,33,206,55,130,244,147],{from: accounts[0]}),'revert');
  });
});
