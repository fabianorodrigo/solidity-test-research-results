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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[5],66,"UsesExample",27,"RevertWithReason",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[5],66,"UsesExample",27,"RevertWithReason",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[6], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+565,"k7s8n",29,"aieo3h",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[6], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[3], 26,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+574,"aieo3h",18,"e12mb",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[3], 26,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[5], 66,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+912,"RevertWithReason",4,"IsLibrary",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[5], 66,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[4], 28,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+104,"ERC1820_ACCEPT_MAGIC",17,"UsesExample",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[4], 28,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 2014223715,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 17,"value": 2014223715},{"fromBlock": 1532892064,"value": 0},{"fromBlock": 1532892064,"value": 1532892064},{"fromBlock": 19,"value": 2014223715},{"fromBlock": 1532892063,"value": 1336},{"fromBlock": 2,"value": 2014223714},{"fromBlock": 26,"value": 19},{"fromBlock": 6,"value": 2},{"fromBlock": 28,"value": 10000},{"fromBlock": 1338,"value": 257},{"fromBlock": 17,"value": 1532892062},{"fromBlock": 10000,"value": 6},{"fromBlock": 4,"value": 10000},{"fromBlock": 96,"value": 1336},{"fromBlock": 1532892062,"value": 6},{"fromBlock": 2014223714,"value": 95},{"fromBlock": 255,"value": 19},{"fromBlock": 2014223715,"value": 0},{"fromBlock": 4,"value": 65},{"fromBlock": 95,"value": 255},{"fromBlock": 2014223716,"value": 96},{"fromBlock": 64,"value": 1},{"fromBlock": 254,"value": 256},{"fromBlock": 66,"value": 6},{"fromBlock": 9999,"value": 66},{"fromBlock": 19,"value": 1338}], 66,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 2014223714,"value": 2},{"fromBlock": 3,"value": 28},{"fromBlock": 3,"value": 65},{"fromBlock": 66,"value": 2014223714},{"fromBlock": 10001,"value": 27},{"fromBlock": 1336,"value": 2014223714},{"fromBlock": 254,"value": 6},{"fromBlock": 27,"value": 1532892063}], 96,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[0],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(66, 28,{from: accounts[0]});
  });
});
