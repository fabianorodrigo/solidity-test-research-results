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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[6],1532892062,"ERC1820_ACCEPT_MAGIC",1,"UsesExample",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[6],1532892062,"ERC1820_ACCEPT_MAGIC",1,"UsesExample",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[9], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+874,"IsLibrary",64,"Example",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[9], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[9], 1338,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+403,"UsesExample",255,"RevertWithReason",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[9], 1338,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[4], 17,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+778,"rk1xh",28,"\x19Ethereum Signed Message:\n32",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[4], 17,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[5], 3,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+529,"ERC1820_ACCEPT_MAGIC",29,"a07bz",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[5], 3,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 96,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 2014223716,"value": 19},{"fromBlock": 1338,"value": 254},{"fromBlock": 3,"value": 1},{"fromBlock": 1532892063,"value": 97},{"fromBlock": 256,"value": 18},{"fromBlock": 255,"value": 1},{"fromBlock": 29,"value": 2014223715},{"fromBlock": 66,"value": 1336},{"fromBlock": 64,"value": 3},{"fromBlock": 9999,"value": 65},{"fromBlock": 255,"value": 3},{"fromBlock": 3,"value": 257},{"fromBlock": 65,"value": 64},{"fromBlock": 1532892063,"value": 17},{"fromBlock": 254,"value": 1532892064},{"fromBlock": 2,"value": 1336},{"fromBlock": 2014223716,"value": 27},{"fromBlock": 254,"value": 2},{"fromBlock": 10000,"value": 2014223714},{"fromBlock": 66,"value": 256},{"fromBlock": 3,"value": 96},{"fromBlock": 257,"value": 3},{"fromBlock": 1336,"value": 2},{"fromBlock": 9999,"value": 257},{"fromBlock": 26,"value": 65},{"fromBlock": 26,"value": 1},{"fromBlock": 1,"value": 254},{"fromBlock": 96,"value": 2014223715},{"fromBlock": 256,"value": 2},{"fromBlock": 95,"value": 2014223716},{"fromBlock": 17,"value": 10000},{"fromBlock": 1532892064,"value": 2014223715},{"fromBlock": 1,"value": 1337},{"fromBlock": 3,"value": 28},{"fromBlock": 1338,"value": 64},{"fromBlock": 4,"value": 10000},{"fromBlock": 1337,"value": 17},{"fromBlock": 2014223714,"value": 64},{"fromBlock": 95,"value": 29},{"fromBlock": 6,"value": 1},{"fromBlock": 1338,"value": 257},{"fromBlock": 2,"value": 0},{"fromBlock": 64,"value": 95},{"fromBlock": 66,"value": 2014223716},{"fromBlock": 95,"value": 1},{"fromBlock": 1,"value": 18},{"fromBlock": 4,"value": 1338},{"fromBlock": 1532892064,"value": 66},{"fromBlock": 1338,"value": 1532892064},{"fromBlock": 28,"value": 3},{"fromBlock": 27,"value": 2},{"fromBlock": 4,"value": 29},{"fromBlock": 1338,"value": 28},{"fromBlock": 5,"value": 29},{"fromBlock": 95,"value": 17},{"fromBlock": 2014223714,"value": 1},{"fromBlock": 2014223715,"value": 255},{"fromBlock": 254,"value": 10001},{"fromBlock": 96,"value": 65},{"fromBlock": 254,"value": 1337},{"fromBlock": 27,"value": 27},{"fromBlock": 257,"value": 17},{"fromBlock": 1,"value": 10001},{"fromBlock": 5,"value": 6},{"fromBlock": 2,"value": 1336},{"fromBlock": 254,"value": 1336}], 1,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 97,"value": 2014223714},{"fromBlock": 3,"value": 1338}], 29,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[4],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(257, 2014223715,{from: accounts[0]});
  });
});
