const truffleAssert = require('truffle-assertions');
const BancorFormula = artifacts.require("BancorFormula");
const ERC20BondingToken = artifacts.require("ERC20BondingToken");
const EthBondingToken = artifacts.require("EthBondingToken");
const Power = artifacts.require("Power");
const TestERC20BondingToken = artifacts.require("TestERC20BondingToken");
const TestEthBondingToken = artifacts.require("TestEthBondingToken");
const Roles = artifacts.require("openzeppelin-eth/contracts/access/Roles.sol");
const MinterRole = artifacts.require("openzeppelin-eth/contracts/access/roles/MinterRole.sol");
const PauserRole = artifacts.require("openzeppelin-eth/contracts/access/roles/PauserRole.sol");
const Pausable = artifacts.require("openzeppelin-eth/contracts/lifecycle/Pausable.sol");
const SafeMath = artifacts.require("openzeppelin-eth/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20.sol");
const ERC20Detailed = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Detailed.sol");
const ERC20Mintable = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Mintable.sol");
const ERC20Pausable = artifacts.require("openzeppelin-eth/contracts/token/ERC20/ERC20Pausable.sol");
const StandaloneERC20 = artifacts.require("openzeppelin-eth/contracts/token/ERC20/StandaloneERC20.sol");
const Initializable = artifacts.require("zos-lib/contracts/Initializable.sol");

contract("BancorFormula",(accounts)=>{
  let trace = false;
  let contractRoles = null;
  let contractSafeMath = null;
  let contractPauserRole = null;
  let contractERC20Pausable = null;
  let contractERC20Mintable = null;
  let contractERC20Detailed = null;
  let contractInitializable = null;
  let contractMinterRole = null;
  let contractERC20 = null;
  let contractPausable = null;
  let contractStandaloneERC20 = null;
  let contractERC20BondingToken = null;
  let contractTestEthBondingToken = null;
  let contractTestERC20BondingToken = null;
  let contractEthBondingToken = null;
  let contractBancorFormula = null;
  let contractPower = null;
  beforeEach(async () => {
    contractRoles = await Roles.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Roles.new({from: accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    PauserRole.link("Roles",contractRoles.address);
    contractPauserRole = await PauserRole.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: PauserRole.new({from: accounts[0]}');
    contractERC20Pausable = await ERC20Pausable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Pausable.new({from: accounts[0]}');
    contractERC20Mintable = await ERC20Mintable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20Mintable.new({from: accounts[0]}');
    contractInitializable = await Initializable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Initializable.new({from: accounts[0]}');
    MinterRole.link("Roles",contractRoles.address);
    contractMinterRole = await MinterRole.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: MinterRole.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractPausable = await Pausable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Pausable.new({from: accounts[0]}');
    contractStandaloneERC20 = await StandaloneERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: StandaloneERC20.new({from: accounts[0]}');
    contractERC20BondingToken = await ERC20BondingToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20BondingToken.new({from: accounts[0]}');
    contractTestEthBondingToken = await TestEthBondingToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: TestEthBondingToken.new({from: accounts[0]}');
    contractTestERC20BondingToken = await TestERC20BondingToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: TestERC20BondingToken.new({from: accounts[0]}');
    contractEthBondingToken = await EthBondingToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: EthBondingToken.new({from: accounts[0]}');
    BancorFormula.link("SafeMath",contractSafeMath.address);
    contractBancorFormula = await BancorFormula.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BancorFormula.new({from: accounts[0]}');
    contractPower = await Power.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: Power.new({from:accounts[0]}');
  });
  
  it('Should execute calculatePurchaseReturn(uint256,uint256,uint32,uint256) WHEN _depositAmount==0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT', async () => {
    let result = await contractBancorFormula.calculatePurchaseReturn(1532892064, 55, 99, 0,{from: accounts[0]});
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(0, 55, 99, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(1532892064, 0, 99, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(1532892064, 55, 0, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(1532892064, 55, 1000001, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute calculatePurchaseReturn(uint256,uint256,uint32,uint256) WHEN _depositAmount!=0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT', async () => {
    let result = await contractBancorFormula.calculatePurchaseReturn(68, 32737, 121, 4038714809,{from: accounts[0]});
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(0, 32737, 121, 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(68, 0, 121, 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(68, 32737, 0, 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(68, 32737, 1000001, 4038714809,{from: accounts[0]}),'revert');
  });
  it('Should execute calculatePurchaseReturn(uint256,uint256,uint32,uint256) WHEN _connectorWeight==MAX_WEIGHT,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_connectorBalance>0', async () => {
    let result = await contractBancorFormula.calculatePurchaseReturn(48, 54, 1000000, 1532892064,{from: accounts[0]});
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(0, 54, 1000000, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(48, 0, 1000000, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(48, 54, 0, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(48, 54, 1000001, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(48, 0, 1000000, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should execute calculatePurchaseReturn(uint256,uint256,uint32,uint256) WHEN _connectorWeight!=MAX_WEIGHT,_depositAmount!=0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT', async () => {
    let result = await contractBancorFormula.calculatePurchaseReturn(1, 60, 111, 982081,{from: accounts[0]});
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(0, 60, 111, 982081,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(1, 0, 111, 982081,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(1, 60, 0, 982081,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(1, 60, 1000001, 982081,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _sellAmount==0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(81, 122, 49, 0,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 122, 49, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(81, 0, 49, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(81, 122, 0, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(81, 122, 1000001, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(81, 122, 49, 82,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _sellAmount!=0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(72, 74, 86, 33,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 74, 86, 33,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(72, 0, 86, 33,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(72, 74, 0, 33,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(72, 74, 1000001, 33,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(72, 74, 86, 73,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _sellAmount==_supply,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(1532892063, 256, 39, 1532892063,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 256, 39, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(1532892063, 0, 39, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(1532892063, 256, 0, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(1532892063, 256, 1000001, 1532892063,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(1532892063, 256, 39, 1532892064,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _sellAmount!=_supply,_sellAmount!=0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(56, 97, 82, 27,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 97, 82, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(56, 0, 82, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(56, 97, 0, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(56, 97, 1000001, 27,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(56, 97, 82, 57,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _connectorWeight==MAX_WEIGHT,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,_supply>0,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(116, 127, 1000000, 34,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 127, 1000000, 34,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(116, 0, 1000000, 34,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(116, 127, 0, 34,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(116, 127, 1000001, 34,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(116, 127, 1000000, 117,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 127, 1000000, 34,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _connectorWeight!=MAX_WEIGHT,_sellAmount!=0,_sellAmount!=_supply,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(80, 51, 120, 2,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 51, 120, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(80, 0, 120, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(80, 51, 0, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(80, 51, 1000001, 2,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(80, 51, 120, 81,{from: accounts[0]}),'revert');
  });
});
