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
    let result = await contractBancorFormula.calculatePurchaseReturn(73, 982079, 36, 0,{from: accounts[0]});
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(0, 982079, 36, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(73, 0, 36, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(73, 982079, 0, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(73, 982079, 1000001, 0,{from: accounts[0]}),'revert');
  });
  it('Should execute calculatePurchaseReturn(uint256,uint256,uint32,uint256) WHEN _depositAmount!=0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT', async () => {
    let result = await contractBancorFormula.calculatePurchaseReturn(85, 113, 3, 103,{from: accounts[0]});
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(0, 113, 3, 103,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(85, 0, 3, 103,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(85, 113, 0, 103,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(85, 113, 1000001, 103,{from: accounts[0]}),'revert');
  });
  it('Should execute calculatePurchaseReturn(uint256,uint256,uint32,uint256) WHEN _connectorWeight==MAX_WEIGHT,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_connectorBalance>0', async () => {
    let result = await contractBancorFormula.calculatePurchaseReturn(44, 34, 1000000, 94,{from: accounts[0]});
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(0, 34, 1000000, 94,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(44, 0, 1000000, 94,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(44, 34, 0, 94,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(44, 34, 1000001, 94,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(44, 0, 1000000, 94,{from: accounts[0]}),'revert');
  });
  it('Should execute calculatePurchaseReturn(uint256,uint256,uint32,uint256) WHEN _connectorWeight!=MAX_WEIGHT,_depositAmount!=0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT', async () => {
    let result = await contractBancorFormula.calculatePurchaseReturn(52, 112, 122, 35,{from: accounts[0]});
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(0, 112, 122, 35,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(52, 0, 122, 35,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(52, 112, 0, 35,{from: accounts[0]}),'revert');
  });
  it('Should fail calculatePurchaseReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculatePurchaseReturn(52, 112, 1000001, 35,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _sellAmount==0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(2014223714, 1000000, 111, 0,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 1000000, 111, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(2014223714, 0, 111, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(2014223714, 1000000, 0, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(2014223714, 1000000, 1000001, 0,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(2014223714, 1000000, 111, 2014223715,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _sellAmount!=0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(999999, 27, 1000000, 35,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 27, 1000000, 35,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(999999, 0, 1000000, 35,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(999999, 27, 0, 35,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(999999, 27, 1000001, 35,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(999999, 27, 1000000, 1000000,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _sellAmount==_supply,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(74, 72, 48, 74,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 72, 48, 74,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(74, 0, 48, 74,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(74, 72, 0, 74,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(74, 72, 1000001, 74,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(74, 72, 48, 75,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _sellAmount!=_supply,_sellAmount!=0,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(89, 87, 50, 61,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 87, 50, 61,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(89, 0, 50, 61,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(89, 87, 0, 61,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(89, 87, 1000001, 61,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(89, 87, 50, 90,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _connectorWeight==MAX_WEIGHT,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,_supply>0,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(89, 41, 1000000, 48,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 41, 1000000, 48,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(89, 0, 1000000, 48,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(89, 41, 0, 48,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(89, 41, 1000001, 48,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(89, 41, 1000000, 90,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 41, 1000000, 48,{from: accounts[0]}),'revert');
  });
  it('Should execute calculateSaleReturn(uint256,uint256,uint32,uint256) WHEN _connectorWeight!=MAX_WEIGHT,_sellAmount!=0,_sellAmount!=_supply,_supply>0,_connectorBalance>0,_connectorWeight>0,_connectorWeight<=MAX_WEIGHT,_sellAmount<=_supply,result>0', async () => {
    let result = await contractBancorFormula.calculateSaleReturn(78, 1000001, 982080, 3,{from: accounts[0]});
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _supply > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(0, 1000001, 982080, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorBalance > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(78, 0, 982080, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight > 0', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(78, 1000001, 0, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _connectorWeight <= MAX_WEIGHT', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(78, 1000001, 1000001, 3,{from: accounts[0]}),'revert');
  });
  it('Should fail calculateSaleReturn(uint256,uint256,uint32,uint256) when NOT comply with: _sellAmount <= _supply', async () => {
    let result = await truffleAssert.fails(contractBancorFormula.calculateSaleReturn(78, 1000001, 982080, 79,{from: accounts[0]}),'revert');
  });
});
