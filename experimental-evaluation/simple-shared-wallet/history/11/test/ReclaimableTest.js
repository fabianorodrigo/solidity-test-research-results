const truffleAssert = require('truffle-assertions');
const BulkTransfer = artifacts.require("BulkTransfer");
const CappedTransfer = artifacts.require("CappedTransfer");
const CustomAdmin = artifacts.require("CustomAdmin");
const CustomOwnable = artifacts.require("CustomOwnable");
const CustomPausable = artifacts.require("CustomPausable");
const ForceEther = artifacts.require("ForceEther");
const Reclaimable = artifacts.require("Reclaimable");
const SimpleToken = artifacts.require("SimpleToken");
const TransferBase = artifacts.require("TransferBase");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/ERC20.sol");
const SafeERC20 = artifacts.require("openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol");
const Address = artifacts.require("openzeppelin-solidity/contracts/utils/Address.sol");

contract("Reclaimable",(accounts)=>{
  let trace = false;
  let contractAddress = null;
  let contractSafeERC20 = null;
  let contractSafeMath = null;
  let contractERC20 = null;
  let contractCustomPausable = null;
  let contractBulkTransfer = null;
  let contractCappedTransfer = null;
  let contractCustomAdmin = null;
  let contractTransferBase = null;
  let contractCustomOwnable = null;
  let contractReclaimable = null;
  let contractSimpleToken = null;
  let contractForceEther = null;
  beforeEach(async () => {
    contractAddress = await Address.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Address.new({from: accounts[0]}');
    contractSafeERC20 = await SafeERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeERC20.new({from: accounts[0]}');
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    ERC20.link("SafeMath",contractSafeMath.address);
    contractERC20 = await ERC20.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ERC20.new({from: accounts[0]}');
    contractCustomPausable = await CustomPausable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: CustomPausable.new({from: accounts[0]}');
    contractBulkTransfer = await BulkTransfer.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: BulkTransfer.new({from: accounts[0]}');
    contractCappedTransfer = await CappedTransfer.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: CappedTransfer.new({from: accounts[0]}');
    contractCustomAdmin = await CustomAdmin.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: CustomAdmin.new({from: accounts[0]}');
    TransferBase.link("SafeERC20",contractSafeERC20.address);
    contractTransferBase = await TransferBase.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: TransferBase.new({from: accounts[0]}');
    contractCustomOwnable = await CustomOwnable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: CustomOwnable.new({from: accounts[0]}');
    Reclaimable.link("SafeERC20",contractSafeERC20.address);
    contractReclaimable = await Reclaimable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Reclaimable.new({from: accounts[0]}');
    contractSimpleToken = await SimpleToken.new({from:accounts[6]});
    if(trace) console.log('SUCESSO: SimpleToken.new({from:accounts[6]}');
    contractForceEther = await ForceEther.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: ForceEther.new({from:accounts[0]}');
  });
  
  it('Should execute reclaimEther() WHEN _paused!=true,msg.sender==_owner', async () => {
    let result = await contractReclaimable.reclaimEther({from: accounts[0]});
  });
  it('Should fail reclaimEther() when NOT comply with: _paused != true', async () => {
    await contractReclaimable.pause({from:accounts[0]});
    let result = await truffleAssert.fails(contractReclaimable.reclaimEther({from: accounts[0]}),'revert');
  });
  it('Should fail reclaimEther() when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractReclaimable.reclaimEther({from: accounts[9]}),'revert');
  });
  it('Should execute reclaimToken(address) WHEN _paused!=true,msg.sender==_owner', async () => {
    let result = await contractReclaimable.reclaimToken(contractSimpleToken.address,{from: accounts[0]});
  });
  it('Should fail reclaimToken(address) when NOT comply with: _paused != true', async () => {
    await contractReclaimable.pause({from:accounts[0]});
    let result = await truffleAssert.fails(contractReclaimable.reclaimToken(contractSimpleToken.address,{from: accounts[0]}),'revert');
  });
  it('Should fail reclaimToken(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractReclaimable.reclaimToken(contractSimpleToken.address,{from: accounts[9]}),'revert');
  });
});
