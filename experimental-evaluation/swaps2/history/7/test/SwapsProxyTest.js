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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[9], [77,96,95,232,45,243,170,11,146,53,142,181,10,64,109,231,184,176,113,67,238,98,66,242,140,170,182,111,72,208,30,5],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([178,183,168,222,48,167,65,250,78,56,56,43,93,49,155,211,154,142,113,213,80,125,251,240,94,113,133,38,156,186,79,139],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([10,193,97,201,136,12,48,190,96,109,12,173,7,159,27,92,62,168,89,251,8,164,189,138,240,248,5,229,128,169,84,239], accounts[8], accounts[0],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[4],accounts[3],accounts[6],accounts[5],accounts[1],accounts[8]], accounts[6],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([24,185,177,171,169,91,217,2,181,195,12,138,251,242,98,200,102,42,79,214,242,70,71,2,20,216,159,165,151,124,60,203], accounts[5], accounts[8], 1338,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([231,63,203,34,155,113,81,40,54,193,210,6,241,228,206,23,68,156,239,5,35,106,205,214,198,101,9,181,178,76,158,231], accounts[4], accounts[7], 10000,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([143,201,9,164,15,102,174,196,109,55,180,71,158,128,110,178,58,139,150,65,192,7,159,31,227,83,6,178,143,95,187,106], accounts[6], accounts[5], 64,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([44,192,220,60,37,48,167,206,169,190,171,242,117,149,127,243,82,250,81,86,184,215,75,217,64,155,253,238,207,19,172,85], accounts[1], accounts[7], 65,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([222,64,9,198,179,155,105,11,249,79,40,67,176,74,31,221,44,193,231,133,232,254,80,1,133,124,110,241,40,114,86,206], accounts[4], accounts[6],{from: accounts[0]});
  });
});
