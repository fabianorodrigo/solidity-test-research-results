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
    contractMockERC20 = await MockERC20.new(2014223715,{from:accounts[8]});
    if(trace) console.log('SUCESSO: MockERC20.new(2014223715,{from:accounts[8]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[8],256,10000,1,27,0,66,[187,57,85,142,246,64,255,129,185,114,176,180,130,218,74,106,55,106,59,76,134,9,74,76,142,234,27,112,159,200,159,238],"\x19Ethereum Signed Message:\n32","PayableExample",accounts[7],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[5], [149,75,52,220,38,11,203,62,178,166,110,137,32,34,84,136,221,14,42,242,111,50,218,0,183,148,111,178,52,15,213,7],{from: accounts[8]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[8],256,10000,1,27,0,66,[187,57,85,142,246,64,255,129,185,114,176,180,130,218,74,106,55,106,59,76,134,9,74,76,142,234,27,112,159,200,159,238],"\x19Ethereum Signed Message:\n32","PayableExample",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[5], [149,75,52,220,38,11,203,62,178,166,110,137,32,34,84,136,221,14,42,242,111,50,218,0,183,148,111,178,52,15,213,7],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3], accounts[1], 4038714811, 2014223714, 256, 3, 5, 5, [25,192,45,212,176,34,49,33,3,164,106,184,53,195,41,25,128,236,29,94,121,139,223,128,121,84,20,167,204,28,191,125], "bouncer", "initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)", accounts[6],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[4],9999,1532892062,4038714809,1336,11,10001,[255,105,201,192,128,94,100,55,178,178,158,37,230,237,137,218,96,158,18,47,14,159,201,215,66,100,93,244,186,162,154,53],"IsLibrary","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[9],{from:accounts[0]});
    let result = await contractAccount.addService(1532892063,{from: accounts[4]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[4],9999,1532892062,4038714809,1336,11,10001,[255,105,201,192,128,94,100,55,178,178,158,37,230,237,137,218,96,158,18,47,14,159,201,215,66,100,93,244,186,162,154,53],"IsLibrary","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1532892063,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[6],4,257,1532892062,19,27,10001,[186,83,175,126,169,1,147,4,101,93,169,251,9,86,158,234,11,112,248,129,163,251,137,9,120,166,221,134,208,82,185,74],"","RevertWithReason",accounts[3],{from:accounts[0]});
    let result = await contractAccount.removeService(255,{from: accounts[6]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[6],4,257,1532892062,19,27,10001,[186,83,175,126,169,1,147,4,101,93,169,251,9,86,158,234,11,112,248,129,163,251,137,9,120,166,221,134,208,82,185,74],"","RevertWithReason",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(255,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[4],96,1336,1532892064,26,4,96,[202,184,56,169,57,4,122,23,108,62,185,127,154,32,139,175,58,223,190,147,222,61,62,87,55,37,184,86,48,42,17,16],"Example","UsesExample",accounts[5],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([78,60,143,11,211,90,157,90,138,213,27,80,182,250,78,104,247,143,208,81,164,173,207,194,250,137,217,100,212,101,87,165],{from: accounts[4]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[4],96,1336,1532892064,26,4,96,[202,184,56,169,57,4,122,23,108,62,185,127,154,32,139,175,58,223,190,147,222,61,62,87,55,37,184,86,48,42,17,16],"Example","UsesExample",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([78,60,143,11,211,90,157,90,138,213,27,80,182,250,78,104,247,143,208,81,164,173,207,194,250,137,217,100,212,101,87,165],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(1336, "whitelist",{from: accounts[5]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(1336, "whitelist",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
