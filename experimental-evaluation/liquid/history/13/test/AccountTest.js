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
    contractMockERC20 = await MockERC20.new(5,{from:accounts[5]});
    if(trace) console.log('SUCESSO: MockERC20.new(5,{from:accounts[5]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[3],17,5,256,3,11,19,[238,238,184,32,84,10,123,100,18,116,189,60,199,254,54,250,108,153,34,48,50,72,204,90,216,110,120,51,242,181,35,13],"RevertWithReason","Example",accounts[1],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[3], [174,193,133,240,119,185,90,184,34,129,237,161,39,162,70,200,77,179,204,8,25,185,223,191,11,165,112,106,18,238,254,16],{from: accounts[3]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[3],17,5,256,3,11,19,[238,238,184,32,84,10,123,100,18,116,189,60,199,254,54,250,108,153,34,48,50,72,204,90,216,110,120,51,242,181,35,13],"RevertWithReason","Example",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[3], [174,193,133,240,119,185,90,184,34,129,237,161,39,162,70,200,77,179,204,8,25,185,223,191,11,165,112,106,18,238,254,16],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6], accounts[3], 4, 4038714811, 1337, 29, 97, 256, [207,83,212,57,33,249,9,169,78,206,155,143,145,167,218,21,76,87,27,91,234,100,181,166,24,81,239,178,192,126,3,118], "IsLibrary", "RevertWithReason", accounts[8],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[5],19,26,11,4038714809,19,65,[114,26,63,135,201,127,162,109,180,117,86,101,54,220,82,74,208,168,248,75,154,77,230,80,91,168,221,30,201,57,215,7],"IsLibrary","bouncer",accounts[1],{from:accounts[0]});
    let result = await contractAccount.addService(19,{from: accounts[5]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[5],19,26,11,4038714809,19,65,[114,26,63,135,201,127,162,109,180,117,86,101,54,220,82,74,208,168,248,75,154,77,230,80,91,168,221,30,201,57,215,7],"IsLibrary","bouncer",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(19,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[8],255,9999,66,26,255,95,[131,181,103,37,57,88,16,32,59,250,121,91,68,206,255,40,220,155,216,180,150,211,96,76,65,152,118,135,30,209,43,85],"superuser","minter",accounts[8],{from:accounts[0]});
    let result = await contractAccount.removeService(17,{from: accounts[8]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[8],255,9999,66,26,255,95,[131,181,103,37,57,88,16,32,59,250,121,91,68,206,255,40,220,155,216,180,150,211,96,76,65,152,118,135,30,209,43,85],"superuser","minter",accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(17,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[8],9,1532892064,17,1,5,0,[129,199,91,46,77,35,3,151,40,145,120,193,238,87,91,224,134,105,60,19,195,186,40,251,243,9,53,251,203,51,91,129],"\x19Ethereum Signed Message:\n32","minter",accounts[0],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([240,87,4,209,123,145,194,193,85,188,145,124,251,47,229,115,103,143,215,86,182,140,1,169,163,231,32,40,73,110,102,175],{from: accounts[8]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[8],9,1532892064,17,1,5,0,[129,199,91,46,77,35,3,151,40,145,120,193,238,87,91,224,134,105,60,19,195,186,40,251,243,9,53,251,203,51,91,129],"\x19Ethereum Signed Message:\n32","minter",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([240,87,4,209,123,145,194,193,85,188,145,124,251,47,229,115,103,143,215,86,182,140,1,169,163,231,32,40,73,110,102,175],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(18, "pm2e0x",{from: accounts[6]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(18, "pm2e0x",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
