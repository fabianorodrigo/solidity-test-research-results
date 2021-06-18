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
    let result = await contractProxyEcTools.testrecover([107,143,94,75,18,82,129,143,34,230,136,185,88,1,253,130,199,243,243,37,147,14,236,253,104,14,191,68,179,52,241,93], [39,188,143,31,137,56,72,164,248,83,24,170,2,127,199,196,54,178,17,11,62,14,47,104,226,106,32,202],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([104,105,17,69,106,207,181,14,71,122,64,117,105,179,190,207,200,107,9,48,37,231,236,202,35,162,146,244,58,204,173,218], [9,100,124,215,203,231,13,89,41,137,24,167,207,0,20,220,102,195,255,166,139,254,180,68,5,22,49,63,55,136,212,131,180,38,88,145,179,75,237,67,4,18,162,91,158,96,166,0,164,83,122,213,35,87,189,164,178,193,26,147,153,140,118,73,139],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([14,81,233,86,212,186,68,39,102,85,237,229,180,72,67,112,95,58,181,242,240,56,34,105,146,83,134,24,126,87,235,135],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([110,108,250,76,158,6,213,230,137,254,140,248,140,226,98,142,74,71,11,86,15,215,249,159,90,160,139,16,160,165,95,57], [215,30,203,5,79,237,188,232,209,10,2,125,39,219,166,164,58,137,228,182,241,175,162,57,88,195,168,172,229,249,217,90],{from: accounts[0]});
  });
});
