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
    let result = await contractMetaTxProxy.getTransactionHashNonce([31,66,243,119,235,24,110,21,47,61,114,188,171,203,84,254,38,139,219,55,189,143,239,228,192,255,156,50,254,92,222,153],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[3], 5, [125,211,184,64,123,56,220,211,50,30,220,135,101,165,224,158,2,30,218,217,207,35,47,203,127,118,45,81,148,156,157,76], 2014223716,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([178,110,115,185,230,141,246,56,71,193,127,249,200,144,129,67,48,181,144,130,84,86,150,221,107,178,3,43,247,46,100,134], [123,89,66,94,38,215,153,82,149,66,7,20,131,223,41,6,180,253,242,60,178,202,159,222,249,139,97,246,102,3,196,53],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[2], 64, [182,14,207,154,129,226,251,218,21,0,42,48,31,233,64,186,75,19,13,189,61,135,187,249,243,194,157,211,66,156,116,122], 5, 4, [180,161,109,16,239,74,42,2,166,19,64,36,195,40,89,182,228,102,196,45,41,71,91,117,254,186,141,174,151,66,175,86],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[5], 1532892063, [142,117,150,31,234,86,107,224,141,38,235,1,194,139,206,221,224,159,51,69,27,44,184,118,107,190,180,123,106,181,136,172], 97, [114,39,117,217,5,188,51,128,5,51,169,98,55,235,177,163,51,106,220,179,226,220,106,155,100,154,41,205,15,196,79,53],{from: accounts[0]});
  });
});
