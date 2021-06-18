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
    contractMockERC20 = await MockERC20.new(28,{from:accounts[0]});
    if(trace) console.log('SUCESSO: MockERC20.new(28,{from:accounts[0]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[3],27,18,6,1338,257,1338,[203,81,125,154,206,239,108,107,145,91,88,4,248,119,80,255,29,173,74,140,199,205,59,71,170,155,244,177,62,110,135,131],"whitelist","whitelist",accounts[6],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[1], [82,55,25,103,69,186,53,172,2,51,179,245,116,130,158,83,64,95,132,81,137,161,15,231,33,94,130,151,6,76,15,179],{from: accounts[3]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[3],27,18,6,1338,257,1338,[203,81,125,154,206,239,108,107,145,91,88,4,248,119,80,255,29,173,74,140,199,205,59,71,170,155,244,177,62,110,135,131],"whitelist","whitelist",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[1], [82,55,25,103,69,186,53,172,2,51,179,245,116,130,158,83,64,95,132,81,137,161,15,231,33,94,130,151,6,76,15,179],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[0], 4038714810, 64, 27, 9, 1338, 257, [200,70,242,253,228,242,2,179,248,215,13,5,86,227,163,118,71,172,213,255,235,86,223,134,127,186,230,127,132,123,131,116], "\x19Ethereum Signed Message:\n32", "initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)", accounts[8],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[3],2014223715,26,1,10,1337,66,[85,218,10,155,12,49,71,195,239,76,255,192,237,119,105,97,6,136,145,177,4,190,55,37,117,134,1,249,253,49,185,159],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","0kjd3n",accounts[3],{from:accounts[0]});
    let result = await contractAccount.addService(2014223715,{from: accounts[3]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[3],2014223715,26,1,10,1337,66,[85,218,10,155,12,49,71,195,239,76,255,192,237,119,105,97,6,136,145,177,4,190,55,37,117,134,1,249,253,49,185,159],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","0kjd3n",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(2014223715,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[1],27,17,1,27,2014223714,1,[41,158,32,10,160,128,50,151,174,227,73,247,44,113,47,232,165,233,77,214,82,232,78,211,29,223,73,154,184,116,154,79],"RevertWithReason","whitelist",accounts[1],{from:accounts[0]});
    let result = await contractAccount.removeService(1,{from: accounts[1]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[1],27,17,1,27,2014223714,1,[41,158,32,10,160,128,50,151,174,227,73,247,44,113,47,232,165,233,77,214,82,232,78,211,29,223,73,154,184,116,154,79],"RevertWithReason","whitelist",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(1,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[9],10001,1338,65,17,4038714811,0,[232,5,58,19,237,196,28,33,117,111,8,135,184,100,217,15,76,237,248,23,174,201,117,104,104,223,203,194,233,80,218,205],"0kjd3n","UsesExample",accounts[9],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([4,240,6,151,186,82,50,184,72,248,185,222,58,79,175,210,11,179,218,125,193,1,59,88,145,29,251,177,207,116,181,153],{from: accounts[9]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[9],10001,1338,65,17,4038714811,0,[232,5,58,19,237,196,28,33,117,111,8,135,184,100,217,15,76,237,248,23,174,201,117,104,104,223,203,194,233,80,218,205],"0kjd3n","UsesExample",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([4,240,6,151,186,82,50,184,72,248,185,222,58,79,175,210,11,179,218,125,193,1,59,88,145,29,251,177,207,116,181,153],{from: accounts[8]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(11, "IsLibrary",{from: accounts[7]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(11, "IsLibrary",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
