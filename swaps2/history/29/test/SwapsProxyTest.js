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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[9], [167,179,44,70,157,107,73,119,147,90,172,147,56,82,169,122,244,200,116,35,158,132,15,203,85,110,223,157,144,51,107,104],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([170,158,133,138,125,52,8,116,105,255,253,53,121,213,114,93,20,1,125,235,114,120,223,242,171,100,94,52,53,64,169,65],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([26,201,89,25,59,184,221,25,57,63,103,224,61,251,227,243,112,130,125,74,181,7,160,230,82,119,8,199,111,240,157,68], accounts[4], accounts[1],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[4],accounts[4],accounts[8],accounts[3],accounts[9],accounts[8],accounts[5]], accounts[3],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([218,106,86,170,108,240,109,78,250,20,182,134,117,235,167,82,202,179,52,92,193,93,224,78,213,64,52,243,226,221,44,93], accounts[1], accounts[2], 1532892064,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([216,167,182,72,217,23,21,43,220,211,54,78,25,17,166,69,242,197,23,151,88,44,101,93,251,10,222,53,201,212,245,38], accounts[3], accounts[8], 1338,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([21,62,74,109,228,118,57,40,14,52,151,196,64,230,43,130,86,2,168,249,227,207,248,7,161,37,167,222,129,182,150,40], accounts[6], accounts[6], 2014223714,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([110,6,121,119,21,95,139,249,138,61,108,23,232,63,232,228,203,246,58,149,41,60,98,118,56,245,184,230,29,204,4,249], accounts[9], accounts[8], 1,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([76,104,230,85,5,59,73,182,60,24,48,57,227,148,142,207,110,63,84,164,169,30,168,128,171,217,225,170,98,203,222,189], accounts[5], accounts[8],{from: accounts[0]});
  });
});
