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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[6], [133,216,99,182,7,90,56,83,236,167,99,248,209,30,189,14,245,179,224,198,52,250,110,137,14,1,89,74,64,166,120,181],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([76,35,101,143,148,21,27,224,83,150,98,211,42,150,14,80,160,73,236,181,54,150,7,61,244,208,86,29,180,56,45,247],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([122,137,218,63,54,249,152,195,13,38,7,205,120,177,135,162,143,126,49,106,189,220,219,123,179,147,212,33,115,233,250,22], accounts[4], accounts[5],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[8],accounts[0],accounts[1],accounts[2],accounts[9],accounts[6]], accounts[4],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([15,130,163,83,168,14,123,244,255,224,132,247,179,150,121,224,3,74,18,239,156,4,198,174,181,224,131,143,180,202,199,128], accounts[0], accounts[3], 1338,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([45,30,132,13,56,161,81,191,238,63,171,198,135,59,179,33,3,121,38,88,127,217,213,227,177,43,133,7,175,101,89,42], accounts[5], accounts[4], 26,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([21,239,64,38,245,193,207,221,31,184,76,230,8,6,2,249,255,10,36,115,61,227,181,187,226,165,217,232,195,113,177,179], accounts[2], accounts[4], 26,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([163,92,228,26,143,179,91,110,241,86,186,86,156,117,234,121,170,69,103,1,105,22,246,29,96,111,191,201,242,108,115,183], accounts[9], accounts[1], 1532892064,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([239,7,212,248,88,98,127,37,24,61,71,0,248,60,128,27,248,32,182,185,113,156,37,136,227,8,175,160,155,16,38,87], accounts[5], accounts[0],{from: accounts[0]});
  });
});
