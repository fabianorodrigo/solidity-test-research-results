const truffleAssert = require('truffle-assertions');
const ERC20Mock = artifacts.require("ERC20Mock");
const Trickle = artifacts.require("Trickle");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20.sol");

contract("Trickle",(accounts)=>{
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
    contractERC20Mock = await ERC20Mock.new(accounts[1],28,{from:accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Mock.new(accounts[1],28,{from:accounts[0]}');
  });
  
  it('Should execute createAgreement(IERC20,address,uint256,uint48,uint48) WHEN duration>0,totalAmount>0,start>0,recipient!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractTrickle.createAgreement(contractERC20Mock.address, accounts[4], 97, 1532892062, 27,{from: accounts[0]});
  });
  it('Should fail createAgreement(IERC20,address,uint256,uint48,uint48) when NOT comply with: duration > 0', async () => {
    let result = await truffleAssert.fails(contractTrickle.createAgreement(contractERC20Mock.address, accounts[4], 97, 0, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createAgreement(IERC20,address,uint256,uint48,uint48) when NOT comply with: totalAmount > 0', async () => {
    let result = await truffleAssert.fails(contractTrickle.createAgreement(contractERC20Mock.address, accounts[4], 0, 1532892062, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail createAgreement(IERC20,address,uint256,uint48,uint48) when NOT comply with: start > 0', async () => {
    let result = await truffleAssert.fails(contractTrickle.createAgreement(contractERC20Mock.address, accounts[4], 97, 1532892062, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail createAgreement(IERC20,address,uint256,uint48,uint48) when NOT comply with: recipient != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractTrickle.createAgreement(contractERC20Mock.address, "0x0000000000000000000000000000000000000000", 97, 1532892062, 27,{from: accounts[0]}),'revert');
  });
  it('Should execute getAgreement(uint256)', async () => {
    let result = await contractTrickle.getAgreement(3,{from: accounts[0]});
  });
  it('Should execute withdrawTokens(uint256) WHEN unreleased>0', async () => {
    let result = await contractTrickle.withdrawTokens(65,{from: accounts[0]});
  });
  it('Should execute cancelAgreement(uint256) WHEN canceledAmount>0', async () => {
    let result = await contractTrickle.cancelAgreement(256,{from: accounts[0]});
  });
  it('Should execute cancelAgreement(uint256) WHEN canceledAmount<=0', async () => {
    let result = await contractTrickle.cancelAgreement(65,{from: accounts[0]});
  });
  it('Should execute withdrawableAmount(uint256)', async () => {
    let result = await contractTrickle.withdrawableAmount(2014223715,{from: accounts[0]});
  });
});
