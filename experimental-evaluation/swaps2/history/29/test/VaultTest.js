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
    let result = await contractVault.tokenFallback(accounts[6], 1532892063, [19,186,51,124,83,154,66,131,71,58,92,72,218,43,211,188,122,137,51,246,139,78,119,211,130,157,217,188,21,144,220,151],{from: accounts[0]});
  });
  it('Should execute setSwaps(address) WHEN msg.sender==_owner', async () => {
    let result = await contractVault.setSwaps(accounts[8],{from: accounts[0]});
  });
  it('Should fail setSwaps(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractVault.setSwaps(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should execute withdraw(address,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.sender==swaps', async () => {
    await contractVault.setSwaps(accounts[9],{from:accounts[0]});
    let result = await contractVault.withdraw("0x0000000000000000000000000000000000000000", accounts[4], 10000,{from: accounts[9]});
  });
  it('Should fail withdraw(address,address,uint) when NOT comply with: msg.sender == swaps', async () => {
    await contractVault.setSwaps(accounts[9],{from:accounts[0]});
    let result = await truffleAssert.fails(contractVault.withdraw("0x0000000000000000000000000000000000000000", accounts[4], 10000,{from: accounts[8]}),'revert');
  });
  it('Should execute withdraw(address,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,msg.sender==swaps', async () => {
    await contractVault.setSwaps(accounts[4],{from:accounts[0]});
    let result = await contractVault.withdraw(accounts[1], accounts[8], 1532892064,{from: accounts[4]});
  });
  it('Should fail withdraw(address,address,uint) when NOT comply with: msg.sender == swaps', async () => {
    await contractVault.setSwaps(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractVault.withdraw(accounts[1], accounts[8], 1532892064,{from: accounts[9]}),'revert');
  });
});
