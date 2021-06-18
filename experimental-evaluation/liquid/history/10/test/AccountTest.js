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
    contractMockERC20 = await MockERC20.new(96,{from:accounts[7]});
    if(trace) console.log('SUCESSO: MockERC20.new(96,{from:accounts[7]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[4],18,256,66,96,10001,10000,[5,217,200,206,5,12,162,39,195,52,110,63,120,253,36,2,226,224,95,77,9,16,9,204,165,252,19,136,168,138,178,132],"\x19Ethereum Signed Message:\n32","superuser",accounts[7],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[1], [129,150,30,229,20,186,83,101,4,86,252,6,60,34,21,203,119,154,140,153,70,169,190,173,36,132,59,42,141,58,216,113],{from: accounts[4]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[4],18,256,66,96,10001,10000,[5,217,200,206,5,12,162,39,195,52,110,63,120,253,36,2,226,224,95,77,9,16,9,204,165,252,19,136,168,138,178,132],"\x19Ethereum Signed Message:\n32","superuser",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[1], [129,150,30,229,20,186,83,101,4,86,252,6,60,34,21,203,119,154,140,153,70,169,190,173,36,132,59,42,141,58,216,113],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[8], 1532892062, 3, 96, 10000, 10001, 4038714810, [61,84,24,83,116,157,198,236,203,18,203,131,183,148,44,220,226,63,122,9,53,183,133,135,7,183,113,143,16,211,146,178], "minter", "IsLibrary", accounts[7],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[9],257,6,256,1532892063,2014223714,2,[227,89,86,84,138,229,80,98,117,30,134,195,59,157,202,115,134,224,173,209,218,101,13,77,149,30,245,194,168,132,147,111],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","RevertWithReason",accounts[7],{from:accounts[0]});
    let result = await contractAccount.addService(1336,{from: accounts[9]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[9],257,6,256,1532892063,2014223714,2,[227,89,86,84,138,229,80,98,117,30,134,195,59,157,202,115,134,224,173,209,218,101,13,77,149,30,245,194,168,132,147,111],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","RevertWithReason",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1336,{from: accounts[8]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[8],6,9,2014223715,27,1,1336,[235,136,172,107,224,40,131,227,125,246,116,24,251,172,198,57,126,0,30,115,255,103,228,103,209,187,161,11,30,45,217,250],"whitelist","minter",accounts[4],{from:accounts[0]});
    let result = await contractAccount.removeService(95,{from: accounts[8]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[8],6,9,2014223715,27,1,1336,[235,136,172,107,224,40,131,227,125,246,116,24,251,172,198,57,126,0,30,115,255,103,228,103,209,187,161,11,30,45,217,250],"whitelist","minter",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(95,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[3],27,27,2014223714,26,29,95,[107,129,146,233,105,77,155,170,10,147,141,95,206,28,122,110,108,213,64,61,183,84,139,160,189,244,105,161,197,35,152,112],"Example","bouncer",accounts[1],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([241,241,40,219,127,35,62,50,131,172,12,3,40,119,255,219,247,32,25,128,92,124,229,118,242,219,85,224,141,39,20,242],{from: accounts[3]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[3],27,27,2014223714,26,29,95,[107,129,146,233,105,77,155,170,10,147,141,95,206,28,122,110,108,213,64,61,183,84,139,160,189,244,105,161,197,35,152,112],"Example","bouncer",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([241,241,40,219,127,35,62,50,131,172,12,3,40,119,255,219,247,32,25,128,92,124,229,118,242,219,85,224,141,39,20,242],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(2014223716, "",{from: accounts[5]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(2014223716, "",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
