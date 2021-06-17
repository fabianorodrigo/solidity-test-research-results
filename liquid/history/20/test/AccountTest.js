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
    contractMockERC20 = await MockERC20.new(256,{from:accounts[6]});
    if(trace) console.log('SUCESSO: MockERC20.new(256,{from:accounts[6]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[0],1,27,1337,1532892062,1338,66,[127,127,142,57,224,19,50,232,89,122,158,1,21,202,80,162,231,208,166,149,141,132,46,158,214,136,168,75,217,72,177,232],"PayableExample","whitelist",accounts[7],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[9], [110,166,166,164,78,251,122,65,73,29,136,177,29,121,71,236,89,196,90,128,12,235,7,201,101,210,112,214,196,207,74,12],{from: accounts[0]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[0],1,27,1337,1532892062,1338,66,[127,127,142,57,224,19,50,232,89,122,158,1,21,202,80,162,231,208,166,149,141,132,46,158,214,136,168,75,217,72,177,232],"PayableExample","whitelist",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[9], [110,166,166,164,78,251,122,65,73,29,136,177,29,121,71,236,89,196,90,128,12,235,7,201,101,210,112,214,196,207,74,12],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5], accounts[5], 66, 1336, 0, 256, 256, 28, [33,3,206,211,1,121,126,89,249,152,109,82,9,249,131,208,97,165,71,224,85,93,123,67,179,171,173,192,80,19,109,101], "bouncer", "whitelist", accounts[8],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[7],18,29,97,95,1532892064,1,[30,13,187,76,84,238,111,52,142,108,234,17,156,101,254,195,63,42,251,120,251,155,28,30,32,200,111,97,70,30,160,163],"Example","superuser",accounts[1],{from:accounts[0]});
    let result = await contractAccount.addService(256,{from: accounts[7]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[6],accounts[7],18,29,97,95,1532892064,1,[30,13,187,76,84,238,111,52,142,108,234,17,156,101,254,195,63,42,251,120,251,155,28,30,32,200,111,97,70,30,160,163],"Example","superuser",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(256,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[6],255,1532892063,19,6,2014223715,66,[251,176,88,175,102,90,136,210,179,157,187,159,101,196,239,251,32,16,249,2,16,13,98,132,1,143,245,84,9,117,72,143],"superuser","IsLibrary",accounts[2],{from:accounts[0]});
    let result = await contractAccount.removeService(97,{from: accounts[6]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[1],accounts[6],255,1532892063,19,6,2014223715,66,[251,176,88,175,102,90,136,210,179,157,187,159,101,196,239,251,32,16,249,2,16,13,98,132,1,143,245,84,9,117,72,143],"superuser","IsLibrary",accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(97,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[3],66,9999,1,96,19,256,[198,89,122,79,156,131,144,62,222,189,208,239,165,29,34,189,142,193,138,52,43,220,224,223,106,132,94,12,209,192,163,50],"Example","",accounts[1],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([8,6,97,53,77,60,53,87,133,15,130,128,136,123,245,103,151,126,154,162,52,15,204,114,110,0,75,48,179,192,167,4],{from: accounts[3]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[5],accounts[3],66,9999,1,96,19,256,[198,89,122,79,156,131,144,62,222,189,208,239,165,29,34,189,142,193,138,52,43,220,224,223,106,132,94,12,209,192,163,50],"Example","",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([8,6,97,53,77,60,53,87,133,15,130,128,136,123,245,103,151,126,154,162,52,15,204,114,110,0,75,48,179,192,167,4],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(4038714811, "initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",{from: accounts[3]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(4038714811, "initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
