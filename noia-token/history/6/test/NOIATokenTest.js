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
    contractNOIAVaultFactory = await NOIAVaultFactory.new(accounts[8],contractNOIAToken.address,{from:accounts[0]});
    if(trace) console.log('SUCESSO: NOIAVaultFactory.new(accounts[8],contractNOIAToken.address,{from:accounts[0]}');
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
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractNOIAVault.address, 1337,{from: accounts[0]});
  });
  it('Should execute transfer(address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transfer(address,uint256)"](contractCanonicalBurner.address, 2,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success==true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[8], contractNOIAVault.address, 1532892062,{from: accounts[0]});
  });
  it('Should execute transferFrom(address,address,uint256) WHEN success!=true', async () => {
    let result = await contractNOIAToken.methods["transferFrom(address,address,uint256)"](accounts[5], contractNOIAVault.address, 0,{from: accounts[0]});
  });
  it('Should execute mint(address,uint256) WHEN msg.sender==_owner,to!=0x0000000000000000000000000000000000000000', async () => {
    let result = await contractNOIAToken.mint(accounts[9], 1532892062,{from: accounts[0]});
  });
  it('Should fail mint(address,uint256) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint(accounts[9], 1532892062,{from: accounts[9]}),'revert');
  });
  it('Should fail mint(address,uint256) when NOT comply with: to != 0x0000000000000000000000000000000000000000', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.mint("0x0000000000000000000000000000000000000000", 1532892062,{from: accounts[0]}),'revert');
  });
  it('Should execute burn(uint256) WHEN msg.sender==burnAddress,tokensToMint==0,msg.sender!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[8],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[7],1,{from:accounts[0]});
    let result = await contractNOIAToken.burn(256,{from: accounts[8]});
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender == burnAddress', async () => {
    await contractNOIAToken.setBurnAddress(accounts[8],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[7],1,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(256,{from: accounts[9]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: tokensToMint == 0', async () => {
    await contractNOIAToken.setBurnAddress(accounts[8],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[1],9999,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(256,{from: accounts[8]}),'revert');
  });
  it('Should fail burn(uint256) when NOT comply with: msg.sender != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.setBurnAddress(accounts[8],{from:accounts[0]});
    await contractNOIAToken.mint(accounts[7],1,{from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.burn(256,{from: 0}),'revert');
  });
  it('Should execute setBurnAddress(address) WHEN msg.sender==_owner', async () => {
    let result = await contractNOIAToken.setBurnAddress(accounts[3],{from: accounts[0]});
  });
  it('Should fail setBurnAddress(address) when NOT comply with: msg.sender == _owner', async () => {
    let result = await truffleAssert.fails(contractNOIAToken.setBurnAddress(accounts[3],{from: accounts[9]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender==_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false,_to!=0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([84,22,220,8,233,39,123,99,118,244,204,157,151,38,81,148,170,47,21,137,174,246,141,137,219,147,250,100,56,150,68,221], accounts[0], 1000000001, 1000000000, 66,{from: accounts[0]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([84,22,220,8,233,39,123,99,118,244,204,157,151,38,81,148,170,47,21,137,174,246,141,137,219,147,250,100,56,150,68,221], accounts[0], 1000000001, 1000000000, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([84,22,220,8,233,39,123,99,118,244,204,157,151,38,81,148,170,47,21,137,174,246,141,137,219,147,250,100,56,150,68,221], "0x0000000000000000000000000000000000000000", 1000000001, 1000000000, 66,{from: accounts[0]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([84,22,220,8,233,39,123,99,118,244,204,157,151,38,81,148,170,47,21,137,174,246,141,137,219,147,250,100,56,150,68,221], "0x0000000000000000000000000000000000000000", 1000000001, 1000000000, 66,{from: accounts[0]}),'revert');
  });
  it('Should execute transferPreSigned(bytes,address,uint256,uint256,uint256) WHEN msg.sender!=_to,etherlessTransferEnabled==true,_to!=0x0000000000000000000000000000000000000000,from!=0x0000000000000000000000000000000000000000,hashedTxs==false', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await contractNOIAToken.transferPreSigned([88,165,155,100,1,124,238,159,9,230,203,174,3,231,213,235,82,2,148,189,137,187,195,110,191,129,159,20,126,105,68,189], accounts[3], 66, 2, 5,{from: accounts[9]});
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: etherlessTransferEnabled == true', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    await contractNOIAToken.disableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([88,165,155,100,1,124,238,159,9,230,203,174,3,231,213,235,82,2,148,189,137,187,195,110,191,129,159,20,126,105,68,189], accounts[3], 66, 2, 5,{from: accounts[9]}),'revert');
  });
  it('Should fail transferPreSigned(bytes,address,uint256,uint256,uint256) when NOT comply with: _to != 0x0000000000000000000000000000000000000000', async () => {
    await contractNOIAToken.enableEtherlessTransfer({from:accounts[0]});
    let result = await truffleAssert.fails(contractNOIAToken.transferPreSigned([88,165,155,100,1,124,238,159,9,230,203,174,3,231,213,235,82,2,148,189,137,187,195,110,191,129,159,20,126,105,68,189], "0x0000000000000000000000000000000000000000", 66, 2, 5,{from: accounts[9]}),'revert');
  });
  it('Should execute hashForSign(bytes4,address,address,uint256,uint256,uint256)', async () => {
    let result = await contractNOIAToken.hashForSign([113,20,222,249], accounts[3], accounts[2], 254, 2014223715, 17,{from: accounts[0]});
  });
});
