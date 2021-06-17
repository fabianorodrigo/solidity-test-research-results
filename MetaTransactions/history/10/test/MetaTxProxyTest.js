const truffleAssert = require('truffle-assertions');
const EcTools = artifacts.require("EcTools");
const ExternalContract = artifacts.require("ExternalContract");
const MetaTxProxy = artifacts.require("MetaTxProxy");
const ProxyEcTools = artifacts.require("ProxyEcTools");

contract("MetaTxProxy",(accounts)=>{
  let trace = false;
  let contractEcTools = null;
  let contractExternalContract = null;
  let contractMetaTxProxy = null;
  beforeEach(async () => {
    contractEcTools = await EcTools.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: EcTools.new({from: accounts[0]}');
    contractExternalContract = await ExternalContract.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ExternalContract.new({from: accounts[0]}');
    MetaTxProxy.link("EcTools",contractEcTools.address);
    contractMetaTxProxy = await MetaTxProxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MetaTxProxy.new({from:accounts[0]}');
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractMetaTxProxy.sendTransaction({from: accounts[0]});
  });
  it('Should execute getTransactionHashNonce(bytes32)', async () => {
    let result = await contractMetaTxProxy.getTransactionHashNonce([150,191,104,32,108,96,96,239,124,255,78,98,37,209,116,171,49,156,184,72,28,243,63,62,99,53,210,153,31,130,123,4],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[9], 1532892062, [102,159,184,205,124,216,190,104,248,15,212,184,47,223,146,33,37,25,27,255,74,208,178,44,29,155,139,219,9,66,77,172], 2014223715,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([38,135,141,196,106,7,162,155,187,249,86,234,251,254,179,116,123,228,203,249,18,109,13,86,172,130,3,127,185,254,172,121], [89,76,25,253,187,53,219,191,62,161,45,194,66,226,93,42,113,78,97,178,239,69,99,32,21,4,48,32,51,250,222,155],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[2], 1532892063, [219,192,133,78,203,128,101,20,238,114,153,82,50,184,121,99,206,145,236,23,213,203,59,128,61,181,44,163,193,11,49,198], 1532892064, 4, [140,232,37,243,239,144,182,113,156,166,196,0,231,100,110,101,142,175,165,76,56,213,63,148,48,68,216,108,116,131,218,104],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[8], 1532892064, [75,48,132,114,129,130,72,117,230,0,69,42,68,38,237,115,189,208,59,17,120,27,194,255,100,32,225,81,29,68,32,76], 27, [98,98,233,234,181,108,93,43,193,114,108,78,194,119,185,224,167,135,200,125,63,100,189,111,42,211,48,48,236,168,89,28],{from: accounts[0]});
  });
});
