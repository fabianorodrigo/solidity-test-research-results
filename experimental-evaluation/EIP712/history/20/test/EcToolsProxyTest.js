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
    let result = await contractProxyEcTools.testrecover([182,210,52,169,251,155,227,51,245,162,98,23,213,42,12,122,81,240,225,30,166,142,76,164,62,227,54,120,163,121,61,73], [114,191],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([255,184,228,179,228,63,128,166,163,209,250,229,224,229,206,204,129,13,251,149,206,157,48,224,23,157,34,101,148,146,243,192], [57,64,182,42,109,242,42,8,232,147,228,105,252,208,194,65,183,120,138,154,41,246,2,96,63,229,94,112,60,221,233,237,161,151,138,110,116,155,38,148,200,139,12,105,205,177,45,94,10,57,182,152,235,144,25,228,66,98,157,191,128,139,50,127,116],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([47,114,255,121,72,71,95,122,3,68,116,99,136,7,45,187,90,175,107,71,106,209,144,218,159,233,116,216,27,172,215,104],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([246,38,69,104,38,225,18,56,48,229,197,242,68,213,32,58,42,132,40,170,12,67,169,152,203,2,75,119,101,40,114,197], [193,250,204,206,242,181,210,249,54,113,126,107,92,0,221,230,48,101,161,78,27,188,18,11,97,199,129,104,237,182,230,146],{from: accounts[0]});
  });
});
