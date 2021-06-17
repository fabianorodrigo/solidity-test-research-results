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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[0], [247,49,13,146,46,74,113,54,185,92,242,176,160,235,242,156,53,84,136,99,67,181,193,18,21,17,250,228,175,117,127,122],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([152,115,29,13,159,30,97,230,182,103,4,163,28,220,228,80,252,32,129,140,130,73,129,23,127,9,174,50,5,168,197,214],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([8,142,4,172,176,29,195,222,79,250,50,63,99,62,209,189,215,90,76,177,35,17,64,67,206,20,81,106,120,100,95,92], accounts[4], accounts[1],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[9],accounts[7],accounts[6],accounts[1],accounts[2],accounts[2],accounts[8],accounts[4],accounts[3],accounts[5]], accounts[9],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([166,136,228,241,98,39,224,224,138,76,117,51,211,2,42,63,74,70,151,32,125,239,26,40,206,116,46,105,92,214,205,201], accounts[2], accounts[2], 256,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([161,94,22,153,72,148,124,100,162,164,43,44,92,220,162,40,193,10,9,131,237,122,125,146,177,127,17,160,145,182,86,218], accounts[7], accounts[4], 10000,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([15,226,141,194,92,179,162,235,254,187,77,221,84,3,12,39,101,43,210,103,63,60,112,45,171,152,80,46,25,153,207,223], accounts[1], accounts[1], 255,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([83,229,237,229,248,151,160,235,48,199,229,162,69,111,59,112,89,232,134,233,221,251,202,208,16,76,51,118,141,46,231,44], accounts[8], accounts[1], 257,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([41,165,94,77,23,46,99,65,121,85,60,179,220,194,169,86,7,169,104,143,134,151,187,67,7,182,109,121,222,25,147,245], accounts[9], accounts[1],{from: accounts[0]});
  });
});
