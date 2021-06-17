const truffleAssert = require('truffle-assertions');
const EcTools = artifacts.require("EcTools");
const SignatureVerifier = artifacts.require("SignatureVerifier");
const ProxyEcTools = artifacts.require("ProxyEcTools");

contract("contractProxyEcTools",(accounts)=>{
    let contractProxyEcTools = null;
  let trace = false;
  let contractEcTools = null;
  let contractSignatureVerifier = null;
  beforeEach(async () => {
    contractEcTools = await EcTools.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: EcTools.new({from: accounts[0]}');
    SignatureVerifier.link("EcTools",contractEcTools.address);
    contractSignatureVerifier = await SignatureVerifier.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: SignatureVerifier.new({from: accounts[0]}');
      ProxyEcTools.link('EcTools', contractEcTools.address);
    contractProxyEcTools = await ProxyEcTools.new({ from: accounts[0] });
});
  
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length!=65', async () => {
    let result = await contractProxyEcTools.testrecover([104,47,60,19,158,25,173,147,139,123,60,7,23,91,194,209,77,181,7,135,102,5,157,112,14,166,178,159,41,226,215,215], [87,228,70,100,158,211,5,246,160,124,179,131,58,48,233,45,12,134,129,17,251,238,135,164,23,244,110,81,235,98,88,209,90,221,27,254,169,206,174,61,25,202,43,242,241,194,182,250,114,181,180,128,221,66,221,33,166,134,82,119,165,141,120,38,135,67,3,55,243,45,60,58,148,5,152,218,65,154,2,41,133,175,95,30,154,116,12,18,42,33,198,213,0,227,187,116,4,65,230,48],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([186,254,232,131,109,53,154,36,185,23,157,158,249,234,45,235,19,254,96,111,151,33,153,234,218,145,159,212,83,59,91,65], [131,28,204,185,17,236,179,248,136,235,215,194,170,193,226,241,248,203,250,18,253,76,94,118,149,58,2,253,154,51,97,175,212,208,48,7,14,121,69,37,239,197,248,128,11,13,91,27,196,247,137,42,126,60,221,249,85,207,192,79,1,193,7,234,224],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([145,128,118,45,167,202,92,138,141,172,13,16,147,70,225,140,2,13,104,200,208,186,198,136,104,206,117,64,109,192,90,128],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([248,43,204,1,63,244,108,232,204,80,41,43,224,156,243,127,121,53,165,106,245,236,215,115,101,9,21,103,166,249,172,255], [140,230,140,10,174,116,76,2,65,69,12,224,1,182,61,34,147,158,175,186,170,112,231,223,2,170,58,111,209,158,131,199],{from: accounts[0]});
  });
});
