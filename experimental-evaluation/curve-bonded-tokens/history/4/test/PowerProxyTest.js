const truffleAssert = require('truffle-assertions');
const BancorFormula = artifacts.require("BancorFormula");
const ERC20BondingToken = artifacts.require("ERC20BondingToken");
const EthBondingToken = artifacts.require("EthBondingToken");
const Power = artifacts.require("Power");
const TestERC20BondingToken = artifacts.require("TestERC20BondingToken");
const TestEthBondingToken = artifacts.require("TestEthBondingToken");
const Roles = artifacts.require("openzeppelin-eth/contracts/access/Roles.sol");
const MinterRole = artifacts.require("openzeppelin-eth/contracts/access/roles/MinterRole.sol");
const PauserRole = artifacts.require("openzeppelin-eth/contracts/access/roles/PauserRole.sol");
const Pausable = artifacts.require("openzeppelin-eth/contracts/lifecycle/Pausable.sol");
const SafeMath = artifacts.require("openzeppelin-eth/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20.sol");
const ERC20Detailed = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Detailed.sol");
const ERC20Mintable = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Mintable.sol");
const ERC20Pausable = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Pausable.sol");
const StandaloneERC20 = artifacts.require("openzeppelin-eth/contracts/token/ERC20/StandaloneERC20.sol");
const Initializable = artifacts.require("zos-lib/contracts/Initializable.sol");
const ProxyERC20BondingToken = artifacts.require("ProxyERC20BondingToken");
const ProxyEthBondingToken = artifacts.require("ProxyEthBondingToken");
const ProxyPower = artifacts.require("ProxyPower");

contract("contractProxyPower",(accounts)=>{
    let contractProxyPower = null;
  let trace = false;
  let contractRoles = null;
  let contractSafeMath = null;
  let contractPauserRole = null;
  let contractERC20Pausable = null;
  let contractERC20Mintable = null;
  let contractERC20Detailed = null;
  let contractInitializable = null;
  let contractMinterRole = null;
  let contractERC20 = null;
  let contractPausable = null;
  let contractStandaloneERC20 = null;
  let contractERC20BondingToken = null;
  let contractTestEthBondingToken = null;
  let contractTestERC20BondingToken = null;
  let contractEthBondingToken = null;
  let contractBancorFormula = null;
  let contractPower = null;
  beforeEach(async () => {
    contractRoles = await Roles.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Roles.new({from: accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    PauserRole.link("Roles",contractRoles.address);
    contractPauserRole = await PauserRole.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: PauserRole.new({from: accounts[0]}');
    contractERC20Pausable = await ERC20Pausable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Pausable.new({from: accounts[0]}');
    contractERC20Mintable = await ERC20Mintable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Mintable.new({from: accounts[0]}');
    contractInitializable = await Initializable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Initializable.new({from: accounts[0]}');
    MinterRole.link("Roles",contractRoles.address);
    contractMinterRole = await MinterRole.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MinterRole.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractPausable = await Pausable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Pausable.new({from: accounts[0]}');
    contractStandaloneERC20 = await StandaloneERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: StandaloneERC20.new({from: accounts[0]}');
    contractERC20BondingToken = await ERC20BondingToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20BondingToken.new({from: accounts[0]}');
    contractTestEthBondingToken = await TestEthBondingToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: TestEthBondingToken.new({from: accounts[0]}');
    contractTestERC20BondingToken = await TestERC20BondingToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: TestERC20BondingToken.new({from: accounts[0]}');
    contractEthBondingToken = await EthBondingToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: EthBondingToken.new({from: accounts[0]}');
    BancorFormula.link("SafeMath",contractSafeMath.address);
    contractBancorFormula = await BancorFormula.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BancorFormula.new({from: accounts[0]}');
    contractPower = await Power.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Power.new({from:accounts[0]}');
      contractProxyPower = await ProxyPower.new({ from: accounts[0] });
});
  
  it('Should execute testpower(uint256,uint256,uint32,uint32) WHEN _baseN<MAX_NUM,_baseN>=_baseD', async () => {
    let result = await contractProxyPower.testpower(55, 1, 107, 41,{from: accounts[0]});
  });
  it('Should fail testpower(uint256,uint256,uint32,uint32) when NOT comply with: _baseN < MAX_NUM', async () => {
    let result = await truffleAssert.fails(contractProxyPower.testpower(new web3.utils.BN('6.80564733841877e+38'), 1, 107, 41,{from: accounts[0]}),'revert');
  });
  it('Should fail testpower(uint256,uint256,uint32,uint32) when NOT comply with: _baseN >= _baseD', async () => {
    let result = await truffleAssert.fails(contractProxyPower.testpower(0, 1, 107, 41,{from: accounts[0]}),'revert');
  });
  it('Should execute testgeneralLog(uint256) WHEN LN2_DENOMINATOR>0', async () => {
    let result = await contractProxyPower.testgeneralLog(33,{from: accounts[0]});
  });
  it('Should execute testfloorLog2(uint256)', async () => {
    let result = await contractProxyPower.testfloorLog2(32,{from: accounts[0]});
  });
  it('Should execute testfindPositionInMaxExpArray(uint256) WHEN maxExpArray>=_x', async () => {
    let result = await contractProxyPower.testfindPositionInMaxExpArray(79,{from: accounts[0]});
  });
  it('Should execute testfindPositionInMaxExpArray(uint256) WHEN maxExpArray<_x', async () => {
    let result = await contractProxyPower.testfindPositionInMaxExpArray(31,{from: accounts[0]});
  });
  it('Should execute testfindPositionInMaxExpArray(uint256) WHEN maxExpArray>=_x', async () => {
    let result = await contractProxyPower.testfindPositionInMaxExpArray(5,{from: accounts[0]});
  });
  it('Should execute testfindPositionInMaxExpArray(uint256) WHEN maxExpArray<_x,maxExpArray<_x', async () => {
    let result = await contractProxyPower.testfindPositionInMaxExpArray(60,{from: accounts[0]});
  });
  it('Should execute testgeneralExp(uint256,uint8)', async () => {
    let result = await contractProxyPower.testgeneralExp(2014223716, 63,{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x>=0xd3094c70f034de4b96ff7d5b6f99fcd8', async () => {
    let result = await contractProxyPower.testoptimalLog(new web3.utils.BN('280515388193368466065753034665695903745'),{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x<0xd3094c70f034de4b96ff7d5b6f99fcd8', async () => {
    let result = await contractProxyPower.testoptimalLog(67,{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x>=0xa45af1e1f40c333b3de1db4dd55f29a7', async () => {
    let result = await contractProxyPower.testoptimalLog(new web3.utils.BN('218465603988574459584674982452468383745'),{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x<0xa45af1e1f40c333b3de1db4dd55f29a7', async () => {
    let result = await contractProxyPower.testoptimalLog(110,{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x>=0x910b022db7ae67ce76b441c27035c6a1', async () => {
    let result = await contractProxyPower.testoptimalLog(new web3.utils.BN('192795218841189806136235210300387753985'),{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x<0x910b022db7ae67ce76b441c27035c6a1', async () => {
    let result = await contractProxyPower.testoptimalLog(113,{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x>=0x88415abbe9a76bead8d00cf112e4d4a8', async () => {
    let result = await contractProxyPower.testoptimalLog(new web3.utils.BN('1.8111434702739643e+38'),{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x<0x88415abbe9a76bead8d00cf112e4d4a8', async () => {
    let result = await contractProxyPower.testoptimalLog(62,{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x>=0x84102b00893f64c705e841d5d4064bd3', async () => {
    let result = await contractProxyPower.testoptimalLog(new web3.utils.BN('175542044379434509285461464126482022401'),{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x<0x84102b00893f64c705e841d5d4064bd3', async () => {
    let result = await contractProxyPower.testoptimalLog(94,{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x>=0x8204055aaef1c8bd5c3259f4822735a2', async () => {
    let result = await contractProxyPower.testoptimalLog(new web3.utils.BN('1.7282051723619853e+38'),{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x<0x8204055aaef1c8bd5c3259f4822735a2', async () => {
    let result = await contractProxyPower.testoptimalLog(116,{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x>=0x810100ab00222d861931c15e39b44e99', async () => {
    let result = await contractProxyPower.testoptimalLog(new web3.utils.BN('171475617301169802522879444903419445249'),{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x<0x810100ab00222d861931c15e39b44e99', async () => {
    let result = await contractProxyPower.testoptimalLog(1,{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x>=0x808040155aabbbe9451521693554f733', async () => {
    let result = await contractProxyPower.testoptimalLog(new web3.utils.BN('1.70807097224429e+38'),{from: accounts[0]});
  });
  it('Should execute testoptimalLog(uint256) WHEN x<0x808040155aabbbe9451521693554f733', async () => {
    let result = await contractProxyPower.testoptimalLog(117,{from: accounts[0]});
  });
  it('Should execute testoptimalExp(uint256)', async () => {
    let result = await contractProxyPower.testoptimalExp(1,{from: accounts[0]});
  });
});
