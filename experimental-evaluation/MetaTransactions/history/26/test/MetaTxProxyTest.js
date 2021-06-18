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
    let result = await contractMetaTxProxy.getTransactionHashNonce([164,170,252,157,20,126,241,111,18,38,239,60,138,83,254,176,182,162,117,191,14,196,233,33,237,23,227,134,174,119,172,137],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[1], 3, [48,164,99,236,17,53,199,11,230,114,134,79,115,93,194,122,1,11,214,202,33,49,232,128,82,31,86,73,37,243,158,11], 2014223716,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([153,254,55,227,88,80,242,22,151,244,190,31,55,254,211,212,43,129,186,85,190,246,37,80,232,32,149,111,59,39,170,26], [203,53,78,250,232,105,189,49,219,219,221,16,142,237,166,33,142,117,5,237,15,2,244,102,178,222,185,49,199,112,71,82],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[0], 1532892062, [45,54,155,193,146,218,124,31,154,62,9,98,133,59,242,87,142,89,54,150,244,117,87,186,189,21,61,2,197,194,119,172], 29, 1532892063, [140,182,99,168,255,138,78,119,120,125,188,57,40,252,105,183,208,125,195,246,167,191,155,183,97,122,83,85,221,86,9,81],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[4], 1532892062, [58,93,221,230,93,215,160,219,61,236,17,132,211,255,58,5,217,63,106,32,208,79,229,50,6,5,97,186,109,170,111,119], 4, [51,255,29,43,67,226,52,101,119,26,67,47,178,71,96,178,243,252,206,80,48,127,56,136,65,132,42,79,172,158,95,185],{from: accounts[0]});
  });
});
