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
    let result = await contractMetaTxProxy.getTransactionHashNonce([104,21,154,193,232,12,170,87,250,194,165,105,8,103,230,138,207,35,138,216,217,102,143,153,221,96,96,216,207,132,99,250],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[0], 2014223715, [76,98,133,63,131,184,14,33,121,195,18,60,212,146,5,239,249,164,78,113,75,87,89,219,195,32,218,73,115,33,131,23], 3,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([240,10,39,213,249,190,141,36,120,15,22,231,186,140,210,79,33,120,168,184,194,43,199,247,15,24,182,200,67,249,242,90], [254,225,26,77,138,180,229,10,203,58,90,140,139,148,20,246,106,102,19,234,226,105,174,238,109,201,139,8,59,101,182,218],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[0], 2014223715, [18,210,229,59,33,222,215,242,45,98,183,88,238,136,169,47,185,147,139,108,195,151,156,164,243,253,194,157,128,196,35,206], 2, 5, [89,8,34,123,3,39,105,88,59,210,215,167,143,145,35,228,185,141,11,197,88,253,74,116,109,218,131,226,217,203,66,8],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[2], 66, [252,70,48,245,60,171,188,57,94,248,220,147,194,149,221,214,127,81,233,187,34,110,254,129,71,111,79,207,39,173,201,216], 26, [157,8,188,37,127,0,89,106,233,115,8,11,68,118,26,120,190,85,68,33,129,123,97,247,198,183,207,204,120,4,84,169],{from: accounts[0]});
  });
});
