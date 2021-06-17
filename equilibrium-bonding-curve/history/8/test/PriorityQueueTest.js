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

contract("PriorityQueue",(accounts)=>{
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
    contractEIP20 = await EIP20.new(127,"TestToken",3,"TestToken",{from:accounts[0]});
    if(trace) console.log('SUCESSO: EIP20.new(127,"TestToken",3,"TestToken",{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
    BondingCurve.link("SafeMath",contractSafeMath.address);
    contractBondingCurve = await BondingCurve.new(accounts[1],{from:accounts[0]});
    if(trace) console.log('SUCESSO: BondingCurve.new(accounts[1],{from:accounts[0]}');
  });
  
  it('Should execute insertOrder(uint256,uint256)', async () => {
    let result = await contractPriorityQueue.insertOrder(127, 0,{from: accounts[0]});
  });
  it('Should execute getMinOrder()', async () => {
    let result = await contractPriorityQueue.getMinOrder({from: accounts[0]});
  });
  it('Should execute getMin()', async () => {
    let result = await contractPriorityQueue.getMin({from: accounts[0]});
  });
  it('Should execute delMin() WHEN msg.sender==owner', async () => {
    let result = await contractPriorityQueue.delMin({from: accounts[0]});
  });
  it('Should fail delMin() when NOT comply with: msg.sender == owner', async () => {
    let result = await truffleAssert.fails(contractPriorityQueue.delMin({from: accounts[9]}),'revert');
  });
});
