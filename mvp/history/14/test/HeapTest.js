const truffleAssert = require('truffle-assertions');
const Heap = artifacts.require("Heap");
const PlasmaMVP = artifacts.require("PlasmaMVP");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");

contract("Heap",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractHeap = null;
  let contractPlasmaMVP = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Heap.link("SafeMath",contractSafeMath.address);
    contractHeap = await Heap.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Heap.new({from:accounts[0]}');
    contractPlasmaMVP = await PlasmaMVP.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: PlasmaMVP.new({from:accounts[0]}');
  });
  
  it('Should execute insert(uint256) WHEN msg.sender==owner', async () => {
    let result = await contractHeap.insert(1532892064,{from: accounts[0]});
  });
  it('Should fail insert(uint256) when NOT comply with: msg.sender == owner', async () => {
    let result = await truffleAssert.fails(contractHeap.insert(1532892064,{from: accounts[9]}),'revert');
  });
  it('Should execute removeMax() WHEN msg.sender==owner,heap.length>1', async () => {
    let localHeap = await Heap.new({from:accounts[0]});
    let result = await localHeap.removeMax({from: accounts[0]});
  });
  it('Should fail removeMax() when NOT comply with: msg.sender == owner', async () => {
    let localHeap = await Heap.new({from:accounts[0]});
    let result = await truffleAssert.fails(localHeap.removeMax({from: accounts[9]}),'revert');
  });
  it('Should fail removeMax() when NOT comply with: heap.length > 1', async () => {
    let result = await truffleAssert.fails(contractHeap.removeMax({from: accounts[0]}),'revert');
  });
  it('Should execute getHeap()', async () => {
    let result = await contractHeap.getHeap({from: accounts[0]});
  });
  it('Should execute getMax()', async () => {
    let result = await contractHeap.getMax({from: accounts[0]});
  });
});
