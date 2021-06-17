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
    let result = await contractProxyEcTools.testrecover([7,76,48,79,138,210,67,121,126,154,205,47,23,186,220,254,35,191,127,86,38,45,58,160,50,60,143,179,58,24,29,207], [194,166,175,211,64,217,61,141,243,225,204,133,143,136,22,111,232,90,77,156,50,160,137,117,160,251,158,120,35,38,182,57,252,49,92,149,207,190,1,156,141,42,155,250,191,47,95,1,199,251,32,65,158,94,19,103,141,237,116,2,245,133,246,232,125,218],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([194,86,182,230,161,20,153,240,198,60,225,81,40,55,86,81,216,42,143,3,7,25,72,239,47,224,81,241,82,179,180,208], [41,31,157,182,231,212,136,73,177,229,89,37,193,205,101,128,151,162,133,231,87,82,51,30,176,54,213,174,147,184,73,142,112,254,255,203,215,127,51,170,28,180,188,160,232,104,44,143,87,196,120,58,45,220,88,238,91,128,189,50,121,23,47,50,241],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([136,114,140,212,1,95,185,228,105,236,212,68,41,135,11,5,94,138,100,39,115,0,197,209,185,180,223,8,77,151,222,113],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([13,124,224,101,189,246,245,58,153,96,18,215,165,174,112,106,149,71,30,234,133,232,227,85,34,16,58,240,40,237,202,45], [203,57,161,109,113,253,62,11,102,103,215,111,60,125,140,33,234,54,167,98,94,46,172,235,187,141,218,242,164,10,136,227],{from: accounts[0]});
  });
});
