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
    contractMockERC20 = await MockERC20.new(4038714809,{from:accounts[4]});
    if(trace) console.log('SUCESSO: MockERC20.new(4038714809,{from:accounts[4]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[2],29,1532892063,2014223714,4038714810,4038714811,97,[17,3,92,102,42,195,206,159,179,109,209,26,88,249,250,193,255,89,60,59,44,223,248,81,114,139,132,250,60,221,118,32],"bjo8ba","bouncer",accounts[6],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[2], [221,185,153,88,85,244,250,167,63,4,25,71,209,132,45,180,175,233,115,223,98,9,193,70,42,25,144,15,151,91,178,216],{from: accounts[2]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[2],29,1532892063,2014223714,4038714810,4038714811,97,[17,3,92,102,42,195,206,159,179,109,209,26,88,249,250,193,255,89,60,59,44,223,248,81,114,139,132,250,60,221,118,32],"bjo8ba","bouncer",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[2], [221,185,153,88,85,244,250,167,63,4,25,71,209,132,45,180,175,233,115,223,98,9,193,70,42,25,144,15,151,91,178,216],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8], accounts[1], 96, 1532892063, 1532892062, 26, 97, 10000, [66,204,160,187,102,85,127,6,13,177,107,210,165,21,209,40,202,154,170,154,98,58,1,216,166,79,174,153,103,11,18,113], "IsLibrary", "whitelist", accounts[7],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[0],1,4038714809,95,6,18,1532892062,[184,132,238,159,7,167,199,12,90,27,168,71,213,251,235,65,220,78,223,242,219,64,123,164,123,153,153,12,14,115,109,51],"Example","superuser",accounts[0],{from:accounts[0]});
    let result = await contractAccount.addService(1336,{from: accounts[0]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[0],1,4038714809,95,6,18,1532892062,[184,132,238,159,7,167,199,12,90,27,168,71,213,251,235,65,220,78,223,242,219,64,123,164,123,153,153,12,14,115,109,51],"Example","superuser",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1336,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[3],2014223716,1,1,1532892064,2,10001,[196,92,93,105,111,217,59,67,197,130,98,75,79,201,167,22,195,3,10,246,232,195,24,176,14,145,139,5,234,52,95,252],"IsLibrary","Example",accounts[7],{from:accounts[0]});
    let result = await contractAccount.removeService(97,{from: accounts[3]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[3],2014223716,1,1,1532892064,2,10001,[196,92,93,105,111,217,59,67,197,130,98,75,79,201,167,22,195,3,10,246,232,195,24,176,14,145,139,5,234,52,95,252],"IsLibrary","Example",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(97,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[4],1337,65,1337,1532892062,1532892062,64,[42,208,182,89,62,112,120,242,246,216,99,44,61,105,218,93,55,6,217,125,173,89,14,128,88,53,98,160,228,150,232,127],"","\x19Ethereum Signed Message:\n32",accounts[7],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([96,65,83,93,19,130,146,103,64,27,222,69,37,1,128,87,63,208,60,154,45,110,93,7,103,165,125,213,19,0,91,111],{from: accounts[4]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[4],1337,65,1337,1532892062,1532892062,64,[42,208,182,89,62,112,120,242,246,216,99,44,61,105,218,93,55,6,217,125,173,89,14,128,88,53,98,160,228,150,232,127],"","\x19Ethereum Signed Message:\n32",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([96,65,83,93,19,130,146,103,64,27,222,69,37,1,128,87,63,208,60,154,45,110,93,7,103,165,125,213,19,0,91,111],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(19, "bjo8ba",{from: accounts[8]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(19, "bjo8ba",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
