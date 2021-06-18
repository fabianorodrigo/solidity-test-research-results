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
  let contractGolemNetworkTokenBatching = null;
  let contractTokenProxy = null;
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
    contractGNTAllocation = await GNTAllocation.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[1],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[1],accounts[2],(await web3.eth.getBlockNumber())+761,(await web3.eth.getBlockNumber())+761+340,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[1],accounts[2],(await web3.eth.getBlockNumber())+761,(await web3.eth.getBlockNumber())+761+340,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],11,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],11,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[1],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[5],100,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[5],100,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[30,159,99,156,3,149,30,179,37,140,40,171,139,110,44,143,13,199,91,32,10,33,198,236,78,22,252,219,141,201,198,218],[246,77,64,196,90,223,210,51,112,216,42,74,58,82,13,74,51,133,103,26,238,218,73,56,53,67,199,34,140,167,168,67],[143,92,26,118,42,222,162,207,138,72,92,53,42,143,107,22,49,107,221,56,189,250,180,107,244,54,162,151,192,151,182,71],[172,1,41,20,67,206,235,50,177,18,85,77,118,147,43,151,85,95,246,229,135,177,21,182,80,178,255,55,82,29,173,172],[81,80,220,196,39,251,91,164,122,46,239,25,179,54,81,79,57,153,175,134,172,131,135,95,3,171,120,199,234,174,112,86],[77,63,243,68,40,123,60,51,68,166,223,251,143,172,91,249,179,149,104,177,255,153,96,82,229,75,164,209,152,12,233,29],[10,87,79,186,61,118,37,193,203,161,193,227,122,59,59,233,159,219,241,0,120,8,16,61,79,138,179,121,106,64,233,54],[199,143,67,166,122,214,108,218,237,108,192,181,121,62,201,251,113,241,4,105,115,82,20,11,64,92,2,95,50,23,234,196],[37,146,105,218,126,191,39,89,167,111,121,183,113,52,137,111,204,252,189,0,139,2,9,108,97,6,75,254,254,206,61,76],[99,71,244,166,47,225,25,239,81,49,202,200,243,77,224,24,128,6,60,3,60,115,210,31,12,184,52,60,116,161,244,64]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-551,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[30,159,99,156,3,149,30,179,37,140,40,171,139,110,44,143,13,199,91,32,10,33,198,236,78,22,252,219,141,201,198,218],[246,77,64,196,90,223,210,51,112,216,42,74,58,82,13,74,51,133,103,26,238,218,73,56,53,67,199,34,140,167,168,67],[143,92,26,118,42,222,162,207,138,72,92,53,42,143,107,22,49,107,221,56,189,250,180,107,244,54,162,151,192,151,182,71],[172,1,41,20,67,206,235,50,177,18,85,77,118,147,43,151,85,95,246,229,135,177,21,182,80,178,255,55,82,29,173,172],[81,80,220,196,39,251,91,164,122,46,239,25,179,54,81,79,57,153,175,134,172,131,135,95,3,171,120,199,234,174,112,86],[77,63,243,68,40,123,60,51,68,166,223,251,143,172,91,249,179,149,104,177,255,153,96,82,229,75,164,209,152,12,233,29],[10,87,79,186,61,118,37,193,203,161,193,227,122,59,59,233,159,219,241,0,120,8,16,61,79,138,179,121,106,64,233,54],[199,143,67,166,122,214,108,218,237,108,192,181,121,62,201,251,113,241,4,105,115,82,20,11,64,92,2,95,50,23,234,196],[37,146,105,218,126,191,39,89,167,111,121,183,113,52,137,111,204,252,189,0,139,2,9,108,97,6,75,254,254,206,61,76],[99,71,244,166,47,225,25,239,81,49,202,200,243,77,224,24,128,6,60,3,60,115,210,31,12,184,52,60,116,161,244,64]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[9], 159, [157,161,235,39,85,65,236,136,54,72,206,80,170,69,178,149,75,181,97,249,59,100,13,191,219,255,65,65,221,197,27,95],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 159, [157,161,235,39,85,65,236,136,54,72,206,80,170,69,178,149,75,181,97,249,59,100,13,191,219,255,65,65,221,197,27,95],{from: accounts[0]}),'revert');
  });
});
