const truffleAssert = require('truffle-assertions');
const SafeMath = artifacts.require("SafeMath");
const Splitter = artifacts.require("Splitter");
const Stoppable = artifacts.require("Stoppable");
const ProxySafeMath = artifacts.require("ProxySafeMath");
const ProxySplitter = artifacts.require("ProxySplitter");

contract("Stoppable",(accounts)=>{
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
  
  it('Should execute runSwitch(bool) WHEN msg.sender==_owner', async () => {
    let result = await contractStoppable.runSwitch(true,{from: accounts[0]});
  });
  it('Should fail runSwitch(bool) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractStoppable.runSwitch(true,{from: accounts[9]}),'revert');
  });
  it('Should execute owner()', async () => {
    let result = await contractStoppable.owner({from: accounts[0]});
  });
  it('Should execute isOwner()', async () => {
    let result = await contractStoppable.isOwner({from: accounts[0]});
  });
  it('Should execute renounceOwnership() WHEN msg.sender==_owner', async () => {
    let result = await contractStoppable.renounceOwnership({from: accounts[0]});
  });
  it('Should fail renounceOwnership() when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractStoppable.renounceOwnership({from: accounts[9]}),'revert');
  });
  it('Should execute transferOwnership(address) WHEN msg.sender==_owner,newOwner!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractStoppable.transferOwnership(accounts[9],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractStoppable.transferOwnership(accounts[9],{from: accounts[9]}),'revert');
  });
  it('Should fail transferOwnership(address) when NOT comply with: newOwner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractStoppable.transferOwnership("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
});
