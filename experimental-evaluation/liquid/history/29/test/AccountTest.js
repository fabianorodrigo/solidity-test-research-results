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
    contractMockERC20 = await MockERC20.new(1338,{from:accounts[9]});
    if(trace) console.log('SUCESSO: MockERC20.new(1338,{from:accounts[9]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[9],2014223714,29,1532892062,11,2014223716,2014223714,[20,8,9,130,108,28,250,1,120,251,190,109,17,71,186,141,251,225,26,245,70,93,176,149,208,178,95,188,184,230,84,153],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","whitelist",accounts[4],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[1], [64,151,14,184,209,216,150,167,124,110,210,185,118,94,220,71,46,142,36,233,172,158,203,222,39,69,33,58,45,36,74,128],{from: accounts[9]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[9],2014223714,29,1532892062,11,2014223716,2014223714,[20,8,9,130,108,28,250,1,120,251,190,109,17,71,186,141,251,225,26,245,70,93,176,149,208,178,95,188,184,230,84,153],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","whitelist",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[1], [64,151,14,184,209,216,150,167,124,110,210,185,118,94,220,71,46,142,36,233,172,158,203,222,39,69,33,58,45,36,74,128],{from: accounts[8]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[3], 1532892062, 9999, 4, 18, 3, 9, [201,225,23,134,220,92,130,137,222,141,123,68,174,206,67,194,252,232,40,204,226,152,18,135,233,172,107,237,29,9,207,82], "", "whitelist", accounts[8],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[4],29,4038714810,257,1532892064,6,257,[247,214,202,121,107,36,168,114,53,94,203,123,225,222,37,85,127,7,42,17,0,31,110,65,125,198,91,170,126,196,38,128],"\x19Ethereum Signed Message:\n32","PayableExample",accounts[6],{from:accounts[0]});
    let result = await contractAccount.addService(4038714810,{from: accounts[4]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[4],29,4038714810,257,1532892064,6,257,[247,214,202,121,107,36,168,114,53,94,203,123,225,222,37,85,127,7,42,17,0,31,110,65,125,198,91,170,126,196,38,128],"\x19Ethereum Signed Message:\n32","PayableExample",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(4038714810,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],2014223714,4038714809,3,5,3,17,[108,161,208,225,135,0,98,114,53,59,33,204,6,186,240,138,124,247,206,224,130,78,165,47,158,231,74,69,65,47,85,79],"IsLibrary","\x19Ethereum Signed Message:\n32",accounts[4],{from:accounts[0]});
    let result = await contractAccount.removeService(10,{from: accounts[4]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],2014223714,4038714809,3,5,3,17,[108,161,208,225,135,0,98,114,53,59,33,204,6,186,240,138,124,247,206,224,130,78,165,47,158,231,74,69,65,47,85,79],"IsLibrary","\x19Ethereum Signed Message:\n32",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(10,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[2],27,17,4,10000,5,28,[217,234,127,91,63,54,249,155,221,203,91,175,137,176,246,108,178,232,143,89,34,210,131,226,161,223,137,31,161,239,127,158],"UsesExample","\x19Ethereum Signed Message:\n32",accounts[4],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([92,100,189,11,45,217,107,172,183,159,196,98,32,197,24,13,159,75,111,90,248,230,113,216,9,4,9,92,105,71,18,203],{from: accounts[2]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[2],27,17,4,10000,5,28,[217,234,127,91,63,54,249,155,221,203,91,175,137,176,246,108,178,232,143,89,34,210,131,226,161,223,137,31,161,239,127,158],"UsesExample","\x19Ethereum Signed Message:\n32",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([92,100,189,11,45,217,107,172,183,159,196,98,32,197,24,13,159,75,111,90,248,230,113,216,9,4,9,92,105,71,18,203],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(0, "IsLibrary",{from: accounts[7]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(0, "IsLibrary",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
