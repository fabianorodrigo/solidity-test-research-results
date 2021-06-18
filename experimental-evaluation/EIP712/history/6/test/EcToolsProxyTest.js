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
    let result = await contractProxyEcTools.testrecover([237,5,92,172,165,230,150,243,9,123,18,25,68,96,162,124,186,227,34,161,85,78,241,232,211,23,93,141,205,103,230,135], [123,183,230,175,0,241,117,66,102,135,144,87,71,191,142,163,208,194,109,184,150,153,49,18,248,21],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([153,55,77,220,253,116,104,92,95,173,51,99,15,131,11,9,236,173,127,80,66,212,101,65,72,54,44,160,255,123,202,31], [206,119,130,21,58,156,0,119,13,54,99,89,58,174,27,247,64,112,17,217,81,146,113,52,100,22,144,105,165,243,139,140,148,104,4,125,215,30,244,234,27,24,131,222,39,180,112,21,2,213,58,137,13,162,95,117,54,74,236,124,39,11,25,111,206],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([35,70,41,182,53,19,17,103,136,16,166,111,95,233,49,85,126,125,112,148,197,7,188,110,193,14,149,52,88,247,225,142],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([79,119,182,12,40,115,46,192,40,208,146,171,231,12,141,196,187,155,160,119,107,93,0,184,47,113,221,223,116,190,246,167], [16,218,180,26,234,216,201,123,205,113,250,177,20,1,159,202,35,97,253,185,96,148,1,165,16,46,2,83,231,81,100,72],{from: accounts[0]});
  });
});
