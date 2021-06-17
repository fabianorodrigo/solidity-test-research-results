const truffleAssert = require('truffle-assertions');
const SimpleCoin = artifacts.require("SimpleCoin");

contract("SimpleCoin",(accounts)=>{
  let trace = false;
  let contractSimpleCoin = null;
  beforeEach(async () => {
    contractSimpleCoin = await SimpleCoin.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: SimpleCoin.new({from:accounts[0]}');
  });
  
  it('Should execute balanceOf(address)', async () => {
    let result = await contractSimpleCoin.balanceOf(accounts[5],{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractSimpleCoin.allowance(accounts[1], accounts[9],{from: accounts[0]});
  });
  it('Should execute totalSupply()', async () => {
    let result = await contractSimpleCoin.totalSupply({from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN balances>=_value', async () => {
    let result = await contractSimpleCoin.transfer(accounts[6], 0,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN balances>=_value,remaining>=_value', async () => {
    let result = await contractSimpleCoin.transferFrom(accounts[9], accounts[5], 999999,{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractSimpleCoin.approve(accounts[1], 1000000,{from: accounts[0]});
  });
  it('Should execute transferOwnership(address) WHEN msg.sender==owner', async () => {
    let result = await contractSimpleCoin.transferOwnership(accounts[2],{from: accounts[0]});
  });
  it('Should fail transferOwnership(address) when NOT comply with: msg.sender == owner', async () => {
    let result = await truffleAssert.fails(contractSimpleCoin.transferOwnership(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should execute acceptOwnership() WHEN msg.sender==newOwner', async () => {
    await contractSimpleCoin.transferOwnership(accounts[3],{from:accounts[0]});
    let result = await contractSimpleCoin.acceptOwnership({from: accounts[3]});
  });
  it('Should fail acceptOwnership() when NOT comply with: msg.sender == newOwner', async () => {
    await contractSimpleCoin.transferOwnership(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSimpleCoin.acceptOwnership({from: accounts[9]}),'revert');
  });
  it('Should execute declineOwnership() WHEN msg.sender==newOwner', async () => {
    await contractSimpleCoin.transferOwnership(accounts[5],{from:accounts[0]});
    let result = await contractSimpleCoin.declineOwnership({from: accounts[5]});
  });
  it('Should fail declineOwnership() when NOT comply with: msg.sender == newOwner', async () => {
    await contractSimpleCoin.transferOwnership(accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractSimpleCoin.declineOwnership({from: accounts[9]}),'revert');
  });
});
