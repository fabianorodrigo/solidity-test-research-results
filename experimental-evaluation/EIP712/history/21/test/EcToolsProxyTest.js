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
    let result = await contractProxyEcTools.testrecover([232,179,179,51,118,88,219,208,141,94,146,108,245,40,87,58,43,101,215,81,11,159,118,145,3,54,41,83,30,248,166,11], [128,2],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([136,52,141,202,49,79,205,235,105,41,80,81,16,179,192,37,74,153,124,86,69,141,100,214,157,45,30,82,71,25,140,138], [138,241,53,71,246,36,23,35,133,231,119,103,158,237,15,154,241,3,191,27,22,247,9,170,66,70,158,156,248,241,124,79,30,172,60,222,203,82,134,245,82,164,26,161,250,53,172,39,77,125,106,172,15,156,9,23,192,51,104,110,30,195,191,215,107],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([147,186,236,95,215,30,235,184,164,118,19,148,118,41,197,115,178,184,30,228,241,58,105,222,244,128,109,219,54,60,130,249],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([216,212,214,98,187,33,29,3,138,158,230,76,203,223,216,82,187,1,182,196,116,33,194,217,83,51,207,136,24,71,53,5], [59,4,169,100,247,104,225,105,173,24,25,214,101,135,24,38,0,178,230,35,49,19,159,10,177,224,184,101,190,21,242,69],{from: accounts[0]});
  });
});
