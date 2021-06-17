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

contract("Account",(accounts)=>{
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
    contractMockERC20 = await MockERC20.new(6,{from:accounts[8]});
    if(trace) console.log('SUCESSO: MockERC20.new(6,{from:accounts[8]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[7],18,1532892064,255,4038714809,26,1337,[247,140,90,182,230,184,127,177,47,124,18,3,241,34,227,180,23,29,9,16,13,113,108,146,29,150,145,219,175,145,168,22],"Example","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[0],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[7], [57,185,156,53,188,229,154,157,15,149,251,174,174,118,115,40,6,249,135,197,188,230,113,255,29,26,175,47,32,148,16,244],{from: accounts[7]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[7],18,1532892064,255,4038714809,26,1337,[247,140,90,182,230,184,127,177,47,124,18,3,241,34,227,180,23,29,9,16,13,113,108,146,29,150,145,219,175,145,168,22],"Example","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[7], [57,185,156,53,188,229,154,157,15,149,251,174,174,118,115,40,6,249,135,197,188,230,113,255,29,26,175,47,32,148,16,244],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6], accounts[4], 2, 26, 26, 9999, 0, 2014223716, [52,141,169,120,97,130,215,132,164,131,137,162,10,161,229,211,141,169,30,113,47,170,44,5,249,217,128,70,10,208,72,87], "minter", "bouncer", accounts[3],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[4],19,66,27,5,10,17,[34,151,36,141,21,210,127,223,36,211,230,210,5,71,25,32,143,141,252,173,20,133,20,152,246,80,16,249,245,217,178,153],"IsLibrary","IsLibrary",accounts[1],{from:accounts[0]});
    let result = await contractAccount.addService(1,{from: accounts[4]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[4],19,66,27,5,10,17,[34,151,36,141,21,210,127,223,36,211,230,210,5,71,25,32,143,141,252,173,20,133,20,152,246,80,16,249,245,217,178,153],"IsLibrary","IsLibrary",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[9],256,1532892064,96,1338,95,2,[111,143,103,105,23,25,5,220,25,18,219,161,176,219,38,231,241,236,26,244,184,14,151,180,121,168,56,175,167,216,56,6],"RevertWithReason","whitelist",accounts[4],{from:accounts[0]});
    let result = await contractAccount.removeService(2,{from: accounts[9]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[9],256,1532892064,96,1338,95,2,[111,143,103,105,23,25,5,220,25,18,219,161,176,219,38,231,241,236,26,244,184,14,151,180,121,168,56,175,167,216,56,6],"RevertWithReason","whitelist",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(2,{from: accounts[8]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[9],1532892063,9999,10,27,5,5,[175,195,167,78,223,129,65,166,244,174,128,67,21,243,18,205,147,253,11,133,103,205,77,196,54,102,9,140,194,203,190,111],"IsLibrary","RevertWithReason",accounts[3],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([87,201,169,205,241,66,238,2,5,137,147,79,40,211,188,125,158,185,228,82,181,129,163,15,236,101,160,105,222,84,74,168],{from: accounts[9]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[9],1532892063,9999,10,27,5,5,[175,195,167,78,223,129,65,166,244,174,128,67,21,243,18,205,147,253,11,133,103,205,77,196,54,102,9,140,194,203,190,111],"IsLibrary","RevertWithReason",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([87,201,169,205,241,66,238,2,5,137,147,79,40,211,188,125,158,185,228,82,181,129,163,15,236,101,160,105,222,84,74,168],{from: accounts[8]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(256, "IsLibrary",{from: accounts[6]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(256, "IsLibrary",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
