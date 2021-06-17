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
    contractMockERC20 = await MockERC20.new(1532892062,{from:accounts[1]});
    if(trace) console.log('SUCESSO: MockERC20.new(1532892062,{from:accounts[1]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[3],3,1532892062,64,2014223715,2014223716,1532892063,[28,114,242,65,229,104,55,177,223,147,132,162,125,193,66,232,13,35,155,128,205,17,51,212,135,222,13,90,48,129,108,187],"","bouncer",accounts[3],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[3], [189,213,196,235,149,21,133,36,200,64,255,2,122,131,201,166,17,202,228,207,219,245,8,175,15,23,6,162,74,121,233,109],{from: accounts[3]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[3],3,1532892062,64,2014223715,2014223716,1532892063,[28,114,242,65,229,104,55,177,223,147,132,162,125,193,66,232,13,35,155,128,205,17,51,212,135,222,13,90,48,129,108,187],"","bouncer",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[3], [189,213,196,235,149,21,133,36,200,64,255,2,122,131,201,166,17,202,228,207,219,245,8,175,15,23,6,162,74,121,233,109],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[9], 1532892064, 6, 28, 3, 95, 1, [228,236,68,178,85,179,76,7,77,146,239,168,135,206,235,50,46,134,161,14,251,91,181,32,179,60,165,79,141,204,187,56], "superuser", "whitelist", accounts[2],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[1],255,6,1336,2014223715,11,18,[37,251,18,126,200,238,203,59,118,52,139,47,245,178,18,157,198,206,46,148,170,168,143,126,180,209,9,231,140,244,75,82],"","Example",accounts[6],{from:accounts[0]});
    let result = await contractAccount.addService(0,{from: accounts[1]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[1],255,6,1336,2014223715,11,18,[37,251,18,126,200,238,203,59,118,52,139,47,245,178,18,157,198,206,46,148,170,168,143,126,180,209,9,231,140,244,75,82],"","Example",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(0,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[5],1336,2014223714,2014223714,0,0,65,[98,15,162,176,41,118,235,191,1,205,78,181,242,246,165,196,145,244,78,54,236,19,163,217,245,146,219,198,76,249,179,241],"\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32",accounts[4],{from:accounts[0]});
    let result = await contractAccount.removeService(0,{from: accounts[5]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[5],1336,2014223714,2014223714,0,0,65,[98,15,162,176,41,118,235,191,1,205,78,181,242,246,165,196,145,244,78,54,236,19,163,217,245,146,219,198,76,249,179,241],"\x19Ethereum Signed Message:\n32","\x19Ethereum Signed Message:\n32",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(0,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[1],2014223715,64,10000,2014223716,6,97,[179,171,0,112,153,236,8,115,241,23,255,217,23,137,127,180,109,237,206,251,96,41,11,206,178,52,249,210,81,126,136,114],"minter","RevertWithReason",accounts[3],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([190,249,230,221,102,200,148,225,100,17,193,141,91,208,85,29,191,96,75,194,169,150,238,72,226,63,232,155,181,184,229,71],{from: accounts[1]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[1],2014223715,64,10000,2014223716,6,97,[179,171,0,112,153,236,8,115,241,23,255,217,23,137,127,180,109,237,206,251,96,41,11,206,178,52,249,210,81,126,136,114],"minter","RevertWithReason",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([190,249,230,221,102,200,148,225,100,17,193,141,91,208,85,29,191,96,75,194,169,150,238,72,226,63,232,155,181,184,229,71],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(64, "whitelist",{from: accounts[4]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(64, "whitelist",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
