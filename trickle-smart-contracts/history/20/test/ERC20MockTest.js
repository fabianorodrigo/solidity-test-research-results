const truffleAssert = require('truffle-assertions');
const ERC20Mock = artifacts.require("ERC20Mock");
const Trickle = artifacts.require("Trickle");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20.sol");

contract("ERC20Mock",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractERC20 = null;
  let contractTrickle = null;
  let contractERC20Mock = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    Trickle.link("SafeMath",contractSafeMath.address);
    contractTrickle = await Trickle.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Trickle.new({from: accounts[0]}');
    contractERC20Mock = await ERC20Mock.new(accounts[8],1532892064,{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Mock.new(accounts[8],1532892064,{from:accounts[0]}');
  });
  
  it('Should execute mint(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC20Mock.mint(accounts[5], 2014223714,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.mint("0x0000000000000000000000000000000000000000", 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC20Mock.burn(accounts[2], 256,{from: accounts[0]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.burn("0x0000000000000000000000000000000000000000", 256,{from: accounts[0]}),'revert');
  });
  it('Should execute burnFrom(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000,msg.sender!=0x0000000000000000000000000000000000000000,account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC20Mock.burnFrom(accounts[6], 1001,{from: accounts[7]});
  });
  it('Should fail burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.burnFrom("0x0000000000000000000000000000000000000000", 1001,{from: accounts[7]}),'revert');
  });
  it('Should fail burnFrom(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.burnFrom(accounts[6], 1001,{from: 0}),'revert');
  });
  it('Should fail burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.burnFrom("0x0000000000000000000000000000000000000000", 1001,{from: accounts[7]}),'revert');
  });
  it('Should execute approveInternal(address,address,uint256) WHEN spender!=0x0000000000000000000000000000000000000000,owner!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC20Mock.approveInternal(accounts[2], accounts[4], 160,{from: accounts[0]});
  });
  it('Should fail approveInternal(address,address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.approveInternal(accounts[2], "0x0000000000000000000000000000000000000000", 160,{from: accounts[0]}),'revert');
  });
  it('Should fail approveInternal(address,address,uint256) when NOT comply with: owner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.approveInternal("0x0000000000000000000000000000000000000000", accounts[4], 160,{from: accounts[0]}),'revert');
  });
});
