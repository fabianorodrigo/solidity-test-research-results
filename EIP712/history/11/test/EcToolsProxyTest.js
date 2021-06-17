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
    let result = await contractProxyEcTools.testrecover([237,231,127,142,107,43,131,148,69,225,40,4,178,85,5,160,12,14,90,224,21,82,190,135,201,215,144,65,252,244,122,161], [111,22,120,81,252,169,35,24,251,103,19,102,187,244,80,137,115,41,115,227,142,29,55,119,151,209,134,206,27,208,136,148,46,99,147,77,168,24,221,179,100,218,52,111,197,242,116,251,7,128,114,3,191,29,222,119,93,113,161,158,50,70,164,200],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([170,231,27,4,143,166,161,227,94,37,46,191,22,207,100,233,212,10,120,111,213,207,55,145,142,159,238,134,207,38,241,121], [230,114,105,167,135,124,107,234,104,3,167,138,215,144,118,69,134,32,114,26,63,237,64,254,216,227,193,103,43,75,244,173,181,128,139,24,194,235,212,249,212,137,195,132,53,16,153,71,17,70,174,96,62,100,168,187,136,125,206,206,46,160,69,144,242],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([128,221,40,22,75,80,48,210,42,40,204,36,79,1,220,38,119,100,207,200,100,243,251,30,66,127,204,118,213,92,87,110],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([96,34,244,112,86,184,73,210,220,243,194,127,149,241,82,155,158,229,163,9,55,204,241,174,184,29,6,239,194,88,189,23], [89,138,11,152,192,144,240,160,243,16,194,102,166,22,233,103,9,150,160,42,129,137,172,191,34,114,150,132,4,10,7,54],{from: accounts[0]});
  });
});
