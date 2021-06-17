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
    let result = await contractProxyEcTools.testrecover([97,11,141,7,32,42,62,79,130,41,131,18,233,232,116,78,68,109,35,150,28,16,212,209,47,29,65,53,57,110,79,242], [141,218,4,163,67,189,133,235,2,137,205,126,212,73,165,250,246,53,59,159,113,185,153,181,181,154,203,24,89,45,10,188,145,124,232,13,136,217,143,215,239,93,68,136,194,251,223,178,49,178,162,101,8,43,217,182,37,120,25,17,196,244,86,10],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([240,223,123,212,194,164,249,124,252,109,246,192,7,202,163,167,73,198,3,206,167,160,51,239,52,220,247,48,238,60,54,65], [211,132,163,89,123,174,179,241,194,163,144,123,177,20,92,196,4,13,106,30,32,85,220,161,91,72,19,251,138,231,194,6,178,193,5,43,161,224,5,31,20,189,164,106,180,151,109,227,38,238,132,144,105,249,44,189,79,87,157,150,226,66,52,225,54],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([96,214,124,131,196,145,133,179,105,15,166,143,44,80,88,13,22,182,144,216,143,123,31,19,112,10,175,255,87,89,167,219],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([237,135,135,156,43,132,103,11,201,42,188,242,146,236,9,237,208,174,130,196,72,46,50,91,153,133,237,59,123,168,88,162], [185,233,58,58,146,251,113,17,247,27,1,41,173,59,198,212,12,23,200,22,185,100,17,49,151,66,57,135,108,48,136,161],{from: accounts[0]});
  });
});
