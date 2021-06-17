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
    contractGNTAllocation = await GNTAllocation.new(accounts[7],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[7],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[2],accounts[7],(await web3.eth.getBlockNumber())+476,(await web3.eth.getBlockNumber())+476+725,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[2],accounts[7],(await web3.eth.getBlockNumber())+476,(await web3.eth.getBlockNumber())+476+725,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[4],17,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[4],17,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractGolemNetworkTokenBatching.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractGolemNetworkTokenBatching.address,accounts[2],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[2],14,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[8],accounts[2],14,{from:accounts[0]}');
  });
  
  it('Should execute batchTransfer(bytes32[],uint64) WHEN (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp>=closureTime', async () => {
    let result = await contractGolemNetworkTokenBatching.batchTransfer([[183,150,198,134,52,232,228,13,60,103,244,224,215,176,104,118,146,196,24,80,250,156,33,53,16,102,166,51,205,243,221,85],[213,55,78,84,50,143,215,175,105,214,28,221,150,80,164,220,255,245,222,131,49,49,181,46,33,203,195,213,11,22,148,59],[200,155,225,56,134,64,193,254,92,45,202,57,100,145,139,187,204,236,90,28,228,232,140,124,204,186,99,187,216,189,238,166],[40,118,245,118,190,211,187,27,182,235,178,167,42,77,55,186,57,123,249,197,149,165,187,27,30,230,249,109,108,241,222,82],[34,156,201,7,112,219,177,185,198,250,161,198,194,160,163,235,176,167,221,147,174,137,203,214,92,122,140,31,206,147,166,60],[142,142,131,109,224,136,216,97,137,199,80,163,193,77,16,228,64,8,36,208,197,119,200,228,176,184,56,148,103,102,50,196],[150,146,44,202,162,45,66,41,87,194,117,161,215,136,246,204,143,68,180,156,125,212,16,57,234,73,182,70,216,54,185,144],[213,109,1,117,130,32,100,61,116,126,34,219,22,205,86,105,210,228,73,127,105,93,94,128,227,91,58,83,118,3,251,96]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp-425,{from: accounts[0]});
  });
  it('Should fail batchTransfer(bytes32[],uint64) when NOT comply with: (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp >= closureTime', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.batchTransfer([[183,150,198,134,52,232,228,13,60,103,244,224,215,176,104,118,146,196,24,80,250,156,33,53,16,102,166,51,205,243,221,85],[213,55,78,84,50,143,215,175,105,214,28,221,150,80,164,220,255,245,222,131,49,49,181,46,33,203,195,213,11,22,148,59],[200,155,225,56,134,64,193,254,92,45,202,57,100,145,139,187,204,236,90,28,228,232,140,124,204,186,99,187,216,189,238,166],[40,118,245,118,190,211,187,27,182,235,178,167,42,77,55,186,57,123,249,197,149,165,187,27,30,230,249,109,108,241,222,82],[34,156,201,7,112,219,177,185,198,250,161,198,194,160,163,235,176,167,221,147,174,137,203,214,92,122,140,31,206,147,166,60],[142,142,131,109,224,136,216,97,137,199,80,163,193,77,16,228,64,8,36,208,197,119,200,228,176,184,56,148,103,102,50,196],[150,146,44,202,162,45,66,41,87,194,117,161,215,136,246,204,143,68,180,156,125,212,16,57,234,73,182,70,216,54,185,144],[213,109,1,117,130,32,100,61,116,126,34,219,22,205,86,105,210,228,73,127,105,93,94,128,227,91,58,83,118,3,251,96]], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+1,{from: accounts[0]}),'revert');
  });
  it('Should execute transferAndCall(address,uint256,bytes) WHEN to!=0x0000000000000000000000000000000000000000,value<=balances', async () => {
    let result = await contractGolemNetworkTokenBatching.transferAndCall(accounts[9], 1000, [76,6,229,198,19,201,254,70,94,221,112,160,24,69,233,242,255,18,228,159,197,250,211,124,196,174,123,132,79,30,109,69],{from: accounts[0]});
  });
  it('Should fail transferAndCall(address,uint256,bytes) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkTokenBatching.transferAndCall("0x0000000000000000000000000000000000000000", 1000, [76,6,229,198,19,201,254,70,94,221,112,160,24,69,233,242,255,18,228,159,197,250,211,124,196,174,123,132,79,30,109,69],{from: accounts[0]}),'revert');
  });
});
