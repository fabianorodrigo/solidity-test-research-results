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
    let result = await contractProxyEcTools.testrecover([57,81,191,9,190,138,97,203,229,126,123,130,15,101,144,2,175,161,86,16,85,165,234,165,137,100,158,223,243,116,103,176], [243,198,244,47,14,201,41,56,156,192,218,125,116,81,104,208,64,100,122,105,200,149,148,158,60,54,37],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([31,206,87,216,48,181,23,117,132,202,97,91,1,138,100,175,62,49,199,77,232,197,134,227,58,210,125,190,22,229,43,45], [164,231,249,244,211,189,171,96,150,160,110,91,50,211,199,88,28,12,236,169,173,78,154,145,83,2,168,70,254,226,36,191,28,124,156,29,111,193,204,143,137,118,182,125,39,179,103,152,191,82,117,104,99,6,144,149,41,16,27,248,128,212,169,202,237],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([250,176,79,205,132,202,103,236,134,125,104,176,56,45,55,141,231,194,213,187,72,46,55,132,228,22,126,160,19,22,132,231],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([173,205,128,161,90,212,40,167,62,229,31,19,106,94,202,183,199,90,141,85,120,250,217,137,251,164,248,181,85,50,157,53], [157,51,244,39,222,103,181,139,12,75,165,216,16,235,20,141,83,97,181,156,21,186,52,87,162,131,79,180,235,108,134,123],{from: accounts[0]});
  });
});
