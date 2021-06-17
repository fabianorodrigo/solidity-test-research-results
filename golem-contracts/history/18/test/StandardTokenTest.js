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

contract("StandardToken",(accounts)=>{
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
  
  it('Should execute transferFrom(address,address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000,_value<=balances', async () => {
    let result = await contractStandardToken.transferFrom(accounts[9], accounts[4], 17,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractStandardToken.transferFrom(accounts[9], "0x0000000000000000000000000000000000000000", 17,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractStandardToken.approve(accounts[7], 19,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractStandardToken.allowance(accounts[3], accounts[5],{from: accounts[0]});
  });
  it('Should execute increaseApproval(address,uint)', async () => {
    let result = await contractStandardToken.increaseApproval(accounts[9], 3,{from: accounts[0]});
  });
  it('Should execute decreaseApproval(address,uint) WHEN _subtractedValue>oldValue', async () => {
    let result = await contractStandardToken.decreaseApproval(accounts[0], 255,{from: accounts[0]});
  });
  it('Should execute decreaseApproval(address,uint) WHEN _subtractedValue<=oldValue', async () => {
    let result = await contractStandardToken.decreaseApproval(accounts[9], 20,{from: accounts[0]});
  });
});
