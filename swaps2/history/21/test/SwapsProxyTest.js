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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[5], [109,98,94,156,228,157,176,229,49,162,192,36,8,80,153,240,213,249,97,167,39,212,160,252,93,89,185,0,28,46,249,59],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([177,22,229,44,33,55,75,197,94,60,88,177,241,94,130,164,2,61,167,112,114,222,154,71,23,245,215,188,223,232,98,176],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([154,172,128,116,214,195,42,235,103,77,247,51,130,91,106,26,55,183,109,239,193,161,101,163,142,162,9,240,138,234,38,42], accounts[1], accounts[2],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[1],accounts[8],accounts[5],accounts[9],accounts[6],accounts[3],accounts[0],accounts[3]], accounts[9],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([34,109,176,15,232,68,174,120,129,129,214,203,98,211,72,128,207,34,212,167,173,28,115,196,50,216,134,6,208,167,190,230], accounts[8], accounts[6], 9,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([59,130,118,189,180,157,125,1,167,147,107,43,66,103,141,54,179,120,51,87,28,214,32,17,156,155,17,120,138,77,181,154], accounts[4], accounts[4], 6,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([77,140,44,206,18,240,0,95,127,225,94,10,17,52,194,247,139,58,15,117,187,100,198,76,71,159,193,67,138,59,236,247], accounts[7], accounts[6], 29,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([77,124,35,168,72,62,79,4,117,219,143,94,70,40,109,169,77,22,100,31,15,129,72,160,58,149,45,236,16,170,185,127], accounts[7], accounts[7], 0,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([8,15,185,63,10,141,224,59,221,99,17,249,150,45,96,141,53,69,158,197,15,24,66,34,134,3,206,112,214,135,58,93], accounts[3], accounts[7],{from: accounts[0]});
  });
});
