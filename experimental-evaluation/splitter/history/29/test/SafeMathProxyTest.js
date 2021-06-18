const truffleAssert = require('truffle-assertions');
const SafeMath = artifacts.require("SafeMath");
const Splitter = artifacts.require("Splitter");
const Stoppable = artifacts.require("Stoppable");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("contractProxySafeMath",(accounts)=>{
    let contractProxySafeMath = null;
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
      ProxySafeMath.link('SafeMath', contractSafeMath.address);
    contractProxySafeMath = await ProxySafeMath.new({ from: accounts[0] });
});
  
  it('Should execute testmul(uint256,uint256) WHEN a==0', async () => {
    let result = await contractProxySafeMath.testmul(0, 10000,{from: accounts[0]});
  });
  it('Should execute testmul(uint256,uint256) WHEN a!=0', async () => {
    let result = await contractProxySafeMath.testmul(1337, 10000,{from: accounts[0]});
  });
  it('Should execute testdiv(uint256,uint256) WHEN b>0', async () => {
    let result = await contractProxySafeMath.testdiv(1338, 255,{from: accounts[0]});
  });
  it('Should fail testdiv(uint256,uint256) when NOT comply with: b > 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testdiv(1338, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testsub(uint256,uint256) WHEN b<=a', async () => {
    let result = await contractProxySafeMath.testsub(10000, 1337,{from: accounts[0]});
  });
  it('Should fail testsub(uint256,uint256) when NOT comply with: b <= a', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testsub(10000, 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute testadd(uint256,uint256)', async () => {
    let result = await contractProxySafeMath.testadd(10000, 9999,{from: accounts[0]});
  });
  it('Should execute testmod(uint256,uint256) WHEN b!=0', async () => {
    let result = await contractProxySafeMath.testmod(255, 1,{from: accounts[0]});
  });
  it('Should fail testmod(uint256,uint256) when NOT comply with: b != 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testmod(255, 0,{from: accounts[0]}),'revert');
  });
});
