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
    contractNOIAVaultFactory = await NOIAVaultFactory.new(accounts[3],contractNOIAToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: NOIAVaultFactory.new(accounts[3],contractNOIAToken.address,{from:accounts[0]}');
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
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractNOIAVault.address, 0,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractCanonicalBurner.address, 2014223715,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success==true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[1], contractCanonicalBurner.address, 1532892062,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[3], contractNOIAVault.address, 10000,{from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==_owner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractNOIAToken.mint(accounts[7], 18,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint(accounts[7], 18,{from: accounts[9]}),'revert');
  });
  it('Should fail mint(address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint("0x0000000000000000000000000000000000000000", 18,{from: accounts[0]}),'revert');
  });
  it('Should execute burn(uint256) WHEN msg.sender==burnAddress,tokensToMint==0,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[6],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],64,{from:accounts[0]});
    let result = await contractNOIAToken.burn(10001,{from: accounts[6]});
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender == burnAddress', async () => {
    await contractNOIAToken.setBurnAddress(accounts[6],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],64,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(10001,{from: accounts[9]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: tokensToMint == 0', async () => {
    await contractNOIAToken.setBurnAddress(accounts[6],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[1],1336,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(10001,{from: accounts[6]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[6],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],64,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(10001,{from: 0}),'revert');
  });
  it('Should execute setBurnAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractNOIAToken.setBurnAddress(accounts[9],{from: accounts[0]});
  });
  it('Should fail setBurnAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.setBurnAddress(accounts[9],{from: accounts[9]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender==_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false,_to!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([253,215,114,203,166,128,168,104,68,137,208,93,179,54,37,251,185,155,1,36,40,191,96,11,217,58,184,191,40,31,168,157], accounts[0], 2, 1337, 256,{from: accounts[0]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([253,215,114,203,166,128,168,104,68,137,208,93,179,54,37,251,185,155,1,36,40,191,96,11,217,58,184,191,40,31,168,157], accounts[0], 2, 1337, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([253,215,114,203,166,128,168,104,68,137,208,93,179,54,37,251,185,155,1,36,40,191,96,11,217,58,184,191,40,31,168,157], "0x0000000000000000000000000000000000000000", 2, 1337, 256,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([253,215,114,203,166,128,168,104,68,137,208,93,179,54,37,251,185,155,1,36,40,191,96,11,217,58,184,191,40,31,168,157], "0x0000000000000000000000000000000000000000", 2, 1337, 256,{from: accounts[0]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender!=_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([157,95,63,87,241,18,93,100,39,71,121,121,121,191,155,242,178,244,185,29,143,163,125,206,166,27,189,227,134,3,213,154], accounts[9], 999999999, 1338, 28,{from: accounts[4]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([157,95,63,87,241,18,93,100,39,71,121,121,121,191,155,242,178,244,185,29,143,163,125,206,166,27,189,227,134,3,213,154], accounts[9], 999999999, 1338, 28,{from: accounts[4]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([157,95,63,87,241,18,93,100,39,71,121,121,121,191,155,242,178,244,185,29,143,163,125,206,166,27,189,227,134,3,213,154], "0x0000000000000000000000000000000000000000", 999999999, 1338, 28,{from: accounts[4]}),'revert');
  });
  it('Should execute hashForSign(bytes4,address,address,uint256,uint256,uint256)', async () => {
    let result = await contractNOIAToken.hashForSign([77,215,226,3], accounts[2], accounts[8], 0, 18, 10001,{from: accounts[0]});
  });
});
