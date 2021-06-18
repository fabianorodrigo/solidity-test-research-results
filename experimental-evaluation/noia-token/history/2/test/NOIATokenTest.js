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
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractNOIAVault.address, 97,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractCanonicalBurner.address, 1532892063,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success==true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[1], contractNOIAVault.address, 255,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[7], contractCanonicalBurner.address, 5,{from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==_owner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractNOIAToken.mint(accounts[1], 17,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint(accounts[1], 17,{from: accounts[9]}),'revert');
  });
  it('Should fail mint(address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint("0x0000000000000000000000000000000000000000", 17,{from: accounts[0]}),'revert');
  });
  it('Should execute burn(uint256) WHEN msg.sender==burnAddress,tokensToMint==0,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[1],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[0],5,{from:accounts[0]});
    let result = await contractNOIAToken.burn(1000000000,{from: accounts[1]});
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender == burnAddress', async () => {
    await contractNOIAToken.setBurnAddress(accounts[1],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[0],5,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(1000000000,{from: accounts[9]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: tokensToMint == 0', async () => {
    await contractNOIAToken.setBurnAddress(accounts[1],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[3],1532892062,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(1000000000,{from: accounts[1]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[1],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[0],5,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(1000000000,{from: 0}),'revert');
  });
  it('Should execute setBurnAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractNOIAToken.setBurnAddress(accounts[8],{from: accounts[0]});
  });
  it('Should fail setBurnAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.setBurnAddress(accounts[8],{from: accounts[9]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender==_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false,_to!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([228,185,18,254,5,18,237,187,255,203,24,208,112,156,15,85,242,246,157,149,165,48,197,59,137,131,235,183,220,79,114,58], accounts[0], 1532892063, 257, 17,{from: accounts[0]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([228,185,18,254,5,18,237,187,255,203,24,208,112,156,15,85,242,246,157,149,165,48,197,59,137,131,235,183,220,79,114,58], accounts[0], 1532892063, 257, 17,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([228,185,18,254,5,18,237,187,255,203,24,208,112,156,15,85,242,246,157,149,165,48,197,59,137,131,235,183,220,79,114,58], "0x0000000000000000000000000000000000000000", 1532892063, 257, 17,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([228,185,18,254,5,18,237,187,255,203,24,208,112,156,15,85,242,246,157,149,165,48,197,59,137,131,235,183,220,79,114,58], "0x0000000000000000000000000000000000000000", 1532892063, 257, 17,{from: accounts[0]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender!=_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([31,65,71,193,164,110,222,219,4,168,22,91,26,35,216,239,134,209,0,6,8,125,27,105,217,142,18,104,149,169,221,50], accounts[7], 97, 95, 2014223714,{from: accounts[2]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([31,65,71,193,164,110,222,219,4,168,22,91,26,35,216,239,134,209,0,6,8,125,27,105,217,142,18,104,149,169,221,50], accounts[7], 97, 95, 2014223714,{from: accounts[2]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([31,65,71,193,164,110,222,219,4,168,22,91,26,35,216,239,134,209,0,6,8,125,27,105,217,142,18,104,149,169,221,50], "0x0000000000000000000000000000000000000000", 97, 95, 2014223714,{from: accounts[2]}),'revert');
  });
  it('Should execute hashForSign(bytes4,address,address,uint256,uint256,uint256)', async () => {
    let result = await contractNOIAToken.hashForSign([215,139,186,156], accounts[8], accounts[2], 18, 10001, 17,{from: accounts[0]});
  });
});
