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

contract("BondingCurve",(accounts)=>{
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
  
  it('Should execute buyTokens(uint256,uint256) WHEN supply>0', async () => {
    let result = await contractBondingCurve.buyTokens(10001, 100,{from: accounts[0]});
  });
  it('Should execute buyTokens(uint256,uint256) WHEN supply<=0', async () => {
    await contractBondingCurve.sellTokens(127,{from:accounts[0]});
    let result = await contractBondingCurve.buyTokens(255, 128,{from: accounts[0]});
  });
  it('Should execute buyTokens(uint256,uint256) WHEN supply==0', async () => {
    await contractBondingCurve.sellTokens(10000,{from:accounts[0]});
    let result = await contractBondingCurve.buyTokens(128, 129,{from: accounts[0]});
  });
  it('Should execute buyTokens(uint256,uint256) WHEN supply!=0', async () => {
    let result = await contractBondingCurve.buyTokens(1, 257,{from: accounts[0]});
  });
  it('Should execute sellTokens(uint256)', async () => {
    let result = await contractBondingCurve.sellTokens(101,{from: accounts[0]});
  });
  it('Should execute changeTargetPrice(uint256)', async () => {
    let result = await contractBondingCurve.changeTargetPrice(128,{from: accounts[0]});
  });
  it('Should execute queryNextPrice() WHEN supply>0', async () => {
    let result = await contractBondingCurve.queryNextPrice({from: accounts[0]});
  });
  it('Should execute queryNextPrice() WHEN supply==0', async () => {
    await contractBondingCurve.buyTokens(2,3,{from:accounts[0]});
    let result = await contractBondingCurve.queryNextPrice({from: accounts[0]});
  });
  it('Should execute queryNextPrice() WHEN supply!=0', async () => {
    let result = await contractBondingCurve.queryNextPrice({from: accounts[0]});
  });
  it('Should execute getTokenSupply()', async () => {
    let result = await contractBondingCurve.getTokenSupply({from: accounts[0]});
  });
  it('Should execute getTokenBalance()', async () => {
    let result = await contractBondingCurve.getTokenBalance({from: accounts[0]});
  });
});
