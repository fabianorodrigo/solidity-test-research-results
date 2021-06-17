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
    contractMockERC20 = await MockERC20.new(1,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MockERC20.new(1,{from:accounts[0]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[7],28,4038714809,10000,28,9999,2014223716,[179,1,71,99,198,75,184,26,164,167,248,4,25,58,18,93,80,172,109,213,46,99,76,197,56,116,44,151,1,10,74,117],"\x19Ethereum Signed Message:\n32","Example",accounts[4],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[2], [236,205,185,102,234,247,64,14,174,151,75,86,7,72,200,85,69,157,151,207,170,236,8,12,160,251,188,112,75,226,115,231],{from: accounts[7]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[7],28,4038714809,10000,28,9999,2014223716,[179,1,71,99,198,75,184,26,164,167,248,4,25,58,18,93,80,172,109,213,46,99,76,197,56,116,44,151,1,10,74,117],"\x19Ethereum Signed Message:\n32","Example",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[2], [236,205,185,102,234,247,64,14,174,151,75,86,7,72,200,85,69,157,151,207,170,236,8,12,160,251,188,112,75,226,115,231],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3], accounts[4], 26, 10001, 1532892063, 66, 17, 1532892063, [245,242,23,149,21,192,178,120,20,45,116,245,71,64,249,235,194,177,72,42,44,8,177,104,121,244,147,188,141,27,117,7], "RevertWithReason", "RevertWithReason", accounts[3],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[0],10001,1532892064,2014223716,18,4038714810,4,[80,199,15,85,188,217,27,91,20,194,198,62,242,151,46,167,33,199,14,45,205,115,77,49,144,148,189,71,37,112,42,109],"RevertWithReason","superuser",accounts[9],{from:accounts[0]});
    let result = await contractAccount.addService(1,{from: accounts[0]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[0],10001,1532892064,2014223716,18,4038714810,4,[80,199,15,85,188,217,27,91,20,194,198,62,242,151,46,167,33,199,14,45,205,115,77,49,144,148,189,71,37,112,42,109],"RevertWithReason","superuser",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[9],2014223714,17,256,2014223716,65,9999,[202,74,132,0,51,136,20,107,96,241,232,234,201,249,238,28,58,39,32,66,109,235,183,130,137,179,91,132,205,130,222,92],"\x19Ethereum Signed Message:\n32","whitelist",accounts[7],{from:accounts[0]});
    let result = await contractAccount.removeService(19,{from: accounts[9]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[9],2014223714,17,256,2014223716,65,9999,[202,74,132,0,51,136,20,107,96,241,232,234,201,249,238,28,58,39,32,66,109,235,183,130,137,179,91,132,205,130,222,92],"\x19Ethereum Signed Message:\n32","whitelist",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(19,{from: accounts[8]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[0],28,18,2014223714,1336,1532892063,96,[238,227,137,162,8,86,76,33,12,215,46,193,219,32,84,72,224,254,127,96,157,63,35,98,165,124,123,211,217,5,215,11],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[8],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([52,130,180,40,197,142,156,138,174,187,152,35,146,72,236,56,47,242,159,134,157,32,42,241,210,255,112,91,236,8,153,56],{from: accounts[0]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[0],28,18,2014223714,1336,1532892063,96,[238,227,137,162,8,86,76,33,12,215,46,193,219,32,84,72,224,254,127,96,157,63,35,98,165,124,123,211,217,5,215,11],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([52,130,180,40,197,142,156,138,174,187,152,35,146,72,236,56,47,242,159,134,157,32,42,241,210,255,112,91,236,8,153,56],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(2014223716, "RevertWithReason",{from: accounts[5]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(2014223716, "RevertWithReason",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
