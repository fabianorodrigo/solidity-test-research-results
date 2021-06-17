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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],1532892064,"UsesExample",64,"Example",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],1532892064,"UsesExample",64,"Example",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[5], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+536,"UsesExample",28,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[5], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[8], 66,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+764,"\x19Ethereum Signed Message:\n32",29,"MMT_0.2",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[8], 66,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[3], 4,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+168,"ERC1820_ACCEPT_MAGIC",97,"97ttje",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[3], 4,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[0], 2,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+579,"erbele",65,"8qmnug",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[0], 2,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 17,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 10000,"value": 3},{"fromBlock": 256,"value": 2014223715},{"fromBlock": 95,"value": 256},{"fromBlock": 1532892063,"value": 254},{"fromBlock": 1338,"value": 2014223716},{"fromBlock": 1338,"value": 1532892063},{"fromBlock": 29,"value": 18},{"fromBlock": 257,"value": 65},{"fromBlock": 18,"value": 255},{"fromBlock": 18,"value": 64},{"fromBlock": 1,"value": 2014223714},{"fromBlock": 96,"value": 1337},{"fromBlock": 19,"value": 256},{"fromBlock": 256,"value": 255},{"fromBlock": 254,"value": 2},{"fromBlock": 256,"value": 97},{"fromBlock": 28,"value": 2014223715},{"fromBlock": 97,"value": 19},{"fromBlock": 256,"value": 10001},{"fromBlock": 0,"value": 2014223714},{"fromBlock": 1532892064,"value": 1336},{"fromBlock": 28,"value": 5},{"fromBlock": 1338,"value": 66},{"fromBlock": 9999,"value": 96},{"fromBlock": 10001,"value": 66},{"fromBlock": 255,"value": 17},{"fromBlock": 10000,"value": 65},{"fromBlock": 66,"value": 65},{"fromBlock": 1532892064,"value": 1532892064},{"fromBlock": 1532892063,"value": 18},{"fromBlock": 255,"value": 2014223714},{"fromBlock": 1532892064,"value": 2},{"fromBlock": 65,"value": 4},{"fromBlock": 1337,"value": 256},{"fromBlock": 10001,"value": 1532892063},{"fromBlock": 255,"value": 10000},{"fromBlock": 29,"value": 95},{"fromBlock": 96,"value": 2},{"fromBlock": 95,"value": 18},{"fromBlock": 0,"value": 26},{"fromBlock": 6,"value": 28},{"fromBlock": 2014223715,"value": 255},{"fromBlock": 1336,"value": 1532892064},{"fromBlock": 26,"value": 26},{"fromBlock": 96,"value": 2014223715},{"fromBlock": 1336,"value": 26},{"fromBlock": 64,"value": 257},{"fromBlock": 10000,"value": 256},{"fromBlock": 0,"value": 18},{"fromBlock": 4,"value": 3},{"fromBlock": 5,"value": 255},{"fromBlock": 18,"value": 66},{"fromBlock": 2,"value": 2014223715},{"fromBlock": 2014223716,"value": 1532892064},{"fromBlock": 2,"value": 2},{"fromBlock": 29,"value": 4},{"fromBlock": 29,"value": 255},{"fromBlock": 2,"value": 66},{"fromBlock": 18,"value": 18},{"fromBlock": 2014223715,"value": 1532892062},{"fromBlock": 256,"value": 1532892063},{"fromBlock": 28,"value": 1336},{"fromBlock": 4,"value": 1336},{"fromBlock": 95,"value": 6},{"fromBlock": 17,"value": 18},{"fromBlock": 26,"value": 5},{"fromBlock": 254,"value": 66},{"fromBlock": 0,"value": 19},{"fromBlock": 19,"value": 10000},{"fromBlock": 96,"value": 2014223715},{"fromBlock": 254,"value": 2014223714},{"fromBlock": 66,"value": 27},{"fromBlock": 3,"value": 1532892062},{"fromBlock": 2014223714,"value": 26},{"fromBlock": 19,"value": 1338},{"fromBlock": 17,"value": 9999},{"fromBlock": 26,"value": 96},{"fromBlock": 1532892063,"value": 18},{"fromBlock": 2,"value": 10000},{"fromBlock": 10001,"value": 255},{"fromBlock": 26,"value": 9999},{"fromBlock": 1337,"value": 19},{"fromBlock": 27,"value": 1338},{"fromBlock": 0,"value": 29},{"fromBlock": 26,"value": 255},{"fromBlock": 1532892063,"value": 1337},{"fromBlock": 66,"value": 1532892063},{"fromBlock": 0,"value": 2014223714},{"fromBlock": 26,"value": 26},{"fromBlock": 4,"value": 254},{"fromBlock": 10001,"value": 26},{"fromBlock": 257,"value": 26},{"fromBlock": 9999,"value": 29},{"fromBlock": 26,"value": 1338},{"fromBlock": 257,"value": 10001},{"fromBlock": 6,"value": 66},{"fromBlock": 257,"value": 28}], 256,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 26,"value": 256}], 1336,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[5],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(9999, 17,{from: accounts[0]});
  });
});
