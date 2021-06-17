const truffleAssert = require('truffle-assertions');
const Controlled = artifacts.require("Controlled");
const MiniMeToken = artifacts.require("MiniMeToken");
const MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
const ProxyMiniMeToken = artifacts.require("ProxyMiniMeToken");

contract("contractProxyMiniMeToken",(accounts)=>{
    let contractProxyMiniMeToken = null;
  let trace = false;
  let contractMiniMeTokenFactory = null;
  let contractControlled = null;
  let contractMiniMeToken = null;
  beforeEach(async () => {
    contractMiniMeTokenFactory = await MiniMeTokenFactory.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeTokenFactory.new({from: accounts[0]}');
    contractControlled = await Controlled.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Controlled.new({from:accounts[0]}');
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[2],19,"UsesExample",26,"RevertWithReason",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[2],19,"UsesExample",26,"RevertWithReason",true,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[5], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+507,"itp2s",18,"pdf099",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[5], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[7], 6,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+519,"MMT_0.2",65,"ze3ak",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[7], 6,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[8], 97,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+657,"Example",28,"ze3ak",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[8], 97,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[5], 95,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+86,"UsesExample",18,"ERC1820_ACCEPT_MAGIC",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[5], 95,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 29,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 2014223715,"value": 2014223715},{"fromBlock": 255,"value": 254},{"fromBlock": 6,"value": 9999},{"fromBlock": 17,"value": 257},{"fromBlock": 65,"value": 10001},{"fromBlock": 1,"value": 26},{"fromBlock": 1337,"value": 27},{"fromBlock": 6,"value": 1532892062},{"fromBlock": 64,"value": 254},{"fromBlock": 256,"value": 10000},{"fromBlock": 1532892062,"value": 65},{"fromBlock": 10000,"value": 2014223715},{"fromBlock": 95,"value": 28},{"fromBlock": 2014223716,"value": 1532892063},{"fromBlock": 95,"value": 2014223716},{"fromBlock": 4,"value": 65},{"fromBlock": 256,"value": 29},{"fromBlock": 65,"value": 95},{"fromBlock": 26,"value": 66},{"fromBlock": 1337,"value": 27},{"fromBlock": 19,"value": 2014223716},{"fromBlock": 96,"value": 5},{"fromBlock": 6,"value": 10001},{"fromBlock": 96,"value": 2014223716},{"fromBlock": 95,"value": 28},{"fromBlock": 10001,"value": 2014223716},{"fromBlock": 65,"value": 254},{"fromBlock": 1336,"value": 3},{"fromBlock": 95,"value": 64},{"fromBlock": 10000,"value": 5},{"fromBlock": 3,"value": 4},{"fromBlock": 19,"value": 28},{"fromBlock": 27,"value": 10000},{"fromBlock": 6,"value": 2014223714},{"fromBlock": 1337,"value": 17},{"fromBlock": 256,"value": 1532892063},{"fromBlock": 96,"value": 257},{"fromBlock": 10001,"value": 1},{"fromBlock": 27,"value": 2014223714},{"fromBlock": 1336,"value": 1532892062},{"fromBlock": 257,"value": 9999},{"fromBlock": 256,"value": 28},{"fromBlock": 29,"value": 66},{"fromBlock": 0,"value": 5},{"fromBlock": 1532892064,"value": 1338},{"fromBlock": 2014223716,"value": 2},{"fromBlock": 96,"value": 17},{"fromBlock": 1337,"value": 29},{"fromBlock": 64,"value": 9999},{"fromBlock": 17,"value": 2014223714},{"fromBlock": 9999,"value": 2014223714},{"fromBlock": 26,"value": 26},{"fromBlock": 2014223716,"value": 1338},{"fromBlock": 2014223714,"value": 2014223715},{"fromBlock": 4,"value": 6},{"fromBlock": 1338,"value": 66},{"fromBlock": 64,"value": 256},{"fromBlock": 96,"value": 66},{"fromBlock": 19,"value": 2},{"fromBlock": 18,"value": 1338},{"fromBlock": 2,"value": 26},{"fromBlock": 26,"value": 2014223716},{"fromBlock": 19,"value": 1338},{"fromBlock": 65,"value": 9999},{"fromBlock": 2014223714,"value": 10001},{"fromBlock": 1532892064,"value": 65}], 17,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 1336,"value": 1336},{"fromBlock": 256,"value": 18},{"fromBlock": 2,"value": 10001},{"fromBlock": 9999,"value": 256},{"fromBlock": 96,"value": 19},{"fromBlock": 1532892062,"value": 10000},{"fromBlock": 257,"value": 95},{"fromBlock": 27,"value": 0}], 28,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[9],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(10000, 1532892062,{from: accounts[0]});
  });
});
