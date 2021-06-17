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
    contractMockERC20 = await MockERC20.new(4038714810,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(4038714810,{from:accounts[3]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[0],257,11,29,19,4038714809,66,[62,163,53,253,83,132,9,14,57,117,80,56,108,238,89,103,237,147,131,180,99,174,61,34,142,51,71,86,248,183,17,56],"superuser","superuser",accounts[0],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[1], [226,43,103,9,164,208,128,78,99,110,21,69,225,212,105,241,146,248,243,90,182,236,217,73,247,218,20,227,130,238,18,255],{from: accounts[0]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[0],257,11,29,19,4038714809,66,[62,163,53,253,83,132,9,14,57,117,80,56,108,238,89,103,237,147,131,180,99,174,61,34,142,51,71,86,248,183,17,56],"superuser","superuser",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[1], [226,43,103,9,164,208,128,78,99,110,21,69,225,212,105,241,146,248,243,90,182,236,217,73,247,218,20,227,130,238,18,255],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3], accounts[2], 64, 3, 64, 1532892062, 5, 257, [113,149,242,254,254,132,63,216,82,146,96,105,13,250,63,48,191,16,198,51,17,186,226,88,255,114,45,119,39,120,40,149], "superuser", "UsesExample", accounts[8],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[8],1,257,3,1532892062,28,10000,[111,144,223,246,15,69,94,197,31,75,153,109,126,229,237,36,187,224,160,43,84,55,20,128,198,186,149,227,248,13,163,172],"IsLibrary","whitelist",accounts[6],{from:accounts[0]});
    let result = await contractAccount.addService(0,{from: accounts[8]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[8],1,257,3,1532892062,28,10000,[111,144,223,246,15,69,94,197,31,75,153,109,126,229,237,36,187,224,160,43,84,55,20,128,198,186,149,227,248,13,163,172],"IsLibrary","whitelist",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(0,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[8],1336,4038714809,65,1337,4038714811,18,[129,165,182,80,72,36,67,76,71,74,63,58,177,249,122,255,201,237,151,248,97,215,236,221,95,109,217,245,132,221,122,162],"superuser","IsLibrary",accounts[0],{from:accounts[0]});
    let result = await contractAccount.removeService(95,{from: accounts[8]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[8],1336,4038714809,65,1337,4038714811,18,[129,165,182,80,72,36,67,76,71,74,63,58,177,249,122,255,201,237,151,248,97,215,236,221,95,109,217,245,132,221,122,162],"superuser","IsLibrary",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(95,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[9],96,18,2014223716,4038714809,4038714811,10,[155,179,191,95,93,79,156,201,178,1,195,198,184,236,85,166,197,167,55,21,186,50,20,141,158,188,58,182,5,133,98,103],"PayableExample","uatpl",accounts[0],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([190,251,207,129,111,254,143,157,152,210,219,22,208,8,161,228,58,186,171,53,245,109,144,149,31,3,171,13,114,127,38,131],{from: accounts[9]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[9],96,18,2014223716,4038714809,4038714811,10,[155,179,191,95,93,79,156,201,178,1,195,198,184,236,85,166,197,167,55,21,186,50,20,141,158,188,58,182,5,133,98,103],"PayableExample","uatpl",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([190,251,207,129,111,254,143,157,152,210,219,22,208,8,161,228,58,186,171,53,245,109,144,149,31,3,171,13,114,127,38,131],{from: accounts[8]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(257, "RevertWithReason",{from: accounts[9]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(257, "RevertWithReason",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
