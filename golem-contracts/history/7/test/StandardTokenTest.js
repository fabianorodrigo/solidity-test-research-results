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
    contractGNTAllocation = await GNTAllocation.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[4],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[9],(await web3.eth.getBlockNumber())+234,(await web3.eth.getBlockNumber())+234+313,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[9],(await web3.eth.getBlockNumber())+234,(await web3.eth.getBlockNumber())+234+313,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[5],11,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[5],11,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractTokenProxy.address,accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractTokenProxy.address,accounts[2],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[4],6,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[7],accounts[4],6,{from:accounts[0]}');
  });
  
  it('Should execute transferFrom(address,address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000,_value<=balances', async () => {
    let result = await contractStandardToken.transferFrom(accounts[0], accounts[7], 99,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractStandardToken.transferFrom(accounts[0], "0x0000000000000000000000000000000000000000", 99,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractStandardToken.approve(accounts[0], 99,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractStandardToken.allowance(accounts[8], accounts[2],{from: accounts[0]});
  });
  it('Should execute increaseApproval(address,uint)', async () => {
    let result = await contractStandardToken.increaseApproval(accounts[2], 161,{from: accounts[0]});
  });
  it('Should execute decreaseApproval(address,uint) WHEN _subtractedValue>oldValue', async () => {
    let result = await contractStandardToken.decreaseApproval(accounts[3], 1336,{from: accounts[0]});
  });
  it('Should execute decreaseApproval(address,uint) WHEN _subtractedValue<=oldValue', async () => {
    let result = await contractStandardToken.decreaseApproval(accounts[5], 19,{from: accounts[0]});
  });
});