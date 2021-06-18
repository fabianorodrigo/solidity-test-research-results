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
    contractMockERC20 = await MockERC20.new(3,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(3,{from:accounts[3]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[3],26,1338,1532892063,2014223714,64,1337,[34,155,190,97,56,95,135,57,224,214,68,220,56,115,170,17,61,154,192,71,87,185,51,204,153,158,95,254,142,182,13,232],"IsLibrary","UsesExample",accounts[5],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[7], [48,255,193,51,172,113,223,61,114,39,91,212,103,131,164,171,161,20,15,192,12,52,188,47,42,41,82,182,88,118,45,152],{from: accounts[3]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[3],26,1338,1532892063,2014223714,64,1337,[34,155,190,97,56,95,135,57,224,214,68,220,56,115,170,17,61,154,192,71,87,185,51,204,153,158,95,254,142,182,13,232],"IsLibrary","UsesExample",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[7], [48,255,193,51,172,113,223,61,114,39,91,212,103,131,164,171,161,20,15,192,12,52,188,47,42,41,82,182,88,118,45,152],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[7], 5, 18, 26, 4038714810, 2014223714, 10001, [198,215,127,102,102,41,94,245,24,152,120,248,100,18,160,179,150,146,143,171,95,162,185,19,21,236,7,238,248,155,221,189], "\x19Ethereum Signed Message:\n32", "PayableExample", accounts[3],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[3],9,255,257,10,1337,6,[32,174,49,72,221,213,80,201,70,109,237,220,101,74,100,183,90,32,202,168,21,3,218,132,119,238,250,242,122,241,243,180],"Example","minter",accounts[6],{from:accounts[0]});
    let result = await contractAccount.addService(2014223715,{from: accounts[3]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[3],9,255,257,10,1337,6,[32,174,49,72,221,213,80,201,70,109,237,220,101,74,100,183,90,32,202,168,21,3,218,132,119,238,250,242,122,241,243,180],"Example","minter",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(2014223715,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[1],1336,256,10001,4038714810,9,26,[99,169,154,190,113,25,170,153,114,193,117,226,47,35,44,99,20,247,46,173,194,49,254,118,159,38,236,189,149,24,216,5],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","UsesExample",accounts[2],{from:accounts[0]});
    let result = await contractAccount.removeService(11,{from: accounts[1]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[1],1336,256,10001,4038714810,9,26,[99,169,154,190,113,25,170,153,114,193,117,226,47,35,44,99,20,247,46,173,194,49,254,118,159,38,236,189,149,24,216,5],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","UsesExample",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(11,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[7],96,1337,1532892064,64,10,66,[236,28,58,139,237,212,153,249,38,113,12,180,57,145,49,165,172,144,148,176,103,103,168,230,37,175,32,80,192,163,248,117],"Example","vnc2n",accounts[1],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([45,58,130,65,119,234,44,113,229,85,121,238,156,69,227,212,58,232,155,218,17,155,20,73,109,26,230,64,28,101,4,178],{from: accounts[7]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[7],96,1337,1532892064,64,10,66,[236,28,58,139,237,212,153,249,38,113,12,180,57,145,49,165,172,144,148,176,103,103,168,230,37,175,32,80,192,163,248,117],"Example","vnc2n",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([45,58,130,65,119,234,44,113,229,85,121,238,156,69,227,212,58,232,155,218,17,155,20,73,109,26,230,64,28,101,4,178],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(11, "initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",{from: accounts[2]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(11, "initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
