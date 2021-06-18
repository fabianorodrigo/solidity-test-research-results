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
    contractMyERC20 = await MyERC20.new("Example","Example",2,{from:accounts[5]});
    if(trace) console.log('SUCESSO: MyERC20.new("Example","Example",2,{from:accounts[5]}');
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
    let result = await contractMyERC20.balanceOf(accounts[4],{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,recipient!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.transfer(accounts[7], 1001,{from: accounts[4]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transfer(accounts[7], 1001,{from: 0}),'revert');
  });
  it('Should fail transfer(address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transfer("0x0000000000000000000000000000000000000000", 1001,{from: accounts[4]}),'revert');
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractMyERC20.allowance(accounts[5], accounts[3],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.approve(accounts[8], 1000,{from: accounts[1]});
  });
  it('Should fail approve(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.approve(accounts[8], 1000,{from: 0}),'revert');
  });
  it('Should fail approve(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.approve("0x0000000000000000000000000000000000000000", 1000,{from: accounts[1]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN sender!=0x0000000000000000000000000000000000000000,recipient!=0x0000000000000000000000000000000000000000,sender!=0x0000000000000000000000000000000000000000,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.transferFrom(accounts[4], accounts[1], 1337,{from: accounts[8]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transferFrom("0x0000000000000000000000000000000000000000", accounts[1], 1337,{from: accounts[8]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transferFrom(accounts[4], "0x0000000000000000000000000000000000000000", 1337,{from: accounts[8]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transferFrom("0x0000000000000000000000000000000000000000", accounts[1], 1337,{from: accounts[8]}),'revert');
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.transferFrom(accounts[4], accounts[1], 1337,{from: 0}),'revert');
  });
  it('Should execute increaseAllowance(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.increaseAllowance(accounts[6], 27,{from: accounts[8]});
  });
  it('Should fail increaseAllowance(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.increaseAllowance(accounts[6], 27,{from: 0}),'revert');
  });
  it('Should fail increaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.increaseAllowance("0x0000000000000000000000000000000000000000", 27,{from: accounts[8]}),'revert');
  });
  it('Should execute decreaseAllowance(address,uint256) WHEN msg.sender!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractMyERC20.decreaseAllowance(accounts[6], 1,{from: accounts[0]});
  });
  it('Should fail decreaseAllowance(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.decreaseAllowance(accounts[6], 1,{from: 0}),'revert');
  });
  it('Should fail decreaseAllowance(address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractMyERC20.decreaseAllowance("0x0000000000000000000000000000000000000000", 1,{from: accounts[0]}),'revert');
  });
});
