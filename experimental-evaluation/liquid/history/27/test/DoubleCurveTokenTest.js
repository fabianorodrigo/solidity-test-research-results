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
    contractMockERC20 = await MockERC20.new(3,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(3,{from:accounts[3]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractDoubleCurveToken.sendTransaction({from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint>0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address, accounts[6], 64, 1532892063, 65, 2014223715, 28, 1, "PayableExample", "IsLibrary", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint<=0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address, accounts[7], 257, 10000, 257, 6, 28, 0, "vnc2n", "", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute withdraw() WHEN reserveAsset==0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[5],10000,1336,3,4,2,6,"PayableExample","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1532892062,{from:accounts[0]});
    await contractDoubleCurveToken.buy(2014223715,257,{from:accounts[3],gasPrice:4});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[3]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[5],10000,1336,3,4,2,6,"PayableExample","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1532892062,{from:accounts[0]});
    await contractDoubleCurveToken.buy(10001,0,{from:accounts[2],gasPrice:64});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[3]}),'revert');
  });
  it('Should execute withdraw() WHEN reserveAsset!=0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[1],accounts[8],9999,19,4038714811,6,95,1532892063,"superuser","PayableExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](10000,{from:accounts[0]});
    await contractDoubleCurveToken.buy(19,256,{from:accounts[5],gasPrice:1336});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[5]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[1],accounts[8],9999,19,4038714811,6,95,1532892063,"superuser","PayableExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](10000,{from:accounts[0]});
    await contractDoubleCurveToken.buy(26,1532892064,{from:accounts[9],gasPrice:1});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[5]}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value>cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],3,95,4038714809,4038714811,2014223714,2014223715,"UsesExample","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](255,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(9999, 97,{from: accounts[8],value:256});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],3,95,4038714809,4038714811,2014223714,2014223715,"UsesExample","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](255,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(9999, 97,{from: 0,value:256}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value<=cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[2],3,1532892063,1532892063,10001,10001,1338,"UsesExample","IsLibrary",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](4038714809,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(27, 66,{from: accounts[6],value:256});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[2],3,1532892063,1532892063,10001,10001,1338,"UsesExample","IsLibrary",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](4038714809,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(27, 66,{from: 0,value:256}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[0],accounts[0],1532892064,4038714810,256,1532892063,26,18,"superuser","UsesExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](29,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(9999, 257,{from: accounts[7]});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[0],accounts[0],1532892064,4038714810,256,1532892063,26,18,"superuser","UsesExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](29,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(9999, 257,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[2],65,97,1532892063,256,28,6,"\x19Ethereum Signed Message:\n32","",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](65,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(96, 64,{from: accounts[3]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[2],65,97,1532892063,256,28,6,"\x19Ethereum Signed Message:\n32","",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](65,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(96, 64,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[5],accounts[5],255,3,5,9,1532892064,10001,"nq2qg","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1337,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(28, 19,{from: accounts[4]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[5],accounts[5],255,3,5,9,1532892064,10001,"nq2qg","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1337,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(28, 19,{from: 0}),'revert');
  });
  it('Should execute priceToBuy(uint256)', async () => {
    let result = await contractDoubleCurveToken.priceToBuy(29,{from: accounts[0]});
  });
  it('Should execute returnForSell(uint256)', async () => {
    let result = await contractDoubleCurveToken.returnForSell(17,{from: accounts[0]});
  });
  it('Should execute amountToReserve(uint256) WHEN spreadD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address,accounts[7],0,1532892063,1338,66,2,4038714809,"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.amountToReserve(1,{from: accounts[0]});
  });
  it('Should fail amountToReserve(uint256) when NOT comply with: spreadD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[9],26,4038714811,4038714809,4038714811,0,2014223714,"IsLibrary","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.amountToReserve(1,{from: accounts[0]}),'revert');
  });
  it('Should execute currentPrice() WHEN slopeD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[2],4038714811,2014223716,11,1532892062,1532892063,1337,"Example","\x19Ethereum Signed Message:\n32",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.currentPrice({from: accounts[0]});
  });
  it('Should fail currentPrice() when NOT comply with: slopeD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address,accounts[0],1,0,256,95,4038714811,97,"whitelist","PayableExample",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.currentPrice({from: accounts[0]}),'revert');
  });
  it('Should execute marketCap() WHEN NumberLiteral ** NumberLiteral>0', async () => {
    let result = await contractDoubleCurveToken.marketCap({from: accounts[0]});
  });
});
