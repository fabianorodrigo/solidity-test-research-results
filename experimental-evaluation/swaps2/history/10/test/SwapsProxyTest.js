const truffleAssert = require('truffle-assertions');
const Swaps = artifacts.require("Swaps");
const Vault = artifacts.require("Vault");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ProxySwaps = artifacts.require("ProxySwaps");

contract("contractProxySwaps",(accounts)=>{
    let contractProxySwaps = null;
  let trace = false;
  let contractSafeMath = null;
  let contractSwaps = null;
  let contractVault = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Swaps.link("SafeMath",contractSafeMath.address);
    contractSwaps = await Swaps.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Swaps.new({from: accounts[0]}');
    contractVault = await Vault.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Vault.new({from: accounts[0]}');
      ProxySwaps.link("SafeMath",contractSafeMath.address);
    contractProxySwaps = await ProxySwaps.new({ from: accounts[0] });
});
  
  it('Should execute test_allBrokersPercent(address,bytes32)', async () => {
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[2], [176,125,105,18,178,162,36,159,58,119,93,168,93,43,7,130,231,112,2,10,95,48,74,95,87,13,232,94,58,167,203,130],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([79,154,114,199,231,98,137,120,214,219,34,210,143,146,225,198,19,240,102,81,152,89,137,19,42,180,5,161,56,114,35,138],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([213,103,92,190,163,163,24,79,224,6,69,86,93,24,44,243,53,234,71,96,36,166,21,190,15,61,33,73,110,199,233,114], accounts[4], accounts[2],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[4]], accounts[9],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([129,137,65,153,67,52,114,152,113,222,96,74,221,223,81,16,75,27,16,47,191,245,108,78,139,225,207,133,101,244,234,42], accounts[0], accounts[5], 2,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([192,107,244,200,189,202,221,101,118,238,23,191,5,76,129,167,241,69,201,166,130,174,52,110,89,15,138,219,31,130,106,153], accounts[4], accounts[7], 9999,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([73,159,216,154,5,217,196,241,127,249,173,241,245,20,128,203,175,248,40,129,61,175,186,58,175,204,66,53,237,229,128,8], accounts[8], accounts[1], 4038714809,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([87,27,21,173,174,151,78,142,80,127,0,33,130,239,172,64,54,65,39,25,106,149,135,209,211,57,129,102,211,118,239,93], accounts[4], accounts[5], 1,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([7,162,147,174,160,34,196,181,86,254,119,75,6,33,43,9,105,19,23,250,206,86,109,35,10,209,96,189,123,160,37,45], accounts[9], accounts[8],{from: accounts[0]});
  });
});
