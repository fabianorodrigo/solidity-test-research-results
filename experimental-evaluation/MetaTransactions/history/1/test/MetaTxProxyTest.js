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
    let result = await contractMetaTxProxy.getTransactionHashNonce([104,161,147,25,195,244,102,59,51,61,235,123,66,195,162,107,23,17,30,199,213,91,171,210,107,123,250,152,82,240,4,84],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[8], 95, [78,71,26,212,185,219,152,222,225,22,116,41,108,232,172,85,146,167,146,69,23,122,131,145,166,248,201,89,95,249,138,24], 1,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([171,153,76,147,232,179,226,45,179,44,6,156,178,194,18,117,216,8,46,5,124,112,143,245,142,86,53,181,76,90,244,35], [183,228,91,63,150,127,158,143,44,58,134,25,188,247,114,40,179,89,242,103,70,78,68,240,71,201,92,107,21,32,204,207],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[6], 66, [75,161,152,89,44,24,60,90,51,107,212,56,152,255,120,82,249,101,242,42,237,208,138,91,209,137,168,138,24,24,106,79], 96, 3, [70,66,119,126,159,67,255,45,137,3,140,171,234,232,79,190,137,213,168,46,41,179,166,247,226,179,44,190,164,186,225,8],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[0], 64, [214,76,136,20,190,181,151,235,114,7,11,236,36,162,218,167,218,121,175,69,5,152,30,240,201,135,252,41,226,193,226,86], 5, [118,32,88,248,13,147,252,205,89,132,164,100,140,166,187,117,161,164,171,45,109,136,152,235,100,74,16,0,209,70,168,170],{from: accounts[0]});
  });
});
