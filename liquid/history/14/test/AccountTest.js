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
    contractMockERC20 = await MockERC20.new(2014223714,{from:accounts[1]});
    if(trace) console.log('SUCESSO: MockERC20.new(2014223714,{from:accounts[1]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[8],3,3,11,256,28,0,[129,48,76,237,158,129,161,86,118,81,18,166,139,116,13,5,15,219,215,2,172,190,136,230,8,32,224,81,107,62,30,24],"minter","9lwp8",accounts[7],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[5], [193,69,24,68,100,227,115,191,31,39,147,133,78,48,85,194,231,155,64,241,124,168,155,8,95,171,187,121,251,181,37,184],{from: accounts[8]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[8],3,3,11,256,28,0,[129,48,76,237,158,129,161,86,118,81,18,166,139,116,13,5,15,219,215,2,172,190,136,230,8,32,224,81,107,62,30,24],"minter","9lwp8",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[5], [193,69,24,68,100,227,115,191,31,39,147,133,78,48,85,194,231,155,64,241,124,168,155,8,95,171,187,121,251,181,37,184],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3], accounts[1], 65, 6, 256, 27, 64, 4038714809, [141,64,12,129,177,60,74,135,112,8,249,70,140,0,221,18,74,27,152,119,100,161,70,162,19,139,236,24,228,128,50,2], "superuser", "", accounts[0],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[5],1336,255,4,255,0,4038714809,[152,172,68,247,71,35,64,65,86,238,99,215,231,90,116,125,51,201,188,217,127,120,218,105,253,56,96,207,96,49,11,200],"whitelist","whitelist",accounts[2],{from:accounts[0]});
    let result = await contractAccount.addService(4038714809,{from: accounts[5]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[5],1336,255,4,255,0,4038714809,[152,172,68,247,71,35,64,65,86,238,99,215,231,90,116,125,51,201,188,217,127,120,218,105,253,56,96,207,96,49,11,200],"whitelist","whitelist",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(4038714809,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[7],1338,11,27,97,96,1337,[92,163,219,37,163,160,36,140,159,22,63,206,102,31,58,36,166,120,128,121,253,23,63,147,245,95,15,173,191,189,243,137],"IsLibrary","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[0],{from:accounts[0]});
    let result = await contractAccount.removeService(96,{from: accounts[7]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[7],1338,11,27,97,96,1337,[92,163,219,37,163,160,36,140,159,22,63,206,102,31,58,36,166,120,128,121,253,23,63,147,245,95,15,173,191,189,243,137],"IsLibrary","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(96,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[6],1532892062,5,1338,29,10001,2014223714,[35,193,211,217,179,201,209,201,45,52,239,101,73,137,169,205,140,6,125,6,200,148,44,132,239,145,28,133,167,148,54,63],"9lwp8","Example",accounts[3],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([32,0,131,248,69,236,214,241,104,204,243,27,251,229,91,38,251,200,224,66,27,133,81,255,0,25,5,84,181,189,153,27],{from: accounts[6]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[6],1532892062,5,1338,29,10001,2014223714,[35,193,211,217,179,201,209,201,45,52,239,101,73,137,169,205,140,6,125,6,200,148,44,132,239,145,28,133,167,148,54,63],"9lwp8","Example",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([32,0,131,248,69,236,214,241,104,204,243,27,251,229,91,38,251,200,224,66,27,133,81,255,0,25,5,84,181,189,153,27],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(1, "whitelist",{from: accounts[1]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(1, "whitelist",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
