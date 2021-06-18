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
    contractMockERC20 = await MockERC20.new(1,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(1,{from:accounts[3]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractDoubleCurveToken.sendTransaction({from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint>0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractAccount.address, accounts[6], 11, 1532892064, 96, 1532892063, 1532892064, 11, "x314cc", "IsLibrary", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint<=0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address, accounts[2], 65, 4038714810, 4038714809, 95, 1532892064, 0, "whitelist", "superuser", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute withdraw() WHEN reserveAsset==0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],95,1532892063,4038714811,3,1338,1532892063,"RevertWithReason","minter",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](10,{from:accounts[0]});
    await contractDoubleCurveToken.buy(4038714810,255,{from:accounts[7],gasPrice:1});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[7]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],95,1532892063,4038714811,3,1338,1532892063,"RevertWithReason","minter",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](10,{from:accounts[0]});
    await contractDoubleCurveToken.buy(256,18,{from:accounts[9],gasPrice:4});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[7]}),'revert');
  });
  it('Should execute withdraw() WHEN reserveAsset!=0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[6],accounts[4],66,1337,10001,10,97,64,"UsesExample","minter",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](10001,{from:accounts[0]});
    await contractDoubleCurveToken.buy(1,19,{from:accounts[7],gasPrice:1336});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[7]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[6],accounts[4],66,1337,10001,10,97,64,"UsesExample","minter",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](10001,{from:accounts[0]});
    await contractDoubleCurveToken.buy(95,97,{from:accounts[4],gasPrice:257});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[7]}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value>cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[4],255,29,28,19,1532892063,18,"i04uvl","IsLibrary",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(26, 10000,{from: accounts[3],value:64});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[4],255,29,28,19,1532892063,18,"i04uvl","IsLibrary",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(26, 10000,{from: 0,value:64}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value<=cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[4],65,10,255,2,1337,2014223714,"IsLibrary","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](11,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(28, 1532892063,{from: accounts[6],value:4038714809});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[4],65,10,255,2,1337,2014223714,"IsLibrary","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](11,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(28, 1532892063,{from: 0,value:4038714809}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[7],accounts[8],9,4038714809,5,2014223714,26,5,"epu7nx","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(96, 64,{from: accounts[4]});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[7],accounts[8],9,4038714809,5,2014223714,26,5,"epu7nx","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(96, 64,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[6],66,9999,17,9999,96,1337,"RevertWithReason","superuser",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](65,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(9, 1337,{from: accounts[4]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[6],66,9999,17,9999,96,1337,"RevertWithReason","superuser",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](65,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(9, 1337,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[5],accounts[8],18,65,1336,9,256,1336,"superuser","epu7nx",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](5,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(5, 65,{from: accounts[9]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[5],accounts[8],18,65,1336,9,256,1336,"superuser","epu7nx",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](5,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(5, 65,{from: 0}),'revert');
  });
  it('Should execute priceToBuy(uint256)', async () => {
    let result = await contractDoubleCurveToken.priceToBuy(17,{from: accounts[0]});
  });
  it('Should execute returnForSell(uint256)', async () => {
    let result = await contractDoubleCurveToken.returnForSell(2014223716,{from: accounts[0]});
  });
  it('Should execute amountToReserve(uint256) WHEN spreadD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractAccount.address,accounts[7],1337,2,97,11,29,26,"RevertWithReason","UsesExample",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.amountToReserve(19,{from: accounts[0]});
  });
  it('Should fail amountToReserve(uint256) when NOT comply with: spreadD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[9],9,9999,1532892063,5,0,257,"PayableExample","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.amountToReserve(19,{from: accounts[0]}),'revert');
  });
  it('Should execute currentPrice() WHEN slopeD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractAccount.address,accounts[1],66,6,4,4,29,255,"\x19Ethereum Signed Message:\n32","x314cc",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.currentPrice({from: accounts[0]});
  });
  it('Should fail currentPrice() when NOT comply with: slopeD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address,accounts[3],10000,0,19,2014223716,9,17,"PayableExample","i04uvl",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.currentPrice({from: accounts[0]}),'revert');
  });
  it('Should execute marketCap() WHEN NumberLiteral ** NumberLiteral>0', async () => {
    let result = await contractDoubleCurveToken.marketCap({from: accounts[0]});
  });
});
