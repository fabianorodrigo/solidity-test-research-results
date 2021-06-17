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
    let result = await contractProxyEcTools.testrecover([244,67,208,166,73,84,85,197,180,47,237,120,149,187,190,163,229,201,144,125,178,243,40,222,128,23,46,231,77,37,156,141], [186,14,55,136,7,28,50,215,206,237,59,119,185,203,93,245,52,26,169,198,104,54,59,46,252,121,162],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([86,76,168,158,144,123,10,143,245,157,124,190,124,215,151,64,105,128,169,148,35,81,225,230,213,225,65,78,96,34,176,178], [61,85,19,236,8,34,102,242,234,159,121,13,186,8,246,66,114,198,210,96,45,62,115,229,239,111,153,54,65,162,122,223,243,20,55,94,199,134,18,57,155,98,254,121,156,166,250,214,55,163,36,162,163,123,155,254,41,70,12,71,122,113,52,120,178],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([140,115,82,150,236,164,248,45,76,11,114,26,86,229,89,115,240,128,133,207,151,7,4,254,3,17,246,15,3,170,129,90],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([180,184,198,107,168,5,193,84,72,211,27,206,224,129,133,5,52,160,96,118,225,122,108,230,112,8,199,168,51,170,99,207], [3,114,234,209,221,73,92,137,74,209,34,41,138,133,54,117,88,88,228,223,120,171,182,43,105,184,85,145,28,87,115,223],{from: accounts[0]});
  });
});
