const truffleAssert = require('truffle-assertions');
const AtlantisCrowdsale = artifacts.require("AtlantisCrowdsale");
const AtlantisToken = artifacts.require("AtlantisToken");
const MinLimitCrowdsale = artifacts.require("MinLimitCrowdsale");
const Crowdsale = artifacts.require("openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20.sol");
const ERC20Detailed = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol");
const SafeERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol");
const ProxyMinLimitCrowdsale = artifacts.require("ProxyMinLimitCrowdsale");

contract("contractProxyMinLimitCrowdsale",(accounts)=>{
    let contractProxyMinLimitCrowdsale = null;
  let trace = false;
  let contractSafeMath = null;
  let contractSafeERC20 = null;
  let contractERC20 = null;
  let contractERC20Detailed = null;
  let contractAtlantisToken = null;
  let contractCrowdsale = null;
  let contractMinLimitCrowdsale = null;
  let contractAtlantisCrowdsale = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractSafeERC20 = await SafeERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeERC20.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractAtlantisToken = await AtlantisToken.new({from:accounts[1]});
    if(trace) console.log('SUCESSO: AtlantisToken.new({from:accounts[1]}');
    Crowdsale.link("SafeMath",contractSafeMath.address);
     Crowdsale.link("SafeERC20",contractSafeERC20.address);
    contractCrowdsale = await Crowdsale.new(28,accounts[9],contractAtlantisToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Crowdsale.new(28,accounts[9],contractAtlantisToken.address,{from:accounts[0]}');
    contractAtlantisCrowdsale = await AtlantisCrowdsale.new(10000,accounts[0],contractAtlantisToken.address,27,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+358,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+358+644,64,{from:accounts[0]});
    if(trace) console.log('SUCESSO: AtlantisCrowdsale.new(10000,accounts[0],contractAtlantisToken.address,27,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+358,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+358+644,64,{from:accounts[0]}');
      contractProxyMinLimitCrowdsale = await ProxyMinLimitCrowdsale.new(2014223714,accounts[2],contractAtlantisToken.address,26,{from:accounts[0]});
});
  
  it('Should execute test_preValidatePurchase(address,uint256) WHEN beneficiary!=0x0000000000000000000000000000000000000000,weiAmount!=0,weiAmount>=_minLimit', async () => {
    let result = await contractProxyMinLimitCrowdsale.test_preValidatePurchase(accounts[4], 2014223714,{from: accounts[0]});
  });
  it('Should fail test_preValidatePurchase(address,uint256) when NOT comply with: beneficiary != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractProxyMinLimitCrowdsale.test_preValidatePurchase("0x0000000000000000000000000000000000000000", 2014223714,{from: accounts[0]}),'revert');
  });
  it('Should fail test_preValidatePurchase(address,uint256) when NOT comply with: weiAmount != 0', async () => {
    let result = await truffleAssert.fails(contractProxyMinLimitCrowdsale.test_preValidatePurchase(accounts[4], 0,{from: accounts[0]}),'revert');
  });
  it('Should fail test_preValidatePurchase(address,uint256) when NOT comply with: weiAmount >= _minLimit', async () => {
    let result = await truffleAssert.fails(contractProxyMinLimitCrowdsale.test_preValidatePurchase(accounts[4], 25,{from: accounts[0]}),'revert');
  });
});
