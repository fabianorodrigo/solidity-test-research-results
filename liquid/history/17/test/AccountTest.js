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
    contractMockERC20 = await MockERC20.new(28,{from:accounts[9]});
    if(trace) console.log('SUCESSO: MockERC20.new(28,{from:accounts[9]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[9],9999,255,1532892063,5,11,10001,[96,124,239,62,31,210,2,206,140,151,47,21,77,37,174,136,119,141,27,239,75,24,216,230,77,85,216,220,190,0,248,126],"bouncer","",accounts[5],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[9], [209,134,211,49,0,27,230,206,232,159,30,171,83,75,50,66,121,126,10,224,254,246,172,189,198,7,188,203,65,131,193,68],{from: accounts[9]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[9],9999,255,1532892063,5,11,10001,[96,124,239,62,31,210,2,206,140,151,47,21,77,37,174,136,119,141,27,239,75,24,216,230,77,85,216,220,190,0,248,126],"bouncer","",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[9], [209,134,211,49,0,27,230,206,232,159,30,171,83,75,50,66,121,126,10,224,254,246,172,189,198,7,188,203,65,131,193,68],{from: accounts[8]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[4], 2, 2014223715, 255, 2014223715, 19, 65, [255,119,57,50,2,157,139,26,140,237,167,149,51,125,230,93,105,242,212,73,80,156,124,12,223,44,23,34,225,107,53,49], "PayableExample", "", accounts[1],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[1],5,255,1532892062,27,27,28,[142,100,8,235,141,105,10,85,112,153,193,7,141,104,138,87,172,232,158,99,177,208,168,10,95,83,125,95,165,173,93,37],"superuser","RevertWithReason",accounts[2],{from:accounts[0]});
    let result = await contractAccount.addService(0,{from: accounts[1]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[1],5,255,1532892062,27,27,28,[142,100,8,235,141,105,10,85,112,153,193,7,141,104,138,87,172,232,158,99,177,208,168,10,95,83,125,95,165,173,93,37],"superuser","RevertWithReason",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(0,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[1],97,256,2014223715,18,4038714810,4038714810,[124,165,104,184,235,241,36,200,144,151,38,247,36,218,214,226,37,28,158,244,4,134,215,148,251,235,113,203,178,141,250,138],"whitelist","UsesExample",accounts[1],{from:accounts[0]});
    let result = await contractAccount.removeService(10,{from: accounts[1]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[1],97,256,2014223715,18,4038714810,4038714810,[124,165,104,184,235,241,36,200,144,151,38,247,36,218,214,226,37,28,158,244,4,134,215,148,251,235,113,203,178,141,250,138],"whitelist","UsesExample",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(10,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[8],1337,10000,1338,11,2014223714,95,[2,151,158,98,209,45,105,255,107,234,238,141,6,214,173,14,226,52,20,77,221,3,96,251,140,51,111,155,145,26,227,57],"","qnvjzn",accounts[8],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([130,233,218,16,100,3,194,166,248,123,31,209,26,14,99,43,103,70,218,120,250,76,210,248,63,226,243,132,93,252,107,10],{from: accounts[8]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[8],1337,10000,1338,11,2014223714,95,[2,151,158,98,209,45,105,255,107,234,238,141,6,214,173,14,226,52,20,77,221,3,96,251,140,51,111,155,145,26,227,57],"","qnvjzn",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([130,233,218,16,100,3,194,166,248,123,31,209,26,14,99,43,103,70,218,120,250,76,210,248,63,226,243,132,93,252,107,10],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(2014223716, "IsLibrary",{from: accounts[2]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(2014223716, "IsLibrary",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
