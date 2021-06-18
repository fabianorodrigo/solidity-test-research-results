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
    contractMockERC20 = await MockERC20.new(257,{from:accounts[9]});
    if(trace) console.log('SUCESSO: MockERC20.new(257,{from:accounts[9]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[9],10001,95,97,1532892063,2014223716,0,[173,223,206,105,224,140,250,255,96,78,109,246,216,246,188,115,52,160,126,64,128,144,244,203,143,187,226,18,123,240,172,246],"RevertWithReason","PayableExample",accounts[2],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[1], [32,78,69,129,112,196,54,184,47,234,9,161,144,223,73,197,203,91,214,171,250,109,16,134,115,96,94,62,82,4,166,28],{from: accounts[9]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[9],10001,95,97,1532892063,2014223716,0,[173,223,206,105,224,140,250,255,96,78,109,246,216,246,188,115,52,160,126,64,128,144,244,203,143,187,226,18,123,240,172,246],"RevertWithReason","PayableExample",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[1], [32,78,69,129,112,196,54,184,47,234,9,161,144,223,73,197,203,91,214,171,250,109,16,134,115,96,94,62,82,4,166,28],{from: accounts[8]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[1], 1532892063, 1336, 9, 19, 1532892062, 5, [62,25,3,174,38,219,164,226,17,138,8,127,254,28,184,200,101,94,66,54,115,187,223,50,241,52,160,240,242,225,227,54], "minter", "IsLibrary", accounts[8],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[2],96,95,4038714811,1338,4038714809,1337,[110,134,42,19,126,76,97,13,51,76,82,114,245,50,141,121,143,223,15,97,214,131,76,243,58,147,185,105,213,185,6,192],"whitelist","PayableExample",accounts[9],{from:accounts[0]});
    let result = await contractAccount.addService(2,{from: accounts[2]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[2],96,95,4038714811,1338,4038714809,1337,[110,134,42,19,126,76,97,13,51,76,82,114,245,50,141,121,143,223,15,97,214,131,76,243,58,147,185,105,213,185,6,192],"whitelist","PayableExample",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(2,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[7],10000,19,1336,2014223716,97,257,[188,16,70,48,4,239,169,127,49,185,79,200,127,163,115,201,153,250,45,43,63,149,195,223,182,178,252,90,115,114,32,14],"RevertWithReason","RevertWithReason",accounts[3],{from:accounts[0]});
    let result = await contractAccount.removeService(11,{from: accounts[7]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[7],10000,19,1336,2014223716,97,257,[188,16,70,48,4,239,169,127,49,185,79,200,127,163,115,201,153,250,45,43,63,149,195,223,182,178,252,90,115,114,32,14],"RevertWithReason","RevertWithReason",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(11,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[5],1532892062,17,17,27,26,2014223715,[12,151,181,239,63,217,49,70,48,87,222,80,50,139,43,148,21,158,226,137,40,109,95,143,106,203,4,145,104,92,42,52],"anxgoi","IsLibrary",accounts[5],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([12,158,217,207,134,108,47,211,232,149,173,165,68,233,78,228,61,117,51,250,225,90,70,128,249,205,196,40,42,230,200,124],{from: accounts[5]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[5],1532892062,17,17,27,26,2014223715,[12,151,181,239,63,217,49,70,48,87,222,80,50,139,43,148,21,158,226,137,40,109,95,143,106,203,4,145,104,92,42,52],"anxgoi","IsLibrary",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([12,158,217,207,134,108,47,211,232,149,173,165,68,233,78,228,61,117,51,250,225,90,70,128,249,205,196,40,42,230,200,124],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(28, "Example",{from: accounts[9]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(28, "Example",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
