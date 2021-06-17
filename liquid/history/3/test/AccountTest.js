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
    contractMockERC20 = await MockERC20.new(6,{from:accounts[2]});
    if(trace) console.log('SUCESSO: MockERC20.new(6,{from:accounts[2]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[0],1532892064,1336,0,1532892062,257,1338,[45,224,191,93,248,91,153,241,248,246,65,71,84,217,213,138,192,25,174,222,118,74,119,151,243,137,63,177,140,57,40,119],"minter","\x19Ethereum Signed Message:\n32",accounts[6],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[5], [200,72,195,246,229,34,167,107,142,166,114,111,150,182,97,239,253,227,2,131,14,92,115,221,5,101,5,118,127,46,81,64],{from: accounts[0]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[0],1532892064,1336,0,1532892062,257,1338,[45,224,191,93,248,91,153,241,248,246,65,71,84,217,213,138,192,25,174,222,118,74,119,151,243,137,63,177,140,57,40,119],"minter","\x19Ethereum Signed Message:\n32",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[5], [200,72,195,246,229,34,167,107,142,166,114,111,150,182,97,239,253,227,2,131,14,92,115,221,5,101,5,118,127,46,81,64],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1], accounts[2], 9999, 26, 96, 1336, 1532892063, 9, [10,143,67,51,216,170,242,106,231,164,118,28,44,60,247,126,50,153,232,51,21,193,148,1,161,226,35,157,229,15,91,58], "RevertWithReason", "bouncer", accounts[0],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[1],96,2014223716,11,1336,17,1337,[201,234,225,168,83,111,182,129,40,142,248,219,24,15,247,46,233,37,81,89,209,219,140,22,243,84,120,216,205,3,95,208],"feuss","IsLibrary",accounts[2],{from:accounts[0]});
    let result = await contractAccount.addService(10001,{from: accounts[1]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[1],96,2014223716,11,1336,17,1337,[201,234,225,168,83,111,182,129,40,142,248,219,24,15,247,46,233,37,81,89,209,219,140,22,243,84,120,216,205,3,95,208],"feuss","IsLibrary",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(10001,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],4038714809,28,17,1532892063,9999,256,[237,81,239,55,152,44,40,29,137,33,95,61,86,241,26,100,217,113,42,195,78,154,147,165,167,13,100,32,255,211,9,223],"RevertWithReason","superuser",accounts[4],{from:accounts[0]});
    let result = await contractAccount.removeService(6,{from: accounts[4]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],4038714809,28,17,1532892063,9999,256,[237,81,239,55,152,44,40,29,137,33,95,61,86,241,26,100,217,113,42,195,78,154,147,165,167,13,100,32,255,211,9,223],"RevertWithReason","superuser",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(6,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[3],10,10001,2,28,0,10001,[70,1,97,1,38,124,176,9,50,105,31,162,80,228,90,99,29,152,200,35,151,176,165,123,152,246,108,159,62,22,235,33],"Example","IsLibrary",accounts[5],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([117,152,207,120,0,137,46,241,49,111,14,76,245,247,197,159,179,252,2,154,9,73,77,238,237,40,184,87,234,213,67,242],{from: accounts[3]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[3],10,10001,2,28,0,10001,[70,1,97,1,38,124,176,9,50,105,31,162,80,228,90,99,29,152,200,35,151,176,165,123,152,246,108,159,62,22,235,33],"Example","IsLibrary",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([117,152,207,120,0,137,46,241,49,111,14,76,245,247,197,159,179,252,2,154,9,73,77,238,237,40,184,87,234,213,67,242],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(2014223716, "minter",{from: accounts[4]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(2014223716, "minter",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
