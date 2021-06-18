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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],29,"3z2tja",64,"PayableExample",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[7],29,"3z2tja",64,"PayableExample",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[2], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+653,"PayableExample",27,"wcsxvq",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[7], accounts[2], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[9], 9999,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+181,"\x19Ethereum Signed Message:\n32",28,"RevertWithReason",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[9], 9999,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[2], 2,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+42,"ur5avl",26,"z7jl1u",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[2], 2,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[2], 65,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+382,"ur5avl",5,"z7jl1u",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[2], 65,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 18,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 256,"value": 2014223716},{"fromBlock": 95,"value": 17},{"fromBlock": 0,"value": 96},{"fromBlock": 0,"value": 254},{"fromBlock": 5,"value": 257},{"fromBlock": 2,"value": 2014223714},{"fromBlock": 10000,"value": 28},{"fromBlock": 29,"value": 257},{"fromBlock": 17,"value": 65},{"fromBlock": 2014223716,"value": 19},{"fromBlock": 95,"value": 10001},{"fromBlock": 254,"value": 2},{"fromBlock": 256,"value": 0},{"fromBlock": 1532892064,"value": 17},{"fromBlock": 29,"value": 29},{"fromBlock": 96,"value": 4},{"fromBlock": 66,"value": 28},{"fromBlock": 17,"value": 19},{"fromBlock": 95,"value": 29},{"fromBlock": 29,"value": 257},{"fromBlock": 5,"value": 26},{"fromBlock": 29,"value": 9999},{"fromBlock": 1338,"value": 27},{"fromBlock": 1336,"value": 1338},{"fromBlock": 64,"value": 26},{"fromBlock": 1,"value": 254},{"fromBlock": 1336,"value": 19},{"fromBlock": 66,"value": 256},{"fromBlock": 18,"value": 257},{"fromBlock": 18,"value": 254},{"fromBlock": 2014223715,"value": 1336},{"fromBlock": 257,"value": 1},{"fromBlock": 10001,"value": 28},{"fromBlock": 257,"value": 17},{"fromBlock": 64,"value": 9999},{"fromBlock": 17,"value": 96},{"fromBlock": 256,"value": 5},{"fromBlock": 97,"value": 97},{"fromBlock": 2014223716,"value": 1337},{"fromBlock": 1337,"value": 9999},{"fromBlock": 66,"value": 27},{"fromBlock": 29,"value": 17},{"fromBlock": 65,"value": 2},{"fromBlock": 1338,"value": 97},{"fromBlock": 256,"value": 66},{"fromBlock": 2014223715,"value": 6},{"fromBlock": 2014223716,"value": 4},{"fromBlock": 1532892064,"value": 9999},{"fromBlock": 10000,"value": 17},{"fromBlock": 97,"value": 1532892062},{"fromBlock": 1532892064,"value": 1532892062},{"fromBlock": 1336,"value": 256},{"fromBlock": 1338,"value": 17},{"fromBlock": 1336,"value": 2},{"fromBlock": 64,"value": 29},{"fromBlock": 3,"value": 9999},{"fromBlock": 17,"value": 1532892062},{"fromBlock": 96,"value": 2014223714},{"fromBlock": 10000,"value": 96},{"fromBlock": 256,"value": 65},{"fromBlock": 4,"value": 1532892064},{"fromBlock": 95,"value": 1532892062},{"fromBlock": 1,"value": 1},{"fromBlock": 19,"value": 9999},{"fromBlock": 4,"value": 255},{"fromBlock": 65,"value": 28},{"fromBlock": 257,"value": 27},{"fromBlock": 17,"value": 1336},{"fromBlock": 27,"value": 5},{"fromBlock": 2014223715,"value": 2014223716},{"fromBlock": 9999,"value": 5},{"fromBlock": 255,"value": 5},{"fromBlock": 5,"value": 1},{"fromBlock": 1532892064,"value": 95},{"fromBlock": 1532892062,"value": 19},{"fromBlock": 0,"value": 255},{"fromBlock": 1,"value": 28},{"fromBlock": 5,"value": 1337},{"fromBlock": 255,"value": 18},{"fromBlock": 26,"value": 0},{"fromBlock": 1532892064,"value": 29},{"fromBlock": 6,"value": 27},{"fromBlock": 2014223716,"value": 4},{"fromBlock": 3,"value": 257},{"fromBlock": 0,"value": 19},{"fromBlock": 1338,"value": 28},{"fromBlock": 2014223716,"value": 5},{"fromBlock": 2014223714,"value": 17},{"fromBlock": 18,"value": 27},{"fromBlock": 27,"value": 1532892063},{"fromBlock": 2014223716,"value": 5},{"fromBlock": 1336,"value": 1337},{"fromBlock": 97,"value": 1532892062},{"fromBlock": 2,"value": 10000},{"fromBlock": 27,"value": 29},{"fromBlock": 1532892064,"value": 64}], 1,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 65,"value": 66}], 10001,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[2],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(2014223714, 6,{from: accounts[0]});
  });
});
