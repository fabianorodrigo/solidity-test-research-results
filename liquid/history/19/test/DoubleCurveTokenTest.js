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
    contractMockERC20 = await MockERC20.new(4038714809,{from:accounts[4]});
    if(trace) console.log('SUCESSO: MockERC20.new(4038714809,{from:accounts[4]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractDoubleCurveToken.sendTransaction({from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint>0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address, accounts[9], 1532892062, 10000, 10001, 2014223714, 1532892064, 2014223714, "whitelist", "PayableExample", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint<=0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address, accounts[5], 28, 1532892064, 4038714811, 2014223714, 9999, 0, "md7vuj", "IsLibrary", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute withdraw() WHEN reserveAsset==0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[7],10,2014223714,4038714810,5,255,28,"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](66,{from:accounts[0]});
    await contractDoubleCurveToken.buy(10,96,{from:accounts[6],gasPrice:26});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[6]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[7],10,2014223714,4038714810,5,255,28,"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](66,{from:accounts[0]});
    await contractDoubleCurveToken.buy(1338,65,{from:accounts[6],gasPrice:28});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[6]}),'revert');
  });
  it('Should execute withdraw() WHEN reserveAsset!=0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[8],accounts[6],1532892063,0,3,4,17,18,"Example","dbuay",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](29,{from:accounts[0]});
    await contractDoubleCurveToken.buy(10000,6,{from:accounts[1],gasPrice:19});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[1]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[8],accounts[6],1532892063,0,3,4,17,18,"Example","dbuay",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](29,{from:accounts[0]});
    await contractDoubleCurveToken.buy(1,1338,{from:accounts[1],gasPrice:9});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[1]}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value>cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[0],1336,1,28,10000,66,10000,"","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](19,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(2014223715, 1532892064,{from: accounts[6],value:1532892064});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[0],1336,1,28,10000,66,10000,"","initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](19,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(2014223715, 1532892064,{from: 0,value:1532892064}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value<=cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[6],4038714811,3,10000,5,95,2014223715,"PayableExample","whitelist",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1338,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(4, 10,{from: accounts[9],value:257});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[6],4038714811,3,10000,5,95,2014223715,"PayableExample","whitelist",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1338,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(4, 10,{from: 0,value:257}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[0],accounts[0],257,257,1338,1338,2014223714,96,"IsLibrary","bjo8ba",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1336,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(9, 1337,{from: accounts[9]});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[0],accounts[0],257,257,1338,1338,2014223714,96,"IsLibrary","bjo8ba",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1336,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(9, 1337,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],9999,255,64,18,1336,4038714811,"PayableExample","UsesExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1337,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(2014223716, 27,{from: accounts[5]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],9999,255,64,18,1336,4038714811,"PayableExample","UsesExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1337,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(2014223716, 27,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[9],accounts[7],18,9999,4038714811,97,4038714809,66,"ja8p5u","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](9999,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(257, 4,{from: accounts[5]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[9],accounts[7],18,9999,4038714811,97,4038714809,66,"ja8p5u","bouncer",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](9999,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(257, 4,{from: 0}),'revert');
  });
  it('Should execute priceToBuy(uint256)', async () => {
    let result = await contractDoubleCurveToken.priceToBuy(0,{from: accounts[0]});
  });
  it('Should execute returnForSell(uint256)', async () => {
    let result = await contractDoubleCurveToken.returnForSell(66,{from: accounts[0]});
  });
  it('Should execute amountToReserve(uint256) WHEN spreadD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[2],66,1338,3,97,27,10,"xybji","",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.amountToReserve(6,{from: accounts[0]});
  });
  it('Should fail amountToReserve(uint256) when NOT comply with: spreadD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[4],257,1,1338,66,0,4038714811,"UsesExample","xybji",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.amountToReserve(6,{from: accounts[0]}),'revert');
  });
  it('Should execute currentPrice() WHEN slopeD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[7],1,27,2,255,4038714810,18,"whitelist","xybji",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.currentPrice({from: accounts[0]});
  });
  it('Should fail currentPrice() when NOT comply with: slopeD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractAccount.address,accounts[9],4038714811,0,64,96,65,19,"\x19Ethereum Signed Message:\n32","IsLibrary",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.currentPrice({from: accounts[0]}),'revert');
  });
  it('Should execute marketCap() WHEN NumberLiteral ** NumberLiteral>0', async () => {
    let result = await contractDoubleCurveToken.marketCap({from: accounts[0]});
  });
});
