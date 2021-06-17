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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],2014223714,"Example",254,"\x19Ethereum Signed Message:\n32",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],2014223714,"Example",254,"\x19Ethereum Signed Message:\n32",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[6], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+681,"1noaig",2,"RevertWithReason",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[6], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[6], 66,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+866,"Example",26,"MMT_0.2",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[6], 66,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[2], 29,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+806,"RevertWithReason",29,"Example",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[2], 29,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[7], 27,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+671,"\x19Ethereum Signed Message:\n32",5,"PayableExample",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[7], 27,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 1532892062,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 2014223715,"value": 18},{"fromBlock": 4,"value": 1532892062},{"fromBlock": 96,"value": 5},{"fromBlock": 10000,"value": 5},{"fromBlock": 1337,"value": 256},{"fromBlock": 2014223714,"value": 28},{"fromBlock": 6,"value": 28},{"fromBlock": 4,"value": 95},{"fromBlock": 96,"value": 29},{"fromBlock": 29,"value": 97},{"fromBlock": 1337,"value": 64},{"fromBlock": 2014223715,"value": 1337},{"fromBlock": 18,"value": 17},{"fromBlock": 1338,"value": 2014223715},{"fromBlock": 4,"value": 64},{"fromBlock": 96,"value": 19},{"fromBlock": 64,"value": 255},{"fromBlock": 96,"value": 256},{"fromBlock": 9999,"value": 26},{"fromBlock": 18,"value": 18},{"fromBlock": 1338,"value": 18},{"fromBlock": 4,"value": 18},{"fromBlock": 1532892062,"value": 6},{"fromBlock": 1532892062,"value": 5},{"fromBlock": 2014223716,"value": 65},{"fromBlock": 26,"value": 1532892062},{"fromBlock": 65,"value": 27},{"fromBlock": 255,"value": 6},{"fromBlock": 6,"value": 10001},{"fromBlock": 10000,"value": 28},{"fromBlock": 97,"value": 9999},{"fromBlock": 254,"value": 6},{"fromBlock": 254,"value": 10000},{"fromBlock": 2014223714,"value": 18},{"fromBlock": 66,"value": 2014223714},{"fromBlock": 5,"value": 1337},{"fromBlock": 1532892062,"value": 2014223716},{"fromBlock": 18,"value": 26},{"fromBlock": 28,"value": 0},{"fromBlock": 2014223715,"value": 64},{"fromBlock": 10001,"value": 1532892062},{"fromBlock": 256,"value": 10001},{"fromBlock": 254,"value": 1532892063},{"fromBlock": 4,"value": 254},{"fromBlock": 26,"value": 1336},{"fromBlock": 257,"value": 96},{"fromBlock": 6,"value": 5},{"fromBlock": 254,"value": 6},{"fromBlock": 2014223716,"value": 5},{"fromBlock": 1338,"value": 2014223715},{"fromBlock": 6,"value": 1336},{"fromBlock": 1532892064,"value": 2},{"fromBlock": 18,"value": 257},{"fromBlock": 66,"value": 17},{"fromBlock": 6,"value": 29},{"fromBlock": 2014223714,"value": 29},{"fromBlock": 10000,"value": 10001},{"fromBlock": 97,"value": 1337},{"fromBlock": 96,"value": 2014223716},{"fromBlock": 1337,"value": 254},{"fromBlock": 95,"value": 29},{"fromBlock": 254,"value": 29},{"fromBlock": 2,"value": 9999},{"fromBlock": 1532892063,"value": 26},{"fromBlock": 29,"value": 29},{"fromBlock": 0,"value": 26},{"fromBlock": 254,"value": 17},{"fromBlock": 3,"value": 2014223716},{"fromBlock": 18,"value": 1532892062},{"fromBlock": 19,"value": 256},{"fromBlock": 1532892062,"value": 65},{"fromBlock": 6,"value": 1336},{"fromBlock": 29,"value": 256},{"fromBlock": 66,"value": 1532892063},{"fromBlock": 1532892063,"value": 2014223715},{"fromBlock": 6,"value": 254},{"fromBlock": 10000,"value": 1338},{"fromBlock": 5,"value": 256},{"fromBlock": 17,"value": 4},{"fromBlock": 26,"value": 1338},{"fromBlock": 4,"value": 65},{"fromBlock": 1338,"value": 2014223715},{"fromBlock": 18,"value": 254},{"fromBlock": 27,"value": 95},{"fromBlock": 6,"value": 27},{"fromBlock": 95,"value": 2014223715},{"fromBlock": 5,"value": 29},{"fromBlock": 0,"value": 66},{"fromBlock": 2,"value": 27},{"fromBlock": 6,"value": 6},{"fromBlock": 1338,"value": 96},{"fromBlock": 5,"value": 28},{"fromBlock": 6,"value": 256},{"fromBlock": 1,"value": 29},{"fromBlock": 2,"value": 18},{"fromBlock": 95,"value": 6},{"fromBlock": 29,"value": 6}], 1,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 28,"value": 65},{"fromBlock": 10000,"value": 97},{"fromBlock": 9999,"value": 29}], 254,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[8],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(1338, 2014223715,{from: accounts[0]});
  });
});
