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

contract("Gate",(accounts)=>{
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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[8],accounts[8],(await web3.eth.getBlockNumber())+836,(await web3.eth.getBlockNumber())+836+897,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[8],accounts[8],(await web3.eth.getBlockNumber())+836,(await web3.eth.getBlockNumber())+836+897,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[4],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[4],6,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractStandardToken.address,accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractStandardToken.address,accounts[0],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBasicToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[9],accounts[3],4,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[9],accounts[3],4,{from:accounts[0]}');
  });
  
  it('Should execute transferToProxy(uint256) WHEN msg.sender==PROXY', async () => {
    let result = await contractGate.transferToProxy(18,{from: accounts[0]});
  });
  it('Should fail transferToProxy(uint256) when NOT comply with: msg.sender == PROXY', async () => {
    let result = await truffleAssert.fails(contractGate.transferToProxy(18,{from: accounts[9]}),'revert');
  });
});
