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
    let result = await contractProxyEcTools.testrecover([80,148,129,151,230,45,198,125,93,100,188,132,52,119,255,180,51,229,32,185,109,154,218,87,1,81,81,198,237,60,87,81], [67,143,210,197,113,67,95,16,116,132,219,95,17,211,88,156,130,76,107,208,116,16,170,178,82,253,65,32,90,236,102,67,76,33,20,247,194,239,10,14,117,62,101,106,222,132,168,224,186,237,152,9,171,145,106,113,225,122,26,111,40,209,84,209],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([157,237,128,31,38,171,116,216,135,58,81,88,123,193,109,162,107,150,252,227,77,144,38,51,80,205,197,96,76,30,13,210], [189,163,126,222,210,72,159,174,85,21,58,84,66,172,69,225,246,234,159,107,108,101,66,230,247,216,172,247,188,61,254,12,133,159,2,53,211,140,124,115,96,123,138,219,182,113,106,38,228,148,26,25,197,19,91,87,147,26,107,244,93,152,200,82,215],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([133,99,204,65,69,87,86,132,197,63,59,166,232,233,225,72,16,6,128,90,251,155,35,154,31,79,108,173,213,9,199,5],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([85,255,136,3,174,179,137,19,116,137,153,227,128,55,140,15,13,147,121,46,64,191,81,196,126,238,90,229,151,202,146,242], [50,205,255,201,37,220,101,235,40,89,226,113,139,182,164,103,51,12,10,21,217,253,117,33,56,252,58,43,86,59,188,27],{from: accounts[0]});
  });
});
