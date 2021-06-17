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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[0], [28,151,218,102,190,22,67,235,244,156,15,209,189,88,212,57,199,48,41,48,141,24,212,67,6,243,55,108,79,79,135,127],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([34,57,192,180,23,67,32,229,15,58,248,103,37,167,103,142,235,9,246,116,94,81,166,167,25,4,47,27,193,209,118,10],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([156,167,96,173,139,3,234,223,38,164,61,14,104,168,123,250,35,168,108,115,245,158,245,219,140,177,42,72,71,33,32,193], accounts[5], accounts[3],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[0],accounts[7],accounts[8],accounts[4]], accounts[4],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([28,124,217,10,198,100,177,252,158,184,41,254,194,188,226,232,13,51,197,108,161,5,250,46,166,116,178,120,7,56,170,60], accounts[5], accounts[5], 26,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([132,8,104,188,42,35,89,238,40,72,79,156,93,44,34,1,10,210,192,174,179,241,18,118,209,242,149,4,108,214,106,49], accounts[0], accounts[0], 2014223716,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([68,228,169,19,46,199,54,27,213,94,45,25,231,38,140,85,206,13,106,163,171,224,81,205,107,12,55,81,29,32,102,104], accounts[8], accounts[8], 6,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([255,155,135,90,26,88,119,198,87,160,192,179,130,246,52,157,71,90,213,126,90,248,101,85,136,33,194,186,119,123,183,57], accounts[3], accounts[4], 10000,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([247,49,65,68,97,249,1,202,186,80,60,5,243,249,126,235,173,131,88,32,192,35,117,15,247,217,126,159,90,142,162,226], accounts[9], accounts[6],{from: accounts[0]});
  });
});
