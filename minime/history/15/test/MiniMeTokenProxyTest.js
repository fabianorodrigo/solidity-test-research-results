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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[3],66,"ERC1820_ACCEPT_MAGIC",64,"RevertWithReason",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[3],66,"ERC1820_ACCEPT_MAGIC",64,"RevertWithReason",true,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[6], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+225,"PayableExample",19,"UsesExample",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[6], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[1], 28,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+734,"o4qeg",64,"2wm4n",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[1], 28,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[4], 2014223716,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+652,"IsLibrary",0,"UsesExample",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[4], 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[2], 2,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+164,"MMT_0.2",2,"MMT_0.2",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[2], 2,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 10000,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 1336,"value": 65},{"fromBlock": 9999,"value": 1337},{"fromBlock": 65,"value": 256},{"fromBlock": 6,"value": 2014223716},{"fromBlock": 96,"value": 95},{"fromBlock": 10000,"value": 257},{"fromBlock": 10000,"value": 256},{"fromBlock": 19,"value": 19},{"fromBlock": 256,"value": 257},{"fromBlock": 95,"value": 1337},{"fromBlock": 2014223715,"value": 2014223716},{"fromBlock": 9999,"value": 1532892063},{"fromBlock": 64,"value": 2014223714},{"fromBlock": 95,"value": 2014223716},{"fromBlock": 1338,"value": 1},{"fromBlock": 66,"value": 1532892062},{"fromBlock": 66,"value": 28},{"fromBlock": 1338,"value": 1532892063},{"fromBlock": 256,"value": 5},{"fromBlock": 0,"value": 10000},{"fromBlock": 2014223715,"value": 1337},{"fromBlock": 2,"value": 1336},{"fromBlock": 257,"value": 5},{"fromBlock": 1532892063,"value": 26},{"fromBlock": 9999,"value": 66},{"fromBlock": 64,"value": 10001},{"fromBlock": 10001,"value": 17},{"fromBlock": 1338,"value": 2014223714},{"fromBlock": 1532892062,"value": 3},{"fromBlock": 10000,"value": 1532892062},{"fromBlock": 28,"value": 2},{"fromBlock": 96,"value": 95},{"fromBlock": 1336,"value": 96},{"fromBlock": 97,"value": 26},{"fromBlock": 65,"value": 6},{"fromBlock": 29,"value": 1532892063},{"fromBlock": 2014223714,"value": 254},{"fromBlock": 65,"value": 2014223714},{"fromBlock": 2014223714,"value": 1},{"fromBlock": 95,"value": 96},{"fromBlock": 66,"value": 26},{"fromBlock": 257,"value": 0},{"fromBlock": 97,"value": 27},{"fromBlock": 96,"value": 254},{"fromBlock": 27,"value": 1338},{"fromBlock": 2014223714,"value": 2014223714},{"fromBlock": 1336,"value": 0},{"fromBlock": 2014223714,"value": 29},{"fromBlock": 27,"value": 1532892064},{"fromBlock": 255,"value": 10000},{"fromBlock": 10000,"value": 96},{"fromBlock": 1338,"value": 97},{"fromBlock": 9999,"value": 255},{"fromBlock": 97,"value": 96},{"fromBlock": 4,"value": 6},{"fromBlock": 96,"value": 95},{"fromBlock": 2014223715,"value": 257},{"fromBlock": 96,"value": 96},{"fromBlock": 1338,"value": 10001},{"fromBlock": 9999,"value": 65},{"fromBlock": 2,"value": 10001},{"fromBlock": 10000,"value": 10001},{"fromBlock": 4,"value": 2014223714},{"fromBlock": 66,"value": 1532892063},{"fromBlock": 96,"value": 1532892063},{"fromBlock": 1336,"value": 1532892064},{"fromBlock": 1336,"value": 255},{"fromBlock": 2,"value": 9999},{"fromBlock": 1336,"value": 2014223716},{"fromBlock": 0,"value": 95},{"fromBlock": 0,"value": 0},{"fromBlock": 1532892062,"value": 1532892064},{"fromBlock": 97,"value": 254},{"fromBlock": 27,"value": 28},{"fromBlock": 2,"value": 27},{"fromBlock": 26,"value": 2014223714},{"fromBlock": 65,"value": 2014223714},{"fromBlock": 17,"value": 95},{"fromBlock": 97,"value": 1532892063},{"fromBlock": 0,"value": 5},{"fromBlock": 96,"value": 64},{"fromBlock": 97,"value": 2014223714},{"fromBlock": 96,"value": 1532892064},{"fromBlock": 1,"value": 2014223714},{"fromBlock": 3,"value": 255},{"fromBlock": 17,"value": 5},{"fromBlock": 9999,"value": 26},{"fromBlock": 2,"value": 255},{"fromBlock": 29,"value": 2},{"fromBlock": 64,"value": 18},{"fromBlock": 1532892064,"value": 26},{"fromBlock": 1532892062,"value": 10000},{"fromBlock": 2014223714,"value": 6},{"fromBlock": 19,"value": 17},{"fromBlock": 256,"value": 27}], 256,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 26,"value": 95},{"fromBlock": 2,"value": 1532892064}], 64,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[7],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(3, 1532892062,{from: accounts[0]});
  });
});
