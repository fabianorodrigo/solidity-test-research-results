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
    let result = await contractProxyEcTools.testrecover([99,109,52,102,16,149,247,121,8,3,23,220,151,241,74,129,142,42,134,122,66,77,220,28,247,166,224,255,212,33,68,232], [151,140,131,207,210,49,225,205,66,75,43,108,163,92,184,61,197,8,113,169,218,197,142,65,210,15,56,104],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([161,145,35,98,134,60,153,79,125,196,96,43,49,219,195,99,99,108,217,11,15,142,212,5,6,135,149,31,141,243,9,132], [169,209,22,238,253,10,228,81,28,252,57,108,53,250,88,80,198,190,254,33,103,216,170,79,13,130,233,249,45,3,27,5,108,36,22,182,173,67,156,21,46,85,240,14,25,76,112,120,207,245,1,118,53,127,125,214,52,235,49,216,246,50,24,223,17],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([153,181,206,142,28,211,23,205,41,160,190,2,156,148,192,181,245,165,1,26,0,93,1,181,141,64,132,243,31,74,240,190],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([176,17,80,209,243,135,97,109,57,87,74,202,208,181,59,215,229,130,84,67,55,244,151,152,112,198,201,44,194,229,250,0], [238,251,149,174,139,81,171,213,23,63,153,16,187,163,43,210,234,118,167,166,191,16,176,21,85,27,0,103,136,123,245,185],{from: accounts[0]});
  });
});
