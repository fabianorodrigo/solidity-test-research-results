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
    contractMockERC20 = await MockERC20.new(65,{from:accounts[8]});
    if(trace) console.log('SUCESSO: MockERC20.new(65,{from:accounts[8]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[9],1,11,10000,26,64,2014223716,[161,230,73,252,24,1,189,212,187,246,82,95,103,197,61,125,130,87,158,162,87,213,194,20,60,134,37,122,157,240,216,181],"superuser","UsesExample",accounts[0],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[9], [64,39,110,197,116,192,119,54,180,44,94,49,253,10,179,49,147,60,251,4,59,225,22,47,65,206,5,160,209,118,154,29],{from: accounts[9]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[9],1,11,10000,26,64,2014223716,[161,230,73,252,24,1,189,212,187,246,82,95,103,197,61,125,130,87,158,162,87,213,194,20,60,134,37,122,157,240,216,181],"superuser","UsesExample",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[9], [64,39,110,197,116,192,119,54,180,44,94,49,253,10,179,49,147,60,251,4,59,225,22,47,65,206,5,160,209,118,154,29],{from: accounts[8]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1], accounts[0], 1338, 10001, 1338, 0, 95, 9, [17,207,120,247,131,105,40,105,61,167,196,15,201,117,19,178,199,214,237,116,22,7,187,16,207,105,124,41,122,233,149,16], "", "", accounts[3],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[7],5,1336,2014223716,1532892062,95,256,[163,74,152,131,196,249,131,93,127,224,185,141,104,93,7,192,246,230,236,182,179,167,245,77,117,154,105,101,215,9,4,149],"minter","UsesExample",accounts[3],{from:accounts[0]});
    let result = await contractAccount.addService(1532892064,{from: accounts[7]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[7],5,1336,2014223716,1532892062,95,256,[163,74,152,131,196,249,131,93,127,224,185,141,104,93,7,192,246,230,236,182,179,167,245,77,117,154,105,101,215,9,4,149],"minter","UsesExample",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1532892064,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],10001,97,6,9,2014223715,11,[67,127,194,158,133,18,219,239,159,189,194,24,121,46,106,128,20,33,204,174,205,164,49,195,28,52,165,54,74,165,42,109],"bouncer","UsesExample",accounts[9],{from:accounts[0]});
    let result = await contractAccount.removeService(6,{from: accounts[4]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],10001,97,6,9,2014223715,11,[67,127,194,158,133,18,219,239,159,189,194,24,121,46,106,128,20,33,204,174,205,164,49,195,28,52,165,54,74,165,42,109],"bouncer","UsesExample",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(6,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[4],96,65,4038714811,1338,19,95,[116,166,69,153,15,52,28,79,26,29,150,89,42,73,73,38,237,2,211,27,35,171,244,124,196,184,52,180,206,67,90,58],"Example","UsesExample",accounts[3],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([145,120,18,236,236,152,44,139,151,40,214,18,97,207,72,70,44,107,103,230,216,44,222,119,8,191,60,145,74,127,38,102],{from: accounts[4]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0],accounts[4],96,65,4038714811,1338,19,95,[116,166,69,153,15,52,28,79,26,29,150,89,42,73,73,38,237,2,211,27,35,171,244,124,196,184,52,180,206,67,90,58],"Example","UsesExample",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([145,120,18,236,236,152,44,139,151,40,214,18,97,207,72,70,44,107,103,230,216,44,222,119,8,191,60,145,74,127,38,102],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(29, "4ut9h",{from: accounts[4]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(29, "4ut9h",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
