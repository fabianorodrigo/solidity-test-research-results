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
    let result = await contractProxyEcTools.testrecover([123,231,220,167,76,50,137,205,103,251,61,42,8,146,118,30,151,18,166,6,234,34,63,169,44,116,28,81,176,188,188,65], [20,40,13,191,71,217,128,115,20,161,144,37,47,189,43,48,186,96,220,2,86,44,30,189,212,2,115,231,58,100,158,4,155,247,137,14,34,118,115,47,142,104,208,80,132,25,60,30,9,80,20,2,250,20,54,87,33,214,176,125,10,134,232,187,65,41],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([220,60,78,25,165,221,74,255,205,242,227,149,198,41,59,132,59,89,151,210,162,4,140,13,43,109,204,20,215,198,47,53], [206,179,107,35,88,168,193,192,176,248,239,3,188,186,108,230,28,165,64,60,240,174,218,213,40,11,80,44,124,182,200,72,81,143,158,42,144,178,48,210,252,90,27,255,48,114,251,13,24,111,141,167,111,140,133,176,225,155,196,115,22,204,8,12,208],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([248,38,172,113,118,223,203,55,124,143,236,182,111,233,137,73,108,1,152,246,184,249,66,228,21,129,164,106,56,203,126,30],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([165,201,131,196,71,159,198,197,220,251,136,57,109,7,103,228,64,164,200,89,15,52,87,253,216,240,232,98,49,31,103,198], [101,35,78,98,54,225,140,176,249,182,100,221,238,208,58,170,47,130,126,22,209,5,103,98,94,91,56,115,59,246,230,139],{from: accounts[0]});
  });
});
