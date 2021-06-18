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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[4],0,"ERC1820_ACCEPT_MAGIC",26,"RevertWithReason",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[4],0,"ERC1820_ACCEPT_MAGIC",26,"RevertWithReason",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[2], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+60,"gv5bib",65,"Example",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[2], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[0], 1336,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+392,"dmo84o",17,"ipzm88",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[0], 1336,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[1], 95,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+531,"IsLibrary",97,"ERC1820_ACCEPT_MAGIC",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[1], 95,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[7], 1532892063,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+169,"MMT_0.2",255,"PayableExample",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[7], 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 6,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 4,"value": 26},{"fromBlock": 2014223716,"value": 18},{"fromBlock": 6,"value": 2},{"fromBlock": 2014223716,"value": 3},{"fromBlock": 256,"value": 0},{"fromBlock": 254,"value": 96},{"fromBlock": 17,"value": 65},{"fromBlock": 4,"value": 256},{"fromBlock": 10001,"value": 6},{"fromBlock": 6,"value": 29},{"fromBlock": 18,"value": 29},{"fromBlock": 2,"value": 9999},{"fromBlock": 2014223715,"value": 256},{"fromBlock": 254,"value": 255},{"fromBlock": 19,"value": 3},{"fromBlock": 2014223716,"value": 2},{"fromBlock": 10001,"value": 95},{"fromBlock": 27,"value": 18},{"fromBlock": 64,"value": 27},{"fromBlock": 6,"value": 6},{"fromBlock": 1532892063,"value": 3},{"fromBlock": 1337,"value": 28},{"fromBlock": 3,"value": 1337},{"fromBlock": 17,"value": 10000},{"fromBlock": 65,"value": 1338},{"fromBlock": 6,"value": 28},{"fromBlock": 95,"value": 96},{"fromBlock": 2014223715,"value": 2},{"fromBlock": 19,"value": 66},{"fromBlock": 257,"value": 64},{"fromBlock": 26,"value": 256},{"fromBlock": 255,"value": 1532892062},{"fromBlock": 29,"value": 6},{"fromBlock": 6,"value": 1532892063},{"fromBlock": 2,"value": 255},{"fromBlock": 65,"value": 1338},{"fromBlock": 97,"value": 1532892064},{"fromBlock": 2014223715,"value": 2014223715},{"fromBlock": 1336,"value": 257},{"fromBlock": 4,"value": 10001},{"fromBlock": 256,"value": 9999},{"fromBlock": 1532892062,"value": 18},{"fromBlock": 255,"value": 6},{"fromBlock": 1,"value": 27},{"fromBlock": 256,"value": 65},{"fromBlock": 3,"value": 1337},{"fromBlock": 4,"value": 28},{"fromBlock": 97,"value": 4},{"fromBlock": 27,"value": 64},{"fromBlock": 1,"value": 1532892064},{"fromBlock": 4,"value": 1338},{"fromBlock": 1532892064,"value": 254},{"fromBlock": 65,"value": 6},{"fromBlock": 95,"value": 1336},{"fromBlock": 3,"value": 27},{"fromBlock": 1336,"value": 2014223716},{"fromBlock": 2014223715,"value": 256},{"fromBlock": 257,"value": 1337},{"fromBlock": 1336,"value": 2014223714},{"fromBlock": 10000,"value": 97},{"fromBlock": 10000,"value": 1532892064},{"fromBlock": 26,"value": 4},{"fromBlock": 10000,"value": 65},{"fromBlock": 1532892062,"value": 2014223716}], 1,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 254,"value": 2},{"fromBlock": 256,"value": 97},{"fromBlock": 10001,"value": 254},{"fromBlock": 19,"value": 64},{"fromBlock": 66,"value": 2014223716},{"fromBlock": 257,"value": 27},{"fromBlock": 2014223715,"value": 10000},{"fromBlock": 27,"value": 2014223714},{"fromBlock": 257,"value": 29},{"fromBlock": 1337,"value": 26}], 2,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[1],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(254, 257,{from: accounts[0]});
  });
});
