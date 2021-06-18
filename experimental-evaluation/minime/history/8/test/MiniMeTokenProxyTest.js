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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[3],1532892063,"PayableExample",2,"PayableExample",false,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[3],1532892063,"PayableExample",2,"PayableExample",false,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[5], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+413,"UsesExample",0,"MMT_0.2",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[5], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[0], accounts[9], 66,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+349,"7r3otr",64,"7r3otr",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[0], accounts[9], 66,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[7], 257,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+526,"RevertWithReason",26,"\x19Ethereum Signed Message:\n32",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[7], 257,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[7], 254,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+452,"ERC1820_ACCEPT_MAGIC",29,"7r3otr",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[1], accounts[7], 254,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 6,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 257,"value": 10000},{"fromBlock": 2014223716,"value": 2014223716},{"fromBlock": 10000,"value": 2},{"fromBlock": 3,"value": 2},{"fromBlock": 255,"value": 28},{"fromBlock": 66,"value": 1337},{"fromBlock": 10000,"value": 1338},{"fromBlock": 2014223716,"value": 254},{"fromBlock": 95,"value": 28},{"fromBlock": 65,"value": 1338},{"fromBlock": 0,"value": 97},{"fromBlock": 2014223714,"value": 2014223716},{"fromBlock": 257,"value": 255},{"fromBlock": 4,"value": 1532892064},{"fromBlock": 28,"value": 1532892062},{"fromBlock": 2014223715,"value": 1532892063},{"fromBlock": 96,"value": 1337},{"fromBlock": 19,"value": 4},{"fromBlock": 1337,"value": 2014223716},{"fromBlock": 1,"value": 4},{"fromBlock": 26,"value": 1},{"fromBlock": 255,"value": 3},{"fromBlock": 65,"value": 1532892064},{"fromBlock": 10001,"value": 0},{"fromBlock": 28,"value": 27},{"fromBlock": 1532892064,"value": 5},{"fromBlock": 2014223714,"value": 5},{"fromBlock": 18,"value": 1338},{"fromBlock": 1338,"value": 1337},{"fromBlock": 1336,"value": 3},{"fromBlock": 2014223715,"value": 2014223714},{"fromBlock": 2014223716,"value": 18},{"fromBlock": 4,"value": 1},{"fromBlock": 2014223714,"value": 1337},{"fromBlock": 2,"value": 255},{"fromBlock": 64,"value": 2014223716},{"fromBlock": 26,"value": 96},{"fromBlock": 2,"value": 26},{"fromBlock": 2014223714,"value": 97},{"fromBlock": 1336,"value": 1532892064},{"fromBlock": 27,"value": 66},{"fromBlock": 28,"value": 256},{"fromBlock": 3,"value": 0},{"fromBlock": 257,"value": 9999},{"fromBlock": 1532892063,"value": 10001},{"fromBlock": 27,"value": 1532892064},{"fromBlock": 5,"value": 26},{"fromBlock": 2014223714,"value": 255},{"fromBlock": 5,"value": 1532892063},{"fromBlock": 18,"value": 96},{"fromBlock": 2,"value": 257},{"fromBlock": 4,"value": 254},{"fromBlock": 29,"value": 0},{"fromBlock": 3,"value": 1532892063},{"fromBlock": 97,"value": 1532892064},{"fromBlock": 255,"value": 1532892064},{"fromBlock": 1336,"value": 1337},{"fromBlock": 1532892064,"value": 1},{"fromBlock": 97,"value": 10000},{"fromBlock": 2014223714,"value": 1337},{"fromBlock": 255,"value": 2014223714},{"fromBlock": 2014223714,"value": 95},{"fromBlock": 66,"value": 27},{"fromBlock": 95,"value": 255},{"fromBlock": 29,"value": 1337},{"fromBlock": 95,"value": 18}], 1532892064,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 1532892063,"value": 28},{"fromBlock": 97,"value": 1338},{"fromBlock": 64,"value": 28},{"fromBlock": 27,"value": 2014223715}], 0,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[9],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(2014223714, 2014223714,{from: accounts[0]});
  });
});
