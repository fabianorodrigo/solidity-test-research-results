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
    contractMockERC20 = await MockERC20.new(1,{from:accounts[2]});
    if(trace) console.log('SUCESSO: MockERC20.new(1,{from:accounts[2]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[9],19,4038714810,4038714810,4,10,4038714809,[139,179,239,140,161,135,129,248,205,157,124,32,195,167,224,38,234,244,134,112,90,149,88,55,156,37,106,26,132,222,27,182],"\x19Ethereum Signed Message:\n32","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[8],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[4], [145,4,184,216,215,11,15,43,46,217,163,163,227,20,151,31,241,100,25,236,176,36,173,123,232,137,49,226,126,205,10,50],{from: accounts[9]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[9],19,4038714810,4038714810,4,10,4038714809,[139,179,239,140,161,135,129,248,205,157,124,32,195,167,224,38,234,244,134,112,90,149,88,55,156,37,106,26,132,222,27,182],"\x19Ethereum Signed Message:\n32","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[4], [145,4,184,216,215,11,15,43,46,217,163,163,227,20,151,31,241,100,25,236,176,36,173,123,232,137,49,226,126,205,10,50],{from: accounts[8]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9], accounts[1], 97, 1532892062, 2014223714, 66, 1532892064, 97, [11,100,54,146,185,161,196,150,34,210,89,174,247,228,172,254,54,225,200,21,222,223,139,71,133,68,70,126,4,221,134,150], "PayableExample", "PayableExample", accounts[6],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[0],4,27,1,10,256,2014223714,[58,113,44,43,185,25,56,149,212,216,9,74,110,123,113,156,83,239,38,51,207,33,104,178,3,94,35,184,157,174,183,247],"IsLibrary","whitelist",accounts[8],{from:accounts[0]});
    let result = await contractAccount.addService(4,{from: accounts[0]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[0],4,27,1,10,256,2014223714,[58,113,44,43,185,25,56,149,212,216,9,74,110,123,113,156,83,239,38,51,207,33,104,178,3,94,35,184,157,174,183,247],"IsLibrary","whitelist",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(4,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[7],96,4038714811,27,1336,1336,1338,[118,172,149,68,62,253,48,198,192,125,136,4,174,17,102,199,152,46,87,150,27,122,146,196,104,15,190,175,171,37,38,49],"\x19Ethereum Signed Message:\n32","PayableExample",accounts[4],{from:accounts[0]});
    let result = await contractAccount.removeService(6,{from: accounts[7]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[7],96,4038714811,27,1336,1336,1338,[118,172,149,68,62,253,48,198,192,125,136,4,174,17,102,199,152,46,87,150,27,122,146,196,104,15,190,175,171,37,38,49],"\x19Ethereum Signed Message:\n32","PayableExample",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(6,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[5],3,66,95,256,29,257,[243,117,220,100,193,59,75,162,124,149,56,135,98,194,169,93,39,49,216,131,148,195,167,244,204,193,63,233,82,16,12,116],"PayableExample","Example",accounts[3],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([190,5,69,79,88,122,75,182,104,95,195,128,199,149,254,95,76,175,198,130,148,88,206,42,44,214,16,253,42,67,182,255],{from: accounts[5]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[5],3,66,95,256,29,257,[243,117,220,100,193,59,75,162,124,149,56,135,98,194,169,93,39,49,216,131,148,195,167,244,204,193,63,233,82,16,12,116],"PayableExample","Example",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([190,5,69,79,88,122,75,182,104,95,195,128,199,149,254,95,76,175,198,130,148,88,206,42,44,214,16,253,42,67,182,255],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(257, "",{from: accounts[5]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(257, "",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
