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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[4], [65,146,169,33,149,248,122,109,120,181,227,212,253,115,151,54,91,224,16,246,22,99,178,110,102,227,156,9,209,17,4,214],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([145,90,180,239,216,200,232,174,52,248,244,95,145,96,200,177,144,155,151,11,65,89,119,44,60,225,216,248,160,116,25,72],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([121,105,200,146,191,0,39,221,170,250,194,183,74,173,223,226,31,55,101,31,135,137,199,15,197,165,194,8,20,230,37,55], accounts[0], accounts[8],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[9],accounts[3],accounts[1],accounts[5]], accounts[6],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([103,80,92,126,105,109,33,255,184,181,212,189,131,173,61,183,75,190,146,138,117,135,61,19,211,1,97,113,231,82,241,204], accounts[4], accounts[3], 1532892064,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([27,59,229,148,174,20,103,237,240,100,112,180,172,151,141,219,78,165,41,254,199,15,99,206,207,6,255,46,135,152,45,209], accounts[5], accounts[8], 1,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([2,118,12,195,174,91,14,106,167,14,115,126,81,37,79,201,223,102,157,105,189,132,236,107,242,10,230,40,28,173,74,95], accounts[8], accounts[9], 1532892064,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([24,94,12,250,146,90,111,161,105,118,78,179,229,118,118,154,165,224,240,188,58,233,43,153,226,202,210,242,148,41,248,52], accounts[3], accounts[0], 96,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([178,46,89,34,113,176,183,8,120,228,23,121,126,166,77,84,8,201,41,211,125,240,172,59,85,163,49,193,81,59,189,12], accounts[4], accounts[9],{from: accounts[0]});
  });
});
