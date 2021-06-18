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
    let result = await contractMetaTxProxy.getTransactionHashNonce([242,208,206,212,220,21,91,101,27,30,218,55,113,253,19,221,3,17,198,225,141,193,129,103,192,246,3,199,251,67,51,150],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[9], 2014223716, [130,84,200,247,241,180,62,74,10,135,224,155,207,253,236,209,161,243,234,144,68,215,139,1,117,203,14,153,130,156,23,232], 29,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([170,203,81,224,86,195,31,35,152,67,255,199,202,176,205,167,235,211,157,102,143,114,149,173,152,41,193,87,222,200,115,57], [200,174,220,202,182,177,251,192,244,2,249,46,147,211,46,128,159,141,85,154,81,139,149,252,62,188,34,144,223,143,178,196],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[0], 1, [70,40,51,143,202,2,172,22,241,158,37,107,154,224,80,163,123,174,118,199,186,137,15,219,218,125,234,148,172,184,223,65], 1532892064, 1532892063, [47,90,35,198,200,226,245,43,4,149,150,209,253,200,25,201,9,39,230,155,252,170,21,140,49,233,48,220,39,170,106,235],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[6], 1532892063, [212,51,48,12,164,57,166,115,194,169,44,110,195,165,28,230,133,19,141,2,117,214,220,30,103,210,52,181,58,117,64,139], 97, [103,28,62,246,131,182,248,252,9,37,109,32,221,138,60,205,160,115,125,200,86,175,157,158,36,232,147,101,186,117,250,10],{from: accounts[0]});
  });
});
