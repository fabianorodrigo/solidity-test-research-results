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
    contractGNTAllocation = await GNTAllocation.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[0],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[8],accounts[6],(await web3.eth.getBlockNumber())+34,(await web3.eth.getBlockNumber())+34+505,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[8],accounts[6],(await web3.eth.getBlockNumber())+34,(await web3.eth.getBlockNumber())+34+505,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[4],20,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[4],20,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBurnableToken.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBurnableToken.address,accounts[2],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[1],accounts[8],1337,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[1],accounts[8],1337,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[244,244,207,29,45,23,249,201,3,184,228,192,70,123,228,149,195,255,133,188,41,34,211,2,126,200,46,97,74,8,113,99],[235,168,74,36,29,166,230,4,160,83,41,240,131,243,254,12,81,254,126,19,61,235,218,116,180,23,145,207,117,36,92,150],[198,47,143,245,220,156,1,112,239,132,98,179,87,65,231,180,202,121,67,221,107,126,79,238,88,102,251,13,72,239,81,106],[88,136,109,112,209,59,235,85,83,84,162,204,157,93,208,116,173,118,140,91,155,237,1,112,139,163,93,37,235,93,241,133],[187,24,135,122,168,110,66,82,53,72,179,216,234,24,67,191,77,71,33,142,246,147,55,81,23,125,18,175,224,150,79,205]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-805,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[244,244,207,29,45,23,249,201,3,184,228,192,70,123,228,149,195,255,133,188,41,34,211,2,126,200,46,97,74,8,113,99],[235,168,74,36,29,166,230,4,160,83,41,240,131,243,254,12,81,254,126,19,61,235,218,116,180,23,145,207,117,36,92,150],[198,47,143,245,220,156,1,112,239,132,98,179,87,65,231,180,202,121,67,221,107,126,79,238,88,102,251,13,72,239,81,106],[88,136,109,112,209,59,235,85,83,84,162,204,157,93,208,116,173,118,140,91,155,237,1,112,139,163,93,37,235,93,241,133],[187,24,135,122,168,110,66,82,53,72,179,216,234,24,67,191,77,71,33,142,246,147,55,81,23,125,18,175,224,150,79,205]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[8], 160, [203,226,159,196,107,150,53,125,132,99,41,63,242,159,112,113,13,18,217,108,4,245,2,38,187,154,96,152,189,120,189,46],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 160, [203,226,159,196,107,150,53,125,132,99,41,63,242,159,112,113,13,18,217,108,4,245,2,38,187,154,96,152,189,120,189,46],{from: accounts[0]}),'revert');
  });
});
