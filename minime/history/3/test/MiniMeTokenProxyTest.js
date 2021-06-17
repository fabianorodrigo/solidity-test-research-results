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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],66,"RevertWithReason",18,"Example",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],66,"RevertWithReason",18,"Example",true,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[6], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+614,"PayableExample",5,"\x19Ethereum Signed Message:\n32",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[6], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[1], 1337,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+578,"PayableExample",28,"8cqk5",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[1], 1337,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[9], 10000,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+755,"ERC1820_ACCEPT_MAGIC",18,"IsLibrary",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[9], 10000,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[2], 26,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+793,"UsesExample",4,"UsesExample",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[2], 26,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 5,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 97,"value": 97},{"fromBlock": 2014223714,"value": 28},{"fromBlock": 2014223714,"value": 3},{"fromBlock": 1336,"value": 6},{"fromBlock": 256,"value": 2014223714},{"fromBlock": 19,"value": 5},{"fromBlock": 2014223714,"value": 1338},{"fromBlock": 9999,"value": 95},{"fromBlock": 1532892063,"value": 2014223716},{"fromBlock": 2014223716,"value": 9999},{"fromBlock": 96,"value": 1337},{"fromBlock": 2014223714,"value": 1532892062},{"fromBlock": 28,"value": 1337},{"fromBlock": 1338,"value": 64},{"fromBlock": 27,"value": 95},{"fromBlock": 255,"value": 26},{"fromBlock": 28,"value": 18},{"fromBlock": 27,"value": 29},{"fromBlock": 1336,"value": 3},{"fromBlock": 3,"value": 27},{"fromBlock": 2014223715,"value": 257},{"fromBlock": 3,"value": 26},{"fromBlock": 66,"value": 17},{"fromBlock": 1532892064,"value": 2014223714},{"fromBlock": 1532892064,"value": 26},{"fromBlock": 66,"value": 4},{"fromBlock": 257,"value": 97},{"fromBlock": 1532892063,"value": 9999},{"fromBlock": 2014223714,"value": 18},{"fromBlock": 96,"value": 2014223716},{"fromBlock": 2014223715,"value": 5},{"fromBlock": 5,"value": 3},{"fromBlock": 26,"value": 19},{"fromBlock": 255,"value": 1338},{"fromBlock": 18,"value": 27},{"fromBlock": 1338,"value": 26},{"fromBlock": 256,"value": 1338},{"fromBlock": 10001,"value": 256},{"fromBlock": 2014223716,"value": 97},{"fromBlock": 5,"value": 96},{"fromBlock": 3,"value": 26},{"fromBlock": 1338,"value": 2014223716},{"fromBlock": 6,"value": 26},{"fromBlock": 3,"value": 1338},{"fromBlock": 256,"value": 0},{"fromBlock": 254,"value": 1338},{"fromBlock": 4,"value": 1532892064},{"fromBlock": 2,"value": 27},{"fromBlock": 10001,"value": 19},{"fromBlock": 10001,"value": 6},{"fromBlock": 10001,"value": 1337},{"fromBlock": 255,"value": 1532892062},{"fromBlock": 1,"value": 255},{"fromBlock": 96,"value": 19},{"fromBlock": 2014223716,"value": 257},{"fromBlock": 4,"value": 1337},{"fromBlock": 96,"value": 1532892063},{"fromBlock": 4,"value": 2014223716},{"fromBlock": 19,"value": 9999},{"fromBlock": 65,"value": 28},{"fromBlock": 1336,"value": 2014223716},{"fromBlock": 19,"value": 1337},{"fromBlock": 66,"value": 256},{"fromBlock": 66,"value": 96},{"fromBlock": 26,"value": 1338},{"fromBlock": 18,"value": 256},{"fromBlock": 1,"value": 257},{"fromBlock": 18,"value": 96},{"fromBlock": 18,"value": 1338},{"fromBlock": 26,"value": 1532892064},{"fromBlock": 257,"value": 65},{"fromBlock": 66,"value": 19},{"fromBlock": 1336,"value": 1338},{"fromBlock": 1,"value": 97},{"fromBlock": 19,"value": 17},{"fromBlock": 5,"value": 19},{"fromBlock": 256,"value": 10001},{"fromBlock": 256,"value": 2014223715},{"fromBlock": 1,"value": 2014223715},{"fromBlock": 1532892062,"value": 64},{"fromBlock": 5,"value": 254},{"fromBlock": 257,"value": 1532892063},{"fromBlock": 18,"value": 4},{"fromBlock": 64,"value": 4},{"fromBlock": 1336,"value": 29},{"fromBlock": 2,"value": 1532892063},{"fromBlock": 1337,"value": 95},{"fromBlock": 96,"value": 2},{"fromBlock": 254,"value": 26},{"fromBlock": 18,"value": 3},{"fromBlock": 1532892062,"value": 65},{"fromBlock": 3,"value": 2014223716},{"fromBlock": 254,"value": 26},{"fromBlock": 1338,"value": 26},{"fromBlock": 1337,"value": 2014223715}], 19,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 1337,"value": 6},{"fromBlock": 66,"value": 4},{"fromBlock": 0,"value": 96},{"fromBlock": 26,"value": 257},{"fromBlock": 2,"value": 4},{"fromBlock": 66,"value": 1338},{"fromBlock": 257,"value": 18},{"fromBlock": 5,"value": 26}], 28,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[2],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(2014223716, 2,{from: accounts[0]});
  });
});
