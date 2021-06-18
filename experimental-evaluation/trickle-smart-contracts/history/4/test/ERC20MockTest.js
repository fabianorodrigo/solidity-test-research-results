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
    contractERC20Mock = await ERC20Mock.new(accounts[3],1532892063,{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Mock.new(accounts[3],1532892063,{from:accounts[0]}');
  });
  
  it('Should execute mint(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC20Mock.mint(accounts[4], 255,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.mint("0x0000000000000000000000000000000000000000", 255,{from: accounts[0]}),'revert');
  });
  it('Should execute burn(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC20Mock.burn(accounts[8], 96,{from: accounts[0]});
  });
  it('Should fail burn(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.burn("0x0000000000000000000000000000000000000000", 96,{from: accounts[0]}),'revert');
  });
  it('Should execute burnFrom(address,uint256) WHEN account!=0x0000000000000000000000000000000000000000,msg.sender!=0x0000000000000000000000000000000000000000,account!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC20Mock.burnFrom(accounts[2], 1001,{from: accounts[3]});
  });
  it('Should fail burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.burnFrom("0x0000000000000000000000000000000000000000", 1001,{from: accounts[3]}),'revert');
  });
  it('Should fail burnFrom(address,uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.burnFrom(accounts[2], 1001,{from: 0}),'revert');
  });
  it('Should fail burnFrom(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.burnFrom("0x0000000000000000000000000000000000000000", 1001,{from: accounts[3]}),'revert');
  });
  it('Should execute approveInternal(address,address,uint256) WHEN spender!=0x0000000000000000000000000000000000000000,owner!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractERC20Mock.approveInternal(accounts[7], accounts[0], 97,{from: accounts[0]});
  });
  it('Should fail approveInternal(address,address,uint256) when NOT comply with: spender != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.approveInternal(accounts[7], "0x0000000000000000000000000000000000000000", 97,{from: accounts[0]}),'revert');
  });
  it('Should fail approveInternal(address,address,uint256) when NOT comply with: owner != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractERC20Mock.approveInternal("0x0000000000000000000000000000000000000000", accounts[0], 97,{from: accounts[0]}),'revert');
  });
});
