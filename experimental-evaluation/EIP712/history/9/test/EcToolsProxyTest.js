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
    let result = await contractProxyEcTools.testrecover([191,130,233,92,165,213,63,170,32,249,166,147,223,95,30,6,101,61,73,188,184,253,121,165,83,10,0,32,182,110,246,69], [39,189,191,52,246,233,124,186,129,246,172,55,38,247,203,230,55,19,178,100,216,57,33,65,146,229,121,106,102,194,225,140,27,138,169,196,28,233,115,123,243,216,36,194,145,188,198,225,232,76,65,214,181,122,82,62,239,155,129,167,221,124,155,98,232,222],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([69,77,163,108,112,201,165,148,199,237,64,117,9,169,182,47,62,90,44,97,232,45,248,61,99,55,201,120,245,225,238,123], [117,236,138,84,209,250,40,197,162,91,14,99,192,27,50,250,61,74,233,199,199,231,191,240,25,157,11,92,184,157,209,101,169,23,17,43,31,109,221,84,46,6,10,91,96,220,185,134,129,44,54,78,58,251,183,122,23,115,198,138,51,75,130,58,249],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([74,128,252,118,209,162,230,63,244,244,104,59,231,138,41,97,13,92,64,143,59,254,129,150,68,230,143,93,43,181,155,2],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([39,198,191,158,207,165,244,19,3,120,139,40,33,91,170,229,72,43,186,117,0,52,126,0,232,109,252,231,97,76,14,111], [171,2,26,173,118,12,38,158,199,122,145,28,138,194,62,225,134,212,142,63,34,132,153,7,236,247,115,117,94,138,90,171],{from: accounts[0]});
  });
});
