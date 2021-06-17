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

contract("GolemNetworkToken",(accounts)=>{
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
    contractGolemNetworkToken = await GolemNetworkToken.new(accounts[9],accounts[7],(await web3.eth.getBlockNumber())+7,(await web3.eth.getBlockNumber())+7+876,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkToken.new(accounts[9],accounts[7],(await web3.eth.getBlockNumber())+7,(await web3.eth.getBlockNumber())+7+876,{from:accounts[0]}');
    contractGNTPaymentChannels = await GNTPaymentChannels.new(accounts[1],1001,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTPaymentChannels.new(accounts[1],1001,{from:accounts[0]}');
    contractFaucet = await Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Faucet.new(contractGolemNetworkToken.address,{from:accounts[0]}');
    contractTokenProxy = await TokenProxy.new(contractBasicToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: TokenProxy.new(contractBasicToken.address,{from:accounts[0]}');
    contractGate = await Gate.new(contractBasicToken.address,accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: Gate.new(contractBasicToken.address,accounts[4],{from:accounts[0]}');
    contractGolemNetworkTokenBatching = await GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GolemNetworkTokenBatching.new(contractTokenProxy.address,{from:accounts[0]}');
    contractGNTDeposit = await GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[3],82,{from:accounts[0]});
    if(trace) console.log('SUCESSO: GNTDeposit.new(contractGolemNetworkTokenBatching.address,accounts[6],accounts[3],82,{from:accounts[0]}');
  });
  
  it('Should execute transfer(address,uint256) WHEN senderBalance>=_value,_value>0', async () => {
    let result = await contractGolemNetworkToken.transfer(accounts[6], 16,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN senderBalance<_value', async () => {
    let result = await contractGolemNetworkToken.transfer(accounts[6], 81,{from: accounts[0]});
  });
  it('Should execute totalSupply()', async () => {
    let result = await contractGolemNetworkToken.totalSupply({from: accounts[0]});
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractGolemNetworkToken.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute migrate(uint256) WHEN migrationAgent!=0x0000000000000000000000000000000000000000,_value!=0,_value<=balances', async () => {
    await contractGolemNetworkToken.setMigrationAgent(accounts[3],{from:accounts[7]});
    let result = await contractGolemNetworkToken.migrate(15,{from: accounts[7]});
  });
  it('Should fail migrate(uint256) when NOT comply with: migrationAgent != 0x0000000000000000000000000000000000000000', async () => {
    await contractGolemNetworkToken.setMigrationAgent("0x0000000000000000000000000000000000000000",{from:accounts[7]});
    let result = await truffleAssert.fails(contractGolemNetworkToken.migrate(15,{from: accounts[7]}),'revert');
  });
  it('Should fail migrate(uint256) when NOT comply with: _value != 0', async () => {
    await contractGolemNetworkToken.setMigrationAgent(accounts[3],{from:accounts[7]});
    let result = await truffleAssert.fails(contractGolemNetworkToken.migrate(0,{from: accounts[7]}),'revert');
  });
  it('Should execute setMigrationAgent(address) WHEN migrationAgent==0x0000000000000000000000000000000000000000,msg.sender==migrationMaster', async () => {
    let result = await contractGolemNetworkToken.setMigrationAgent(accounts[5],{from: accounts[7]});
  });
  it('Should fail setMigrationAgent(address) when NOT comply with: msg.sender == migrationMaster', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkToken.setMigrationAgent(accounts[5],{from: accounts[9]}),'revert');
  });
  it('Should execute setMigrationMaster(address) WHEN msg.sender==migrationMaster,_master!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractGolemNetworkToken.setMigrationMaster(accounts[2],{from: accounts[7]});
  });
  it('Should fail setMigrationMaster(address) when NOT comply with: msg.sender == migrationMaster', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkToken.setMigrationMaster(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should fail setMigrationMaster(address) when NOT comply with: _master != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractGolemNetworkToken.setMigrationMaster("0x0000000000000000000000000000000000000000",{from: accounts[7]}),'revert');
  });
  it('Should execute create() WHEN funding==true,(await web3.eth.getBlockNumber())>=fundingStartBlock,(await web3.eth.getBlockNumber())<=fundingEndBlock,msg.value!=0', async () => {
    let localGolemNetworkToken = await GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+405,(await web3.eth.getBlockNumber())+405+829,{from:accounts[0]});
    let result = await localGolemNetworkToken.create({from: accounts[0],value:9999});
  });
  it('Should fail create() when NOT comply with: funding == true', async () => {
    let localGolemNetworkToken = await GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+405,(await web3.eth.getBlockNumber())+405+829,{from:accounts[0]});
    await localGolemNetworkToken.finalize({from:accounts[0],value:9999});
    let result = await truffleAssert.fails(localGolemNetworkToken.create({from: accounts[0],value:9999}),'revert');
  });
  it('Should fail create() when NOT comply with: msg.value != 0', async () => {
    let localGolemNetworkToken = await GolemNetworkToken.new(accounts[5],accounts[3],(await web3.eth.getBlockNumber())+405,(await web3.eth.getBlockNumber())+405+829,{from:accounts[0]});
    let result = await truffleAssert.fails(localGolemNetworkToken.create({from: accounts[0]}),'revert');
  });
  it('Should execute finalize() WHEN funding==true,totalTokens>=tokenCreationCap,FunctionCall==true', async () => {
    let result = await contractGolemNetworkToken.finalize({from: accounts[0]});
  });
  it('Should execute refund() WHEN funding==true,(await web3.eth.getBlockNumber())>fundingEndBlock,totalTokens<tokenCreationMin,gntValue!=0,FunctionCall==true', async () => {
    let localGolemNetworkToken = await GolemNetworkToken.new(accounts[4],accounts[5],(await web3.eth.getBlockNumber())+793,(await web3.eth.getBlockNumber())+793+112,{from:accounts[0]});
    let result = await localGolemNetworkToken.refund({from: accounts[0]});
  });
  it('Should fail refund() when NOT comply with: funding == true', async () => {
    let localGolemNetworkToken = await GolemNetworkToken.new(accounts[4],accounts[5],(await web3.eth.getBlockNumber())+793,(await web3.eth.getBlockNumber())+793+112,{from:accounts[0]});
    await localGolemNetworkToken.finalize({from:accounts[0]});
    let result = await truffleAssert.fails(localGolemNetworkToken.refund({from: accounts[0]}),'revert');
  });
});
