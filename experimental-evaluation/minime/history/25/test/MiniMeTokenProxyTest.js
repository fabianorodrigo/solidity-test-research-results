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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],0,"ERC1820_ACCEPT_MAGIC",0,"IsLibrary",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[1],0,"ERC1820_ACCEPT_MAGIC",0,"IsLibrary",true,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[7], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+822,"PayableExample",18,"Example",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[2], accounts[7], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[1], 19,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+438,"RevertWithReason",65,"PayableExample",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[8], accounts[1], 19,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[5], 29,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+732,"RevertWithReason",95,"PayableExample",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[6], accounts[5], 29,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[1], 1532892063,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+648,"Example",4,"\x19Ethereum Signed Message:\n32",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[1], 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 9999,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 1532892062,"value": 96},{"fromBlock": 2014223714,"value": 18},{"fromBlock": 64,"value": 3},{"fromBlock": 29,"value": 96},{"fromBlock": 2014223715,"value": 6},{"fromBlock": 255,"value": 65},{"fromBlock": 255,"value": 96},{"fromBlock": 2014223716,"value": 0},{"fromBlock": 3,"value": 3},{"fromBlock": 17,"value": 1337},{"fromBlock": 28,"value": 3},{"fromBlock": 6,"value": 1338},{"fromBlock": 9999,"value": 1532892064},{"fromBlock": 9999,"value": 2014223716},{"fromBlock": 27,"value": 27},{"fromBlock": 2,"value": 2014223715},{"fromBlock": 0,"value": 18},{"fromBlock": 1337,"value": 6},{"fromBlock": 257,"value": 10000},{"fromBlock": 4,"value": 254},{"fromBlock": 17,"value": 1532892063},{"fromBlock": 17,"value": 2},{"fromBlock": 97,"value": 1338},{"fromBlock": 254,"value": 10000},{"fromBlock": 1337,"value": 64},{"fromBlock": 2014223715,"value": 1337},{"fromBlock": 5,"value": 5},{"fromBlock": 96,"value": 6}], 65,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 1,"value": 255},{"fromBlock": 1532892062,"value": 254},{"fromBlock": 2014223716,"value": 95},{"fromBlock": 1337,"value": 2014223715},{"fromBlock": 1532892062,"value": 2014223714},{"fromBlock": 29,"value": 2014223716},{"fromBlock": 4,"value": 66},{"fromBlock": 2014223714,"value": 256}], 2014223715,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[0],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(1532892063, 64,{from: accounts[0]});
  });
});
