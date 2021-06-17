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

contract("EIP20",(accounts)=>{
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
    contractEIP20 = await EIP20.new(2,"TOKEN",101,"TOKEN",{from:accounts[0]});
    if(trace) console.log('SUCESSO: EIP20.new(2,"TOKEN",101,"TOKEN",{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
    BondingCurve.link("SafeMath",contractSafeMath.address);
    contractBondingCurve = await BondingCurve.new(accounts[0],{from:accounts[0]});
    if(trace) console.log('SUCESSO: BondingCurve.new(accounts[0],{from:accounts[0]}');
  });
  
  it('Should execute transfer(address,uint256) WHEN balances>=_value', async () => {
    let result = await contractEIP20.transfer(accounts[1], 128,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN allowance<MAX_UINT256,balances>=_value,allowance>=_value', async () => {
    let result = await contractEIP20.transferFrom(accounts[1], accounts[9], 257,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN allowance>=MAX_UINT256,balances>=_value,allowance>=_value', async () => {
    let result = await contractEIP20.transferFrom(accounts[9], accounts[0], 128,{from: accounts[0]});
  });
  it('Should execute balanceOf(address)', async () => {
    let result = await contractEIP20.balanceOf(accounts[4],{from: accounts[0]});
  });
  it('Should execute approve(address,uint256)', async () => {
    let result = await contractEIP20.approve(accounts[6], 9999,{from: accounts[0]});
  });
  it('Should execute allowance(address,address)', async () => {
    let result = await contractEIP20.allowance(accounts[4], accounts[7],{from: accounts[0]});
  });
});
