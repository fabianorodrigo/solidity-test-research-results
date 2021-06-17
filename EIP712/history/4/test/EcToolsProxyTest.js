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
    let result = await contractProxyEcTools.testrecover([28,93,167,104,113,91,164,1,21,143,11,139,183,45,199,250,228,212,210,151,21,72,233,102,152,94,19,123,87,196,23,101], [135,110,131,112,19,244,117,151,160,114,138,166,236,253,133,112,112,160,213,213,193,188,226,245,59,245,164],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([30,187,247,157,127,9,2,123,119,249,53,183,211,209,46,230,241,175,212,99,65,152,6,128,38,31,49,192,224,25,117,53], [0,206,114,65,220,43,25,190,126,181,209,153,55,174,10,220,98,208,232,95,242,117,137,239,53,162,34,221,149,9,209,124,137,18,191,236,235,164,250,102,164,23,118,80,93,237,119,149,164,246,209,215,97,140,44,105,83,45,142,118,99,241,128,66,145],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([226,78,80,210,140,250,54,152,209,124,173,99,243,209,82,160,41,83,225,181,170,116,224,69,64,15,79,135,237,105,65,106],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([44,47,1,146,213,182,120,178,43,169,151,110,241,7,173,91,36,67,26,247,134,142,205,138,38,202,248,233,146,87,78,200], [129,35,23,174,39,254,126,145,106,1,223,161,237,240,206,11,41,116,162,95,236,106,199,9,192,191,199,51,153,94,202,86],{from: accounts[0]});
  });
});
