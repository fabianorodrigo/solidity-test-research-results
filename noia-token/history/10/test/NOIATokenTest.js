const truffleAssert = require('truffle-assertions');
const CanonicalBurner = artifacts.require("CanonicalBurner");
const NOIAToken = artifacts.require("NOIAToken");
const NOIAVault = artifacts.require("NOIAVault");
const NOIAVaultFactory = artifacts.require("NOIAVaultFactory");
const TokenRecoverable = artifacts.require("TokenRecoverable");

contract("NOIAToken",(accounts)=>{
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
    contractNOIAVaultFactory = await NOIAVaultFactory.new(accounts[2],contractNOIAToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: NOIAVaultFactory.new(accounts[2],contractNOIAToken.address,{from:accounts[0]}');
  });
  
  it('Should execute register()', async () => {
    let result = await contractNOIAToken.register({from: accounts[0]});
  });
  it('Should execute unregister()', async () => {
    let result = await contractNOIAToken.unregister({from: accounts[0]});
  });
  it('Should execute enableEtherlessTransfer() WHEN msg.sender==_owner', async () => {
    let result = await contractNOIAToken.enableEtherlessTransfer({from: accounts[0]});
  });
  it('Should fail enableEtherlessTransfer() when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.enableEtherlessTransfer({from: accounts[9]}),'revert');
  });
  it('Should execute disableEtherlessTransfer() WHEN msg.sender==_owner', async () => {
    let result = await contractNOIAToken.disableEtherlessTransfer({from: accounts[0]});
  });
  it('Should fail disableEtherlessTransfer() when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.disableEtherlessTransfer({from: accounts[9]}),'revert');
  });
  it('Should execute transfer(address,uint256) WHEN success==true', async () => {
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractCanonicalBurner.address, 1532892062,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractNOIAVault.address, 26,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success==true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[0], contractNOIAVault.address, 3,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[9], contractNOIAVault.address, 66,{from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==_owner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractNOIAToken.mint(accounts[9], 1338,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint(accounts[9], 1338,{from: accounts[9]}),'revert');
  });
  it('Should fail mint(address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint("0x0000000000000000000000000000000000000000", 1338,{from: accounts[0]}),'revert');
  });
  it('Should execute burn(uint256) WHEN msg.sender==burnAddress,tokensToMint==0,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[1],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],999999999,{from:accounts[0]});
    let result = await contractNOIAToken.burn(1532892063,{from: accounts[1]});
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender == burnAddress', async () => {
    await contractNOIAToken.setBurnAddress(accounts[1],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],999999999,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(1532892063,{from: accounts[9]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: tokensToMint == 0', async () => {
    await contractNOIAToken.setBurnAddress(accounts[1],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[2],1532892063,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(1532892063,{from: accounts[1]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[1],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],999999999,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(1532892063,{from: 0}),'revert');
  });
  it('Should execute setBurnAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractNOIAToken.setBurnAddress(accounts[0],{from: accounts[0]});
  });
  it('Should fail setBurnAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.setBurnAddress(accounts[0],{from: accounts[9]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender==_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false,_to!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([200,226,17,26,6,179,227,87,156,140,106,250,106,210,151,251,52,60,140,56,177,147,237,147,108,80,68,235,175,92,47,175], accounts[0], 2014223714, 256, 29,{from: accounts[0]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([200,226,17,26,6,179,227,87,156,140,106,250,106,210,151,251,52,60,140,56,177,147,237,147,108,80,68,235,175,92,47,175], accounts[0], 2014223714, 256, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([200,226,17,26,6,179,227,87,156,140,106,250,106,210,151,251,52,60,140,56,177,147,237,147,108,80,68,235,175,92,47,175], "0x0000000000000000000000000000000000000000", 2014223714, 256, 29,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([200,226,17,26,6,179,227,87,156,140,106,250,106,210,151,251,52,60,140,56,177,147,237,147,108,80,68,235,175,92,47,175], "0x0000000000000000000000000000000000000000", 2014223714, 256, 29,{from: accounts[0]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender!=_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([47,179,145,222,81,97,238,175,138,25,167,1,174,220,116,168,149,80,250,147,36,239,114,145,145,131,77,68,118,10,85,159], accounts[9], 65, 96, 1532892064,{from: accounts[2]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([47,179,145,222,81,97,238,175,138,25,167,1,174,220,116,168,149,80,250,147,36,239,114,145,145,131,77,68,118,10,85,159], accounts[9], 65, 96, 1532892064,{from: accounts[2]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([47,179,145,222,81,97,238,175,138,25,167,1,174,220,116,168,149,80,250,147,36,239,114,145,145,131,77,68,118,10,85,159], "0x0000000000000000000000000000000000000000", 65, 96, 1532892064,{from: accounts[2]}),'revert');
  });
  it('Should execute hashForSign(bytes4,address,address,uint256,uint256,uint256)', async () => {
    let result = await contractNOIAToken.hashForSign([156,42,14,200], accounts[3], accounts[8], 1337, 3, 9999,{from: accounts[0]});
  });
});
