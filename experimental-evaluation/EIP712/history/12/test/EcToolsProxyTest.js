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
    let result = await contractProxyEcTools.testrecover([17,107,224,37,53,65,204,138,45,143,139,76,159,0,21,121,63,221,10,215,166,181,176,72,153,87,68,102,14,68,154,60], [149,169,60,201,5,183,50,211,149,100,69,99,72,111,65,227,172,89,205,65,235,69,166,60,240,214,11,176,150,109,138,155,244,143,154,45,26,183,46,65,180,216,167,151,213,79,199,134,26,39,122,65,129,249,146,223,75,91,128,249,228,51,99,147,123,6],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([214,74,41,186,248,148,155,158,185,210,152,30,239,0,105,38,78,240,69,124,19,95,13,194,46,77,15,211,179,214,111,238], [13,10,78,13,40,137,243,137,170,88,55,130,128,76,204,144,222,45,200,126,9,205,69,5,196,187,147,241,163,223,118,83,180,8,114,147,24,210,43,118,239,113,191,176,131,213,73,16,215,136,31,124,194,55,99,74,113,178,170,198,170,167,43,192,173],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([206,78,112,15,223,87,221,80,232,111,149,195,5,75,96,76,79,216,98,215,30,228,58,83,8,93,129,93,248,37,36,126],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([89,87,41,41,200,134,200,153,42,242,245,9,1,152,75,143,104,115,167,1,123,52,95,143,101,32,170,245,92,98,74,132], [152,222,125,232,59,126,94,237,154,154,10,5,123,58,191,3,254,47,240,226,142,235,84,115,7,5,36,145,144,47,177,225],{from: accounts[0]});
  });
});
