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
    let result = await contractProxyEcTools.testrecover([90,177,218,175,188,117,79,163,207,200,20,215,222,226,109,156,8,155,55,249,198,140,50,219,136,151,227,86,152,219,99,170], [228,169,45,55,27,237,64,42,22,125,136,10,167,111,164,21,241,229,103,209,13,165,140,135,76,183,180,152,218],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([184,21,72,46,122,116,18,225,219,194,95,182,186,24,253,132,86,35,121,38,24,227,96,239,58,77,157,14,22,60,109,160], [111,220,162,170,185,79,60,81,36,168,128,3,27,30,174,156,190,181,136,201,56,33,62,93,200,66,24,25,82,251,9,75,67,45,230,86,86,167,13,20,110,230,131,33,22,88,124,66,212,113,146,20,130,149,78,6,46,33,115,179,239,126,105,223,33],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([34,190,109,101,13,42,117,251,32,197,94,20,50,91,209,5,53,69,83,255,105,10,201,34,75,157,7,44,76,124,1,171],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([247,96,165,161,129,103,244,221,166,190,246,202,1,238,239,240,119,253,154,73,166,3,124,79,177,196,119,253,39,229,223,56], [93,34,153,255,242,228,250,184,118,94,39,79,89,181,200,131,0,142,229,78,73,185,145,111,63,8,167,46,211,93,39,172],{from: accounts[0]});
  });
});
