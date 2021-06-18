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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[5], [50,190,190,29,92,80,234,243,80,131,20,90,242,29,105,33,20,45,181,228,167,21,86,116,255,75,205,134,162,140,185,58],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([110,220,179,76,124,109,81,71,102,122,93,126,32,1,5,7,105,91,144,59,63,200,221,114,35,168,145,13,182,88,254,176],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([243,251,85,116,72,18,119,97,62,215,129,236,66,59,133,160,240,152,126,233,150,95,71,43,254,116,238,178,144,18,34,199], accounts[8], accounts[3],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[3],accounts[4],accounts[3],accounts[5]], accounts[4],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([16,151,144,141,199,111,90,74,111,72,110,28,69,122,139,185,196,159,155,187,184,76,133,219,194,22,31,50,132,46,253,74], accounts[9], accounts[7], 1532892063,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([193,86,111,160,230,154,134,124,55,0,193,99,242,211,43,80,64,253,84,208,141,62,80,12,184,250,21,49,162,43,18,103], accounts[2], accounts[9], 256,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([181,36,182,149,48,237,62,138,8,210,102,112,71,23,57,247,211,238,17,165,239,29,29,97,143,91,59,85,144,80,216,206], accounts[8], accounts[7], 11,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([219,204,125,3,25,151,184,223,254,215,72,181,4,89,217,250,191,73,237,195,67,223,41,67,225,10,235,247,189,61,57,114], accounts[1], accounts[5], 4,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([181,251,39,129,14,121,123,248,94,135,105,54,33,80,223,112,163,202,80,165,164,155,242,51,100,183,16,52,255,43,110,66], accounts[4], accounts[6],{from: accounts[0]});
  });
});
