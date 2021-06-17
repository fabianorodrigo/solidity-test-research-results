const truffleAssert = require('truffle-assertions');
const MerkleShip = artifacts.require("MerkleShip");
const SafeMath = artifacts.require("SafeMath");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("contractProxySafeMath",(accounts)=>{
    let contractProxySafeMath = null;
  let trace = false;
  let contractSafeMath = null;
  let contractMerkleShip = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    MerkleShip.link("SafeMath",contractSafeMath.address);
    contractMerkleShip = await MerkleShip.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MerkleShip.new({from:accounts[0]}');
      ProxySafeMath.link('SafeMath', contractSafeMath.address);
    contractProxySafeMath = await ProxySafeMath.new({ from: accounts[0] });
});
  
  it('Should execute testmul(uint256,uint256) WHEN a==0', async () => {
    let result = await contractProxySafeMath.testmul(0, 0,{from: accounts[0]});
  });
  it('Should execute testmul(uint256,uint256) WHEN a!=0', async () => {
    let result = await contractProxySafeMath.testmul(64, 1,{from: accounts[0]});
  });
  it('Should execute testdiv(uint256,uint256) WHEN b>0', async () => {
    let result = await contractProxySafeMath.testdiv(11, 4,{from: accounts[0]});
  });
  it('Should fail testdiv(uint256,uint256) when NOT comply with: b > 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testdiv(11, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testsub(uint256,uint256) WHEN b<=a', async () => {
    let result = await contractProxySafeMath.testsub(101, 48,{from: accounts[0]});
  });
  it('Should fail testsub(uint256,uint256) when NOT comply with: b <= a', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testsub(101, 102,{from: accounts[0]}),'revert');
  });
  it('Should execute testadd(uint256,uint256)', async () => {
    let result = await contractProxySafeMath.testadd(47, 3,{from: accounts[0]});
  });
  it('Should execute testmod(uint256,uint256) WHEN b!=0', async () => {
    let result = await contractProxySafeMath.testmod(48, 101,{from: accounts[0]});
  });
  it('Should fail testmod(uint256,uint256) when NOT comply with: b != 0', async () => {
    let result = await truffleAssert.fails(contractProxySafeMath.testmod(48, 0,{from: accounts[0]}),'revert');
  });
});
