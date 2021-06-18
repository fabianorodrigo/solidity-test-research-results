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
    contractMockERC20 = await MockERC20.new(2,{from:accounts[8]});
    if(trace) console.log('SUCESSO: MockERC20.new(2,{from:accounts[8]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[0],65,3,26,17,9,1532892064,[199,246,158,118,54,195,238,160,166,38,233,65,217,187,198,233,235,243,189,56,143,223,121,146,19,148,76,62,168,211,221,220],"bouncer","",accounts[3],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[4], [132,138,156,146,9,17,111,231,32,187,188,106,213,156,229,154,52,240,252,208,75,34,97,188,164,44,97,216,11,181,40,113],{from: accounts[0]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[0],65,3,26,17,9,1532892064,[199,246,158,118,54,195,238,160,166,38,233,65,217,187,198,233,235,243,189,56,143,223,121,146,19,148,76,62,168,211,221,220],"bouncer","",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[4], [132,138,156,146,9,17,111,231,32,187,188,106,213,156,229,154,52,240,252,208,75,34,97,188,164,44,97,216,11,181,40,113],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8], accounts[1], 6, 4038714811, 29, 1, 11, 97, [20,86,157,175,198,61,254,159,100,196,8,38,61,221,28,109,62,100,192,35,67,101,10,17,140,111,41,2,182,82,63,192], "\x19Ethereum Signed Message:\n32", "UsesExample", accounts[3],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[3],1,65,10000,10001,3,29,[121,239,56,76,234,112,105,22,160,13,200,144,20,22,44,124,218,172,30,171,91,5,105,86,18,149,178,139,93,39,96,199],"0wvmth","Example",accounts[7],{from:accounts[0]});
    let result = await contractAccount.addService(9999,{from: accounts[3]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[3],1,65,10000,10001,3,29,[121,239,56,76,234,112,105,22,160,13,200,144,20,22,44,124,218,172,30,171,91,5,105,86,18,149,178,139,93,39,96,199],"0wvmth","Example",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(9999,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[5],4038714811,1532892062,1532892064,1532892063,95,10001,[212,159,30,253,25,176,245,201,46,87,217,152,199,72,76,197,201,55,18,203,112,3,37,81,134,185,65,144,118,26,166,219],"","Example",accounts[0],{from:accounts[0]});
    let result = await contractAccount.removeService(19,{from: accounts[5]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[5],4038714811,1532892062,1532892064,1532892063,95,10001,[212,159,30,253,25,176,245,201,46,87,217,152,199,72,76,197,201,55,18,203,112,3,37,81,134,185,65,144,118,26,166,219],"","Example",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(19,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[2],9999,1532892064,1532892064,2,2014223715,2014223716,[66,22,142,8,15,207,72,193,25,219,158,18,204,219,106,24,24,132,240,9,44,195,105,31,85,147,8,126,68,65,47,226],"bouncer","RevertWithReason",accounts[9],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([3,174,246,228,120,122,228,228,172,208,163,18,197,47,89,109,36,57,255,191,138,72,90,166,110,135,41,65,11,103,95,48],{from: accounts[2]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[2],9999,1532892064,1532892064,2,2014223715,2014223716,[66,22,142,8,15,207,72,193,25,219,158,18,204,219,106,24,24,132,240,9,44,195,105,31,85,147,8,126,68,65,47,226],"bouncer","RevertWithReason",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([3,174,246,228,120,122,228,228,172,208,163,18,197,47,89,109,36,57,255,191,138,72,90,166,110,135,41,65,11,103,95,48],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(2014223716, "\x19Ethereum Signed Message:\n32",{from: accounts[1]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(2014223716, "\x19Ethereum Signed Message:\n32",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
