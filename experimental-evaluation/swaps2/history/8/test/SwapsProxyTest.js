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
    let result = await contractProxySwaps.test_allBrokersPercent(accounts[4], [44,133,45,37,6,199,94,180,35,129,182,16,76,3,173,30,20,31,108,147,105,121,168,141,226,81,14,158,209,52,129,43],{from: accounts[0]});
  });
  it('Should execute test_swap(bytes32) WHEN isSwapped!=true,isCancelled!=true,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_swap([117,108,187,229,43,213,246,186,120,149,1,193,196,99,142,85,133,106,136,77,94,225,71,189,155,223,226,92,234,197,114,226],{from: accounts[0]});
  });
  it('Should execute test_distribute(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_distribute([15,136,130,165,30,174,95,152,14,246,60,115,123,199,62,193,57,114,61,5,129,122,130,2,128,116,148,179,235,130,226,126], accounts[5], accounts[9],{from: accounts[0]});
  });
  it('Should execute test_removeInvestor(address[],address)', async () => {
    let result = await contractProxySwaps.test_removeInvestor([accounts[4],accounts[6],accounts[4],accounts[8],accounts[5],accounts[1],accounts[0],accounts[9],accounts[1],accounts[1]], accounts[8],{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses==_token,baseOnlyInvestor!=0x0000000000000000000000000000000000000000,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps,msg.sender==baseOnlyInvestor', async () => {
    let result = await contractProxySwaps.test_deposit([255,252,12,136,118,187,133,39,249,170,34,69,20,82,109,236,40,46,61,244,139,179,154,223,60,40,248,54,9,52,88,10], accounts[6], accounts[5], 1532892064,{from: 0});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([121,59,161,140,41,236,108,3,183,124,240,45,195,173,158,80,186,18,100,216,77,132,68,77,64,181,73,244,80,149,4,181], accounts[7], accounts[5], 10000,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall!=true,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([97,78,229,41,167,25,40,221,113,189,86,143,233,224,151,244,205,170,64,35,201,144,217,102,152,250,55,144,234,232,1,41], accounts[8], accounts[8], 66,{from: accounts[0]});
  });
  it('Should execute test_deposit(bytes32,address,address,uint) WHEN FunctionCall==true,baseAddresses!=_token,baseAddresses==_token,quoteAddresses==_token,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp<=expirationTimestamps', async () => {
    let result = await contractProxySwaps.test_deposit([108,44,117,117,241,121,115,235,8,61,136,213,151,182,14,21,243,135,201,115,221,5,137,183,42,207,148,233,207,2,251,54], accounts[6], accounts[7], 64,{from: accounts[0]});
  });
  it('Should execute test_isInvestor(bytes32,address,address)', async () => {
    let result = await contractProxySwaps.test_isInvestor([32,95,69,119,162,159,66,249,34,213,30,86,95,3,1,165,182,205,79,66,124,29,21,20,60,13,240,202,114,183,237,67], accounts[1], accounts[7],{from: accounts[0]});
  });
});
