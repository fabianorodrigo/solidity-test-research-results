const truffleAssert = require('truffle-assertions');
const EcTools = artifacts.require("EcTools");
const ExternalContract = artifacts.require("ExternalContract");
const MetaTxProxy = artifacts.require("MetaTxProxy");
const ProxyEcTools = artifacts.require("ProxyEcTools");

contract("contractProxyEcTools",(accounts)=>{
    let contractProxyEcTools = null;
  let trace = false;
  let contractEcTools = null;
  let contractExternalContract = null;
  let contractMetaTxProxy = null;
  beforeEach(async () => {
    contractEcTools = await EcTools.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: EcTools.new({from: accounts[0]}');
    contractExternalContract = await ExternalContract.new({from: accounts[0]});
    if(trace) console.log('SUCESSO: ExternalContract.new({from: accounts[0]}');
    MetaTxProxy.link("EcTools",contractEcTools.address);
    contractMetaTxProxy = await MetaTxProxy.new({from:accounts[0]});
    if(trace) console.log('SUCESSO: MetaTxProxy.new({from:accounts[0]}');
      ProxyEcTools.link('EcTools', contractEcTools.address);
    contractProxyEcTools = await ProxyEcTools.new({ from: accounts[0] });
});
  
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length!=65', async () => {
    let result = await contractProxyEcTools.testrecover([118,225,130,185,50,85,129,115,211,169,199,249,61,159,246,92,106,200,164,252,221,100,35,39,117,123,189,231,9,65,67,12], [],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([156,252,159,73,210,206,144,122,19,101,243,81,76,164,218,81,21,144,143,235,103,175,134,105,186,32,105,176,82,112,57,238], [109,34,244,139,108,198,121,148,194,172,227,183,243,131,180,155,121,112,190,186,18,150,69,218,99,47,245,3,16,246,6,73,235,194,186,20,154,208,78,221,124,82,9,75,52,135,138,163,202,58,128,76,230,235,250,128,13,247,46,197,152,211,155,131,188],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([198,247,159,149,101,49,227,125,29,119,153,250,111,50,182,167,175,199,114,187,109,212,159,132,4,140,201,101,184,246,235,239],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([118,97,35,123,170,141,136,134,142,161,202,103,95,108,239,62,135,210,102,124,129,205,217,172,27,40,70,31,187,186,106,93], [163,212,158,255,249,247,216,197,80,92,173,36,161,174,2,231,125,169,171,231,27,6,107,128,200,131,146,6,27,88,78,31],{from: accounts[0]});
  });
});
