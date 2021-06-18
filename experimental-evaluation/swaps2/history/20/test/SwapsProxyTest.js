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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[9], [147,53,185,175,86,130,115,165,211,57,17,176,105,118,25,255,52,226,240,115,51,54,146,112,226,224,140,78,204,112,74,155],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([26,24,175,158,127,82,90,207,185,83,27,80,190,231,7,216,105,6,173,205,28,153,145,105,167,154,113,108,48,230,76,156],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([10,195,135,222,208,24,95,239,50,142,151,17,6,94,145,0,75,28,31,118,126,23,156,243,236,105,153,13,113,150,218,183], accounts[9], accounts[6],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[1],accounts[9],accounts[3],accounts[6]], accounts[2],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([226,56,153,213,33,64,26,125,196,93,53,73,27,51,13,247,90,98,186,136,146,147,145,122,210,101,76,178,137,154,137,28], accounts[6], accounts[0], 11,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([154,85,124,89,165,155,246,149,238,206,136,10,169,174,136,237,170,28,56,177,147,82,200,107,147,184,140,67,14,188,252,198], accounts[1], accounts[3], 256,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([172,200,82,112,205,22,38,221,150,251,8,94,36,46,40,91,246,211,214,29,106,164,179,168,113,231,170,48,166,30,57,122], accounts[5], accounts[8], 2014223716,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([200,3,137,76,183,71,151,1,172,1,38,46,74,119,218,229,42,0,180,88,189,144,183,134,116,11,225,91,53,13,166,3], accounts[5], accounts[6], 1,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([92,91,179,213,161,186,117,128,197,164,90,124,214,174,197,13,201,239,117,187,113,143,12,170,194,50,95,94,98,165,128,25], accounts[3], accounts[1],{from: accounts[0]});
  });
});
