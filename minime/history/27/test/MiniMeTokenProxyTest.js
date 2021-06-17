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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],256,"IsLibrary",26,"MMT_0.2",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],256,"IsLibrary",26,"MMT_0.2",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[8], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+99,"ujyhoo",6,"r23h6g",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[8], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[3], 96,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+634,"\x19Ethereum Signed Message:\n32",3,"gqpz8k",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[3], 96,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[2], 1336,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+787,"IsLibrary",26,"r23h6g",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[2], 1336,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[0], 1337,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+356,"UsesExample",6,"r23h6g",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[0], 1337,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 17,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 1,"value": 66},{"fromBlock": 29,"value": 26},{"fromBlock": 2014223716,"value": 18},{"fromBlock": 29,"value": 97},{"fromBlock": 28,"value": 1532892064},{"fromBlock": 1532892064,"value": 10000},{"fromBlock": 66,"value": 5},{"fromBlock": 1532892062,"value": 65},{"fromBlock": 257,"value": 6},{"fromBlock": 3,"value": 66},{"fromBlock": 26,"value": 3},{"fromBlock": 66,"value": 64},{"fromBlock": 95,"value": 4},{"fromBlock": 0,"value": 254},{"fromBlock": 97,"value": 3},{"fromBlock": 6,"value": 3},{"fromBlock": 1338,"value": 66},{"fromBlock": 27,"value": 28},{"fromBlock": 256,"value": 256},{"fromBlock": 1532892064,"value": 18},{"fromBlock": 1532892064,"value": 18},{"fromBlock": 66,"value": 29},{"fromBlock": 27,"value": 4},{"fromBlock": 0,"value": 10000},{"fromBlock": 0,"value": 19},{"fromBlock": 2,"value": 66},{"fromBlock": 0,"value": 27},{"fromBlock": 2014223716,"value": 1},{"fromBlock": 1336,"value": 255},{"fromBlock": 1336,"value": 2014223716},{"fromBlock": 2014223716,"value": 6},{"fromBlock": 1,"value": 27},{"fromBlock": 257,"value": 1532892064},{"fromBlock": 97,"value": 1532892062},{"fromBlock": 64,"value": 1532892064},{"fromBlock": 97,"value": 97},{"fromBlock": 1532892063,"value": 96},{"fromBlock": 96,"value": 66},{"fromBlock": 96,"value": 0},{"fromBlock": 2014223716,"value": 66},{"fromBlock": 4,"value": 254},{"fromBlock": 1337,"value": 1532892064},{"fromBlock": 97,"value": 257},{"fromBlock": 96,"value": 3},{"fromBlock": 17,"value": 95},{"fromBlock": 1336,"value": 2014223715},{"fromBlock": 27,"value": 29},{"fromBlock": 1532892063,"value": 1337},{"fromBlock": 97,"value": 1337},{"fromBlock": 254,"value": 66},{"fromBlock": 96,"value": 97},{"fromBlock": 3,"value": 1336},{"fromBlock": 1,"value": 1532892063},{"fromBlock": 2,"value": 10001},{"fromBlock": 1532892064,"value": 0},{"fromBlock": 2014223716,"value": 18},{"fromBlock": 1336,"value": 1337},{"fromBlock": 255,"value": 255},{"fromBlock": 1337,"value": 2},{"fromBlock": 1532892063,"value": 1},{"fromBlock": 1,"value": 97},{"fromBlock": 1337,"value": 255},{"fromBlock": 9999,"value": 2014223714},{"fromBlock": 10000,"value": 1532892062},{"fromBlock": 17,"value": 3},{"fromBlock": 18,"value": 97}], 97,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 9999,"value": 1336},{"fromBlock": 28,"value": 18},{"fromBlock": 1336,"value": 5}], 26,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[2],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(1337, 65,{from: accounts[0]});
  });
});
