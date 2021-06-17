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
    let result = await contractProxyEcTools.testrecover([171,224,34,13,105,120,77,37,54,68,175,127,228,119,243,65,128,101,35,182,234,90,21,239,211,226,108,198,118,44,92,70], [6,116],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([193,84,142,39,110,160,85,109,141,117,250,222,147,54,110,229,184,148,56,207,50,105,202,159,224,218,245,233,224,105,214,84], [101,231,71,76,115,30,20,161,221,202,136,128,68,8,45,57,251,248,32,234,96,183,4,117,25,156,59,127,231,7,135,233,219,128,203,147,161,145,61,208,97,93,79,230,36,13,195,163,248,160,131,182,214,213,128,248,192,101,87,118,220,241,13,149,18],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([30,32,92,200,11,211,167,118,253,168,193,22,136,19,98,29,253,33,170,134,138,243,180,48,110,218,185,85,175,32,70,17],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([181,32,251,183,97,236,70,27,61,85,238,101,101,44,48,244,254,224,107,196,187,22,185,70,94,97,134,147,134,21,123,75], [114,71,19,243,58,177,150,76,76,193,173,210,27,15,170,114,58,160,64,195,206,93,32,213,26,109,2,23,157,171,241,203],{from: accounts[0]});
  });
});
