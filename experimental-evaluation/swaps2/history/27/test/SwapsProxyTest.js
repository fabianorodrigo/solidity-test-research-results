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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[8], [92,128,72,48,168,161,71,192,43,13,63,229,82,198,233,135,146,102,161,104,173,47,132,198,125,39,146,132,189,217,153,157],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([80,201,102,45,81,63,242,188,91,121,6,192,236,237,249,183,38,39,50,237,100,73,172,19,181,26,88,70,186,74,128,104],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([110,133,28,98,19,202,167,112,59,243,85,42,65,238,131,220,211,205,53,47,10,62,86,128,235,171,83,33,226,0,3,127], accounts[7], accounts[4],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[7],accounts[9],accounts[2],accounts[4],accounts[6],accounts[7],accounts[6]], accounts[2],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([0,126,96,73,197,9,37,95,118,71,236,19,119,15,139,167,3,218,10,132,153,237,61,27,89,235,33,192,115,125,176,240], accounts[1], accounts[7], 64,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([231,8,45,72,92,51,78,20,107,214,13,181,151,248,93,145,169,115,95,60,62,115,62,98,65,2,164,57,178,184,17,54], accounts[4], accounts[0], 95,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([224,24,131,91,133,187,56,231,32,46,222,10,219,0,202,137,196,24,202,85,247,19,78,215,38,119,214,219,17,9,205,52], accounts[3], accounts[3], 10,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([132,77,173,171,94,77,19,191,96,88,83,32,99,95,28,28,56,168,10,254,64,58,145,39,13,32,151,171,151,203,155,187], accounts[8], accounts[6], 95,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([193,198,28,97,145,130,52,232,0,70,35,19,190,169,30,126,219,229,174,22,77,199,136,198,32,94,2,239,10,0,220,27], accounts[6], accounts[1],{from: accounts[0]});
  });
});
