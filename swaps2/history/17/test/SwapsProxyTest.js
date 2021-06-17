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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[1], [144,166,8,44,237,240,197,167,36,120,16,178,1,244,230,58,48,210,130,243,167,32,83,191,233,99,206,242,180,153,113,88],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([120,168,105,29,149,116,164,39,224,61,31,152,66,98,162,93,237,145,117,243,187,138,5,135,202,111,122,192,197,229,231,193],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([146,131,136,8,181,54,23,252,36,220,98,74,233,141,165,82,88,137,19,252,37,35,147,155,14,148,66,153,2,81,253,94], accounts[4], accounts[2],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[8],accounts[9],accounts[7]], accounts[0],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([94,169,229,85,53,63,104,208,67,106,186,198,225,253,228,83,193,13,185,60,79,211,116,208,76,118,101,115,0,43,177,97], accounts[2], accounts[1], 26,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([212,128,247,224,128,70,66,249,76,188,188,59,123,19,98,26,181,128,78,178,224,122,57,240,35,222,183,228,172,37,32,199], accounts[1], accounts[7], 27,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([254,30,49,226,167,141,78,194,161,215,57,129,204,111,134,78,141,139,29,192,60,4,112,64,135,244,73,102,202,150,168,209], accounts[0], accounts[8], 9,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([133,22,197,147,0,165,194,0,201,50,56,64,164,184,117,142,67,112,27,10,181,18,96,3,254,147,114,190,92,251,80,239], accounts[8], accounts[1], 5,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([255,221,157,96,161,181,226,23,112,166,88,61,122,61,127,135,245,162,59,212,48,157,180,170,90,176,151,134,111,251,9,39], accounts[7], accounts[2],{from: accounts[0]});
  });
});
