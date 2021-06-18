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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[6], [104,114,29,55,162,61,239,38,18,65,248,219,50,19,225,188,13,1,147,59,126,172,148,17,194,37,76,190,37,16,125,187],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([131,82,229,223,17,186,190,45,54,193,191,160,28,226,68,253,84,144,69,16,41,75,203,125,213,78,154,178,21,115,103,182],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([61,91,238,16,234,228,121,18,49,179,177,242,75,107,185,153,253,10,191,100,119,252,191,92,160,144,63,56,157,135,73,184], accounts[5], accounts[4],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[1],accounts[2],accounts[9],accounts[9]], accounts[3],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([134,195,227,185,50,18,107,175,96,45,211,7,84,183,173,111,85,43,17,78,92,133,244,179,246,161,110,241,159,90,108,76], accounts[0], accounts[5], 256,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([218,102,124,6,124,104,3,88,132,61,64,58,240,67,166,218,225,18,222,240,198,89,204,129,225,135,255,250,108,21,203,238], accounts[0], accounts[4], 1532892063,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([181,44,35,211,97,170,225,77,199,66,166,247,155,50,203,44,46,248,174,156,36,86,128,186,126,250,57,202,224,230,198,206], accounts[8], accounts[6], 4038714810,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([173,217,144,126,57,119,17,96,61,199,55,82,250,149,206,68,219,21,6,93,118,252,135,13,239,134,164,244,151,110,35,48], accounts[3], accounts[3], 255,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([70,16,42,6,121,230,71,11,76,143,118,51,27,149,71,32,202,135,203,150,52,147,13,79,155,83,102,177,214,159,200,74], accounts[2], accounts[4],{from: accounts[0]});
  });
});
