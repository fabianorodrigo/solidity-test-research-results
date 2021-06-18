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

contract("GNTPaymentChannels",(accounts)=>{
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
    contractGNTAllocation = await GNTAllocation.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[9],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+623,(await web3.eth.getBlockNumber())+623+371,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+623,(await web3.eth.getBlockNumber())+623+371,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[6],1000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[6],1000,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[9],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[5],9,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[5],9,{from:accounts[0]}');
  });
  
  it('Should execute getDeposited(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getDeposited(accounts[2], accounts[4],{from: accounts[0]});
  });
  it('Should execute getWithdrawn(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getWithdrawn(accounts[5], accounts[0],{from: accounts[0]});
  });
  it('Should execute isLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isLocked(accounts[3], accounts[9],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isTimeLocked(accounts[0], accounts[9],{from: accounts[0]});
  });
  it('Should execute isValidSig(address,address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.isValidSig(accounts[6], accounts[1], 255, 255, [247,70,104,4,175,44,234,108,205,137,32,134,130,158,48,96,151,193,217,161,172,253,20,86,77,15,65,99,249,117,103,238], [87,161,153,130,39,223,166,200,11,46,4,178,1,61,33,62,35,223,115,217,253,130,175,229,48,47,158,35,213,231,73,145],{from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN _data.length==20', async () => {
    let result = await contractGNTPaymentChannels.onTokenReceived(accounts[1], 82, [57,92,146,249,196,90,58,63,249,161,121,200,253,193,70,93,60,142,240,71],{from: accounts[0]});
  });
  it('Should fail onTokenReceived(address,uint256,bytes) when NOT comply with: _data.length == 20', async () => {
    let result = await truffleAssert.fails(contractGNTPaymentChannels.onTokenReceived(accounts[1], 82, [80,229,208,44,57,107,1,16,145,152,235,244,96,103,250,8,100,93,9,62,139],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw(address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.withdraw(accounts[7], 1000, 161, [46,87,45,98,239,17,205,86,104,211,218,18,229,62,136,0,184,52,18,186,192,41,43,140,73,199,156,219,159,198,34,181], [255,148,66,198,80,191,83,92,179,110,63,121,217,146,164,91,232,234,230,206,45,114,36,38,103,152,168,83,176,186,91,70],{from: accounts[0]});
  });
  it('Should execute unlock(address)', async () => {
    let result = await contractGNTPaymentChannels.unlock(accounts[1],{from: accounts[0]});
  });
  it('Should execute close(address)', async () => {
    let result = await contractGNTPaymentChannels.close(accounts[3],{from: accounts[0]});
  });
});
