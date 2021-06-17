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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],2014223716,"Example",0,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],2014223716,"Example",0,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[9], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+935,"1za7tq",254,"PayableExample",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[9], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[9], 1532892063,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+444,"x2y10y",27,"IsLibrary",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[9], 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[0], 10000,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+579,"PayableExample",19,"PayableExample",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[0], 10000,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[1], 5,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+187,"Example",254,"x2y10y",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[1], 5,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 1532892062,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 1532892064,"value": 1532892063},{"fromBlock": 255,"value": 28},{"fromBlock": 2014223714,"value": 1338},{"fromBlock": 1532892062,"value": 18},{"fromBlock": 2014223716,"value": 1},{"fromBlock": 4,"value": 28},{"fromBlock": 2,"value": 1532892062},{"fromBlock": 1532892064,"value": 18},{"fromBlock": 17,"value": 1532892063},{"fromBlock": 5,"value": 1337},{"fromBlock": 29,"value": 10001},{"fromBlock": 10001,"value": 2014223714},{"fromBlock": 28,"value": 5},{"fromBlock": 2014223715,"value": 10000},{"fromBlock": 1337,"value": 10000},{"fromBlock": 1338,"value": 9999},{"fromBlock": 10000,"value": 95},{"fromBlock": 28,"value": 4},{"fromBlock": 96,"value": 1337},{"fromBlock": 254,"value": 95},{"fromBlock": 256,"value": 18},{"fromBlock": 9999,"value": 1532892064},{"fromBlock": 255,"value": 10000},{"fromBlock": 19,"value": 2},{"fromBlock": 257,"value": 1532892062},{"fromBlock": 6,"value": 2014223715},{"fromBlock": 1338,"value": 1338},{"fromBlock": 17,"value": 4},{"fromBlock": 97,"value": 254},{"fromBlock": 10000,"value": 254},{"fromBlock": 2014223714,"value": 0},{"fromBlock": 97,"value": 0},{"fromBlock": 26,"value": 1},{"fromBlock": 1532892063,"value": 0},{"fromBlock": 3,"value": 2014223714},{"fromBlock": 1532892064,"value": 1336},{"fromBlock": 65,"value": 10001},{"fromBlock": 64,"value": 5},{"fromBlock": 256,"value": 2014223714},{"fromBlock": 9999,"value": 9999},{"fromBlock": 64,"value": 1532892063},{"fromBlock": 1532892064,"value": 1},{"fromBlock": 4,"value": 6},{"fromBlock": 17,"value": 1532892064},{"fromBlock": 65,"value": 254},{"fromBlock": 19,"value": 10000},{"fromBlock": 0,"value": 5},{"fromBlock": 19,"value": 1338},{"fromBlock": 5,"value": 1532892063},{"fromBlock": 3,"value": 29},{"fromBlock": 2014223714,"value": 26},{"fromBlock": 5,"value": 65},{"fromBlock": 65,"value": 1336},{"fromBlock": 29,"value": 2014223716},{"fromBlock": 254,"value": 97},{"fromBlock": 257,"value": 1532892064},{"fromBlock": 254,"value": 1338},{"fromBlock": 29,"value": 66},{"fromBlock": 1336,"value": 1},{"fromBlock": 64,"value": 65},{"fromBlock": 27,"value": 5},{"fromBlock": 1338,"value": 18},{"fromBlock": 3,"value": 66},{"fromBlock": 27,"value": 27},{"fromBlock": 4,"value": 17},{"fromBlock": 256,"value": 1532892064},{"fromBlock": 1532892063,"value": 1},{"fromBlock": 2014223716,"value": 2014223715},{"fromBlock": 4,"value": 66},{"fromBlock": 2014223716,"value": 28},{"fromBlock": 1338,"value": 27},{"fromBlock": 1338,"value": 95},{"fromBlock": 2,"value": 2014223715},{"fromBlock": 66,"value": 1337},{"fromBlock": 255,"value": 9999},{"fromBlock": 19,"value": 95},{"fromBlock": 1532892062,"value": 0},{"fromBlock": 10000,"value": 19},{"fromBlock": 1336,"value": 10000},{"fromBlock": 96,"value": 64},{"fromBlock": 9999,"value": 96},{"fromBlock": 255,"value": 2014223714},{"fromBlock": 1532892062,"value": 64},{"fromBlock": 254,"value": 10000},{"fromBlock": 1,"value": 1336},{"fromBlock": 1532892063,"value": 0},{"fromBlock": 1532892062,"value": 2014223715},{"fromBlock": 5,"value": 1532892063},{"fromBlock": 26,"value": 255},{"fromBlock": 66,"value": 1338},{"fromBlock": 2014223714,"value": 1532892063},{"fromBlock": 17,"value": 256},{"fromBlock": 17,"value": 2},{"fromBlock": 18,"value": 257},{"fromBlock": 5,"value": 4},{"fromBlock": 17,"value": 9999},{"fromBlock": 27,"value": 96}], 1338,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 19,"value": 1338},{"fromBlock": 10000,"value": 0},{"fromBlock": 2014223716,"value": 0},{"fromBlock": 27,"value": 5},{"fromBlock": 27,"value": 26},{"fromBlock": 1532892063,"value": 1337}], 95,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[9],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(27, 66,{from: accounts[0]});
  });
});
