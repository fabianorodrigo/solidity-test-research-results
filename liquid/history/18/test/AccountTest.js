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
    contractMockERC20 = await MockERC20.new(6,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(6,{from:accounts[3]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[1],1336,1336,96,18,5,1532892063,[56,182,112,9,236,82,87,189,78,213,67,84,121,64,52,19,233,81,9,147,186,186,177,72,89,77,88,182,100,27,212,75],"IsLibrary","PayableExample",accounts[3],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[9], [59,239,61,49,133,151,115,156,74,131,148,221,90,9,131,103,245,44,7,216,51,85,222,137,19,214,230,2,146,20,194,162],{from: accounts[1]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[1],1336,1336,96,18,5,1532892063,[56,182,112,9,236,82,87,189,78,213,67,84,121,64,52,19,233,81,9,147,186,186,177,72,89,77,88,182,100,27,212,75],"IsLibrary","PayableExample",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[9], [59,239,61,49,133,151,115,156,74,131,148,221,90,9,131,103,245,44,7,216,51,85,222,137,19,214,230,2,146,20,194,162],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[6], 9, 1, 2014223714, 3, 96, 5, [134,158,212,238,83,177,7,218,221,72,70,204,27,209,234,16,202,158,186,212,229,43,160,103,123,64,226,83,183,211,59,58], "bouncer", "", accounts[6],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[8],64,65,1532892064,4038714811,26,26,[198,129,187,59,94,146,117,169,221,38,211,226,99,131,111,213,124,129,255,121,225,105,18,221,244,77,164,180,19,235,97,235],"RevertWithReason","5oio5x",accounts[5],{from:accounts[0]});
    let result = await contractAccount.addService(1,{from: accounts[8]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[8],64,65,1532892064,4038714811,26,26,[198,129,187,59,94,146,117,169,221,38,211,226,99,131,111,213,124,129,255,121,225,105,18,221,244,77,164,180,19,235,97,235],"RevertWithReason","5oio5x",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[2],9,66,66,4038714809,64,97,[106,121,195,121,72,224,211,166,197,132,115,156,150,110,93,40,202,123,228,232,136,210,40,147,2,22,9,2,22,117,146,137],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[4],{from:accounts[0]});
    let result = await contractAccount.removeService(9,{from: accounts[2]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[2],9,66,66,4038714809,64,97,[106,121,195,121,72,224,211,166,197,132,115,156,150,110,93,40,202,123,228,232,136,210,40,147,2,22,9,2,22,117,146,137],"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(9,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[9],0,1532892063,10000,9,4038714811,66,[5,40,224,91,11,44,191,124,237,164,76,61,132,210,125,83,132,174,68,8,236,41,226,88,232,128,160,120,242,251,26,97],"superuser","superuser",accounts[7],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([210,71,92,102,40,19,37,173,253,113,20,180,12,52,105,79,255,139,83,136,157,105,65,43,181,77,232,53,34,11,239,130],{from: accounts[9]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[9],0,1532892063,10000,9,4038714811,66,[5,40,224,91,11,44,191,124,237,164,76,61,132,210,125,83,132,174,68,8,236,41,226,88,232,128,160,120,242,251,26,97],"superuser","superuser",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([210,71,92,102,40,19,37,173,253,113,20,180,12,52,105,79,255,139,83,136,157,105,65,43,181,77,232,53,34,11,239,130],{from: accounts[8]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(1, "minter",{from: accounts[2]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(1, "minter",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
