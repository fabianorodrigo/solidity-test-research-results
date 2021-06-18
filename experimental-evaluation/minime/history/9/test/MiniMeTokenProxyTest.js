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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[0],3,"\x19Ethereum Signed Message:\n32",0,"PayableExample",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[0],3,"\x19Ethereum Signed Message:\n32",0,"PayableExample",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[2], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+977,"UsesExample",0,"kupd8n",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[2], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[8], 1338,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+816,"sztrec",2,"ERC1820_ACCEPT_MAGIC",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[8], 1338,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[1], 1336,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+43,"PayableExample",17,"PayableExample",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[9], accounts[1], 1336,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[0], accounts[8], 5,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+942,"MMT_0.2",254,"vudy4",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[0], accounts[8], 5,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 254,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 66,"value": 2014223716},{"fromBlock": 2014223714,"value": 19},{"fromBlock": 1532892063,"value": 64},{"fromBlock": 97,"value": 27},{"fromBlock": 10000,"value": 10000},{"fromBlock": 5,"value": 2014223716},{"fromBlock": 3,"value": 17},{"fromBlock": 10000,"value": 256},{"fromBlock": 26,"value": 2},{"fromBlock": 1338,"value": 28},{"fromBlock": 27,"value": 29},{"fromBlock": 10001,"value": 10000},{"fromBlock": 17,"value": 1},{"fromBlock": 1336,"value": 257},{"fromBlock": 27,"value": 96},{"fromBlock": 9999,"value": 1532892064},{"fromBlock": 5,"value": 18},{"fromBlock": 1532892063,"value": 28},{"fromBlock": 95,"value": 2},{"fromBlock": 97,"value": 257},{"fromBlock": 1,"value": 1338},{"fromBlock": 1338,"value": 1336},{"fromBlock": 5,"value": 19},{"fromBlock": 2014223714,"value": 28},{"fromBlock": 27,"value": 19},{"fromBlock": 66,"value": 18},{"fromBlock": 1337,"value": 1337},{"fromBlock": 2,"value": 17},{"fromBlock": 29,"value": 255},{"fromBlock": 255,"value": 2},{"fromBlock": 26,"value": 17},{"fromBlock": 257,"value": 0},{"fromBlock": 19,"value": 2014223714},{"fromBlock": 64,"value": 19},{"fromBlock": 1532892064,"value": 1337},{"fromBlock": 256,"value": 64},{"fromBlock": 1338,"value": 1532892062},{"fromBlock": 257,"value": 18},{"fromBlock": 19,"value": 1532892062},{"fromBlock": 255,"value": 10000},{"fromBlock": 6,"value": 95},{"fromBlock": 29,"value": 65},{"fromBlock": 18,"value": 2},{"fromBlock": 65,"value": 19},{"fromBlock": 254,"value": 1338},{"fromBlock": 1336,"value": 2},{"fromBlock": 65,"value": 6},{"fromBlock": 2,"value": 4},{"fromBlock": 5,"value": 257},{"fromBlock": 66,"value": 9999},{"fromBlock": 10000,"value": 4},{"fromBlock": 6,"value": 27},{"fromBlock": 5,"value": 18},{"fromBlock": 65,"value": 2014223714},{"fromBlock": 1,"value": 2014223715},{"fromBlock": 96,"value": 1},{"fromBlock": 257,"value": 27},{"fromBlock": 65,"value": 1338},{"fromBlock": 64,"value": 1336},{"fromBlock": 2,"value": 1},{"fromBlock": 2014223715,"value": 26},{"fromBlock": 1,"value": 1},{"fromBlock": 257,"value": 254},{"fromBlock": 1532892064,"value": 9999},{"fromBlock": 1532892063,"value": 1336},{"fromBlock": 29,"value": 28},{"fromBlock": 6,"value": 6},{"fromBlock": 254,"value": 1338},{"fromBlock": 64,"value": 2014223714},{"fromBlock": 2014223716,"value": 1336},{"fromBlock": 18,"value": 66},{"fromBlock": 1336,"value": 19},{"fromBlock": 19,"value": 95},{"fromBlock": 2,"value": 254},{"fromBlock": 95,"value": 28},{"fromBlock": 5,"value": 29},{"fromBlock": 1532892063,"value": 1338},{"fromBlock": 10001,"value": 256},{"fromBlock": 255,"value": 66},{"fromBlock": 65,"value": 65},{"fromBlock": 255,"value": 96},{"fromBlock": 1,"value": 10000},{"fromBlock": 65,"value": 2014223715},{"fromBlock": 254,"value": 1336},{"fromBlock": 2014223714,"value": 5},{"fromBlock": 97,"value": 1532892063},{"fromBlock": 1,"value": 10000},{"fromBlock": 96,"value": 1},{"fromBlock": 1336,"value": 2014223716},{"fromBlock": 29,"value": 1532892064},{"fromBlock": 1,"value": 1532892064},{"fromBlock": 2014223714,"value": 1336},{"fromBlock": 2,"value": 0},{"fromBlock": 2,"value": 66},{"fromBlock": 26,"value": 257},{"fromBlock": 1338,"value": 19},{"fromBlock": 1337,"value": 1532892062}], 28,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 6,"value": 0},{"fromBlock": 1336,"value": 18},{"fromBlock": 10000,"value": 2},{"fromBlock": 256,"value": 3},{"fromBlock": 2014223714,"value": 255},{"fromBlock": 26,"value": 2014223716},{"fromBlock": 97,"value": 19},{"fromBlock": 96,"value": 96},{"fromBlock": 95,"value": 64}], 1336,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[3],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(1337, 2014223716,{from: accounts[0]});
  });
});
