const truffleAssert = require('truffle-assertions');
const CanonicalBurner = artifacts.require("CanonicalBurner");
const NOIAToken = artifacts.require("NOIAToken");
const NOIAVault = artifacts.require("NOIAVault");
const NOIAVaultFactory = artifacts.require("NOIAVaultFactory");
const TokenRecoverable = artifacts.require("TokenRecoverable");
const ProxyNOIAToken = artifacts.require("ProxyNOIAToken");

contract("NOIAVaultFactory",(accounts)=>{
  let trace = false;
  let contractNOIAToken = null;
  let contractNOIAVault = null;
  let contractTokenRecoverable = null;
  let contractCanonicalBurner = null;
  let contractNOIAVaultFactory = null;
  beforeEach(async () => {
    contractNOIAToken = await NOIAToken.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: NOIAToken.new({from: accounts[0]}');
    contractNOIAVault = await NOIAVault.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: NOIAVault.new({from: accounts[0]}');
    contractTokenRecoverable = await TokenRecoverable.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: TokenRecoverable.new({from: accounts[0]}');
    contractCanonicalBurner = await CanonicalBurner.new(contractNOIAToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: CanonicalBurner.new(contractNOIAToken.address,{from:accounts[0]}');
    contractNOIAVaultFactory = await NOIAVaultFactory.new(accounts[1],contractTokenRecoverable.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: NOIAVaultFactory.new(accounts[1],contractTokenRecoverable.address,{from:accounts[0]}');
  });
  
  it('Should execute createVault(address,uint256)', async () => {
    let result = await contractNOIAVaultFactory.createVault(accounts[4], 29,{from: accounts[0]});
  });
  it('Should execute unlockableBalanceOf(address)', async () => {
    let result = await contractNOIAVaultFactory.unlockableBalanceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute totalBalanceOf(address)', async () => {
    let result = await contractNOIAVaultFactory.totalBalanceOf(accounts[8],{from: accounts[0]});
  });
  it('Should execute getVaultsCount(address)', async () => {
    let result = await contractNOIAVaultFactory.getVaultsCount(accounts[6],{from: accounts[0]});
  });
  it('Should execute recoverTokens(IERC20,address,uint256) WHEN balance>=amount', async () => {
    let result = await contractNOIAVaultFactory.recoverTokens(contractNOIAToken.address, accounts[8], 29,{from: accounts[0]});
  });
});
