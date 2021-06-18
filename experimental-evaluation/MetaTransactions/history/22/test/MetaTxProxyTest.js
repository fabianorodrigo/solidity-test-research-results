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
    let result = await contractMetaTxProxy.getTransactionHashNonce([145,4,207,53,46,65,105,1,47,60,21,207,71,124,20,146,222,126,45,2,230,223,147,30,220,146,150,77,80,237,70,197],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[8], 96, [0,162,203,42,213,114,102,169,214,151,106,68,243,176,237,110,190,40,253,76,50,102,219,36,32,15,23,209,168,109,230,149], 26,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([225,150,34,253,74,190,84,92,95,136,204,58,142,64,107,69,232,254,106,4,109,5,23,63,33,125,146,164,114,192,78,17], [204,216,5,19,80,12,56,232,104,36,149,229,63,19,56,195,103,165,32,37,25,197,224,247,49,75,98,1,164,153,156,178],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[3], 64, [40,95,249,25,205,130,213,225,229,120,227,16,192,210,118,117,150,249,214,175,56,66,233,239,175,63,81,162,99,183,18,136], 2, 3, [57,49,132,86,50,77,181,192,82,99,133,243,91,79,246,246,214,74,83,209,130,139,19,184,181,63,97,16,230,40,148,72],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[1], 66, [227,40,140,123,235,68,124,154,148,74,97,239,56,162,241,57,95,59,74,85,150,147,139,239,127,159,111,243,37,11,226,133], 1532892063, [184,250,215,13,104,255,49,194,200,95,94,139,132,254,58,98,76,203,169,199,122,212,125,234,23,15,160,86,227,146,79,217],{from: accounts[0]});
  });
});
