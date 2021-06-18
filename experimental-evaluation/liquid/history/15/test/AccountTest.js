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
    contractMockERC20 = await MockERC20.new(2014223715,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(2014223715,{from:accounts[3]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[7],9,1,257,4,26,97,[179,51,51,230,193,10,212,1,135,11,118,28,13,3,123,92,80,160,205,154,139,75,245,191,196,245,223,171,137,138,127,234],"PayableExample","Example",accounts[8],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[8], [158,117,178,207,222,49,10,145,157,3,76,21,186,77,204,25,186,105,240,237,110,184,231,108,116,63,252,121,248,62,226,105],{from: accounts[7]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[7],9,1,257,4,26,97,[179,51,51,230,193,10,212,1,135,11,118,28,13,3,123,92,80,160,205,154,139,75,245,191,196,245,223,171,137,138,127,234],"PayableExample","Example",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[8], [158,117,178,207,222,49,10,145,157,3,76,21,186,77,204,25,186,105,240,237,110,184,231,108,116,63,252,121,248,62,226,105],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4], accounts[0], 1532892062, 10000, 27, 65, 4038714809, 1337, [53,56,69,41,85,69,196,93,99,180,15,15,174,72,3,222,9,224,130,48,203,222,236,23,41,219,27,234,90,32,204,160], "bouncer", "whitelist", accounts[2],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[9],1532892062,256,28,95,1,1,[164,157,116,240,45,178,0,226,133,5,127,128,26,149,185,60,182,240,98,35,79,209,9,121,144,76,65,202,12,85,176,103],"superuser","minter",accounts[2],{from:accounts[0]});
    let result = await contractAccount.addService(1337,{from: accounts[9]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[9],1532892062,256,28,95,1,1,[164,157,116,240,45,178,0,226,133,5,127,128,26,149,185,60,182,240,98,35,79,209,9,121,144,76,65,202,12,85,176,103],"superuser","minter",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1337,{from: accounts[8]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[5],255,255,2014223715,28,0,10000,[239,52,252,219,154,2,122,155,142,234,191,148,125,110,248,71,168,56,144,170,124,107,184,72,106,108,2,249,196,173,147,11],"","RevertWithReason",accounts[5],{from:accounts[0]});
    let result = await contractAccount.removeService(1,{from: accounts[5]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[5],255,255,2014223715,28,0,10000,[239,52,252,219,154,2,122,155,142,234,191,148,125,110,248,71,168,56,144,170,124,107,184,72,106,108,2,249,196,173,147,11],"","RevertWithReason",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(1,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[1],3,29,2014223714,19,96,10000,[171,114,89,106,36,32,226,235,35,54,156,230,212,185,254,11,12,214,63,65,131,20,11,253,215,32,113,240,146,65,71,83],"PayableExample","minter",accounts[1],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([131,207,87,140,134,53,224,141,21,135,69,142,116,123,50,53,166,189,3,203,139,78,206,70,123,163,168,153,157,202,67,115],{from: accounts[1]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[1],3,29,2014223714,19,96,10000,[171,114,89,106,36,32,226,235,35,54,156,230,212,185,254,11,12,214,63,65,131,20,11,253,215,32,113,240,146,65,71,83],"PayableExample","minter",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([131,207,87,140,134,53,224,141,21,135,69,142,116,123,50,53,166,189,3,203,139,78,206,70,123,163,168,153,157,202,67,115],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(10001, "superuser",{from: accounts[7]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(10001, "superuser",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
