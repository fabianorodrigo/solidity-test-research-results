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
    contractMockERC20 = await MockERC20.new(9,{from:accounts[6]});
    if(trace) console.log('SUCESSO: MockERC20.new(9,{from:accounts[6]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[0],66,96,9999,6,26,4038714809,[121,201,11,145,67,42,147,75,178,189,217,203,53,200,61,33,24,239,255,187,40,29,251,245,59,237,21,97,160,84,32,87],"UsesExample","minter",accounts[5],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[8], [100,253,223,141,210,238,160,240,112,50,255,215,0,217,22,191,52,224,121,217,40,154,63,25,8,146,83,200,153,100,92,181],{from: accounts[0]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[0],66,96,9999,6,26,4038714809,[121,201,11,145,67,42,147,75,178,189,217,203,53,200,61,33,24,239,255,187,40,29,251,245,59,237,21,97,160,84,32,87],"UsesExample","minter",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[8], [100,253,223,141,210,238,160,240,112,50,255,215,0,217,22,191,52,224,121,217,40,154,63,25,8,146,83,200,153,100,92,181],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3], accounts[4], 256, 4038714810, 28, 28, 1532892063, 2, [191,205,53,250,37,210,191,210,103,174,164,7,134,179,143,237,177,136,2,250,102,151,247,16,87,135,98,26,251,122,217,34], "superuser", "IsLibrary", accounts[2],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],11,1532892064,1,4,66,4038714810,[86,218,123,239,28,171,25,155,91,99,163,193,20,110,225,254,44,27,76,61,187,166,46,138,209,221,221,206,110,109,247,90],"bouncer","minter",accounts[5],{from:accounts[0]});
    let result = await contractAccount.addService(10001,{from: accounts[4]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],11,1532892064,1,4,66,4038714810,[86,218,123,239,28,171,25,155,91,99,163,193,20,110,225,254,44,27,76,61,187,166,46,138,209,221,221,206,110,109,247,90],"bouncer","minter",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(10001,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[5],27,257,2014223714,10001,1,2,[223,113,112,108,249,189,71,10,210,242,180,254,27,245,105,52,7,97,212,36,32,122,213,6,63,235,47,118,16,32,146,83],"RevertWithReason","PayableExample",accounts[0],{from:accounts[0]});
    let result = await contractAccount.removeService(255,{from: accounts[5]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[5],27,257,2014223714,10001,1,2,[223,113,112,108,249,189,71,10,210,242,180,254,27,245,105,52,7,97,212,36,32,122,213,6,63,235,47,118,16,32,146,83],"RevertWithReason","PayableExample",accounts[0],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(255,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[3],97,2014223716,96,0,1,2014223715,[186,13,6,221,245,158,118,61,63,177,99,217,45,233,204,124,208,139,88,100,46,243,105,143,30,64,236,69,57,43,239,211],"minter","",accounts[3],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([230,52,236,53,135,91,22,232,230,218,78,93,60,11,123,101,147,166,231,41,247,42,221,153,62,167,21,203,159,117,222,142],{from: accounts[3]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[3],97,2014223716,96,0,1,2014223715,[186,13,6,221,245,158,118,61,63,177,99,217,45,233,204,124,208,139,88,100,46,243,105,143,30,64,236,69,57,43,239,211],"minter","",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([230,52,236,53,135,91,22,232,230,218,78,93,60,11,123,101,147,166,231,41,247,42,221,153,62,167,21,203,159,117,222,142],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(255, "bouncer",{from: accounts[7]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(255, "bouncer",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
