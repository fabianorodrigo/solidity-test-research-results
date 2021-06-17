const truffleAssert = require('truffle-assertions');
const ERC20test = artifacts.require("ERC20test");
const HarbergerAds = artifacts.require("HarbergerAds");
const SafeMath = artifacts.require("zeppelin-solidity/contracts/math/SafeMath.sol");
const Ownable = artifacts.require("zeppelin-solidity/contracts/ownership/Ownable.sol");
const BasicToken = artifacts.require("zeppelin-solidity/contracts/token/ERC20/BasicToken.sol");
const BurnableToken = artifacts.require("zeppelin-solidity/contracts/token/ERC20/BurnableToken.sol");
const DetailedERC20 = artifacts.require("zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol");
const MintableToken = artifacts.require("zeppelin-solidity/contracts/token/ERC20/MintableToken.sol");
const StandardToken = artifacts.require("zeppelin-solidity/contracts/token/ERC20/StandardToken.sol");

contract("HarbergerAds",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractBasicToken = null;
  let contractBurnableToken = null;
  let contractMintableToken = null;
  let contractStandardToken = null;
  let contractOwnable = null;
  let contractDetailedERC20 = null;
  let contractERC20test = null;
  let contractHarbergerAds = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    BasicToken.link("SafeMath",contractSafeMath.address);
    contractBasicToken = await BasicToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BasicToken.new({from: accounts[0]}');
    contractBurnableToken = await BurnableToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BurnableToken.new({from: accounts[0]}');
    contractMintableToken = await MintableToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MintableToken.new({from: accounts[0]}');
    contractStandardToken = await StandardToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: StandardToken.new({from: accounts[0]}');
    contractOwnable = await Ownable.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from:accounts[0]}');
    contractERC20test = await ERC20test.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20test.new({from: accounts[0]}');
    contractHarbergerAds = await HarbergerAds.new(contractERC20test.address,5,96,{from:accounts[0]});
    if(trace) console.log('SUCESSO: HarbergerAds.new(contractERC20test.address,5,96,{from:accounts[0]}');
  });
  
  it('Should execute taxesDue(uint256) WHEN 1>0', async () => {
    let result = await contractHarbergerAds.taxesDue(27,{from: accounts[0]});
  });
  it('Should execute balanceOf(address) WHEN balance>allowance', async () => {
    let result = await contractHarbergerAds.balanceOf(accounts[5],{from: accounts[0]});
  });
  it('Should execute balanceOf(address) WHEN balance<=allowance', async () => {
    let result = await contractHarbergerAds.balanceOf(accounts[7],{from: accounts[0]});
  });
  it('Should execute addProperty(uint256)', async () => {
    let result = await contractHarbergerAds.addProperty(1532892062,{from: accounts[0]});
  });
  it('Should execute forecloseIfPossible(uint256)', async () => {
    let result = await contractHarbergerAds.forecloseIfPossible(1532892063,{from: accounts[0]});
  });
  it('Should execute collectTaxes(uint256) WHEN taxes>0,taxes<=balance', async () => {
    let result = await contractHarbergerAds.collectTaxes(1532892063,{from: accounts[0]});
  });
  it('Should execute collectTaxes(uint256) WHEN taxes<=0,taxes<=balance', async () => {
    let result = await contractHarbergerAds.collectTaxes(95,{from: accounts[0]});
  });
  it('Should execute collectTaxes(uint256) WHEN balance>0,taxes>balance', async () => {
    let result = await contractHarbergerAds.collectTaxes(1532892062,{from: accounts[0]});
  });
  it('Should execute collectTaxes(uint256) WHEN balance<=0,taxes>balance', async () => {
    let result = await contractHarbergerAds.collectTaxes(1331007096,{from: accounts[0]});
  });
  it('Should execute buy(uint256,uint256,uint256) WHEN seller!=msg.sender', async () => {
    let result = await contractHarbergerAds.buy(1331007097, 17, 4,{from: accounts[5]});
  });
  it('Should execute buy(uint256,uint256,uint256) WHEN seller==msg.sender', async () => {
    let result = await contractHarbergerAds.buy(3, 1331007096, 2014223715,{from: accounts[3]});
  });
  it('Should execute propertyCount()', async () => {
    let result = await contractHarbergerAds.propertyCount({from: accounts[0]});
  });
  it('Should execute changeRecipient(uint256,address)', async () => {
    let result = await contractHarbergerAds.changeRecipient(95, accounts[6],{from: accounts[0]});
  });
});
