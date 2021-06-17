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
    contractGNTAllocation = await GNTAllocation.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[0],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[6],accounts[4],(await web3.eth.getBlockNumber())+427,(await web3.eth.getBlockNumber())+427+792,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[6],accounts[4],(await web3.eth.getBlockNumber())+427,(await web3.eth.getBlockNumber())+427+792,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[8],14,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[8],14,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractGolemNetworkTokenBatching.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractGolemNetworkTokenBatching.address,accounts[2],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[4],accounts[2],19,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[4],accounts[2],19,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[88,227,228,94,211,237,88,36,123,142,181,134,182,73,126,172,184,78,19,230,69,168,12,30,87,220,20,142,215,233,91,121],[101,24,161,250,187,45,153,83,190,132,34,132,67,224,1,136,110,66,90,75,37,119,89,93,204,43,214,147,185,179,13,45],[100,132,46,182,149,165,214,225,197,22,182,89,220,228,128,202,245,149,154,70,12,204,187,129,167,111,55,46,73,41,135,38],[242,38,110,144,146,18,248,136,3,141,91,174,91,44,59,116,159,4,65,181,241,157,176,149,23,217,0,4,39,151,121,86],[181,151,216,236,135,150,133,237,220,226,95,234,136,180,116,31,181,162,28,64,205,112,230,126,95,19,97,83,112,24,38,238]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-146,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[88,227,228,94,211,237,88,36,123,142,181,134,182,73,126,172,184,78,19,230,69,168,12,30,87,220,20,142,215,233,91,121],[101,24,161,250,187,45,153,83,190,132,34,132,67,224,1,136,110,66,90,75,37,119,89,93,204,43,214,147,185,179,13,45],[100,132,46,182,149,165,214,225,197,22,182,89,220,228,128,202,245,149,154,70,12,204,187,129,167,111,55,46,73,41,135,38],[242,38,110,144,146,18,248,136,3,141,91,174,91,44,59,116,159,4,65,181,241,157,176,149,23,217,0,4,39,151,121,86],[181,151,216,236,135,150,133,237,220,226,95,234,136,180,116,31,181,162,28,64,205,112,230,126,95,19,97,83,112,24,38,238]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[1], 99, [46,170,156,100,218,67,84,113,86,49,3,175,186,201,231,201,101,42,187,137,175,24,228,125,155,56,182,198,18,142,55,194],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 99, [46,170,156,100,218,67,84,113,86,49,3,175,186,201,231,201,101,42,187,137,175,24,228,125,155,56,182,198,18,142,55,194],{from: accounts[0]}),'revert');
  });
});
