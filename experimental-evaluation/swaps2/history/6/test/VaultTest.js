const truffleAssert = require('truffle-assertions');
const Swaps = artifacts.require("Swaps");
const Vault = artifacts.require("Vault");
const SafeMath = artifacts.require("openzeppelin-solidity/contracts/math/SafeMath.sol");
const ProxySwaps = artifacts.require("ProxySwaps");

contract("Vault",(accounts)=>{
  let trace = false;
  let contractSafeMath = null;
  let contractSwaps = null;
  let contractVault = null;
  beforeEach(async () => {
    contractSafeMath = await SafeMath.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SafeMath.new({from: accounts[0]}');
    Swaps.link("SafeMath",contractSafeMath.address);
    contractSwaps = await Swaps.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Swaps.new({from: accounts[0]}');
    contractVault = await Vault.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: Vault.new({from: accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractVault.sendTransaction({from: accounts[0]});
  });
  it('Should execute tokenFallback(address,uint,bytes)', async () => {
    let result = await contractVault.tokenFallback(accounts[7], 3, [132,154,216,114,130,156,234,140,156,99,123,23,3,46,196,143,93,171,51,8,93,52,179,194,83,215,39,71,197,212,29,219],{from: accounts[0]});
  });
  it('Should execute setSwaps(address) WHEN msg.sender==_owner', async () => {
    let result = await contractVault.setSwaps(accounts[2],{from: accounts[0]});
  });
  it('Should fail setSwaps(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractVault.setSwaps(accounts[2],{from: accounts[9]}),'revert');
  });
  it('Should execute withdraw(address,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.sender==swaps', async () => {
    await contractVault.setSwaps(accounts[7],{from:accounts[0]});
    let result = await contractVault.withdraw("0x0000000000000000000000000000000000000000", accounts[6], 256,{from: accounts[7]});
  });
  it('Should fail withdraw(address,address,uint) when NOT comply with: msg.sender == swaps', async () => {
    await contractVault.setSwaps(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractVault.withdraw("0x0000000000000000000000000000000000000000", accounts[6], 256,{from: accounts[9]}),'revert');
  });
  it('Should execute withdraw(address,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,msg.sender==swaps', async () => {
    await contractVault.setSwaps(accounts[8],{from:accounts[0]});
    let result = await contractVault.withdraw(accounts[6], accounts[0], 96,{from: accounts[8]});
  });
  it('Should fail withdraw(address,address,uint) when NOT comply with: msg.sender == swaps', async () => {
    await contractVault.setSwaps(accounts[8],{from:accounts[0]});
    let result = await truffleAssert.fails(contractVault.withdraw(accounts[6], accounts[0], 96,{from: accounts[9]}),'revert');
  });
});
