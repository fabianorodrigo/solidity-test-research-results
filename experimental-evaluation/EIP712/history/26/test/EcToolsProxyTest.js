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
    let result = await contractProxyEcTools.testrecover([193,80,129,27,5,86,122,4,204,158,57,179,201,233,208,186,144,14,164,92,120,88,105,150,186,56,249,15,227,33,79,72], [225,74,39,220,160,41,178,132,201,240,242,250,210,179,40,182,178,22,245,58,4,112,240,143,132,222,73,171,58,191,144,14,26,192,4,67,233,181,163,228,35,68,8,6,141,185,15,249,242,233,210,235,31,250,143,70,91,161,210,39,204,239,42,14,19,31,158,206,80,79,64,91,21,101,18,165,19,164,11,106,0,78,218,117,166,185,202,6,226,128,120,179,120,53,236,158,160,187,87],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([224,120,64,197,250,168,88,128,177,80,31,128,62,54,250,255,183,241,48,127,147,143,242,254,127,42,197,75,241,213,17,148], [181,99,144,247,239,213,85,99,6,109,33,30,121,140,186,130,112,149,65,164,62,104,59,252,55,246,8,84,53,192,163,66,69,156,224,41,205,19,132,253,113,236,139,86,205,125,198,73,253,29,98,178,134,79,53,216,125,111,41,167,13,109,109,79,194],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([1,154,18,232,69,114,186,74,95,240,20,179,129,85,130,115,86,47,162,57,102,60,251,76,174,193,164,59,60,67,182,102],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([104,75,249,136,235,166,32,213,117,218,49,41,179,203,30,22,8,166,138,27,170,196,195,144,45,20,2,247,15,215,118,77], [2,69,57,169,98,245,140,9,213,59,150,150,34,105,99,35,214,136,232,111,2,145,178,5,117,218,188,169,172,201,223,6],{from: accounts[0]});
  });
});
