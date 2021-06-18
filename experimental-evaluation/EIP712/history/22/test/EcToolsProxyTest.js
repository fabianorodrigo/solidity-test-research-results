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
    let result = await contractProxyEcTools.testrecover([201,55,159,167,153,43,10,230,63,199,178,226,248,165,211,224,114,155,252,178,115,76,90,133,139,250,4,24,159,237,195,65], [],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([252,45,21,17,192,68,253,92,152,221,225,137,213,100,42,30,90,40,225,7,237,63,165,117,96,99,57,25,201,0,217,67], [244,55,169,62,61,45,137,249,38,95,137,8,66,68,137,234,41,54,73,86,202,113,28,17,158,37,143,28,142,221,144,79,24,110,151,154,54,19,203,7,169,97,138,60,23,206,165,99,149,19,34,223,61,33,68,214,179,211,141,234,238,139,59,226,247],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([184,77,103,88,142,184,172,192,182,90,248,193,132,43,28,65,252,98,135,169,128,186,106,41,68,127,222,123,216,22,100,133],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([107,220,236,178,100,71,81,249,112,182,94,25,132,146,91,50,125,184,48,13,108,86,150,200,57,227,208,216,248,239,223,50], [172,192,211,1,72,231,46,238,6,53,172,8,129,148,11,255,231,196,7,87,30,116,243,124,128,236,58,140,214,80,196,54],{from: accounts[0]});
  });
});
