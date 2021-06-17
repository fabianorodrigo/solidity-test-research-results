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
    let result = await contractProxyEcTools.testrecover([97,122,181,194,201,69,119,179,213,251,101,63,121,109,243,222,146,136,222,159,109,179,83,143,53,11,31,200,61,93,215,222], [183,120,173,117,10,73,70,231,219,234,170,46,97,187,94,59,162,184,23,24,34,24,45,56,14,147,217,196,80,252,162,217,250,212,240,101,184,242,222,246,24,4,186,24,141,224,166,167,65,103,186,218,208,3,107,250,80,115,74,241,206,170,240,86,137,183,110,173,135,180,7,155,205,33,34,143,71,169,147,85,70,18,3,147,235,135,208,6,108,157,37,28,23,173,226,26,46,124,234,78],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([52,20,146,149,23,83,102,87,114,106,145,67,100,181,143,213,140,15,75,102,153,49,62,245,231,178,194,116,219,96,245,231], [43,166,23,30,127,170,126,106,110,19,180,205,45,105,29,231,254,4,14,8,33,131,254,176,98,14,240,88,162,167,42,69,48,188,9,55,176,159,32,49,36,86,241,17,246,146,232,6,151,146,216,17,214,225,216,224,65,18,4,158,135,165,107,89,7],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([39,231,61,195,152,103,55,111,87,37,171,230,55,221,128,28,144,136,50,224,158,154,116,38,148,153,127,130,249,128,136,31],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([48,196,189,44,199,110,49,157,220,237,6,165,182,43,113,118,98,216,144,151,91,147,117,108,31,86,6,58,10,76,33,216], [103,167,141,70,60,61,25,2,48,72,160,211,224,28,51,245,0,180,32,226,236,74,56,119,128,254,234,254,125,212,213,65],{from: accounts[0]});
  });
});
