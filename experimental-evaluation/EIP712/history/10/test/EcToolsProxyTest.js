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
    let result = await contractProxyEcTools.testrecover([81,83,52,217,101,115,253,150,175,47,56,83,237,188,40,189,87,29,143,190,202,36,221,2,171,107,175,246,136,14,32,181], [94,27,144,40,141,200,116,176,181,169,41,233,244,133,113,237,172,54,20,0,24,33,113,118,252,194,241,30,138],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([137,62,106,101,75,150,199,98,168,136,126,176,64,109,245,193,190,2,149,1,251,128,47,211,3,22,206,131,142,42,113,80], [208,122,8,108,11,214,110,69,149,85,252,69,27,72,228,22,116,132,78,211,251,189,90,77,166,179,245,221,219,29,200,94,24,10,159,71,36,236,248,10,227,126,144,37,30,97,109,233,33,174,47,69,32,3,32,198,195,223,69,132,145,1,150,62,10],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([27,103,208,21,140,150,63,122,217,241,134,31,80,170,115,143,159,147,245,240,141,195,254,20,77,102,31,205,83,215,40,239],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([253,213,100,110,88,168,108,169,234,112,241,178,250,225,27,182,130,144,228,64,23,234,198,115,196,125,38,103,188,16,233,54], [198,56,242,247,98,34,3,112,125,42,30,73,86,247,48,126,55,118,236,7,105,15,173,138,171,70,149,139,104,50,33,159],{from: accounts[0]});
  });
});
