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
    let result = await contractMetaTxProxy.getTransactionHashNonce([15,43,74,135,176,36,255,186,222,148,32,188,58,238,138,64,34,161,240,84,169,51,18,149,27,83,65,136,77,63,156,6],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[8], 26, [129,115,157,13,202,15,188,91,110,46,36,146,241,59,128,146,150,33,44,1,150,255,64,54,244,28,217,252,100,155,247,21], 29,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([216,55,56,34,182,29,150,109,26,217,175,174,47,194,146,243,102,161,34,46,13,135,217,118,199,136,111,164,66,6,56,186], [180,23,114,25,105,244,74,95,186,73,216,226,197,252,22,253,114,132,92,24,46,57,38,145,168,235,184,170,221,45,218,98],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[4], 1532892063, [140,3,77,174,99,8,165,152,88,184,74,124,84,42,136,229,81,179,239,128,80,251,210,208,83,128,143,84,223,68,73,33], 97, 64, [28,65,255,232,174,215,162,18,57,163,187,78,45,223,111,221,80,170,255,244,241,216,229,255,239,197,9,161,108,58,230,89],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[1], 3, [103,91,160,185,136,56,93,75,192,255,111,153,15,194,217,113,11,175,74,186,166,106,27,136,100,50,86,26,85,210,255,82], 5, [123,159,132,190,10,11,78,249,125,18,115,38,140,210,119,80,184,207,205,164,110,97,114,92,168,42,47,111,147,216,134,245],{from: accounts[0]});
  });
});
