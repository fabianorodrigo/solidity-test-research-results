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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[8], [13,60,163,253,73,13,5,70,60,210,82,115,228,58,146,237,219,56,200,162,178,111,240,244,230,41,143,237,122,246,166,16],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([214,233,38,127,134,154,2,213,1,117,105,251,111,15,140,218,86,108,21,12,94,92,89,192,196,93,61,111,68,84,202,220],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([227,59,137,111,237,73,207,248,110,11,158,169,50,84,144,88,100,215,251,210,75,249,4,215,237,133,134,140,92,135,184,114], accounts[5], accounts[8],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[1],accounts[8],accounts[8],accounts[0],accounts[5],accounts[2],accounts[1]], accounts[7],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([125,238,159,190,96,25,5,205,193,181,90,59,124,172,51,0,114,239,197,40,0,203,224,10,215,128,159,153,237,53,246,229], accounts[4], accounts[7], 11,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([216,246,102,230,220,133,126,169,179,60,183,154,147,99,232,80,61,30,163,69,176,66,230,18,188,232,128,102,148,84,73,171], accounts[8], accounts[5], 66,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([27,237,56,104,18,183,9,95,79,120,130,161,226,217,131,125,48,231,34,255,238,245,48,190,142,111,144,173,8,151,200,51], accounts[1], accounts[9], 0,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([222,37,101,157,73,104,240,88,4,13,156,59,79,207,155,196,240,165,175,16,134,98,6,144,239,146,185,199,133,228,191,60], accounts[2], accounts[7], 1532892062,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([93,34,166,64,139,149,205,18,27,33,111,122,211,5,174,202,7,25,252,6,128,46,244,52,237,26,115,74,67,246,113,117], accounts[1], accounts[4],{from: accounts[0]});
  });
});
