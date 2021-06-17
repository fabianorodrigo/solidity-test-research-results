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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[7], [97,159,14,104,111,184,131,158,150,64,181,200,190,63,92,116,95,40,251,12,184,69,45,134,110,222,57,135,174,65,48,157],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([14,153,17,223,225,22,14,238,130,3,38,10,125,245,163,112,194,191,229,155,186,192,195,82,111,52,186,150,75,191,81,157],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([213,45,159,148,240,175,190,101,163,155,179,187,243,54,115,149,178,47,25,104,112,38,39,131,193,237,22,149,119,237,227,141], accounts[0], accounts[5],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[7],accounts[5],accounts[8],accounts[6],accounts[9],accounts[3],accounts[8],accounts[8]], accounts[3],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([233,40,105,158,174,145,91,233,172,190,162,235,59,169,101,145,175,88,212,99,86,221,25,154,191,36,136,143,55,43,243,176], accounts[1], accounts[2], 0,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([9,163,195,177,146,125,195,43,82,133,173,241,148,7,212,176,29,5,91,52,72,111,38,21,38,169,152,235,194,221,22,94], accounts[6], accounts[5], 2014223714,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([215,146,218,77,159,222,183,120,29,5,223,102,51,192,155,103,19,3,226,34,171,192,241,26,133,204,62,144,194,14,63,76], accounts[8], accounts[9], 9999,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseOnlyInvestor==0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([145,222,227,247,18,166,193,253,83,81,210,84,46,118,8,192,75,230,98,104,112,178,245,72,150,39,198,27,130,76,123,29], accounts[2], accounts[2], 2,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([25,131,170,175,50,67,97,171,155,177,76,46,139,1,2,94,0,132,136,179,112,107,22,103,180,49,221,241,36,144,57,234], accounts[3], accounts[5],{from: accounts[0]});
  });
});
