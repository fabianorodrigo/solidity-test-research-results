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
    let result = await contractProxyEcTools.testrecover([244,178,146,217,131,152,211,23,9,196,68,157,229,83,2,48,120,161,226,102,253,141,47,238,100,211,236,189,158,85,47,230], [54,5,43,141,89,9,214,210,151,199,206,6,131,211,133,212,250,137,121,23,104,104,60,58,150,51],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([44,239,95,55,104,78,117,72,84,154,101,185,223,150,179,171,111,25,55,74,41,212,228,220,170,13,238,118,173,249,244,76], [110,192,87,158,227,54,193,0,253,249,154,4,113,170,79,251,173,242,96,8,49,81,254,196,245,121,210,16,29,77,101,82,153,46,215,166,199,188,180,227,190,239,203,220,75,49,111,35,84,219,239,52,89,35,97,140,16,23,25,231,227,186,139,141,151],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([143,195,243,175,251,21,221,235,89,218,100,41,255,229,2,226,244,94,131,76,44,211,17,144,239,193,172,215,81,198,241,214],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([45,116,216,26,247,77,149,80,198,76,7,167,14,241,113,195,117,212,23,185,88,238,160,203,11,165,109,128,186,131,237,121], [189,253,112,251,221,225,47,48,187,58,116,114,149,3,185,101,170,62,156,38,52,3,30,29,207,62,95,22,142,181,220,208],{from: accounts[0]});
  });
});
