const truffleAssert = require('truffle-assertions');
const SafeMath = artifacts.require("SafeMath");
const Splitter = artifacts.require("Splitter");
const Stoppable = artifacts.require("Stoppable");
const ProxySafeMath = artifacts.require("ProxySafeMath");
const ProxySplitter = artifacts.require("ProxySplitter");

contract("contractProxySplitter",(accounts)=>{
    let contractProxySplitter = null;
  let trace = false;
  let contractSafeMath = null;
  let contractSplitter = null;
  let contractStoppable = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Splitter.link("SafeMath",contractSafeMath.address);
    contractSplitter = await Splitter.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Splitter.new({from:accounts[0]}');
    contractStoppable = await Stoppable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Stoppable.new({from:accounts[0]}');
      ProxySplitter.link("SafeMath",contractSafeMath.address);
    contractProxySplitter = await ProxySplitter.new({ from: accounts[0] });
});
  
  it('Should execute testcreatePairHash(address,address) WHEN receiver1>receiver2', async () => {
    let result = await contractProxySplitter.testcreatePairHash(accounts[4], accounts[1],{from: accounts[0]});
  });
  it('Should execute testcreatePairHash(address,address) WHEN receiver1<=receiver2', async () => {
    let result = await contractProxySplitter.testcreatePairHash(accounts[3], accounts[6],{from: accounts[0]});
  });
});
