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
    let result = await contractProxyEcTools.testrecover([75,25,224,63,31,32,243,19,123,26,122,218,204,184,242,179,18,137,144,33,148,59,232,133,68,69,139,122,188,155,19,120], [61,67,26,37,149,21,190,61,129,125,97,241,63,61,16,164,109,44,21,232,215,64,252,166,114,3,83,137,239,146,64,74,229,199,154,208,243,58,174,49,186,3,56,249,164,253,193,138,228,154,42,36,40,212,140,132,198,238,248,209,173,64,165,47,114,28,239,252,215,18,172,121,37,99,57,104,235,123,105,165,10,8,48,234,19,124,49,23,156,197,121,113,17,200,78,162,161],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([54,35,177,56,62,15,71,78,225,210,202,160,157,198,227,194,190,201,58,194,111,44,239,207,92,49,143,85,113,63,23,144], [7,72,42,34,115,145,121,49,27,59,148,65,71,216,22,253,226,114,23,197,27,54,114,133,197,234,10,230,206,27,143,217,187,150,46,2,110,166,235,204,3,122,242,219,23,168,49,41,72,212,146,160,208,140,196,185,230,251,103,67,41,154,142,92,133],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([230,45,236,99,175,54,98,160,168,5,39,175,235,166,149,118,159,54,248,218,254,168,236,91,231,186,150,175,103,123,187,136],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([255,235,208,183,5,72,47,35,170,169,210,134,150,40,15,68,107,200,19,200,207,192,251,185,165,236,20,190,158,185,253,226], [251,168,211,63,10,138,250,101,158,16,118,116,226,22,130,36,123,72,16,239,252,208,132,240,206,109,19,124,154,149,45,116],{from: accounts[0]});
  });
});
