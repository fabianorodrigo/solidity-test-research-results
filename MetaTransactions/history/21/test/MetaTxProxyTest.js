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
    let result = await contractMetaTxProxy.getTransactionHashNonce([221,89,82,76,23,50,173,170,218,22,188,246,243,148,17,46,196,191,103,209,122,115,248,133,45,223,133,188,1,214,239,189],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[0], 28, [158,153,101,69,232,131,28,114,42,98,209,191,255,103,176,134,216,224,47,201,103,101,104,50,241,147,10,145,193,240,98,95], 2014223716,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([181,253,130,144,88,203,36,149,98,127,123,165,74,207,67,127,107,124,34,52,251,198,10,31,101,139,91,184,157,12,179,116], [253,80,209,204,196,125,178,69,86,173,18,28,108,96,146,76,74,166,65,238,42,244,26,254,18,180,70,237,116,212,116,222],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[9], 4, [96,22,200,244,101,22,204,134,166,189,36,3,183,55,4,157,229,141,12,119,227,74,182,18,126,151,45,16,57,174,236,23], 97, 66, [241,57,140,31,215,150,149,213,137,187,165,137,49,212,183,122,166,90,116,26,208,29,243,219,64,37,1,228,170,117,41,213],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[2], 2, [218,215,157,55,48,29,237,125,114,143,71,106,252,26,127,208,204,131,159,12,74,206,225,146,221,184,211,207,171,255,214,139], 66, [11,249,247,147,19,165,241,223,225,5,65,56,131,98,70,144,135,185,223,27,226,140,33,131,43,110,117,173,95,107,56,213],{from: accounts[0]});
  });
});
