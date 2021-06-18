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
    contractMockERC20 = await MockERC20.new(2014223716,{from:accounts[2]});
    if(trace) console.log('SUCESSO: MockERC20.new(2014223716,{from:accounts[2]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[3],1,11,2014223715,3,5,26,[170,192,96,48,12,172,24,73,239,58,201,182,200,19,198,84,125,153,228,27,252,35,67,27,19,93,199,84,45,208,46,91],"PayableExample","RevertWithReason",accounts[9],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[2], [33,169,214,93,140,93,6,158,121,24,181,182,211,157,140,141,245,50,79,189,234,77,62,66,200,227,202,209,29,255,201,4],{from: accounts[3]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[3],1,11,2014223715,3,5,26,[170,192,96,48,12,172,24,73,239,58,201,182,200,19,198,84,125,153,228,27,252,35,67,27,19,93,199,84,45,208,46,91],"PayableExample","RevertWithReason",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[2], [33,169,214,93,140,93,6,158,121,24,181,182,211,157,140,141,245,50,79,189,234,77,62,66,200,227,202,209,29,255,201,4],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[8], 64, 4, 4, 1338, 1532892063, 256, [47,210,115,194,145,160,199,71,249,45,147,242,172,150,253,42,145,153,113,78,55,134,103,41,252,42,36,114,222,142,74,178], "UsesExample", "b07gs9", accounts[5],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[5],65,10001,9,27,1338,1532892063,[255,143,64,113,219,65,226,5,144,53,113,79,218,196,143,119,66,33,16,140,233,178,37,62,26,63,159,47,234,99,140,211],"UsesExample","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[5],{from:accounts[0]});
    let result = await contractAccount.addService(65,{from: accounts[5]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[5],65,10001,9,27,1338,1532892063,[255,143,64,113,219,65,226,5,144,53,113,79,218,196,143,119,66,33,16,140,233,178,37,62,26,63,159,47,234,99,140,211],"UsesExample","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(65,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[6],4,27,4038714811,64,64,9,[215,61,252,25,115,198,183,59,23,165,12,137,37,168,155,3,18,165,184,229,64,192,137,101,77,82,31,134,8,70,178,22],"whitelist","b07gs9",accounts[2],{from:accounts[0]});
    let result = await contractAccount.removeService(26,{from: accounts[6]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[6],4,27,4038714811,64,64,9,[215,61,252,25,115,198,183,59,23,165,12,137,37,168,155,3,18,165,184,229,64,192,137,101,77,82,31,134,8,70,178,22],"whitelist","b07gs9",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(26,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[3],11,17,2014223714,17,18,10001,[226,197,110,184,251,47,246,189,136,254,221,183,213,144,159,12,18,82,7,109,149,63,188,42,79,239,37,106,82,253,248,126],"IsLibrary","superuser",accounts[8],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([245,189,215,19,72,82,245,214,43,196,237,73,223,36,232,95,230,16,233,39,120,190,115,252,8,148,9,109,55,177,214,124],{from: accounts[3]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[3],11,17,2014223714,17,18,10001,[226,197,110,184,251,47,246,189,136,254,221,183,213,144,159,12,18,82,7,109,149,63,188,42,79,239,37,106,82,253,248,126],"IsLibrary","superuser",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([245,189,215,19,72,82,245,214,43,196,237,73,223,36,232,95,230,16,233,39,120,190,115,252,8,148,9,109,55,177,214,124],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(26, "Example",{from: accounts[9]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(26, "Example",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
