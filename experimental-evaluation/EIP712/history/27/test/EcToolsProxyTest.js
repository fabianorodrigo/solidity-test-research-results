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
    let result = await contractProxyEcTools.testrecover([57,91,233,215,156,46,218,153,253,57,186,226,240,196,252,34,22,137,148,226,145,109,102,249,129,101,80,47,221,171,22,175], [],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([148,26,239,171,255,114,10,7,148,79,54,4,15,158,255,156,1,202,132,16,194,166,133,175,146,122,92,55,83,127,64,38], [204,118,160,115,199,121,104,139,41,128,235,224,85,138,100,31,23,38,158,47,37,212,228,190,1,201,171,228,135,161,250,110,215,206,94,159,238,78,211,203,39,9,99,168,73,125,233,67,134,60,33,104,139,72,192,158,151,143,20,4,163,110,144,113,118],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([41,96,215,70,9,76,47,231,83,6,100,185,211,202,155,163,57,198,254,191,104,202,152,80,139,66,249,69,196,100,115,117],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([192,51,151,54,116,147,236,251,191,216,249,170,178,2,174,227,153,83,152,88,7,59,21,77,8,251,187,195,96,47,67,161], [166,4,75,126,76,185,122,123,152,27,51,171,6,205,63,70,33,106,57,184,240,62,130,183,53,130,217,173,31,232,174,188],{from: accounts[0]});
  });
});
