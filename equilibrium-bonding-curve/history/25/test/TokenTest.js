const truffleAssert = require('truffle-assertions');
const BondingCurve = artifacts.require("BondingCurve");
const PriorityQueue = artifacts.require("PriorityQueue");
const Token = artifacts.require("Token");
const BasicToken = artifacts.require("BasicToken");
const EIP20 = artifacts.require("EIP20");
const Ownable = artifacts.require("Ownable");
const SafeMath = artifacts.require("SafeMath");
const StandardToken = artifacts.require("StandardToken");
const ProxySafeMath = artifacts.require("ProxySafeMath");

contract("Token",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractBasicToken = null;
  let contractStandardToken = null;
  let contractPriorityQueue = null;
  let contractToken = null;
  let contractEIP20 = null;
  let contractOwnable = null;
  let contractBondingCurve = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    BasicToken.link("SafeMath",contractSafeMath.address);
    contractBasicToken = await BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BasicToken.new({from: accounts[0]}');
    contractStandardToken = await StandardToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: StandardToken.new({from: accounts[0]}');
    PriorityQueue.link("SafeMath",contractSafeMath.address);
    contractPriorityQueue = await PriorityQueue.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: PriorityQueue.new({from:accounts[0]}');
    contractToken = await Token.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Token.new({from:accounts[0]}');
    contractEIP20 = await EIP20.new(127,"ien6gg",128,"65vuwi",{from:accounts[0]});
    if(trace) console.log('SUCESSO: EIP20.new(127,"ien6gg",128,"65vuwi",{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
    BondingCurve.link("SafeMath",contractSafeMath.address);
    contractBondingCurve = await BondingCurve.new(accounts[9],{from:accounts[0]});
    if(trace) console.log('SUCESSO: BondingCurve.new(accounts[9],{from:accounts[0]}');
  });
  
  it('Should execute transfer(address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractToken.transfer(accounts[3], 10001,{from: accounts[0]});
  });
  it('Should fail transfer(address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.transfer("0x0000000000000000000000000000000000000000", 10001,{from: accounts[0]}),'revert');
  });
  it('Should execute transferFrom(address,address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractToken.transferFrom(accounts[4], accounts[0], 101,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractToken.transferFrom(accounts[4], "0x0000000000000000000000000000000000000000", 101,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractToken.approve(accounts[6], 10001,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractToken.allowance(accounts[9], accounts[5],{from: accounts[0]});
  });
});
