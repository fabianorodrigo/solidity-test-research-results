const truffleAssert = require('truffle-assertions');
const MyERC20 = artifacts.require("MyERC20");
const SafeMath = artifacts.require("SafeMath");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("contractProxySafeMath",(accounts)=>{
    let contractProxySafeMath = null;
  let trace = false;
  let contractSafeMath = null;
  let contractMyERC20 = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    MyERC20.link("SafeMath",contractSafeMath.address);
    contractMyERC20 = await MyERC20.new("UsesExample","UsesExample",9,{from:accounts[2]});
    if(trace) console.log('SUCESSO: MyERC20.new("UsesExample","UsesExample",9,{from:accounts[2]}');
      ProxySafeMath.link('SafeMath', contractSafeMath.address);
    contractProxySafeMath = await ProxySafeMath.new({ from: accounts[0] });
});
  
  it('Should execute testadd(uint256,uint256)', async () => {
    let result = await contractProxySafeMath.testadd(27, 1532892063,{from: accounts[0]});
  });
  it('Should execute testsub(uint256,uint256) WHEN b<=a', async () => {
    let result = await contractProxySafeMath.testsub(6, 4,{from: accounts[0]});
  });
  it('Should fail testsub(uint256,uint256) when NOT comply with: b <= a', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testsub(6, 7,{from: accounts[0]}),'revert');
  });
  it('Should execute testmul(uint256,uint256) WHEN a==0', async () => {
    let result = await contractProxySafeMath.testmul(0, 0,{from: accounts[0]});
  });
  it('Should execute testmul(uint256,uint256) WHEN a!=0', async () => {
    let result = await contractProxySafeMath.testmul(254, 64,{from: accounts[0]});
  });
  it('Should execute testdiv(uint256,uint256) WHEN b>0', async () => {
    let result = await contractProxySafeMath.testdiv(999, 4,{from: accounts[0]});
  });
  it('Should fail testdiv(uint256,uint256) when NOT comply with: b > 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testdiv(999, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testmod(uint256,uint256) WHEN b!=0', async () => {
    let result = await contractProxySafeMath.testmod(17, 97,{from: accounts[0]});
  });
  it('Should fail testmod(uint256,uint256) when NOT comply with: b != 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testmod(17, 0,{from: accounts[0]}),'revert');
  });
});
