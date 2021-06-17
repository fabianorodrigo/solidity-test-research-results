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
    let result = await contractProxyEcTools.testrecover([39,135,11,111,136,82,198,110,205,231,153,193,174,131,94,23,248,36,196,241,129,71,11,1,3,190,114,29,15,194,211,144], [241,93,73,89,209,63,141,200,61,157,197,133,207,93,209,162,233,99,237,96,151,104,132,51,190,83,121,14,222,237,145,151,170,109,16,202,224,181,21,131,130,154,201,23,5,114,78,142,206,191,30,4,84,190,66,191,159,87,48,171,3,73,52,150,72,242,243,46,199,139,143,167,253,54,164,228,96,106,204,110,51,194,209,243,93,142,175,60,128,11,163,139,244,100,210,58,95,144,140,236,89],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([146,202,42,202,234,192,30,125,190,17,223,5,211,130,26,211,191,196,72,233,141,203,159,175,141,97,197,128,187,38,220,86], [86,89,25,49,184,69,220,64,137,138,183,20,56,56,102,188,198,21,152,118,41,212,214,185,32,202,209,16,9,228,73,148,134,236,41,145,174,232,179,54,237,22,235,235,61,17,203,134,67,254,122,159,48,81,227,14,82,38,182,23,75,17,13,210,67],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([158,73,171,119,101,208,53,130,120,84,20,57,75,106,11,121,51,30,28,38,180,211,98,0,39,228,1,217,191,121,164,57],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([195,155,88,0,226,85,134,117,27,61,237,181,106,246,21,183,52,140,236,133,94,229,47,53,166,168,9,76,179,116,71,62], [165,137,215,181,132,185,80,213,53,43,145,192,167,12,185,60,194,67,100,4,12,92,96,34,72,217,175,65,100,14,204,76],{from: accounts[0]});
  });
});
