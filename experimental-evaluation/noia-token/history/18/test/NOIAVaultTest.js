const truffleAssert = require('truffle-assertions');
const CanonicalBurner = artifacts.require("CanonicalBurner");
const NOIAToken = artifacts.require("NOIAToken");
const NOIAVault = artifacts.require("NOIAVault");
const NOIAVaultFactory = artifacts.require("NOIAVaultFactory");
const TokenRecoverable = artifacts.require("TokenRecoverable");
const ProxyNOIAToken = artifacts.require("ProxyNOIAToken");

contract("NOIAVault",(accounts)=>{
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
    contractNOIAVaultFactory = await NOIAVaultFactory.new(accounts[4],contractNOIAToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: NOIAVaultFactory.new(accounts[4],contractNOIAToken.address,{from:accounts[0]}');
  });
  
  it('Should execute initialize(address,uint256,address) WHEN beneficiary==0x0000000000000000000000000000000000000000,_beneficiary!=0x0000000000000000000000000000000000000000,_lockTill>block.timestamp', async () => {
    let result = await contractNOIAVault.initialize(accounts[2], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+872, contractNOIAToken.address,{from: accounts[0]});
  });
  it('Should fail initialize(address,uint256,address) when NOT comply with: _beneficiary != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractNOIAVault.initialize("0x0000000000000000000000000000000000000000", (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp+872, contractNOIAToken.address,{from: accounts[0]}),'revert');
  });
  it('Should fail initialize(address,uint256,address) when NOT comply with: _lockTill > (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp', async () => {
    let result = await truffleAssert.fails(contractNOIAVault.initialize(accounts[2], (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp, contractNOIAToken.address,{from: accounts[0]}),'revert');
  });
  it('Should execute release() WHEN lockTill>block.timestamp', async () => {
    let result = await contractNOIAVault.release({from: accounts[0]});
  });
  it('Should execute release() WHEN lockTill<=block.timestamp', async () => {
    let result = await contractNOIAVault.release({from: accounts[0]});
  });
  it('Should execute recoverTokens(IERC20,address,uint256) WHEN balance>=amount', async () => {
    let result = await contractNOIAVault.recoverTokens(contractNOIAToken.address, accounts[9], 6,{from: accounts[0]});
  });
  it('Should execute tokensReceived(address,address,uint256)', async () => {
    let result = await contractNOIAVault.tokensReceived(accounts[8], accounts[3], 10000,{from: accounts[0]});
  });
});
