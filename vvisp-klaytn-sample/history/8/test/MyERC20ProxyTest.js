const truffleAssert = require('truffle-assertions');
const MyERC20 = artifacts.require("MyERC20");
const SafeMath = artifacts.require("SafeMath");
const ProxySafeMath = artifacts.require("ProxySafeMath");
const ProxyMyERC20 = artifacts.require("ProxyMyERC20");

contract("contractProxyMyERC20",(accounts)=>{
    let contractProxyMyERC20 = null;
  let trace = false;
  let contractSafeMath = null;
  let contractMyERC20 = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    MyERC20.link("SafeMath",contractSafeMath.address);
    contractMyERC20 = await MyERC20.new("RevertWithReason","9a6bk",1,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MyERC20.new("RevertWithReason","9a6bk",1,{from:accounts[3]}');
      ProxyMyERC20.link("SafeMath",contractSafeMath.address);
    contractProxyMyERC20 = await ProxyMyERC20.new("RevertWithReason","9a6bk",1,{from:accounts[3]});
});
  
  it('Should execute test_transfer(address,address,uint256) WHEN sender!=0x0000000000000000000000000000000000000000,recipient!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMyERC20.test_transfer(accounts[8], accounts[3], 11,{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_transfer("0x0000000000000000000000000000000000000000", accounts[3], 11,{from: accounts[0]}),'revert');
  });
  it('Should fail test_transfer(address,address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_transfer(accounts[8], "0x0000000000000000000000000000000000000000", 11,{from: accounts[0]}),'revert');
  });
  it('Should execute test_mint(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMyERC20.test_mint(accounts[7], 9999,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_mint("0x0000000000000000000000000000000000000000", 9999,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burn(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMyERC20.test_burn(accounts[9], 64,{from: accounts[0]});
  });
  it('Should fail test_burn(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_burn("0x0000000000000000000000000000000000000000", 64,{from: accounts[0]}),'revert');
  });
  it('Should execute test_approve(address,address,uint256) WHEN owner!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMyERC20.test_approve(accounts[8], accounts[3], 256,{from: accounts[0]});
  });
  it('Should fail test_approve(address,address,uint256) when NOT comply with: owner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_approve("0x0000000000000000000000000000000000000000", accounts[3], 256,{from: accounts[0]}),'revert');
  });
  it('Should fail test_approve(address,address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_approve(accounts[8], "0x0000000000000000000000000000000000000000", 256,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burnFrom(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000,account!=0x0000000000000000000000000000000000000000,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyMyERC20.test_burnFrom(accounts[6], 19,{from: accounts[6]});
  });
  it('Should fail test_burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_burnFrom("0x0000000000000000000000000000000000000000", 19,{from: accounts[6]}),'revert');
  });
  it('Should fail test_burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_burnFrom("0x0000000000000000000000000000000000000000", 19,{from: accounts[6]}),'revert');
  });
  it('Should fail test_burnFrom(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMyERC20.test_burnFrom(accounts[6], 19,{from: 0}),'revert');
  });
});