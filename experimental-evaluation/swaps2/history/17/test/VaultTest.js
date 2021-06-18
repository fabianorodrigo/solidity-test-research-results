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
    let result = await contractVault.tokenFallback(accounts[5], 5, [116,233,110,254,191,99,74,120,54,82,244,135,14,10,50,56,6,131,184,133,192,61,99,12,230,163,132,131,31,56,9,13],{from: accounts[0]});
  });
  it('Should execute setSwaps(address) WHEN msg.sender==_owner', async () => {
    let result = await contractVault.setSwaps(accounts[6],{from: accounts[0]});
  });
  it('Should fail setSwaps(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractVault.setSwaps(accounts[6],{from: accounts[9]}),'revert');
  });
  it('Should execute withdraw(address,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.sender==swaps', async () => {
    await contractVault.setSwaps(accounts[7],{from:accounts[0]});
    let result = await contractVault.withdraw("0x0000000000000000000000000000000000000000", accounts[7], 26,{from: accounts[7]});
  });
  it('Should fail withdraw(address,address,uint) when NOT comply with: msg.sender == swaps', async () => {
    await contractVault.setSwaps(accounts[7],{from:accounts[0]});
    let result = await truffleAssert.fails(contractVault.withdraw("0x0000000000000000000000000000000000000000", accounts[7], 26,{from: accounts[9]}),'revert');
  });
  it('Should execute withdraw(address,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,msg.sender==swaps', async () => {
    await contractVault.setSwaps(accounts[2],{from:accounts[0]});
    let result = await contractVault.withdraw(accounts[9], accounts[7], 10,{from: accounts[2]});
  });
  it('Should fail withdraw(address,address,uint) when NOT comply with: msg.sender == swaps', async () => {
    await contractVault.setSwaps(accounts[2],{from:accounts[0]});
    let result = await truffleAssert.fails(contractVault.withdraw(accounts[9], accounts[7], 10,{from: accounts[9]}),'revert');
  });
});
