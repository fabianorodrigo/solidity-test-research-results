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
    let result = await contractProxyEcTools.testrecover([212,87,101,34,231,136,170,69,22,164,102,55,131,184,75,141,41,126,59,200,71,210,191,208,149,177,226,173,176,242,230,223], [145,226,242,55,73,159,51,171,136,92,77,54,90,135,219,34,20,86,241,27,105,66,235,81,211,132,121,10],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([96,195,74,238,10,56,83,133,131,153,121,172,144,226,17,188,112,89,8,193,15,36,141,23,15,119,125,131,106,238,148,229], [62,26,119,102,40,110,63,72,5,141,83,231,59,87,9,118,162,127,221,58,102,182,58,225,131,118,121,121,237,68,142,243,243,49,125,254,172,12,210,166,25,214,118,184,242,93,92,140,26,67,112,210,121,105,15,142,71,41,44,88,83,43,219,194,223],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([17,176,30,98,141,65,211,125,131,209,165,78,115,41,248,177,241,72,68,72,201,199,203,238,5,164,34,97,248,239,64,141],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([175,79,54,38,241,23,131,150,118,212,137,118,54,74,153,126,27,107,147,163,116,222,19,1,184,27,21,48,249,98,103,78], [154,234,1,78,34,97,111,134,112,24,66,186,197,46,141,117,123,52,150,116,0,183,218,48,79,34,196,204,253,206,98,198],{from: accounts[0]});
  });
});
