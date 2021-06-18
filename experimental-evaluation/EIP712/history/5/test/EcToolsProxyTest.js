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
    let result = await contractProxyEcTools.testrecover([175,202,63,136,109,88,128,62,6,185,57,160,147,79,194,172,174,253,191,0,190,190,247,6,110,178,62,216,46,224,23,252], [211,14,250,251,15,132,81,99,109,108,107,170,67,93,66,188,15,126,141,41,117,173,8,253,44,190,226,57,192,151,26,111,18,74,7,211,85,103,214,248,161,6,91,240,88,58,28,2,31,180,72,91,84,247,0,159,181,11,56,37,105,23,74,255,18,148],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([159,170,112,210,76,254,20,209,130,123,156,206,90,84,38,127,195,70,141,17,41,215,94,232,48,146,233,224,249,148,235,28], [31,246,80,103,154,19,68,224,149,81,129,127,71,141,107,163,188,200,62,230,241,237,244,180,115,125,81,36,19,160,93,158,1,43,231,107,45,116,227,92,95,45,21,119,75,141,245,139,25,82,192,204,60,201,212,90,167,73,33,129,107,171,89,66,10],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([102,105,48,102,121,14,227,9,219,114,250,122,107,19,210,100,187,36,165,169,43,137,50,236,89,111,254,29,60,220,58,181],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([232,182,96,74,9,58,118,108,34,149,69,171,107,175,182,206,71,201,8,132,206,146,94,166,155,28,69,115,50,64,29,58], [147,231,116,190,91,140,115,234,149,253,123,39,74,114,230,17,158,93,206,77,28,21,202,170,173,214,31,180,215,18,223,127],{from: accounts[0]});
  });
});
