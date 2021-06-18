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

contract("DoubleCurveToken",(accounts)=>{
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
    contractMockERC20 = await MockERC20.new(257,{from:accounts[9]});
    if(trace) console.log('SUCESSO: MockERC20.new(257,{from:accounts[9]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractDoubleCurveToken.sendTransaction({from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint>0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractAccount.address, accounts[7], 27, 5, 17, 256, 18, 28, "Example", "whitelist", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint<=0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address, accounts[8], 257, 65, 2014223716, 19, 1, 0, "whitelist", "22x8c", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute withdraw() WHEN reserveAsset==0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[7],0,9999,18,2014223716,11,2014223715,"","minter",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](64,{from:accounts[0]});
    await contractDoubleCurveToken.buy(2,5,{from:accounts[6],gasPrice:64});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[6]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[7],0,9999,18,2014223716,11,2014223715,"","minter",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](64,{from:accounts[0]});
    await contractDoubleCurveToken.buy(1532892063,3,{from:accounts[9],gasPrice:3});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[6]}),'revert');
  });
  it('Should execute withdraw() WHEN reserveAsset!=0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[4],accounts[0],28,2014223716,5,10,257,4038714810,"minter","UsesExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](2014223716,{from:accounts[0]});
    await contractDoubleCurveToken.buy(1,5,{from:accounts[9],gasPrice:255});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[9]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[4],accounts[0],28,2014223716,5,10,257,4038714810,"minter","UsesExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](2014223716,{from:accounts[0]});
    await contractDoubleCurveToken.buy(4038714810,19,{from:accounts[6],gasPrice:1336});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[9]}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value>cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[5],4038714810,256,4038714810,29,4038714810,6,"bouncer","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](10000,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(3, 1532892062,{from: accounts[1],value:9999});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[5],4038714810,256,4038714810,29,4038714810,6,"bouncer","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](10000,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(3, 1532892062,{from: 0,value:9999}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value<=cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[3],4,19,257,11,3,2014223714,"22x8c","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](6,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(96, 1532892062,{from: accounts[4],value:1532892064});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[3],4,19,257,11,3,2014223714,"22x8c","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](6,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(96, 1532892062,{from: 0,value:1532892064}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[1],accounts[7],27,3,2014223715,66,2014223716,4038714810,"Example","\x19Ethereum Signed Message:\n32",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](2014223716,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(257, 2014223714,{from: accounts[3]});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[1],accounts[7],27,3,2014223715,66,2014223716,4038714810,"Example","\x19Ethereum Signed Message:\n32",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](2014223716,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(257, 2014223714,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],65,2014223716,1337,1337,27,255,"superuser","\x19Ethereum Signed Message:\n32",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](4,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(64, 1338,{from: accounts[2]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],65,2014223716,1337,1337,27,255,"superuser","\x19Ethereum Signed Message:\n32",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](4,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(64, 1338,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[1],accounts[1],95,10000,4038714810,1,2014223714,26,"UsesExample","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](26,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(1, 5,{from: accounts[2]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[1],accounts[1],95,10000,4038714810,1,2014223714,26,"UsesExample","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](26,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(1, 5,{from: 0}),'revert');
  });
  it('Should execute priceToBuy(uint256)', async () => {
    let result = await contractDoubleCurveToken.priceToBuy(1532892064,{from: accounts[0]});
  });
  it('Should execute returnForSell(uint256)', async () => {
    let result = await contractDoubleCurveToken.returnForSell(1336,{from: accounts[0]});
  });
  it('Should execute amountToReserve(uint256) WHEN spreadD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address,accounts[3],28,65,255,10001,10000,2,"\x19Ethereum Signed Message:\n32","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.amountToReserve(1532892062,{from: accounts[0]});
  });
  it('Should fail amountToReserve(uint256) when NOT comply with: spreadD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address,accounts[1],1337,19,10,10001,0,1338,"anxgoi","minter",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.amountToReserve(1532892062,{from: accounts[0]}),'revert');
  });
  it('Should execute currentPrice() WHEN slopeD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[2],1336,10000,10,1336,29,1532892064,"ekw9ds","",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.currentPrice({from: accounts[0]});
  });
  it('Should fail currentPrice() when NOT comply with: slopeD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address,accounts[8],4,0,26,9,2014223716,9,"n27k6","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.currentPrice({from: accounts[0]}),'revert');
  });
  it('Should execute marketCap() WHEN NumberLiteral ** NumberLiteral>0', async () => {
    let result = await contractDoubleCurveToken.marketCap({from: accounts[0]});
  });
});
