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
    contractMockERC20 = await MockERC20.new(3,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(3,{from:accounts[3]}');
  });
  
  it('Should execute initialize(address,address) WHEN initialized!=true', async () => {
    let result = await contractConvergentBeta.methods["initialize(address,address)"](accounts[5], accounts[4],{from: accounts[0]});
  });
  it('Should execute setBaseAccount(address) WHEN msg.sender==_owner,_newBaseAccount!=0x0000000000000000000000000000000000000000', async () => {
    await contractConvergentBeta.methods["initialize(address,address)"](accounts[0],accounts[2],{from:accounts[0]});
    let result = await contractConvergentBeta.setBaseAccount(accounts[9],{from: accounts[0]});
  });
  it('Should fail setBaseAccount(address) when NOT comply with: _newBaseAccount != 0x0000000000000000000000000000000000000000', async () => {
    await contractConvergentBeta.methods["initialize(address,address)"](accounts[0],accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractConvergentBeta.setBaseAccount("0x0000000000000000000000000000000000000000",{from: accounts[0]}),'revert');
  });
  it('Should execute createAccount(address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string)', async () => {
    let result = await contractConvergentBeta.createAccount(accounts[2], 4038714811, 10000, 3, 2014223715, 10000, 1338, [126,14,3,233,255,172,83,182,121,160,103,33,21,148,246,7,146,167,71,36,190,76,108,226,179,30,186,208,111,74,133,183], "IsLibrary", "initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",{from: accounts[0]});
  });
  it('Should execute upgradeAccount(address) WHEN msg.sender==accountToCreator', async () => {
    let result = await contractConvergentBeta.upgradeAccount(accounts[4],{from: 0});
  });
  it('Should execute getImplementationForAccount(address)', async () => {
    let result = await contractConvergentBeta.getImplementationForAccount(accounts[4],{from: accounts[0]});
  });
});
