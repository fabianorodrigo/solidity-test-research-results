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
    let result = await contractProxyEcTools.testrecover([69,164,234,191,214,9,217,85,112,83,185,67,110,115,213,143,130,222,245,55,19,236,117,93,60,33,218,106,125,14,169,187], [24,235,122,121,137,117,32,72,97,179,191,122,123,172,226,250,84,27,214,41,235,5,32,114,60,2,245,108,84,223,48,139,77,163,176,201,25,102,95,84,116,71,123,80,70,78,44,242,81,38,47,169,46,140,185,251,98,141,31,153,198,25,17,158,79,24],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([129,63,197,114,241,104,116,179,60,71,138,88,81,19,78,220,129,238,144,130,18,4,167,152,106,88,143,179,189,66,158,143], [207,94,68,31,9,4,10,21,171,246,27,21,19,79,129,240,151,98,243,30,145,192,194,72,133,222,3,251,192,95,175,183,179,24,119,101,203,91,114,62,223,255,85,24,81,101,149,184,82,242,131,179,191,165,145,206,255,64,119,14,104,250,128,97,255],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([42,206,114,211,109,156,180,168,29,178,245,52,81,119,219,41,191,49,199,44,101,187,105,250,227,81,74,40,18,128,230,112],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([61,111,227,245,101,223,230,66,153,168,115,28,92,197,204,237,161,102,40,2,62,231,6,176,183,6,222,35,11,158,152,139], [65,194,199,185,130,72,156,19,117,190,176,233,149,246,249,130,147,115,88,60,138,89,216,94,79,73,190,193,220,166,123,171],{from: accounts[0]});
  });
});
