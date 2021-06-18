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
    let result = await contractVault.tokenFallback(accounts[9], 4038714809, [227,165,221,217,182,107,66,44,44,52,200,232,227,20,160,59,104,193,135,255,86,97,215,56,142,115,240,6,56,110,127,218],{from: accounts[0]});
  });
  it('Should execute setSwaps(address) WHEN msg.sender==_owner', async () => {
    let result = await contractVault.setSwaps(accounts[3],{from: accounts[0]});
  });
  it('Should fail setSwaps(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractVault.setSwaps(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should execute withdraw(address,address,uint) WHEN _token==0x0000000000000000000000000000000000000000,msg.sender==swaps', async () => {
    await contractVault.setSwaps(accounts[4],{from:accounts[0]});
    let result = await contractVault.withdraw("0x0000000000000000000000000000000000000000", accounts[1], 1,{from: accounts[4]});
  });
  it('Should fail withdraw(address,address,uint) when NOT comply with: msg.sender == swaps', async () => {
    await contractVault.setSwaps(accounts[4],{from:accounts[0]});
    let result = await truffleAssert.fails(contractVault.withdraw("0x0000000000000000000000000000000000000000", accounts[1], 1,{from: accounts[9]}),'revert');
  });
  it('Should execute withdraw(address,address,uint) WHEN _token!=0x0000000000000000000000000000000000000000,msg.sender==swaps', async () => {
    await contractVault.setSwaps(accounts[3],{from:accounts[0]});
    let result = await contractVault.withdraw(accounts[7], accounts[5], 95,{from: accounts[3]});
  });
  it('Should fail withdraw(address,address,uint) when NOT comply with: msg.sender == swaps', async () => {
    await contractVault.setSwaps(accounts[3],{from:accounts[0]});
    let result = await truffleAssert.fails(contractVault.withdraw(accounts[7], accounts[5], 95,{from: accounts[9]}),'revert');
  });
});
