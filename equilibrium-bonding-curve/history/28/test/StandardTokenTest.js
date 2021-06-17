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

contract("StandardToken",(accounts)=>{
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
    contractEIP20 = await EIP20.new(256,"TOKEN",0,"TestToken",{from:accounts[0]});
    if(trace) console.log('SUCESSO: EIP20.new(256,"TOKEN",0,"TestToken",{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
    BondingCurve.link("SafeMath",contractSafeMath.address);
    contractBondingCurve = await BondingCurve.new(accounts[2],{from:accounts[0]});
    if(trace) console.log('SUCESSO: BondingCurve.new(accounts[2],{from:accounts[0]}');
  });
  
  it('Should execute transferFrom(address,address,uint256) WHEN _to!=0x0000000000000000000000000000000000000000,_value<=balances', async () => {
    let result = await contractStandardToken.transferFrom(accounts[6], accounts[8], 10000,{from: accounts[0]});
  });
  it('Should fail transferFrom(address,address,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractStandardToken.transferFrom(accounts[6], "0x0000000000000000000000000000000000000000", 10000,{from: accounts[0]}),'revert');
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractStandardToken.approve(accounts[5], 256,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractStandardToken.allowance(accounts[5], accounts[0],{from: accounts[0]});
  });
  it('Should execute increaseApproval(address,uint)', async () => {
    let result = await contractStandardToken.increaseApproval(accounts[2], 3,{from: accounts[0]});
  });
  it('Should execute decreaseApproval(address,uint) WHEN _subtractedValue>oldValue', async () => {
    let result = await contractStandardToken.decreaseApproval(accounts[4], 10000,{from: accounts[0]});
  });
  it('Should execute decreaseApproval(address,uint) WHEN _subtractedValue<=oldValue', async () => {
    let result = await contractStandardToken.decreaseApproval(accounts[2], 255,{from: accounts[0]});
  });
});
