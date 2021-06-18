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
    contractMockERC20 = await MockERC20.new(2014223715,{from:accounts[3]});
    if(trace) console.log('SUCESSO: MockERC20.new(2014223715,{from:accounts[3]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractDoubleCurveToken.sendTransaction({from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint>0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractAccount.address, accounts[7], 11, 1336, 4038714811, 2014223714, 27, 1532892063, "", "superuser", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address) WHEN _preMint<=0,initialized!=true', async () => {
    let result = await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address, accounts[8], 26, 9999, 6, 95, 5, 0, "RevertWithReason", "PayableExample", contractGasPriceOracle.address,{from: accounts[0]});
  });
  it('Should execute withdraw() WHEN reserveAsset==0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[5],96,10001,1532892063,2014223714,27,3,"UsesExample","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](5,{from:accounts[0]});
    await contractDoubleCurveToken.buy(0,2014223716,{from:accounts[2],gasPrice:1});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[2]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[5],96,10001,1532892063,2014223714,27,3,"UsesExample","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](5,{from:accounts[0]});
    await contractDoubleCurveToken.buy(28,10000,{from:accounts[7],gasPrice:3});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[2]}),'revert');
  });
  it('Should execute withdraw() WHEN reserveAsset!=0x0000000000000000000000000000000000000000,contributions>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[4],accounts[9],1532892063,2014223716,0,66,1532892063,18,"PayableExample","superuser",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1,{from:accounts[0]});
    await contractDoubleCurveToken.buy(4038714809,66,{from:accounts[6],gasPrice:1});
    let result = await contractDoubleCurveToken.withdraw({from: accounts[6]});
  });
  it('Should fail withdraw() when NOT comply with: contributions > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[4],accounts[9],1532892063,2014223716,0,66,1532892063,18,"PayableExample","superuser",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](1,{from:accounts[0]});
    await contractDoubleCurveToken.buy(27,97,{from:accounts[1],gasPrice:0});
    let result = await truffleAssert.fails(contractDoubleCurveToken.withdraw({from: accounts[6]}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value>cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],1,3,257,2014223714,18,2014223714,"PayableExample","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](257,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(0, 4038714811,{from: accounts[3],value:9});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[9],1,3,257,2014223714,18,2014223714,"PayableExample","Example",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](257,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(0, 4038714811,{from: 0,value:9}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN msg.value<=cost,reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[7],1,10,2,5,1532892064,1532892063,"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](9,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(255, 1532892062,{from: accounts[1],value:9999});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[7],1,10,2,5,1532892064,1532892063,"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](9,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(255, 1532892062,{from: 0,value:9999}),'revert');
  });
  it('Should execute buy(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,cost<=_maxSpend,msg.sender!=0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[2],accounts[2],1338,256,1532892062,27,96,1,"","PayableExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](18,{from:accounts[0]});
    let result = await contractDoubleCurveToken.buy(1, 257,{from: accounts[1]});
  });
  it('Should fail buy(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[2],accounts[2],1338,256,1532892062,27,96,1,"","PayableExample",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](18,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.buy(1, 257,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset==0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[1],1,97,0,9999,10,9,"\x19Ethereum Signed Message:\n32","whitelist",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](5,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(5, 1532892063,{from: accounts[9]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"]("0x0000000000000000000000000000000000000000",accounts[1],1,97,0,9999,10,9,"\x19Ethereum Signed Message:\n32","whitelist",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](5,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(5, 1532892063,{from: 0}),'revert');
  });
  it('Should execute sell(uint256,uint256) WHEN reserveAsset!=0x0000000000000000000000000000000000000000,msg.gasprice<=GasPriceOracle.maxGas,amountReturned>=_minReturn,msg.sender!=0,_tokens<=_balances', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[1],accounts[9],9999,257,10,18,9999,1,"kg5oit","superuser",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](257,{from:accounts[0]});
    let result = await contractDoubleCurveToken.sell(10001, 4038714811,{from: accounts[3]});
  });
  it('Should fail sell(uint256,uint256) when NOT comply with: msg.sender != 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](accounts[1],accounts[9],9999,257,10,18,9999,1,"kg5oit","superuser",contractGasPriceOracle.address,{from:accounts[0]});
    await contractGasPriceOracle.methods["initialize(uint256)"](257,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.sell(10001, 4038714811,{from: 0}),'revert');
  });
  it('Should execute priceToBuy(uint256)', async () => {
    let result = await contractDoubleCurveToken.priceToBuy(27,{from: accounts[0]});
  });
  it('Should execute returnForSell(uint256)', async () => {
    let result = await contractDoubleCurveToken.returnForSell(28,{from: accounts[0]});
  });
  it('Should execute amountToReserve(uint256) WHEN spreadD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractDoubleCurveToken.address,accounts[3],10000,4038714809,17,28,4,29,"initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes32,string,string,address)","UsesExample",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.amountToReserve(3,{from: accounts[0]});
  });
  it('Should fail amountToReserve(uint256) when NOT comply with: spreadD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[5],3,4038714810,10000,1337,0,4,"h17bus","dh7c6b",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.amountToReserve(3,{from: accounts[0]}),'revert');
  });
  it('Should execute currentPrice() WHEN slopeD>0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[2],4038714810,1532892062,257,10000,11,26,"IsLibrary","RevertWithReason",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await contractDoubleCurveToken.currentPrice({from: accounts[0]});
  });
  it('Should fail currentPrice() when NOT comply with: slopeD > 0', async () => {
    await contractDoubleCurveToken.methods["initialize(address,address,uint256,uint256,uint256,uint256,uint256,uint256,string,string,address)"](contractMockERC20.address,accounts[6],1,0,64,256,19,4038714810,"\x19Ethereum Signed Message:\n32","Example",contractGasPriceOracle.address,{from:accounts[0]});
    let result = await truffleAssert.fails(contractDoubleCurveToken.currentPrice({from: accounts[0]}),'revert');
  });
  it('Should execute marketCap() WHEN NumberLiteral ** NumberLiteral>0', async () => {
    let result = await contractDoubleCurveToken.marketCap({from: accounts[0]});
  });
});
