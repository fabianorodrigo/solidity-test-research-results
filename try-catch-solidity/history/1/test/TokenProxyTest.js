const truffleAssert = require('truffle-assertions');
const Example = artifacts.require("Example");
const SafeMath = artifacts.require("SafeMath");
const Token = artifacts.require("Token");
const ProxySafeMath = artifacts.require("ProxySafeMath");
const ProxyToken = artifacts.require("ProxyToken");

contract("contractProxyToken",(accounts)=>{
    let contractProxyToken = null;
  let trace = false;
  let contractSafeMath = null;
  let contractToken = null;
  let contractExample = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Token.link("SafeMath",contractSafeMath.address);
    contractToken = await Token.new({from:accounts[6]});
    if(trace) console.log('SUCESSO: Token.new({from:accounts[6]}');
    contractExample = await Example.new(contractToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Example.new(contractToken.address,{from:accounts[0]}');
      ProxyToken.link("SafeMath",contractSafeMath.address);
    contractProxyToken = await ProxyToken.new({ from: accounts[0] });
});
  
  it('Should execute test_transfer(address,address,uint256) WHEN sender!=0x0000000000000000000000000000000000000000,recipient!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyToken.test_transfer(accounts[9], accounts[5], 10001,{from: accounts[0]});
  });
  it('Should fail test_transfer(address,address,uint256) when NOT comply with: sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_transfer("0x0000000000000000000000000000000000000000", accounts[5], 10001,{from: accounts[0]}),'revert');
  });
  it('Should fail test_transfer(address,address,uint256) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_transfer(accounts[9], "0x0000000000000000000000000000000000000000", 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute test_mint(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyToken.test_mint(accounts[6], 6,{from: accounts[0]});
  });
  it('Should fail test_mint(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_mint("0x0000000000000000000000000000000000000000", 6,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burn(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyToken.test_burn(accounts[6], 256,{from: accounts[0]});
  });
  it('Should fail test_burn(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_burn("0x0000000000000000000000000000000000000000", 256,{from: accounts[0]}),'revert');
  });
  it('Should execute test_approve(address,address,uint256) WHEN owner!=0x0000000000000000000000000000000000000000,spender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyToken.test_approve(accounts[1], accounts[6], 1338,{from: accounts[0]});
  });
  it('Should fail test_approve(address,address,uint256) when NOT comply with: owner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_approve("0x0000000000000000000000000000000000000000", accounts[6], 1338,{from: accounts[0]}),'revert');
  });
  it('Should fail test_approve(address,address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_approve(accounts[1], "0x0000000000000000000000000000000000000000", 1338,{from: accounts[0]}),'revert');
  });
  it('Should execute test_burnFrom(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000,account!=0x0000000000000000000000000000000000000000,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractProxyToken.test_burnFrom(accounts[6], 3,{from: accounts[2]});
  });
  it('Should fail test_burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_burnFrom("0x0000000000000000000000000000000000000000", 3,{from: accounts[2]}),'revert');
  });
  it('Should fail test_burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_burnFrom("0x0000000000000000000000000000000000000000", 3,{from: accounts[2]}),'revert');
  });
  it('Should fail test_burnFrom(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyToken.test_burnFrom(accounts[6], 3,{from: 0}),'revert');
  });
});
