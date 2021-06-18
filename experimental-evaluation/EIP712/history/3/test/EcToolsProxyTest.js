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
    let result = await contractProxyEcTools.testrecover([134,95,221,35,180,98,32,143,18,2,69,28,148,37,123,254,139,53,21,0,139,227,136,45,43,165,184,47,36,163,167,27], [118,134,90,82,21,43,69,19,135,181,59,245,27,166,194,186,142,198,18,138,222,197,109,110,241,134,2,83,165,130,33,193,121,92,155,209,131,230,229,25,24,119,78,254,159,161,51,92,226,48,177,225,122,247,24,0,228,128,206,66,157,152,214,139,207,133,194,177,133,111,238,57,248,193,67,102,44,183,36,135,212,136,202,116,100,204,243,71,195,72,210,210,234,42,18,138,22,7,152],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([135,60,242,141,193,196,40,169,140,179,133,53,120,248,50,157,98,1,145,83,232,6,141,35,68,190,156,57,73,157,42,130], [94,216,135,75,130,81,248,196,11,50,65,127,221,92,105,232,151,104,84,157,239,152,223,82,82,80,111,189,76,135,35,218,89,70,167,169,155,108,30,213,100,65,193,72,37,143,200,218,114,210,79,94,205,170,12,150,54,73,158,96,69,192,246,162,239],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([241,241,165,247,176,62,41,161,180,66,124,177,213,75,237,92,129,11,30,172,13,61,148,219,70,66,238,20,29,42,243,191],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([58,207,20,203,78,91,40,87,45,198,127,45,136,31,74,122,190,111,222,18,235,195,233,166,236,50,234,78,19,54,15,111], [246,75,232,146,210,132,151,57,152,235,79,163,40,237,49,209,99,213,226,185,205,103,31,65,224,247,8,95,35,145,79,75],{from: accounts[0]});
  });
});
