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
    contractGNTAllocation = await GNTAllocation.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[2],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[4],accounts[3],(await web3.eth.getBlockNumber())+206,(await web3.eth.getBlockNumber())+206+328,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[4],accounts[3],(await web3.eth.getBlockNumber())+206,(await web3.eth.getBlockNumber())+206+328,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[2],15,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[2],15,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[3],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[3],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[1],99,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[1],99,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[27,196,7,125,208,157,145,179,25,58,185,176,230,26,0,4,101,157,105,92,13,118,49,3,93,55,98,236,180,19,189,197],[43,175,24,122,148,157,245,73,53,91,18,164,159,15,62,9,243,156,90,126,73,80,163,37,90,148,207,22,222,29,147,210],[219,226,89,146,80,39,248,202,132,160,187,33,149,27,108,146,35,230,114,56,94,134,198,93,101,212,215,9,190,45,89,52],[119,186,119,185,97,145,62,184,215,71,15,8,243,250,253,29,137,232,202,250,141,231,160,15,0,60,51,154,43,192,254,66],[55,26,32,2,90,100,221,231,30,74,145,153,117,147,250,105,68,206,103,224,86,190,39,200,55,69,118,204,237,68,94,246]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-134,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[27,196,7,125,208,157,145,179,25,58,185,176,230,26,0,4,101,157,105,92,13,118,49,3,93,55,98,236,180,19,189,197],[43,175,24,122,148,157,245,73,53,91,18,164,159,15,62,9,243,156,90,126,73,80,163,37,90,148,207,22,222,29,147,210],[219,226,89,146,80,39,248,202,132,160,187,33,149,27,108,146,35,230,114,56,94,134,198,93,101,212,215,9,190,45,89,52],[119,186,119,185,97,145,62,184,215,71,15,8,243,250,253,29,137,232,202,250,141,231,160,15,0,60,51,154,43,192,254,66],[55,26,32,2,90,100,221,231,30,74,145,153,117,147,250,105,68,206,103,224,86,190,39,200,55,69,118,204,237,68,94,246]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[4], 2, [125,204,178,37,155,1,10,41,191,108,142,174,109,136,36,209,141,50,76,137,80,32,156,83,249,218,73,75,154,232,163,157],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 2, [125,204,178,37,155,1,10,41,191,108,142,174,109,136,36,209,141,50,76,137,80,32,156,83,249,218,73,75,154,232,163,157],{from: accounts[0]}),'revert');
  });
});
