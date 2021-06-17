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
    let result = await contractProxyEcTools.testrecover([40,6,61,115,134,251,119,89,190,250,185,136,122,4,38,236,126,186,214,199,123,243,16,255,171,72,76,39,111,176,67,213], [253,156,136,15,176,179,22,146,19,179,38,217,131,130,239,223,204,218,157,32,124,21,27,231,150,230,20],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([16,235,3,198,211,96,183,176,201,204,152,223,192,248,193,180,40,179,152,184,17,220,100,123,89,104,199,108,3,109,165,111], [226,150,247,202,197,89,242,19,219,19,127,194,174,165,78,209,213,180,74,169,18,127,151,54,173,175,127,240,100,17,9,180,47,14,254,101,66,216,155,23,86,157,108,121,63,236,202,194,105,187,134,207,182,178,56,119,81,244,147,121,170,1,29,161,61],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([73,73,20,250,146,206,201,197,138,176,152,78,69,72,59,183,215,96,27,184,27,45,121,122,236,225,215,138,70,127,180,185],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([32,186,151,174,164,124,65,61,111,19,198,193,224,214,207,56,249,183,196,153,108,197,164,5,245,160,162,188,193,129,60,108], [171,144,72,253,219,45,249,115,126,211,110,116,143,51,95,156,153,110,124,147,80,66,250,139,87,186,47,126,140,96,206,160],{from: accounts[0]});
  });
});
