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
    let result = await contractMetaTxProxy.getTransactionHashNonce([91,154,253,108,223,175,247,124,208,28,152,51,163,155,250,132,226,229,205,196,250,19,237,144,238,231,241,211,32,17,232,134],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[3], 1532892063, [197,208,226,253,51,95,48,201,118,1,167,246,141,168,181,170,248,35,247,81,9,169,254,253,136,52,110,171,17,121,186,164], 96,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([144,191,110,230,151,80,40,8,60,151,28,21,98,95,250,73,185,222,22,188,50,200,129,129,182,234,176,18,98,28,44,232], [228,182,27,183,229,127,21,150,150,160,115,219,149,200,176,5,10,134,188,216,125,41,223,49,9,72,6,239,53,29,59,149],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[1], 3, [68,72,202,61,19,186,105,90,82,181,41,40,198,88,93,228,55,45,164,212,216,180,229,20,83,28,113,42,88,6,174,41], 3, 26, [248,132,20,253,98,166,87,1,22,112,189,162,249,58,44,131,174,246,174,148,77,122,20,245,253,95,132,240,11,109,25,26],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[6], 2014223715, [243,207,68,8,160,205,175,9,180,174,84,250,46,223,200,71,27,88,132,84,130,164,169,228,156,14,114,52,131,67,238,94], 5, [199,229,228,84,4,150,165,90,29,66,172,128,137,176,65,123,44,240,192,107,242,175,114,147,193,226,75,134,33,217,152,23],{from: accounts[0]});
  });
});
