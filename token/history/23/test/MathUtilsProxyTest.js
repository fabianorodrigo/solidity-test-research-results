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

contract("contractProxyMathUtils",(accounts)=>{
    let contractProxyMathUtils = null;
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
      ProxyMathUtils.link('MathUtils', contractMathUtils.address);
    contractProxyMathUtils = await ProxyMathUtils.new({ from: accounts[0] });
});
  
  it('Should execute testvalidPerc(uint256)', async () => {
    let result = await contractProxyMathUtils.testvalidPerc(32735,{from: accounts[0]});
  });
  it('Should execute testpercOf0(uint256,uint256,uint256) WHEN PERC_DIVISOR>0', async () => {
    let result = await contractProxyMathUtils.testpercOf0(44, 110, 61,{from: accounts[0]});
  });
  it('Should execute testpercOf1(uint256,uint256) WHEN PERC_DIVISOR>0', async () => {
    let result = await contractProxyMathUtils.testpercOf1(70, 1000001,{from: accounts[0]});
  });
  it('Should execute testpercPoints(uint256,uint256) WHEN _fracDenom>0', async () => {
    let result = await contractProxyMathUtils.testpercPoints(43, 100000,{from: accounts[0]});
  });
  it('Should fail testpercPoints(uint256,uint256) when NOT comply with: _fracDenom > 0', async () => {
    let result = await truffleAssert.fails(contractProxyMathUtils.testpercPoints(43, 0,{from: accounts[0]}),'revert');
  });
});
