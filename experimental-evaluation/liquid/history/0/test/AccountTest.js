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
    contractMockERC20 = await MockERC20.new(3,{from:accounts[5]});
    if(trace) console.log('SUCESSO: MockERC20.new(3,{from:accounts[5]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[1],1532892062,28,1338,256,1336,65,[105,233,127,74,86,131,42,18,93,56,163,250,169,47,50,161,143,46,158,217,170,27,242,73,26,121,194,112,136,58,49,97],"\x19Ethereum Signed Message:\n32","",accounts[5],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[6], [222,107,65,180,2,8,27,41,52,48,66,112,177,5,48,227,2,169,214,182,49,119,218,65,180,117,211,85,213,65,169,45],{from: accounts[1]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[1],1532892062,28,1338,256,1336,65,[105,233,127,74,86,131,42,18,93,56,163,250,169,47,50,161,143,46,158,217,170,27,242,73,26,121,194,112,136,58,49,97],"\x19Ethereum Signed Message:\n32","",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[6], [222,107,65,180,2,8,27,41,52,48,66,112,177,5,48,227,2,169,214,182,49,119,218,65,180,117,211,85,213,65,169,45],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8], accounts[0], 65, 17, 66, 97, 95, 64, [58,94,113,212,46,21,162,252,36,233,24,210,226,106,52,147,128,5,204,166,170,62,30,187,149,80,239,4,86,8,91,170], "bouncer", "y22u7p", accounts[3],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[2],5,5,257,2,4,5,[123,123,151,234,61,175,165,75,74,32,47,180,73,141,104,202,38,209,34,170,91,189,207,43,196,248,120,16,247,127,210,251],"bouncer","\x19Ethereum Signed Message:\n32",accounts[3],{from:accounts[0]});
    let result = await contractAccount.addService(17,{from: accounts[2]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[2],5,5,257,2,4,5,[123,123,151,234,61,175,165,75,74,32,47,180,73,141,104,202,38,209,34,170,91,189,207,43,196,248,120,16,247,127,210,251],"bouncer","\x19Ethereum Signed Message:\n32",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(17,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[8],1338,29,6,4038714809,0,4038714809,[172,2,120,243,235,77,143,184,12,188,129,117,233,93,170,66,87,38,182,54,126,15,128,211,79,26,164,162,179,228,255,243],"\x19Ethereum Signed Message:\n32","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[8],{from:accounts[0]});
    let result = await contractAccount.removeService(29,{from: accounts[8]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[8],1338,29,6,4038714809,0,4038714809,[172,2,120,243,235,77,143,184,12,188,129,117,233,93,170,66,87,38,182,54,126,15,128,211,79,26,164,162,179,228,255,243],"\x19Ethereum Signed Message:\n32","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(29,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[4],10000,257,10,29,2014223716,9,[52,237,142,180,109,83,37,139,73,64,9,17,215,137,129,188,80,43,130,224,19,254,87,30,118,14,167,22,32,251,72,226],"minter","RevertWithReason",accounts[8],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([83,37,88,193,141,143,154,56,226,172,39,186,62,35,244,30,169,185,92,153,22,228,52,128,222,35,12,248,198,200,183,39],{from: accounts[4]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[4],10000,257,10,29,2014223716,9,[52,237,142,180,109,83,37,139,73,64,9,17,215,137,129,188,80,43,130,224,19,254,87,30,118,14,167,22,32,251,72,226],"minter","RevertWithReason",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([83,37,88,193,141,143,154,56,226,172,39,186,62,35,244,30,169,185,92,153,22,228,52,128,222,35,12,248,198,200,183,39],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(9999, "g0s9bv",{from: accounts[8]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(9999, "g0s9bv",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
