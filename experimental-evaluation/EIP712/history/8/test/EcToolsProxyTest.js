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
    let result = await contractProxyEcTools.testrecover([97,69,160,158,171,117,216,23,245,93,62,51,49,25,15,182,159,17,253,121,228,60,70,209,19,130,204,40,160,215,152,242], [],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([167,36,19,1,208,0,150,228,238,108,105,97,212,111,13,203,36,153,159,123,167,138,75,64,161,199,116,220,3,68,235,230], [171,200,104,167,93,117,174,86,86,134,101,245,62,198,238,23,39,120,113,85,128,116,157,161,13,117,190,164,254,121,37,139,231,141,157,237,68,116,147,255,146,111,188,106,201,241,86,8,55,167,41,27,83,75,91,170,217,22,219,38,54,103,165,232,251],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([104,32,95,130,168,61,150,97,213,252,255,145,57,252,150,55,140,197,11,61,62,216,3,105,27,76,226,46,227,116,187,114],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([31,144,83,130,110,9,82,192,195,240,251,166,103,187,223,248,243,179,44,156,42,196,2,203,26,13,57,86,155,222,247,77], [229,45,251,7,214,181,160,233,56,1,222,6,163,101,23,150,221,67,147,196,113,77,36,118,207,143,59,138,16,222,102,77],{from: accounts[0]});
  });
});
