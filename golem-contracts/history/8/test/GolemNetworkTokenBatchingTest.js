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
    contractGNTAllocation = await GNTAllocation.new(accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[8],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[5],accounts[7],(await web3.eth.getBlockNumber())+978,(await web3.eth.getBlockNumber())+978+495,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[5],accounts[7],(await web3.eth.getBlockNumber())+978,(await web3.eth.getBlockNumber())+978+495,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[5],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[5],10000,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBurnableToken.address,accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBurnableToken.address,accounts[1],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[4],accounts[6],2,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[4],accounts[6],2,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[112,147,88,60,148,95,179,4,72,90,75,205,228,50,162,226,169,62,249,142,151,80,251,202,75,38,203,214,203,156,21,19],[201,187,231,251,5,171,218,52,63,249,121,101,205,146,41,109,239,220,164,69,124,170,90,194,251,9,110,216,4,58,232,36],[5,75,167,35,93,192,72,73,236,145,214,165,228,109,236,56,26,82,208,245,149,12,155,81,143,17,71,83,14,216,195,60],[137,220,84,242,139,165,110,93,73,112,183,24,32,221,166,79,4,195,201,187,200,230,101,30,235,169,97,115,96,235,241,21],[211,192,66,47,251,177,7,212,217,240,83,91,207,177,15,86,250,174,204,39,56,84,225,211,13,233,4,123,239,97,171,118],[91,195,121,48,102,116,178,56,178,93,204,0,199,9,194,87,173,6,164,180,208,181,119,45,253,167,252,171,159,80,185,217],[163,139,185,212,29,117,232,5,38,45,232,121,116,183,200,219,124,212,64,78,115,168,162,82,249,245,138,36,221,249,234,248],[39,122,198,78,127,104,255,181,134,141,69,149,71,165,27,202,42,50,88,192,70,132,130,95,147,253,77,74,156,166,24,210]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-543,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[112,147,88,60,148,95,179,4,72,90,75,205,228,50,162,226,169,62,249,142,151,80,251,202,75,38,203,214,203,156,21,19],[201,187,231,251,5,171,218,52,63,249,121,101,205,146,41,109,239,220,164,69,124,170,90,194,251,9,110,216,4,58,232,36],[5,75,167,35,93,192,72,73,236,145,214,165,228,109,236,56,26,82,208,245,149,12,155,81,143,17,71,83,14,216,195,60],[137,220,84,242,139,165,110,93,73,112,183,24,32,221,166,79,4,195,201,187,200,230,101,30,235,169,97,115,96,235,241,21],[211,192,66,47,251,177,7,212,217,240,83,91,207,177,15,86,250,174,204,39,56,84,225,211,13,233,4,123,239,97,171,118],[91,195,121,48,102,116,178,56,178,93,204,0,199,9,194,87,173,6,164,180,208,181,119,45,253,167,252,171,159,80,185,217],[163,139,185,212,29,117,232,5,38,45,232,121,116,183,200,219,124,212,64,78,115,168,162,82,249,245,138,36,221,249,234,248],[39,122,198,78,127,104,255,181,134,141,69,149,71,165,27,202,42,50,88,192,70,132,130,95,147,253,77,74,156,166,24,210]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[2], 17, [166,11,217,140,248,162,143,124,234,80,38,222,208,127,90,247,106,217,110,132,227,233,249,149,207,72,244,32,44,5,3,34],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 17, [166,11,217,140,248,162,143,124,234,80,38,222,208,127,90,247,106,217,110,132,227,233,249,149,207,72,244,32,44,5,3,34],{from: accounts[0]}),'revert');
  });
});
