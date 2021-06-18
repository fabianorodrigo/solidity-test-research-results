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
    contractMiniMeToken = await MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[8],1532892064,"\x19Ethereum Signed Message:\n32",96,"\x19Ethereum Signed Message:\n32",true,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MiniMeToken.new(contractMiniMeTokenFactory.address,accounts[8],1532892064,"\x19Ethereum Signed Message:\n32",96,"\x19Ethereum Signed Message:\n32",true,{from:accounts[0]}');
      contractProxyMiniMeToken = await ProxyMiniMeToken.new({ from: accounts[0] });
});
  
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount==0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[9], 0,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+461,"ERC1820_ACCEPT_MAGIC",3,"MMT_0.2",true,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[5], accounts[9], 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN _amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[0], 1337,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+985,"pd79of",28,"pd79of",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[3], accounts[0], 1337,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall==true,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[2], 2014223715,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+764,"Example",17,"Example",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[4], accounts[2], 2014223715,{from: accounts[0]}),'revert');
  });
  it('Should execute testdoTransfer(address,address,uint) WHEN FunctionCall!=true,_amount!=0,parentSnapShotBlock<block.number', async () => {
    let result = await contractProxyMiniMeToken.testdoTransfer(accounts[0], accounts[9], 6,{from: accounts[0]});
  });
  it('Should fail testdoTransfer(address,address,uint) when NOT comply with: parentSnapShotBlock < (await web3.eth.getBlockNumber())', async () => {
    let localcontractProxyMiniMeToken = await ProxyMiniMeToken.new(contractMiniMeTokenFactory.address,contractMiniMeToken.address,(await web3.eth.getBlockNumber())+956,"UsesExample",17,"ERC1820_ACCEPT_MAGIC",false,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyMiniMeToken.testdoTransfer(accounts[0], accounts[9], 6,{from: accounts[0]}),'revert');
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length==0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([], 27,{from: accounts[0]});
  });
  it('Should execute testgetValueAt(MiniMeToken.Checkpoint[],uint) WHEN checkpoints.length!=0', async () => {
    let result = await contractProxyMiniMeToken.testgetValueAt([{"fromBlock": 29,"value": 10001},{"fromBlock": 26,"value": 1532892062},{"fromBlock": 257,"value": 0},{"fromBlock": 4,"value": 2014223716},{"fromBlock": 97,"value": 19},{"fromBlock": 2014223714,"value": 1}], 17,{from: accounts[0]});
  });
  it('Should execute testupdateValueAtNow(MiniMeToken.Checkpoint[],uint)', async () => {
    let result = await contractProxyMiniMeToken.testupdateValueAtNow([{"fromBlock": 257,"value": 1532892064},{"fromBlock": 28,"value": 29},{"fromBlock": 1532892063,"value": 28},{"fromBlock": 1532892062,"value": 64},{"fromBlock": 28,"value": 254},{"fromBlock": 1,"value": 257},{"fromBlock": 1336,"value": 10000},{"fromBlock": 1336,"value": 1337},{"fromBlock": 4,"value": 64},{"fromBlock": 29,"value": 10000}], 2014223715,{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract("0x0000000000000000000000000000000000000000",{from: accounts[0]});
  });
  it('Should execute testisContract(address) WHEN _addr!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMiniMeToken.testisContract(accounts[8],{from: accounts[0]});
  });
  it('Should execute testmin(uint,uint)', async () => {
    let result = await contractProxyMiniMeToken.testmin(256, 1532892062,{from: accounts[0]});
  });
});
