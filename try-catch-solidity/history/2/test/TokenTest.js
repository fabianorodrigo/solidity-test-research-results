const truffleAssert = require('truffle-assertions');
const Example = artifacts.require("Example");
const SafeMath = artifacts.require("SafeMath");
const Token = artifacts.require("Token");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("Token",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractToken = null;
  let contractExample = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Token.link("SafeMath",contractSafeMath.address);
    contractToken = await Token.new({from:accounts[8]});
    if(trace) console.log('SUCESSO: Token.new({from:accounts[8]}');
    contractExample = await Example.new(contractToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Example.new(contractToken.address,{from:accounts[0]}');
  });
  
  it('Should execute totalSupply()', async () => {
    let result = await contractToken.totalSupply({from: accounts[0]});
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractToken.balanceOf(accounts[9],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,recipient!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractToken.transfer(accounts[9], 999,{from: accounts[6]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.transfer(accounts[9], 999,{from: 0}),'revert');
  });
  it('Should fail transfer(address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.transfer("0x0000000000000000000000000000000000000000", 999,{from: accounts[6]}),'revert');
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractToken.allowance(accounts[3], accounts[9],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractToken.approve(accounts[6], 10000,{from: accounts[6]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.approve(accounts[6], 10000,{from: 0}),'revert');
  });
  it('Should fail approve(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.approve("0x0000000000000000000000000000000000000000", 10000,{from: accounts[6]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN sender!=0x0000000000000000000000000000000000000000,recipient!=0x0000000000000000000000000000000000000000,sender!=0x0000000000000000000000000000000000000000,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractToken.transferFrom(accounts[1], accounts[7], 6,{from: accounts[3]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.transferFrom("0x0000000000000000000000000000000000000000", accounts[7], 6,{from: accounts[3]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.transferFrom(accounts[1], "0x0000000000000000000000000000000000000000", 6,{from: accounts[3]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.transferFrom("0x0000000000000000000000000000000000000000", accounts[7], 6,{from: accounts[3]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.transferFrom(accounts[1], accounts[7], 6,{from: 0}),'revert');
  });
  it('Should execute increaseAllowance(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractToken.increaseAllowance(accounts[8], 2,{from: accounts[3]});
  });
  it('Should fail increaseAllowance(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.increaseAllowance(accounts[8], 2,{from: 0}),'revert');
  });
  it('Should fail increaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.increaseAllowance("0x0000000000000000000000000000000000000000", 2,{from: accounts[3]}),'revert');
  });
  it('Should execute decreaseAllowance(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractToken.decreaseAllowance(accounts[0], 10001,{from: accounts[8]});
  });
  it('Should fail decreaseAllowance(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.decreaseAllowance(accounts[0], 10001,{from: 0}),'revert');
  });
  it('Should fail decreaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.decreaseAllowance("0x0000000000000000000000000000000000000000", 10001,{from: accounts[8]}),'revert');
  });
});
