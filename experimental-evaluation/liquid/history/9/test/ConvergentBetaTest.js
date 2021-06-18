const truffleAssert = require('truffle-assertions');
const Account = artifacts.require("Account");
const ConvergentBeta = artifacts.require("ConvergentBeta");
const DoubleCurveToken = artifacts.require("DoubleCurveToken");
const GasPriceOracle = artifacts.require("GasPriceOracle");
const MockERC20 = artifacts.require("MockERC20");
const SafeMath = artifacts.require("openzeppelin-eth/contracts/math/SafeMath.sol");
const Ownable = artifacts.require("openzeppelin-eth/contracts/ownership/Ownable.sol");
const ERC20 = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20.sol");
const ERC20Detailed = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Detailed.sol");
const AddressUtils = artifacts.require("openzeppelin-solidity/contracts/AddressUtils.sol");
const Initializable = artifacts.require("zos-lib/contracts/Initializable.sol");
const AdminUpgradeabilityProxy = artifacts.require("zos-lib/contracts/upgradeability/AdminUpgradeabilityProxy.sol");
const UpgradeabilityProxy = artifacts.require("zos-lib/contracts/upgradeability/UpgradeabilityProxy.sol");

contract("ConvergentBeta",(accounts)=>{
  let trace = false;
  let contractAddressUtils = null;
  let contractSafeMath = null;
  let contractOwnable = null;
  let contractInitializable = null;
  let contractERC20Detailed = null;
  let contractERC20 = null;
  let contractAdminUpgradeabilityProxy = null;
  let contractUpgradeabilityProxy = null;
  let contractConvergentBeta = null;
  let contractGasPriceOracle = null;
  let contractDoubleCurveToken = null;
  let contractAccount = null;
  let contractMockERC20 = null;
  beforeEach(async () => {
    contractAddressUtils = await AddressUtils.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: AddressUtils.new({from: accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    contractOwnable = await Ownable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Ownable.new({from: accounts[0]}');
    contractInitializable = await Initializable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Initializable.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractConvergentBeta = await ConvergentBeta.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ConvergentBeta.new({from: accounts[0]}');
    contractGasPriceOracle = await GasPriceOracle.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: GasPriceOracle.new({from: accounts[0]}');
    DoubleCurveToken.link("SafeMath",contractSafeMath.address);
    contractDoubleCurveToken = await DoubleCurveToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: DoubleCurveToken.new({from: accounts[0]}');
    contractAccount = await Account.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Account.new({from: accounts[0]}');
    contractMockERC20 = await MockERC20.new(2014223714,{from:accounts[1]});
    if(trace) console.log('SUCESSO: MockERC20.new(2014223714,{from:accounts[1]}');
  });
  
  it('Should execute initialize(address,address) WHEN initialized!=true', async () => {
    let result = await contractConvergentBeta.methods["initialize(address,address)"](accounts[7], accounts[2],{from: accounts[0]});
  });
  it('Should execute setBaseAccount(address) WHEN msg.sender==_owner,_newBaseAccount!=0x0000000000000000000000000000000000000000', async () => {
    await contractConvergentBeta.methods["initialize(address,address)"](accounts[2],accounts[4],{from:accounts[0]});
    let result = await contractConvergentBeta.setBaseAccount(accounts[1],{from: accounts[0]});
  });
  it('Should fail setBaseAccount(address) when NOT comply with: _newBaseAccount != 0x0000000000000000000000000000000000000000', async () => {
    await contractConvergentBeta.methods["initialize(address,address)"](accounts[2],accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractConvergentBeta.setBaseAccount("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute createAccount(address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string)', async () => {
    let result = await contractConvergentBeta.createAccount(accounts[0], 1532892064, 4038714811, 10001, 95, 28, 5, [16,144,205,238,76,46,242,231,49,253,187,134,34,100,88,22,42,193,22,232,175,185,91,249,104,188,27,36,143,195,23,77], "minter", "superuser",{from: accounts[0]});
  });
  it('Should execute upgradeAccount(address) WHEN msg.sender==accountToCreator', async () => {
    let result = await contractConvergentBeta.upgradeAccount(accounts[9],{from: 0});
  });
  it('Should execute getImplementationForAccount(address)', async () => {
    let result = await contractConvergentBeta.getImplementationForAccount(accounts[3],{from: accounts[0]});
  });
});