const truffleAssert = require('truffle-assertions');
const MathUtils = artifacts.require("MathUtils");
const RelevantTokenMock = artifacts.require("RelevantTokenMock");
const Power = artifacts.require("Power");
const RelevantToken = artifacts.require("RelevantToken");
const Roles = artifacts.require("openzeppelin-eth/contracts/access/Roles.sol");
const MinterRole = artifacts.require("openzeppelin-eth/contracts/access/roles/MinterRole.sol");
const ECDSA = artifacts.require("openzeppelin-eth/contracts/cryptography/ECDSA.sol");
const SafeMath = artifacts.require("openzeppelin-eth/contracts/math/SafeMath.sol");
const Ownable = artifacts.require("openzeppelin-eth/contracts/ownership/Ownable.sol");
const ERC20 = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20.sol");
const ERC20Mintable = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Mintable.sol");
const Initializable = artifacts.require("zos-lib/contracts/Initializable.sol");
const ProxyMathUtils = artifacts.require("ProxyMathUtils");
const ProxyRelevantToken = artifacts.require("ProxyRelevantToken");
const ProxyPower = artifacts.require("ProxyPower");

contract("contractProxyPower",(accounts)=>{
    let contractProxyPower = null;
  let trace = false;
  let contractECDSA = null;
  let contractRoles = null;
  let contractSafeMath = null;
  let contractERC20 = null;
  let contractInitializable = null;
  let contractMinterRole = null;
  let contractOwnable = null;
  let contractERC20Mintable = null;
  let contractMathUtils = null;
  let contractRelevantTokenMock = null;
  let contractRelevantToken = null;
  let contractPower = null;
  beforeEach(async () => {
    contractECDSA = await ECDSA.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ECDSA.new({from: accounts[0]}');
    contractRoles = await Roles.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Roles.new({from: accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractInitializable = await Initializable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Initializable.new({from: accounts[0]}');
    MinterRole.link("Roles",contractRoles.address);
    contractMinterRole = await MinterRole.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MinterRole.new({from: accounts[0]}');
    contractOwnable = await Ownable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from: accounts[0]}');
    contractERC20Mintable = await ERC20Mintable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Mintable.new({from: accounts[0]}');
    contractMathUtils = await MathUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MathUtils.new({from: accounts[0]}');
    contractRelevantTokenMock = await RelevantTokenMock.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: RelevantTokenMock.new({from: accounts[0]}');
    RelevantToken.link("ECDSA",contractECDSA.address);
    contractRelevantToken = await RelevantToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: RelevantToken.new({from: accounts[0]}');
    contractPower = await Power.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Power.new({from:accounts[0]}');
      contractProxyPower = await ProxyPower.new({ from: accounts[0] });
});
  
  it('Should execute testpower(uint256,uint256,uint32,uint32)', async () => {
    let result = await contractProxyPower.testpower(254, 255, 110, 74,{from: accounts[0]});
  });
  it('Should execute testln(uint256,uint256) WHEN _numerator<=MAX_NUM', async () => {
    let result = await contractProxyPower.testln(52, 0,{from: accounts[0]});
  });
  it('Should fail testln(uint256,uint256) when NOT comply with: _numerator <= MAX_NUM', async () => {
    let result = await truffleAssert.fails(contractProxyPower.testln(new web3.utils.BN('6.80564733841877e+38'), 0,{from: accounts[0]}),'revert');
  });
  it('Should execute testfloorLog2(uint256)', async () => {
    let result = await contractProxyPower.testfloorLog2(61,{from: accounts[0]});
  });
  it('Should execute testfindPositionInMaxExpArray(uint256) WHEN maxExpArray>=_x', async () => {
    let result = await contractProxyPower.testfindPositionInMaxExpArray(92,{from: accounts[0]});
  });
  it('Should execute testfindPositionInMaxExpArray(uint256) WHEN maxExpArray<_x', async () => {
    let result = await contractProxyPower.testfindPositionInMaxExpArray(77,{from: accounts[0]});
  });
  it('Should execute testfindPositionInMaxExpArray(uint256) WHEN maxExpArray>=_x', async () => {
    let result = await contractProxyPower.testfindPositionInMaxExpArray(45,{from: accounts[0]});
  });
  it('Should execute testfindPositionInMaxExpArray(uint256) WHEN maxExpArray<_x,maxExpArray<_x', async () => {
    let result = await contractProxyPower.testfindPositionInMaxExpArray(44,{from: accounts[0]});
  });
  it('Should execute testfixedExp(uint256,uint8)', async () => {
    let result = await contractProxyPower.testfixedExp(96, 38,{from: accounts[0]});
  });
});
