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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[8],95,"ERC1820_ACCEPT_MAGIC",95,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[8],95,"ERC1820_ACCEPT_MAGIC",95,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[5], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+371,"MMT_0.2",0,"MMT_0.2",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[5], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[0], 66,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+795,"\x19Ethereum Signed Message:\n32",26,"gn7x4d",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[0], 66,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[6], 4,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+174,"k5ik9l",17,"Example",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[6], 4,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[7], 2014223716,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+128,"MMT_0.2",1,"PayableExample",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[7], 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 64,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 1532892064,"value": 1},{"fromBlock": 66,"value": 9999},{"fromBlock": 9999,"value": 64},{"fromBlock": 2014223716,"value": 19},{"fromBlock": 2014223716,"value": 1},{"fromBlock": 6,"value": 1532892064},{"fromBlock": 66,"value": 66},{"fromBlock": 2,"value": 27},{"fromBlock": 1336,"value": 17},{"fromBlock": 2,"value": 97},{"fromBlock": 10001,"value": 256},{"fromBlock": 19,"value": 19},{"fromBlock": 28,"value": 17},{"fromBlock": 97,"value": 2014223715},{"fromBlock": 256,"value": 66},{"fromBlock": 1532892062,"value": 1336},{"fromBlock": 1532892062,"value": 97},{"fromBlock": 0,"value": 64},{"fromBlock": 3,"value": 255},{"fromBlock": 1338,"value": 66},{"fromBlock": 29,"value": 18},{"fromBlock": 96,"value": 6},{"fromBlock": 254,"value": 3},{"fromBlock": 256,"value": 10000},{"fromBlock": 19,"value": 27},{"fromBlock": 1338,"value": 2},{"fromBlock": 95,"value": 1532892062},{"fromBlock": 5,"value": 257},{"fromBlock": 255,"value": 1532892064},{"fromBlock": 96,"value": 17},{"fromBlock": 18,"value": 19},{"fromBlock": 4,"value": 10001},{"fromBlock": 1338,"value": 28},{"fromBlock": 27,"value": 0},{"fromBlock": 257,"value": 4},{"fromBlock": 1532892064,"value": 257},{"fromBlock": 9999,"value": 5},{"fromBlock": 27,"value": 1532892062},{"fromBlock": 10001,"value": 2014223716},{"fromBlock": 255,"value": 28},{"fromBlock": 6,"value": 26},{"fromBlock": 10001,"value": 2014223715},{"fromBlock": 66,"value": 10000},{"fromBlock": 3,"value": 95},{"fromBlock": 2014223716,"value": 1},{"fromBlock": 19,"value": 256},{"fromBlock": 96,"value": 29},{"fromBlock": 27,"value": 95},{"fromBlock": 9999,"value": 95},{"fromBlock": 4,"value": 96},{"fromBlock": 256,"value": 3},{"fromBlock": 96,"value": 1532892062},{"fromBlock": 10001,"value": 10001},{"fromBlock": 3,"value": 9999},{"fromBlock": 4,"value": 2014223715},{"fromBlock": 1336,"value": 2014223716},{"fromBlock": 1532892064,"value": 10001},{"fromBlock": 66,"value": 1},{"fromBlock": 5,"value": 29},{"fromBlock": 28,"value": 1336},{"fromBlock": 64,"value": 4},{"fromBlock": 256,"value": 10001},{"fromBlock": 5,"value": 256},{"fromBlock": 65,"value": 1337},{"fromBlock": 3,"value": 1337},{"fromBlock": 1532892064,"value": 17}], 1532892062,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 254,"value": 18},{"fromBlock": 255,"value": 1337},{"fromBlock": 96,"value": 19},{"fromBlock": 97,"value": 1},{"fromBlock": 1338,"value": 27},{"fromBlock": 64,"value": 4},{"fromBlock": 28,"value": 19}], 66,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[7],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(2014223716, 65,{from: accounts[0]});
  });
});
