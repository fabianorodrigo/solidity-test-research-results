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
const ProxyBondingCurve = artifacts.require("ProxyBondingCurve");

contract("contractProxyBondingCurve",(accounts)=>{
    let contractProxyBondingCurve = null;
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
    contractEIP20 = await EIP20.new(10000,"xaxh2b",1,"xaxh2b",{from:accounts[0]});
    if(trace) console.log('SUCESSO: EIP20.new(10000,"xaxh2b",1,"xaxh2b",{from:accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
    BondingCurve.link("SafeMath",contractSafeMath.address);
    contractBondingCurve = await BondingCurve.new(accounts[4],{from:accounts[0]});
    if(trace) console.log('SUCESSO: BondingCurve.new(accounts[4],{from:accounts[0]}');
      ProxyBondingCurve.link("SafeMath",contractSafeMath.address);
    contractProxyBondingCurve = await ProxyBondingCurve.new(accounts[4],{from:accounts[0]});
});
  
  it('Should execute testfindNextHolder()', async () => {
    let result = await contractProxyBondingCurve.testfindNextHolder({from: accounts[0]});
  });
});
