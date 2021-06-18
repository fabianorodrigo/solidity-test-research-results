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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[8], [39,33,230,233,28,218,174,225,90,125,185,79,23,118,215,160,32,195,104,40,228,2,161,121,185,224,75,200,111,140,185,200],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([43,116,211,106,201,250,26,46,220,236,97,135,53,248,7,154,155,29,11,126,12,101,117,167,157,95,199,59,152,13,124,64],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([101,79,139,219,50,204,110,103,68,161,254,222,203,121,253,149,126,187,243,161,153,211,22,93,195,19,91,45,85,102,76,15], accounts[2], accounts[5],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[4],accounts[7],accounts[6],accounts[9],accounts[0],accounts[6],accounts[5],accounts[4]], accounts[9],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([31,214,19,139,221,152,3,194,183,91,42,210,59,216,158,0,121,168,59,229,65,88,156,237,170,77,94,55,102,25,8,123], accounts[4], accounts[8], 5,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([236,205,48,202,60,143,158,135,92,244,38,52,172,92,152,52,100,114,60,211,70,160,129,254,80,36,138,85,108,9,204,22], accounts[2], accounts[8], 29,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([236,7,53,36,83,42,238,170,103,245,65,7,234,172,236,181,217,135,141,202,202,87,86,128,96,208,114,48,192,169,91,146], accounts[4], accounts[6], 4038714809,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([95,50,118,189,193,58,66,161,48,86,70,237,129,208,110,206,5,168,47,157,254,208,217,109,95,50,140,249,39,43,155,111], accounts[3], accounts[7], 9,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([104,165,130,190,60,88,130,31,199,2,150,144,165,69,8,20,182,17,60,220,120,165,32,133,90,225,169,139,230,115,83,150], accounts[8], accounts[4],{from: accounts[0]});
  });
});
