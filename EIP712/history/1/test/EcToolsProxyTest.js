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
    let result = await contractProxyEcTools.testrecover([132,208,190,233,134,93,247,37,46,59,252,154,171,188,113,131,93,210,213,23,191,73,57,164,136,139,86,153,17,42,200,54], [134,167,17,77,25,39,0,20,63,108,5,171,21,205,84,244,68,84,137,215,55,147,21,79,246,113,160,135,184,11,238,204,58,220,207,113,7,215,116,67,203,21,63,238,37,153,114,125,95,141,167,54,88,102,184,223,32,239,182,111,155,136,97,100,200,151,90,194,4,42,9,170,171,47,74,6,46,45,153,210,126,144,205,234,230,161,15,20,220,37,147,212,236,3,14,22,127,141,34,216],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([231,16,217,54,91,99,28,39,98,43,218,25,74,175,184,245,65,82,171,228,157,190,161,135,117,14,105,14,144,57,21,191], [110,7,54,201,8,195,40,219,70,97,224,168,75,200,131,222,219,144,208,22,104,176,150,139,18,247,220,50,156,172,105,225,63,173,156,4,83,216,65,69,139,40,187,200,99,121,72,130,169,183,116,126,147,72,47,176,31,16,35,20,3,251,74,212,231],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([20,156,214,191,184,156,137,241,98,32,51,85,195,24,76,183,153,129,168,50,43,191,72,21,115,251,157,175,124,167,161,68],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([81,82,120,249,23,111,41,43,126,253,199,4,49,17,72,212,179,67,22,104,184,112,224,25,19,243,216,79,133,133,81,163], [238,118,130,192,184,34,181,229,215,12,192,32,10,146,159,34,192,95,245,101,220,89,246,179,15,20,213,143,185,72,249,17],{from: accounts[0]});
  });
});
