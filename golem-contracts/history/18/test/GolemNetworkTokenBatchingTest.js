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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[7],accounts[4],(await web3.eth.getBlockNumber())+619,(await web3.eth.getBlockNumber())+619+720,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[7],accounts[4],(await web3.eth.getBlockNumber())+619,(await web3.eth.getBlockNumber())+619+720,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],10000,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],10000,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[8],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[8],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[0],82,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[0],82,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[218,17,2,205,146,217,209,54,149,89,32,14,27,101,103,158,38,198,102,255,55,196,204,172,176,250,88,103,194,125,186,124],[26,184,135,5,108,119,143,148,189,107,233,230,41,87,162,90,112,149,246,138,112,148,188,72,16,190,100,36,4,31,123,211],[239,151,244,240,74,53,161,174,165,208,81,200,195,164,10,214,103,11,156,73,180,252,47,151,163,238,35,32,232,227,21,224],[60,214,140,51,223,208,183,188,201,104,106,37,226,100,101,166,51,174,18,103,204,170,83,166,107,104,110,249,241,8,76,230],[46,204,165,143,157,22,56,86,12,144,12,15,233,72,40,168,250,4,185,51,102,254,226,127,45,20,39,90,183,119,30,102],[64,206,125,162,120,232,176,172,251,239,22,42,249,6,40,38,141,187,249,238,205,152,56,2,166,246,214,141,49,66,104,254],[218,221,53,2,72,200,31,157,150,195,162,218,228,34,59,181,97,154,192,41,242,155,147,96,42,68,26,140,15,101,189,248],[176,31,210,120,180,50,98,88,241,68,59,176,217,252,87,47,7,252,232,187,74,64,47,91,52,32,221,32,50,33,53,118],[124,134,130,68,250,44,183,230,105,158,39,204,43,80,147,228,175,57,14,162,112,63,62,181,125,201,31,178,92,134,169,133],[242,131,48,84,95,54,8,142,91,30,149,236,73,59,110,64,73,227,167,165,14,152,116,9,129,236,182,155,1,129,184,48]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-576,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[218,17,2,205,146,217,209,54,149,89,32,14,27,101,103,158,38,198,102,255,55,196,204,172,176,250,88,103,194,125,186,124],[26,184,135,5,108,119,143,148,189,107,233,230,41,87,162,90,112,149,246,138,112,148,188,72,16,190,100,36,4,31,123,211],[239,151,244,240,74,53,161,174,165,208,81,200,195,164,10,214,103,11,156,73,180,252,47,151,163,238,35,32,232,227,21,224],[60,214,140,51,223,208,183,188,201,104,106,37,226,100,101,166,51,174,18,103,204,170,83,166,107,104,110,249,241,8,76,230],[46,204,165,143,157,22,56,86,12,144,12,15,233,72,40,168,250,4,185,51,102,254,226,127,45,20,39,90,183,119,30,102],[64,206,125,162,120,232,176,172,251,239,22,42,249,6,40,38,141,187,249,238,205,152,56,2,166,246,214,141,49,66,104,254],[218,221,53,2,72,200,31,157,150,195,162,218,228,34,59,181,97,154,192,41,242,155,147,96,42,68,26,140,15,101,189,248],[176,31,210,120,180,50,98,88,241,68,59,176,217,252,87,47,7,252,232,187,74,64,47,91,52,32,221,32,50,33,53,118],[124,134,130,68,250,44,183,230,105,158,39,204,43,80,147,228,175,57,14,162,112,63,62,181,125,201,31,178,92,134,169,133],[242,131,48,84,95,54,8,142,91,30,149,236,73,59,110,64,73,227,167,165,14,152,116,9,129,236,182,155,1,129,184,48]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[6], 11, [158,235,173,207,186,150,2,207,238,90,81,182,130,25,87,235,9,135,198,108,112,255,130,26,36,217,76,166,227,205,145,144],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 11, [158,235,173,207,186,150,2,207,238,90,81,182,130,25,87,235,9,135,198,108,112,255,130,26,36,217,76,166,227,205,145,144],{from: accounts[0]}),'revert');
  });
});
