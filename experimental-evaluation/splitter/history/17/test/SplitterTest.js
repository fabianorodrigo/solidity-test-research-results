const truffleAssert = require('truffle-assertions');
const SafeMath = artifacts.require("SafeMath");
const Splitter = artifacts.require("Splitter");
const Stoppable = artifacts.require("Stoppable");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("Splitter",(accounts)=>{
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
  });
  
  it('Should execute splitEther(address,address) WHEN msg.sender==_owner,msg.value>0,running==true,receiver1!=0x0000000000000000000000000000000000000000,receiver2!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractSplitter.splitEther(accounts[2], accounts[5],{from: accounts[0],value:10000});
  });
  it('Should fail splitEther(address,address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractSplitter.splitEther(accounts[2], accounts[5],{from: accounts[9],value:10000}),'revert');
  });
  it('Should fail splitEther(address,address) when NOT comply with: msg.value > 0', async () => {
    let result = await truffleAssert.fails(contractSplitter.splitEther(accounts[2], accounts[5],{from: accounts[0]}),'revert');
  });
  it('Should fail splitEther(address,address) when NOT comply with: running == true', async () => {
    await contractStoppable.transferOwnership(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSplitter.splitEther(accounts[2], accounts[5],{from: accounts[0],value:10000}),'revert');
  });
  it('Should fail splitEther(address,address) when NOT comply with: receiver1 != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractSplitter.splitEther("0x0000000000000000000000000000000000000000", accounts[5],{from: accounts[0],value:10000}),'revert');
  });
  it('Should fail splitEther(address,address) when NOT comply with: receiver2 != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractSplitter.splitEther(accounts[2], "0x0000000000000000000000000000000000000000",{from: accounts[0],value:10000}),'revert');
  });
  it('Should execute withdraw() WHEN running==true', async () => {
    let result = await contractSplitter.withdraw({from: accounts[0]});
  });
  it('Should fail withdraw() when NOT comply with: running == true', async () => {
    await contractStoppable.transferOwnership(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSplitter.withdraw({from: accounts[0]}),'revert');
  });
});
