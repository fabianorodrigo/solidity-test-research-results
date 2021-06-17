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
    let result = await contractMetaTxProxy.getTransactionHashNonce([191,233,137,95,164,14,50,167,165,142,239,60,176,242,211,242,215,122,246,57,22,189,237,138,113,120,208,87,251,242,239,231],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[8], 1, [173,219,123,93,122,144,159,22,84,240,128,56,133,166,134,212,138,90,186,33,79,135,206,215,223,21,182,35,210,76,130,160], 64,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([139,15,194,223,60,13,230,143,208,14,106,119,103,118,63,39,148,44,115,2,215,112,105,213,171,31,154,46,169,222,149,11], [99,105,206,40,208,152,182,51,167,254,104,249,34,14,9,205,103,82,175,102,241,4,148,37,93,199,19,107,222,83,151,223],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[8], 2014223716, [16,66,209,178,198,236,68,62,171,184,234,54,166,242,182,212,108,71,87,82,172,222,190,227,200,151,122,175,88,190,249,168], 2014223716, 1, [123,162,190,68,132,145,16,143,255,240,1,17,5,200,71,161,135,116,171,120,170,135,94,3,115,24,253,11,228,245,125,228],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[9], 64, [156,117,25,53,200,181,121,68,243,170,182,216,31,89,210,133,29,179,64,193,32,44,131,201,227,245,179,58,162,183,99,158], 2014223716, [125,133,88,203,3,39,247,18,4,115,193,201,59,176,0,249,182,212,205,87,185,107,159,196,1,251,128,10,192,87,21,85],{from: accounts[0]});
  });
});
