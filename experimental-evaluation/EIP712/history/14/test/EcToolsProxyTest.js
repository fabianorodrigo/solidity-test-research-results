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
    let result = await contractProxyEcTools.testrecover([64,99,243,229,54,228,114,10,12,16,84,152,191,9,10,177,177,9,182,225,242,81,181,29,40,188,7,112,152,76,8,196], [193,106],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([120,153,22,130,111,177,218,133,58,54,58,83,142,131,142,78,54,185,123,1,185,252,199,151,12,90,44,19,14,59,127,99], [241,39,77,159,1,245,182,228,155,124,72,83,229,244,91,182,90,47,60,70,147,179,109,83,170,215,197,10,161,13,20,199,183,214,131,186,212,2,120,72,196,110,186,208,78,16,126,39,200,87,175,214,66,100,251,103,93,139,167,255,90,136,249,241,158],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([89,244,15,230,130,232,43,121,53,178,56,80,83,113,107,111,250,4,125,217,34,57,149,156,55,203,199,42,79,155,181,0],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([7,123,12,201,140,50,190,138,69,249,46,63,68,3,164,40,36,23,205,215,198,171,59,143,98,11,43,241,251,144,208,9], [40,206,222,42,11,250,49,77,241,6,246,211,205,118,98,13,252,118,213,158,241,184,53,87,16,44,159,191,37,193,85,220],{from: accounts[0]});
  });
});
