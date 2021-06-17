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
    contractMockERC20 = await MockERC20.new(96,{from:accounts[5]});
    if(trace) console.log('SUCESSO: MockERC20.new(96,{from:accounts[5]}');
  });
  
  it('Should execute proxy(address,bytes) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[7],1337,1336,1,2014223714,3,1532892064,[142,151,111,99,195,65,95,238,77,165,61,218,80,141,112,213,220,237,111,96,41,151,236,163,153,81,79,134,26,151,199,32],"UsesExample","bouncer",accounts[3],{from:accounts[0]});
    let result = await contractAccount.proxy(accounts[7], [26,187,176,35,186,4,230,63,153,57,52,99,63,90,115,0,165,216,32,186,137,31,151,156,161,231,85,33,95,131,49,167],{from: accounts[7]});
  });
  it('Should fail proxy(address,bytes) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[7],accounts[7],1337,1336,1,2014223714,3,1532892064,[142,151,111,99,195,65,95,238,77,165,61,218,80,141,112,213,220,237,111,96,41,151,236,163,153,81,79,134,26,151,199,32],"UsesExample","bouncer",accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.proxy(accounts[7], [26,187,176,35,186,4,230,63,153,57,52,99,63,90,115,0,165,216,32,186,137,31,151,156,161,231,85,33,95,131,49,167],{from: accounts[9]}),'revert');
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address) WHEN initialized!=true', async () => {
    let result = await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[2], accounts[4], 28, 27, 2014223714, 256, 65, 19, [157,100,239,85,19,92,204,35,11,128,205,232,183,192,5,171,201,58,181,197,242,206,206,106,123,88,214,197,8,34,237,58], "\x19Ethereum Signed Message:\n32", "superuser", accounts[8],{from: accounts[0]});
  });
  it('Should execute addService(uint256) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],1,1532892063,1532892062,255,4038714810,2014223715,[67,64,156,231,55,3,129,150,155,180,104,127,79,134,55,142,82,238,71,181,243,34,204,147,9,106,11,214,204,129,31,16],"superuser","\x19Ethereum Signed Message:\n32",accounts[7],{from:accounts[0]});
    let result = await contractAccount.addService(1336,{from: accounts[4]});
  });
  it('Should fail addService(uint256) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[9],accounts[4],1,1532892063,1532892062,255,4038714810,2014223715,[67,64,156,231,55,3,129,150,155,180,104,127,79,134,55,142,82,238,71,181,243,34,204,147,9,106,11,214,204,129,31,16],"superuser","\x19Ethereum Signed Message:\n32",accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.addService(1336,{from: accounts[9]}),'revert');
  });
  it('Should execute removeService(uint8) WHEN msg.sender==beneficiary,services!=0', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[1],1338,2,17,6,5,4,[88,198,167,46,175,118,167,116,105,133,129,241,93,74,8,46,246,238,22,18,1,105,57,152,107,30,199,126,170,193,121,82],"Example","minter",accounts[9],{from:accounts[0]});
    let result = await contractAccount.removeService(27,{from: accounts[1]});
  });
  it('Should fail removeService(uint8) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[3],accounts[1],1338,2,17,6,5,4,[88,198,167,46,175,118,167,116,105,133,129,241,93,74,8,46,246,238,22,18,1,105,57,152,107,30,199,126,170,193,121,82],"Example","minter",accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.removeService(27,{from: accounts[9]}),'revert');
  });
  it('Should execute updateMetadata(bytes32) WHEN msg.sender==beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[0],5,29,6,1336,96,4038714810,[161,137,73,93,233,213,126,104,186,92,222,6,51,75,24,215,7,189,192,105,41,150,18,165,178,75,29,186,207,166,42,150],"minter","whitelist",accounts[1],{from:accounts[0]});
    let result = await contractAccount.updateMetadata([203,128,166,80,43,72,242,93,248,239,48,162,147,119,183,222,213,56,14,72,63,177,107,123,171,175,212,85,215,119,215,96],{from: accounts[0]});
  });
  it('Should fail updateMetadata(bytes32) when NOT comply with: msg.sender == beneficiary', async () => {
    await contractAccount.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)"](accounts[4],accounts[0],5,29,6,1336,96,4038714810,[161,137,73,93,233,213,126,104,186,92,222,6,51,75,24,215,7,189,192,105,41,150,18,165,178,75,29,186,207,166,42,150],"minter","whitelist",accounts[1],{from:accounts[0]});
    let result = await truffleAssert.fails(contractAccount.updateMetadata([203,128,166,80,43,72,242,93,248,239,48,162,147,119,183,222,213,56,14,72,63,177,107,123,171,175,212,85,215,119,215,96],{from: accounts[9]}),'revert');
  });
  it('Should execute requestService(uint256,string) WHEN msg.sender!=0', async () => {
    let result = await contractAccount.requestService(19, "Example",{from: accounts[9]});
  });
  it('Should fail requestService(uint256,string) when NOT comply with: msg.sender != 0', async () => {
    let result = await truffleAssert.fails(contractAccount.requestService(19, "Example",{from: 0}),'revert');
  });
  it('Should execute creator()', async () => {
    let result = await contractAccount.creator({from: accounts[0]});
  });
});
