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
    contractMockERC20 = await MockERC20.new(1,{from:accounts[7]});
    if(trace) console.log('SUCESSO: MockERC20.new(1,{from:accounts[7]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[5],65,4,1532892064,95,255,5,[81,115,251,84,207,184,168,246,31,61,137,203,203,146,183,244,249,174,7,249,217,76,240,53,197,18,69,254,118,27,99,234],"RevertWithReason","superuser",accounts[9],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[8], [164,187,231,206,156,115,22,232,29,121,46,155,169,184,24,103,26,177,155,253,71,183,149,159,130,129,254,188,89,161,54,52],{from: accounts[5]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[5],65,4,1532892064,95,255,5,[81,115,251,84,207,184,168,246,31,61,137,203,203,146,183,244,249,174,7,249,217,76,240,53,197,18,69,254,118,27,99,234],"RevertWithReason","superuser",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[8], [164,187,231,206,156,115,22,232,29,121,46,155,169,184,24,103,26,177,155,253,71,183,149,159,130,129,254,188,89,161,54,52],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7], accounts[9], 257, 19, 257, 18, 6, 6, [185,69,129,213,99,157,53,161,33,19,26,129,168,99,106,18,232,132,109,216,209,232,155,206,133,231,166,58,252,220,211,254], "superuser", "Example", accounts[7],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[9],4,66,2,1532892063,27,257,[94,35,222,27,234,236,166,204,213,117,131,240,45,245,15,87,56,6,59,74,82,31,86,215,30,209,213,67,24,136,211,60],"","UsesExample",accounts[5],{from:accounts[0]});
    let result = await contractAccount.addService(18,{from: accounts[9]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[9],4,66,2,1532892063,27,257,[94,35,222,27,234,236,166,204,213,117,131,240,45,245,15,87,56,6,59,74,82,31,86,215,30,209,213,67,24,136,211,60],"","UsesExample",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(18,{from: accounts[8]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[6],2014223716,5,5,64,1532892064,97,[58,127,143,172,235,211,41,233,167,133,72,183,201,166,189,138,175,123,36,144,254,208,243,101,30,37,209,194,137,102,249,133],"Example","78aowc",accounts[1],{from:accounts[0]});
    let result = await contractAccount.removeService(96,{from: accounts[6]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[6],2014223716,5,5,64,1532892064,97,[58,127,143,172,235,211,41,233,167,133,72,183,201,166,189,138,175,123,36,144,254,208,243,101,30,37,209,194,137,102,249,133],"Example","78aowc",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(96,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[5],5,4038714810,6,1,66,64,[212,200,233,129,106,67,230,12,122,188,26,126,85,40,209,53,31,215,251,187,89,105,58,116,226,89,96,51,99,154,144,71],"minter","PayableExample",accounts[8],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([122,122,133,24,226,41,31,122,241,21,164,65,164,140,37,252,170,41,215,58,60,188,178,254,44,86,135,13,254,83,129,235],{from: accounts[5]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[5],5,4038714810,6,1,66,64,[212,200,233,129,106,67,230,12,122,188,26,126,85,40,209,53,31,215,251,187,89,105,58,116,226,89,96,51,99,154,144,71],"minter","PayableExample",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([122,122,133,24,226,41,31,122,241,21,164,65,164,140,37,252,170,41,215,58,60,188,178,254,44,86,135,13,254,83,129,235],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(17, "\x19Ethereum Signed Message:\n32",{from: accounts[8]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(17, "\x19Ethereum Signed Message:\n32",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
