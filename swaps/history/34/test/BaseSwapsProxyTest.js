const truffleAssert = require('truffle-assertions');
const BaseSwaps = artifacts.require("BaseSwaps");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ProxyBaseSwaps = artifacts.require("ProxyBaseSwaps");

contract("contractProxyBaseSwaps",(accounts)=>{
    let contractProxyBaseSwaps = null;
  let trace = false;
  let contractSafeMath = null;
  let contractBaseSwaps = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    BaseSwaps.link("SafeMath",contractSafeMath.address);
    contractBaseSwaps = await BaseSwaps.new(accounts[9],accounts[2],accounts[0],64,255,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+376,{from:accounts[0]});
    if(trace) console.log('SUCESSO: BaseSwaps.new(accounts[9],accounts[2],accounts[0],64,255,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+376,{from:accounts[0]}');
      ProxyBaseSwaps.link("SafeMath",contractSafeMath.address);
    contractProxyBaseSwaps = await ProxyBaseSwaps.new(accounts[9],accounts[2],accounts[0],64,255,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+376,{from:accounts[0]});
});
  
  it('Should execute test_refund(address) WHEN isSwapped!=true', async () => {
    let result = await contractProxyBaseSwaps.test_refund(accounts[3],{from: accounts[0]});
  });
  it('Should fail test_refund(address) when NOT comply with: isSwapped != true', async () => {
    let localcontractProxyBaseSwaps = await ProxyBaseSwaps.new(accounts[9],accounts[2],"0x0000000000000000000000000000000000000000",1337,2014223714,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+500,{from:accounts[0]});
    await localcontractProxyBaseSwaps.sendTransaction({from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyBaseSwaps.test_refund(accounts[3],{from: accounts[0]}),'revert');
  });
  it('Should execute test_swap() WHEN isSwapped!=true,isCancelled!=true,raised==limits,raised==limits,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamp', async () => {
    let result = await contractProxyBaseSwaps.test_swap({from: accounts[0]});
  });
  it('Should fail test_swap() when NOT comply with: isSwapped != true', async () => {
    let localcontractProxyBaseSwaps = await ProxyBaseSwaps.new(accounts[6],"0x0000000000000000000000000000000000000000",accounts[6],64,4038714810,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+202,{from:accounts[0]});
    await localcontractProxyBaseSwaps.sendTransaction({from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyBaseSwaps.test_swap({from: accounts[0]}),'revert');
  });
  it('Should fail test_swap() when NOT comply with: isCancelled != true', async () => {
    await contractProxyBaseSwaps.transferOwnership(accounts[4],{from:accounts[0]});
    await contractProxyBaseSwaps.cancel({from:accounts[0]});
    let result = await truffleAssert.fails(contractProxyBaseSwaps.test_swap({from: accounts[0]}),'revert');
  });
  it('Should execute test_distribute(address,address)', async () => {
    let result = await contractProxyBaseSwaps.test_distribute(accounts[0], accounts[7],{from: accounts[0]});
  });
  it('Should execute test_sendTokens(address,address,uint) WHEN _token==0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyBaseSwaps.test_sendTokens("0x0000000000000000000000000000000000000000", accounts[3], 2014223716,{from: accounts[0]});
  });
  it('Should execute test_sendTokens(address,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyBaseSwaps.test_sendTokens(accounts[6], accounts[5], 4038714811,{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxyBaseSwaps.test_removeInvestor([accounts[5]], accounts[5],{from: accounts[0]});
  });
  it('Should execute test_depositEther(uint) WHEN quoteAddress==0x0000000000000000000000000000000000000000,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamp', async () => {
    let result = await contractProxyBaseSwaps.test_depositEther(1337,{from: accounts[0]});
  });
  it('Should execute test_depositTokens(address,uint) WHEN baseAddress==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamp', async () => {
    let result = await contractProxyBaseSwaps.test_depositTokens(accounts[9], 66,{from: accounts[0]});
  });
  it('Should execute test_deposit(address,address,uint) WHEN FunctionCall!=true,baseAddress==_token,raised<limits,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamp', async () => {
    let result = await contractProxyBaseSwaps.test_deposit(accounts[9], accounts[2], 5,{from: accounts[0]});
  });
  it('Should execute test_deposit(address,address,uint) WHEN FunctionCall==true,quoteAddress==_token,raised<limits,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamp', async () => {
    let result = await contractProxyBaseSwaps.test_deposit(accounts[3], accounts[6], 256,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(address,address)', async () => {
    let result = await contractProxyBaseSwaps.test_isInvestor(accounts[4], accounts[2],{from: accounts[0]});
  });
});
