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
    contractNOIAVaultFactory = await NOIAVaultFactory.new(accounts[0],contractNOIAToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: NOIAVaultFactory.new(accounts[0],contractNOIAToken.address,{from:accounts[0]}');
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
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractCanonicalBurner.address, 257,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractCanonicalBurner.address, 1000000001,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success==true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[2], contractCanonicalBurner.address, 10000,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[8], contractCanonicalBurner.address, 999999999,{from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==_owner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractNOIAToken.mint(accounts[6], 28,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint(accounts[6], 28,{from: accounts[9]}),'revert');
  });
  it('Should fail mint(address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint("0x0000000000000000000000000000000000000000", 28,{from: accounts[0]}),'revert');
  });
  it('Should execute burn(uint256) WHEN msg.sender==burnAddress,tokensToMint==0,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[8],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],0,{from:accounts[0]});
    let result = await contractNOIAToken.burn(95,{from: accounts[8]});
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender == burnAddress', async () => {
    await contractNOIAToken.setBurnAddress(accounts[8],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],0,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(95,{from: accounts[9]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: tokensToMint == 0', async () => {
    await contractNOIAToken.setBurnAddress(accounts[8],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[3],10001,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(95,{from: accounts[8]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[8],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[6],0,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(95,{from: 0}),'revert');
  });
  it('Should execute setBurnAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractNOIAToken.setBurnAddress(accounts[3],{from: accounts[0]});
  });
  it('Should fail setBurnAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.setBurnAddress(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender==_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false,_to!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([170,58,117,15,243,46,190,210,26,182,150,98,212,199,24,234,57,155,212,165,14,241,139,59,96,9,108,24,80,253,201,149], accounts[0], 28, 254, 64,{from: accounts[0]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([170,58,117,15,243,46,190,210,26,182,150,98,212,199,24,234,57,155,212,165,14,241,139,59,96,9,108,24,80,253,201,149], accounts[0], 28, 254, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([170,58,117,15,243,46,190,210,26,182,150,98,212,199,24,234,57,155,212,165,14,241,139,59,96,9,108,24,80,253,201,149], "0x0000000000000000000000000000000000000000", 28, 254, 64,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([170,58,117,15,243,46,190,210,26,182,150,98,212,199,24,234,57,155,212,165,14,241,139,59,96,9,108,24,80,253,201,149], "0x0000000000000000000000000000000000000000", 28, 254, 64,{from: accounts[0]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender!=_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([131,241,38,102,233,46,185,103,229,131,244,37,228,126,95,235,113,254,108,70,136,189,42,126,206,125,219,168,69,157,134,68], accounts[7], 29, 3, 2014223716,{from: accounts[1]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([131,241,38,102,233,46,185,103,229,131,244,37,228,126,95,235,113,254,108,70,136,189,42,126,206,125,219,168,69,157,134,68], accounts[7], 29, 3, 2014223716,{from: accounts[1]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([131,241,38,102,233,46,185,103,229,131,244,37,228,126,95,235,113,254,108,70,136,189,42,126,206,125,219,168,69,157,134,68], "0x0000000000000000000000000000000000000000", 29, 3, 2014223716,{from: accounts[1]}),'revert');
  });
  it('Should execute hashForSign(bytes4,address,address,uint256,uint256,uint256)', async () => {
    let result = await contractNOIAToken.hashForSign([69,224,49,178], accounts[3], accounts[0], 28, 999999999, 999999999,{from: accounts[0]});
  });
});
