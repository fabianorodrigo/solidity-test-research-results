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
    contractMockERC20 = await MockERC20.new(2014223714,{from:accounts[1]});
    if(trace) console.log('SUCESSO: MockERC20.new(2014223714,{from:accounts[1]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[1],95,255,19,3,257,2014223714,[235,60,38,162,101,179,210,112,46,37,39,236,207,56,222,243,190,98,110,240,150,252,87,147,99,212,81,203,175,192,19,233],"PayableExample","UsesExample",accounts[2],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[8], [26,159,90,83,124,198,47,187,214,24,96,32,32,214,106,153,82,120,98,209,28,141,139,191,253,148,232,31,85,163,98,2],{from: accounts[1]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[1],95,255,19,3,257,2014223714,[235,60,38,162,101,179,210,112,46,37,39,236,207,56,222,243,190,98,110,240,150,252,87,147,99,212,81,203,175,192,19,233],"PayableExample","UsesExample",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[8], [26,159,90,83,124,198,47,187,214,24,96,32,32,214,106,153,82,120,98,209,28,141,139,191,253,148,232,31,85,163,98,2],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[0], accounts[6], 1, 97, 256, 2014223716, 19, 1337, [47,99,67,114,3,204,224,181,18,12,45,180,237,252,145,6,220,23,17,14,189,7,53,206,227,149,24,86,108,64,174,14], "IsLibrary", "Example", accounts[2],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[4],64,4038714810,28,17,10,4038714809,[3,119,212,197,146,27,86,76,77,0,198,71,239,31,54,63,150,14,19,195,150,4,252,28,92,46,92,225,250,9,241,152],"superuser","UsesExample",accounts[5],{from:accounts[0]});
    let result = await contractAccount.addService(65,{from: accounts[4]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[8],accounts[4],64,4038714810,28,17,10,4038714809,[3,119,212,197,146,27,86,76,77,0,198,71,239,31,54,63,150,14,19,195,150,4,252,28,92,46,92,225,250,9,241,152],"superuser","UsesExample",accounts[5],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(65,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[7],17,97,1532892063,255,65,10001,[36,115,9,80,223,206,47,121,122,58,2,217,39,239,129,178,58,226,194,42,137,254,194,86,149,243,210,135,121,54,1,242],"78pe6n","bouncer",accounts[6],{from:accounts[0]});
    let result = await contractAccount.removeService(19,{from: accounts[7]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[7],17,97,1532892063,255,65,10001,[36,115,9,80,223,206,47,121,122,58,2,217,39,239,129,178,58,226,194,42,137,254,194,86,149,243,210,135,121,54,1,242],"78pe6n","bouncer",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(19,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[8],2,6,17,4038714811,9,65,[172,163,208,254,37,90,198,175,59,60,251,87,225,206,94,128,45,29,82,60,255,62,136,117,59,131,220,211,250,192,0,88],"superuser","UsesExample",accounts[6],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([48,63,243,25,121,220,63,216,9,242,212,162,111,19,123,192,191,102,58,200,134,129,12,33,97,179,119,112,39,116,68,210],{from: accounts[8]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[8],2,6,17,4038714811,9,65,[172,163,208,254,37,90,198,175,59,60,251,87,225,206,94,128,45,29,82,60,255,62,136,117,59,131,220,211,250,192,0,88],"superuser","UsesExample",accounts[6],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([48,63,243,25,121,220,63,216,9,242,212,162,111,19,123,192,191,102,58,200,134,129,12,33,97,179,119,112,39,116,68,210],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(5, "\x19Ethereum Signed Message:\n32",{from: accounts[1]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(5, "\x19Ethereum Signed Message:\n32",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
