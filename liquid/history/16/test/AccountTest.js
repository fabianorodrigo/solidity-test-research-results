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
    contractMockERC20 = await MockERC20.new(1,{from:accounts[2]});
    if(trace) console.log('SUCESSO: MockERC20.new(1,{from:accounts[2]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[7],11,96,4038714811,9999,3,1336,[117,192,147,151,131,242,184,108,132,116,178,17,143,193,162,74,244,133,82,135,69,76,90,236,92,71,37,51,106,42,247,197],"","Example",accounts[1],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[4], [72,71,8,100,254,121,70,53,132,226,171,235,100,248,108,38,38,235,58,149,251,21,13,22,106,33,29,83,22,192,65,242],{from: accounts[7]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2],accounts[7],11,96,4038714811,9999,3,1336,[117,192,147,151,131,242,184,108,132,116,178,17,143,193,162,74,244,133,82,135,69,76,90,236,92,71,37,51,106,42,247,197],"","Example",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[4], [72,71,8,100,254,121,70,53,132,226,171,235,100,248,108,38,38,235,58,149,251,21,13,22,106,33,29,83,22,192,65,242],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4], accounts[1], 19, 10, 1, 95, 10000, 1, [72,46,228,66,176,142,204,141,110,43,102,168,207,45,191,132,32,121,241,48,79,37,76,167,248,152,92,176,158,113,156,35], "", "IsLibrary", accounts[1],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[9],4038714809,1532892063,1336,27,4,3,[105,188,152,97,216,125,24,233,83,117,169,117,255,229,111,202,212,63,73,110,149,223,187,244,243,100,160,117,107,182,213,225],"PayableExample","RevertWithReason",accounts[4],{from:accounts[0]});
    let result = await contractAccount.addService(4038714809,{from: accounts[9]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[9],4038714809,1532892063,1336,27,4,3,[105,188,152,97,216,125,24,233,83,117,169,117,255,229,111,202,212,63,73,110,149,223,187,244,243,100,160,117,107,182,213,225],"PayableExample","RevertWithReason",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(4038714809,{from: accounts[8]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[6],95,0,1338,28,27,1337,[241,192,67,212,142,23,45,137,246,137,72,119,52,178,21,122,40,25,16,186,138,57,74,61,38,158,191,187,54,108,97,112],"bouncer","Example",accounts[4],{from:accounts[0]});
    let result = await contractAccount.removeService(11,{from: accounts[6]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[6],95,0,1338,28,27,1337,[241,192,67,212,142,23,45,137,246,137,72,119,52,178,21,122,40,25,16,186,138,57,74,61,38,158,191,187,54,108,97,112],"bouncer","Example",accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(11,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[0],4038714810,3,11,18,10,1,[9,92,104,154,55,65,165,26,204,214,115,132,201,93,71,209,250,37,214,181,169,201,50,23,48,46,30,31,145,242,103,167],"RevertWithReason","UsesExample",accounts[2],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([55,145,38,20,142,39,24,123,61,136,125,109,211,73,214,250,143,193,186,64,247,65,208,241,190,12,28,219,189,106,50,150],{from: accounts[0]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[0],4038714810,3,11,18,10,1,[9,92,104,154,55,65,165,26,204,214,115,132,201,93,71,209,250,37,214,181,169,201,50,23,48,46,30,31,145,242,103,167],"RevertWithReason","UsesExample",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([55,145,38,20,142,39,24,123,61,136,125,109,211,73,214,250,143,193,186,64,247,65,208,241,190,12,28,219,189,106,50,150],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(1, "",{from: accounts[6]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(1, "",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
