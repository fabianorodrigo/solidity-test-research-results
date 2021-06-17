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

contract("TokenProxy",(accounts)=>{
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
    contractGNTAllocation = await GNTAllocation.new(accounts[5],{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTAllocation.new(accounts[5],{from:accounts[0]}');
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[0],accounts[3],(await web3.eth.getBlockNumber())+428,(await web3.eth.getBlockNumber())+428+665,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[0],accounts[3],(await web3.eth.getBlockNumber())+428,(await web3.eth.getBlockNumber())+428+665,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[5],256,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[5],256,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractBurnableToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractGolemNetworkTokenBatching.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[0],{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[3],2,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[2],accounts[3],2,{from:accounts[0]}');
  });
  
  it('Should execute getGateAddress(address)', async () => {
    let result = await contractTokenProxy.getGateAddress(accounts[0],{from: accounts[0]});
  });
  it('Should execute openGate() WHEN gates==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractTokenProxy.openGate({from: accounts[0]});
  });
  it('Should execute transferFromGate() WHEN gate!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractTokenProxy.transferFromGate({from: accounts[0]});
  });
  it('Should execute withdraw(uint256) WHEN _value>0,msg.sender!=0x0000000000000000000000000000000000000000,_value<=balances', async () => {
    let result = await contractTokenProxy.withdraw(20,{from: accounts[6]});
  });
  it('Should fail withdraw(uint256) when NOT comply with: _value > 0', async () => {
    let result = await truffleAssert.fails(contractTokenProxy.withdraw(0,{from: accounts[6]}),'revert');
  });
  it('Should fail withdraw(uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractTokenProxy.withdraw(20,{from: 0}),'revert');
  });
  it('Should execute withdrawTo(uint256,address) WHEN _value>0,_destination!=0x0000000000000000000000000000000000000000,_value<=balances', async () => {
    let result = await contractTokenProxy.withdrawTo(9999, accounts[6],{from: accounts[0]});
  });
  it('Should fail withdrawTo(uint256,address) when NOT comply with: _value > 0', async () => {
    let result = await truffleAssert.fails(contractTokenProxy.withdrawTo(0, accounts[6],{from: accounts[0]}),'revert');
  });
  it('Should fail withdrawTo(uint256,address) when NOT comply with: _destination != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractTokenProxy.withdrawTo(9999, "0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
