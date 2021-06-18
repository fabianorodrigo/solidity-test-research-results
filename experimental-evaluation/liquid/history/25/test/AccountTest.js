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
    contractMockERC20 = await MockERC20.new(1,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(1,{from:accounts[3]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[5],257,4,255,28,1337,4038714809,[188,176,80,197,107,135,71,174,163,21,83,3,134,107,36,90,149,2,181,21,191,129,255,96,249,135,234,228,191,199,30,162],"minter","PayableExample",accounts[1],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[6], [234,162,58,184,244,89,66,233,217,38,145,83,58,113,198,253,124,246,96,200,77,120,43,1,135,250,71,6,155,222,133,221],{from: accounts[5]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[5],257,4,255,28,1337,4038714809,[188,176,80,197,107,135,71,174,163,21,83,3,134,107,36,90,149,2,181,21,191,129,255,96,249,135,234,228,191,199,30,162],"minter","PayableExample",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[6], [234,162,58,184,244,89,66,233,217,38,145,83,58,113,198,253,124,246,96,200,77,120,43,1,135,250,71,6,155,222,133,221],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7], accounts[6], 10, 27, 1336, 3, 28, 9, [50,171,228,121,71,99,13,77,190,206,22,36,6,156,179,207,46,86,210,219,55,171,183,84,11,123,193,79,66,141,221,22], "superuser", "UsesExample", accounts[3],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[8],2014223714,64,27,11,28,4038714809,[119,12,255,203,238,125,252,52,64,205,27,96,85,132,51,34,137,222,220,220,58,208,24,86,217,75,217,6,19,95,234,21],"x314cc","whitelist",accounts[4],{from:accounts[0]});
    let result = await contractAccount.addService(1336,{from: accounts[8]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[8],2014223714,64,27,11,28,4038714809,[119,12,255,203,238,125,252,52,64,205,27,96,85,132,51,34,137,222,220,220,58,208,24,86,217,75,217,6,19,95,234,21],"x314cc","whitelist",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1336,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[4],1532892064,4,1338,10000,6,10000,[205,86,177,212,46,29,166,211,247,153,209,113,90,76,14,161,142,241,54,152,134,188,255,246,89,137,229,78,98,44,5,10],"Example","",accounts[0],{from:accounts[0]});
    let result = await contractAccount.removeService(17,{from: accounts[4]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[4],1532892064,4,1338,10000,6,10000,[205,86,177,212,46,29,166,211,247,153,209,113,90,76,14,161,142,241,54,152,134,188,255,246,89,137,229,78,98,44,5,10],"Example","",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(17,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[1],2,1532892064,1532892063,3,2014223716,257,[139,51,78,124,102,166,16,210,131,164,123,45,248,11,31,244,195,226,2,90,46,47,56,134,175,179,253,158,88,77,109,101],"x314cc","minter",accounts[7],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([220,107,142,118,108,83,45,54,202,37,15,27,148,195,82,160,165,4,25,239,198,206,30,70,49,41,199,151,165,12,32,161],{from: accounts[1]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[1],2,1532892064,1532892063,3,2014223716,257,[139,51,78,124,102,166,16,210,131,164,123,45,248,11,31,244,195,226,2,90,46,47,56,134,175,179,253,158,88,77,109,101],"x314cc","minter",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([220,107,142,118,108,83,45,54,202,37,15,27,148,195,82,160,165,4,25,239,198,206,30,70,49,41,199,151,165,12,32,161],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(4038714811, "RevertWithReason",{from: accounts[0]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(4038714811, "RevertWithReason",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
