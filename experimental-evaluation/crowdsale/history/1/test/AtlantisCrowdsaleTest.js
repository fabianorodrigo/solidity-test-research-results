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

contract("AtlantisCrowdsale",(accounts)=>{
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
    contractAtlantisToken = await AtlantisToken.new({from:accounts[2]});
    if(trace) console.log('SUCESSO: AtlantisToken.new({from:accounts[2]}');
    Crowdsale.link("SafeMath",contractSafeMath.address);
     Crowdsale.link("SafeERC20",contractSafeERC20.address);
    contractCrowdsale = await Crowdsale.new(1,accounts[3],contractAtlantisToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: Crowdsale.new(1,accounts[3],contractAtlantisToken.address,{from:accounts[0]}');
    contractAtlantisCrowdsale = await AtlantisCrowdsale.new(1,accounts[6],contractAtlantisToken.address,29,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+84,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+84+603,3,{from:accounts[0]});
    if(trace) console.log('SUCESSO: AtlantisCrowdsale.new(1,accounts[6],contractAtlantisToken.address,29,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+84,(await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+84+603,3,{from:accounts[0]}');
  });
  
  it('Should execute offchainSale(address,uint256) WHEN msg.sender==_owner', async () => {
    let result = await contractAtlantisCrowdsale.offchainSale(accounts[2], 64,{from: accounts[0]});
  });
  it('Should fail offchainSale(address,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractAtlantisCrowdsale.offchainSale(accounts[2], 64,{from: accounts[9]}),'revert');
  });
  it('Should execute minLimit()', async () => {
    let result = await contractAtlantisCrowdsale.minLimit({from: accounts[0]});
  });
});
