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
    contractMockERC20 = await MockERC20.new(64,{from:accounts[6]});
    if(trace) console.log('SUCESSO: MockERC20.new(64,{from:accounts[6]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[9],10000,10001,1336,4038714811,9999,5,[71,143,128,133,136,110,90,11,78,5,3,172,185,141,72,189,229,249,209,61,189,51,72,251,17,218,41,80,112,25,193,41],"UsesExample","dpee0l",accounts[3],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[3], [27,144,61,131,4,110,8,20,127,224,243,223,22,201,219,242,168,57,34,150,128,238,239,48,243,231,158,130,74,145,248,122],{from: accounts[9]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[9],10000,10001,1336,4038714811,9999,5,[71,143,128,133,136,110,90,11,78,5,3,172,185,141,72,189,229,249,209,61,189,51,72,251,17,218,41,80,112,25,193,41],"UsesExample","dpee0l",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[3], [27,144,61,131,4,110,8,20,127,224,243,223,22,201,219,242,168,57,34,150,128,238,239,48,243,231,158,130,74,145,248,122],{from: accounts[8]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2], accounts[9], 4, 4038714810, 4038714810, 2014223716, 1, 3, [67,124,55,2,186,250,194,22,117,79,125,32,116,102,184,210,239,17,147,221,237,44,187,241,92,38,2,102,221,8,108,29], "PayableExample", "superuser", accounts[7],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[0],1532892062,97,10000,19,96,27,[58,55,154,252,25,237,49,167,215,75,186,64,132,227,41,36,106,230,214,79,233,229,223,58,34,198,81,111,176,239,204,158],"PayableExample","",accounts[7],{from:accounts[0]});
    let result = await contractAccount.addService(10000,{from: accounts[0]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[0],1532892062,97,10000,19,96,27,[58,55,154,252,25,237,49,167,215,75,186,64,132,227,41,36,106,230,214,79,233,229,223,58,34,198,81,111,176,239,204,158],"PayableExample","",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(10000,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[5],95,29,4038714809,96,4038714810,2014223716,[254,139,182,65,48,181,137,215,16,90,238,27,192,113,142,233,246,58,121,168,41,170,78,204,8,29,140,123,94,227,202,125],"bouncer","",accounts[6],{from:accounts[0]});
    let result = await contractAccount.removeService(3,{from: accounts[5]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[5],95,29,4038714809,96,4038714810,2014223716,[254,139,182,65,48,181,137,215,16,90,238,27,192,113,142,233,246,58,121,168,41,170,78,204,8,29,140,123,94,227,202,125],"bouncer","",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(3,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[6],10,9,3,10,257,1,[117,56,93,120,85,146,231,101,183,168,102,127,73,2,60,61,164,231,228,197,230,147,188,206,184,246,248,46,5,235,107,76],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","PayableExample",accounts[7],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([223,212,127,120,119,198,85,246,74,10,1,62,12,95,220,161,100,142,134,166,243,208,109,78,15,45,75,218,85,103,132,170],{from: accounts[6]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[6],10,9,3,10,257,1,[117,56,93,120,85,146,231,101,183,168,102,127,73,2,60,61,164,231,228,197,230,147,188,206,184,246,248,46,5,235,107,76],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","PayableExample",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([223,212,127,120,119,198,85,246,74,10,1,62,12,95,220,161,100,142,134,166,243,208,109,78,15,45,75,218,85,103,132,170],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(2, "IsLibrary",{from: accounts[7]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(2, "IsLibrary",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
