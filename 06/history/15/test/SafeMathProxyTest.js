const truffleAssert = require('truffle-assertions');
const SafeMath = artifacts.require("SafeMath");
const SimpleCrowdfund = artifacts.require("SimpleCrowdfund");
const SimpleToken = artifacts.require("SimpleToken");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("contractProxySafeMath",(accounts)=>{
    let contractProxySafeMath = null;
  let trace = false;
  let contractSafeMath = null;
  let contractSimpleToken = null;
  let contractSimpleCrowdfund = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    SimpleToken.link("SafeMath",contractSafeMath.address);
    contractSimpleToken = await SimpleToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SimpleToken.new({from: accounts[0]}');
    contractSimpleCrowdfund = await SimpleCrowdfund.new(2001,4,{from:accounts[0]});
    if(trace) console.log('SUCESSO: SimpleCrowdfund.new(2001,4,{from:accounts[0]}');
      ProxySafeMath.link('SafeMath', contractSafeMath.address);
    contractProxySafeMath = await ProxySafeMath.new({ from: accounts[0] });
});
  
  it('Should execute testadd(uint256,uint256)', async () => {
    let result = await contractProxySafeMath.testadd(18, 9,{from: accounts[0]});
  });
  it('Should execute testsub(uint256,uint256) WHEN b<=a', async () => {
    let result = await contractProxySafeMath.testsub(1001, 5,{from: accounts[0]});
  });
  it('Should fail testsub(uint256,uint256) when NOT comply with: b <= a', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testsub(1001, 1002,{from: accounts[0]}),'revert');
  });
  it('Should execute testmul(uint256,uint256) WHEN a==0', async () => {
    let result = await contractProxySafeMath.testmul(0, 1999,{from: accounts[0]});
  });
  it('Should execute testmul(uint256,uint256) WHEN a!=0', async () => {
    let result = await contractProxySafeMath.testmul(4, 1999,{from: accounts[0]});
  });
  it('Should execute testdiv(uint256,uint256) WHEN b>0', async () => {
    let result = await contractProxySafeMath.testdiv(7, 5,{from: accounts[0]});
  });
  it('Should fail testdiv(uint256,uint256) when NOT comply with: b > 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testdiv(7, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testmod(uint256,uint256) WHEN b!=0', async () => {
    let result = await contractProxySafeMath.testmod(9, 1001,{from: accounts[0]});
  });
  it('Should fail testmod(uint256,uint256) when NOT comply with: b != 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testmod(9, 0,{from: accounts[0]}),'revert');
  });
});
