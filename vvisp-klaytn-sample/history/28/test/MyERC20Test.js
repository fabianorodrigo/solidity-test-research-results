const truffleAssert = require('truffle-assertions');
const MyERC20 = artifacts.require("MyERC20");
const SafeMath = artifacts.require("SafeMath");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("MyERC20",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractMyERC20 = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    MyERC20.link("SafeMath",contractSafeMath.address);
    contractMyERC20 = await MyERC20.new("RevertWithReason","UsesExample",64,{from:accounts[4]});
    if(trace) console.log('SUCESSO: MyERC20.new("RevertWithReason","UsesExample",64,{from:accounts[4]}');
  });
  
  it('Should execute name()', async () => {
    let result = await contractMyERC20.name({from: accounts[0]});
  });
  it('Should execute symbol()', async () => {
    let result = await contractMyERC20.symbol({from: accounts[0]});
  });
  it('Should execute decimals()', async () => {
    let result = await contractMyERC20.decimals({from: accounts[0]});
  });
  it('Should execute totalSupply()', async () => {
    let result = await contractMyERC20.totalSupply({from: accounts[0]});
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractMyERC20.balanceOf(accounts[7],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,recipient!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.transfer(accounts[0], 257,{from: accounts[6]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transfer(accounts[0], 257,{from: 0}),'revert');
  });
  it('Should fail transfer(address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transfer("0x0000000000000000000000000000000000000000", 257,{from: accounts[6]}),'revert');
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractMyERC20.allowance(accounts[2], accounts[8],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.approve(accounts[9], 4,{from: accounts[8]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.approve(accounts[9], 4,{from: 0}),'revert');
  });
  it('Should fail approve(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.approve("0x0000000000000000000000000000000000000000", 4,{from: accounts[8]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN sender!=0x0000000000000000000000000000000000000000,recipient!=0x0000000000000000000000000000000000000000,sender!=0x0000000000000000000000000000000000000000,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.transferFrom(accounts[0], accounts[0], 2014223716,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transferFrom("0x0000000000000000000000000000000000000000", accounts[0], 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transferFrom(accounts[0], "0x0000000000000000000000000000000000000000", 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transferFrom("0x0000000000000000000000000000000000000000", accounts[0], 2014223716,{from: accounts[0]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transferFrom(accounts[0], accounts[0], 2014223716,{from: 0}),'revert');
  });
  it('Should execute increaseAllowance(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.increaseAllowance(accounts[0], 99999,{from: accounts[1]});
  });
  it('Should fail increaseAllowance(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.increaseAllowance(accounts[0], 99999,{from: 0}),'revert');
  });
  it('Should fail increaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.increaseAllowance("0x0000000000000000000000000000000000000000", 99999,{from: accounts[1]}),'revert');
  });
  it('Should execute decreaseAllowance(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.decreaseAllowance(accounts[1], 99999,{from: accounts[4]});
  });
  it('Should fail decreaseAllowance(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.decreaseAllowance(accounts[1], 99999,{from: 0}),'revert');
  });
  it('Should fail decreaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.decreaseAllowance("0x0000000000000000000000000000000000000000", 99999,{from: accounts[4]}),'revert');
  });
});
