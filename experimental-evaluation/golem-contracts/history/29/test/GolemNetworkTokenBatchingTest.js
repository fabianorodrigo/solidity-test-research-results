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
    contractGNTAllocation = await GNTAllocation.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[7],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[4],accounts[8],(await web3.eth.getBlockNumber())+622,(await web3.eth.getBlockNumber())+622+8,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[4],accounts[8],(await web3.eth.getBlockNumber())+622,(await web3.eth.getBlockNumber())+622+8,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[3],11,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[3],11,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractStandardToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[5],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractStandardToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[9],83,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[9],83,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[194,164,141,200,0,124,202,107,188,79,98,234,129,116,221,143,252,59,209,19,94,43,78,192,72,183,73,161,83,96,118,236],[245,209,22,99,254,72,130,122,208,104,146,190,44,32,252,223,8,167,144,217,93,139,57,150,157,45,158,191,189,163,254,139],[60,170,135,230,62,241,87,25,193,246,117,67,202,87,1,140,217,180,21,113,41,244,44,123,140,88,216,26,47,254,244,10],[44,101,237,125,93,198,19,154,200,36,206,193,191,190,53,77,254,86,195,2,60,243,12,40,48,214,164,200,172,239,188,221],[209,161,155,238,245,214,73,13,87,4,70,239,59,34,245,110,167,145,55,240,236,5,127,70,115,40,161,67,107,32,191,245],[85,68,195,23,7,176,103,126,69,210,64,109,193,113,207,19,139,71,118,87,185,146,233,101,234,230,185,190,216,34,68,111],[166,255,11,137,255,146,111,45,229,229,85,62,141,51,167,88,206,106,101,204,157,53,209,202,138,204,17,156,29,206,122,150],[149,181,230,31,152,17,34,213,142,195,250,137,79,242,18,190,99,71,226,239,255,173,152,148,226,30,27,166,42,15,177,4],[196,19,153,28,134,232,162,142,158,150,55,205,29,108,26,224,117,29,13,90,134,91,66,91,138,86,144,147,14,59,169,56]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-374,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[194,164,141,200,0,124,202,107,188,79,98,234,129,116,221,143,252,59,209,19,94,43,78,192,72,183,73,161,83,96,118,236],[245,209,22,99,254,72,130,122,208,104,146,190,44,32,252,223,8,167,144,217,93,139,57,150,157,45,158,191,189,163,254,139],[60,170,135,230,62,241,87,25,193,246,117,67,202,87,1,140,217,180,21,113,41,244,44,123,140,88,216,26,47,254,244,10],[44,101,237,125,93,198,19,154,200,36,206,193,191,190,53,77,254,86,195,2,60,243,12,40,48,214,164,200,172,239,188,221],[209,161,155,238,245,214,73,13,87,4,70,239,59,34,245,110,167,145,55,240,236,5,127,70,115,40,161,67,107,32,191,245],[85,68,195,23,7,176,103,126,69,210,64,109,193,113,207,19,139,71,118,87,185,146,233,101,234,230,185,190,216,34,68,111],[166,255,11,137,255,146,111,45,229,229,85,62,141,51,167,88,206,106,101,204,157,53,209,202,138,204,17,156,29,206,122,150],[149,181,230,31,152,17,34,213,142,195,250,137,79,242,18,190,99,71,226,239,255,173,152,148,226,30,27,166,42,15,177,4],[196,19,153,28,134,232,162,142,158,150,55,205,29,108,26,224,117,29,13,90,134,91,66,91,138,86,144,147,14,59,169,56]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[7], 6, [96,247,253,202,241,234,80,25,72,209,20,114,201,140,116,199,8,109,232,184,207,174,215,7,185,9,92,133,42,23,153,254],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 6, [96,247,253,202,241,234,80,25,72,209,20,114,201,140,116,199,8,109,232,184,207,174,215,7,185,9,92,133,42,23,153,254],{from: accounts[0]}),'revert');
  });
});
