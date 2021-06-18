const truffleAssert = require('truffle-assertions');
const CanonicalBurner = artifacts.require("CanonicalBurner");
const NOIAToken = artifacts.require("NOIAToken");
const NOIAVault = artifacts.require("NOIAVault");
const NOIAVaultFactory = artifacts.require("NOIAVaultFactory");
const TokenRecoverable = artifacts.require("TokenRecoverable");
const ProxyNOIAToken = artifacts.require("ProxyNOIAToken");

contract("contractProxyNOIAToken",(accounts)=>{
    let contractProxyNOIAToken = null;
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
    contractNOIAVaultFactory = await NOIAVaultFactory.new(accounts[6],contractNOIAToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: NOIAVaultFactory.new(accounts[6],contractNOIAToken.address,{from:accounts[0]}');
      contractProxyNOIAToken = await ProxyNOIAToken.new({ from: accounts[0] });
});
  
  it('Should execute test_postTransfer(address,address,uint256) WHEN notify==false,FunctionCall==true', async () => {
    let result = await contractProxyNOIAToken.test_postTransfer(accounts[3], accounts[0], 1338,{from: accounts[0]});
  });
  it('Should execute test_postTransfer(address,address,uint256) WHEN notify!=false,FunctionCall==true', async () => {
    let result = await contractProxyNOIAToken.test_postTransfer(accounts[1], accounts[7], 27,{from: accounts[0]});
  });
  it('Should execute test_postTransfer(address,address,uint256) WHEN to==burnAddress,FunctionCall!=true', async () => {
    let localcontractProxyNOIAToken = await ProxyNOIAToken.new({from:accounts[0]});
    await localcontractProxyNOIAToken.setBurnAddress(accounts[3],{from:accounts[0]});
    let result = await localcontractProxyNOIAToken.test_postTransfer(accounts[3], accounts[3], 10001,{from: accounts[0]});
  });
  it('Should execute test_postTransfer(address,address,uint256) WHEN to!=burnAddress,FunctionCall!=true', async () => {
    let localcontractProxyNOIAToken = await ProxyNOIAToken.new({from:accounts[0]});
    await localcontractProxyNOIAToken.setBurnAddress(accounts[4],{from:accounts[0]});
    let result = await localcontractProxyNOIAToken.test_postTransfer(accounts[9], accounts[2], 97,{from: accounts[0]});
  });
  it('Should execute test_burn(address,uint256) WHEN tokensToMint==0,account!=0x0000000000000000000000000000000000000000', async () => {
    let localcontractProxyNOIAToken = await ProxyNOIAToken.new({from:accounts[0]});
    await localcontractProxyNOIAToken.mint(accounts[3],18,{from:accounts[0]});
    let result = await localcontractProxyNOIAToken.test_burn(accounts[0], 257,{from: accounts[0]});
  });
  it('Should fail test_burn(address,uint256) when NOT comply with: tokensToMint == 0', async () => {
    let localcontractProxyNOIAToken = await ProxyNOIAToken.new({from:accounts[0]});
    await localcontractProxyNOIAToken.mint(accounts[0],2014223714,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyNOIAToken.test_burn(accounts[0], 257,{from: accounts[0]}),'revert');
  });
  it('Should fail test_burn(address,uint256) when NOT comply with: account != 0x0000000000000000000000000000000000000000', async () => {
    let localcontractProxyNOIAToken = await ProxyNOIAToken.new({from:accounts[0]});
    await localcontractProxyNOIAToken.mint(accounts[3],18,{from:accounts[0]});
    let result = await truffleAssert.fails(localcontractProxyNOIAToken.test_burn("0x0000000000000000000000000000000000000000", 257,{from: accounts[0]}),'revert');
  });
});
