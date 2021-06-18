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
  
  it('Should execute getDeposited(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getDeposited(accounts[5], accounts[1],{from: accounts[0]});
  });
  it('Should execute getWithdrawn(address,address)', async () => {
    let result = await contractGNTPaymentChannels.getWithdrawn(accounts[9], accounts[6],{from: accounts[0]});
  });
  it('Should execute isLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isLocked(accounts[0], accounts[4],{from: accounts[0]});
  });
  it('Should execute isTimeLocked(address,address)', async () => {
    let result = await contractGNTPaymentChannels.isTimeLocked(accounts[0], accounts[3],{from: accounts[0]});
  });
  it('Should execute isValidSig(address,address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.isValidSig(accounts[7], accounts[2], 20, 9, [189,88,41,122,95,32,235,13,223,199,80,199,85,152,163,108,181,124,151,193,2,192,26,1,153,94,41,14,173,63,73,226], [45,79,172,109,73,247,29,221,208,73,90,7,65,90,106,62,55,0,21,124,136,9,230,89,127,223,226,16,251,165,93,142],{from: accounts[0]});
  });
  it('Should execute onTokenReceived(address,uint256,bytes) WHEN _data.length==20', async () => {
    let result = await contractGNTPaymentChannels.onTokenReceived(accounts[9], 1001, [48,181,24,75,100,112,203,247,240,170,232,0,16,118,67,181,227,241,37,72],{from: accounts[0]});
  });
  it('Should fail onTokenReceived(address,uint256,bytes) when NOT comply with: _data.length == 20', async () => {
    let result = await truffleAssert.fails(contractGNTPaymentChannels.onTokenReceived(accounts[9], 1001, [132,65,193,60,52,4,122,52,38,44,158,147,138,112,70,38,246,157,126,142,171],{from: accounts[0]}),'revert');
  });
  it('Should execute withdraw(address,uint256,uint8,bytes32,bytes32)', async () => {
    let result = await contractGNTPaymentChannels.withdraw(accounts[8], 256, 81, [179,202,205,40,183,21,192,190,54,164,169,113,139,187,2,44,88,15,11,81,213,212,160,56,92,67,172,66,206,124,196,217], [125,184,24,177,128,34,245,130,221,170,219,44,188,222,50,77,41,50,13,246,72,134,145,148,229,116,218,228,188,202,78,202],{from: accounts[0]});
  });
  it('Should execute unlock(address)', async () => {
    let result = await contractGNTPaymentChannels.unlock(accounts[6],{from: accounts[0]});
  });
  it('Should execute close(address)', async () => {
    let result = await contractGNTPaymentChannels.close(accounts[1],{from: accounts[0]});
  });
});
