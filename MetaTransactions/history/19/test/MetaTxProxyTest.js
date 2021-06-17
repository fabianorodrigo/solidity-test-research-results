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
    let result = await contractMetaTxProxy.getTransactionHashNonce([138,119,185,214,111,101,16,169,237,189,119,164,152,174,229,99,164,45,8,38,247,12,112,86,79,8,69,213,117,205,210,216],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[8], 65, [153,142,41,4,77,124,186,227,160,184,116,169,232,155,121,131,164,64,155,217,98,104,249,1,204,17,213,218,170,44,65,210], 1532892064,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([130,148,199,21,76,58,173,231,192,205,14,129,6,157,107,92,14,91,114,63,90,196,180,83,71,171,196,242,214,175,72,162], [62,28,14,21,163,11,71,66,111,45,166,11,249,96,133,49,244,39,83,175,141,232,193,156,128,181,91,169,213,37,1,66],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[4], 97, [1,77,150,141,164,119,223,50,132,181,139,151,30,58,14,118,157,125,222,86,231,242,178,227,153,234,95,35,153,125,7,251], 5, 96, [103,119,0,47,27,49,170,193,19,86,139,213,109,135,125,182,58,84,217,68,198,151,89,19,137,67,98,205,207,79,196,202],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[8], 1532892064, [105,84,156,158,2,211,203,52,198,167,223,236,34,99,188,94,223,52,238,23,115,48,195,178,107,124,102,153,157,79,211,226], 64, [153,4,163,241,31,51,196,229,156,223,99,230,2,252,9,220,100,66,47,176,56,107,153,238,103,95,91,165,179,179,33,66],{from: accounts[0]});
  });
});
