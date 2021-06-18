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
    let result = await contractProxyEcTools.testrecover([178,36,254,80,246,48,53,78,114,34,53,19,106,53,167,84,105,56,31,1,219,186,76,62,233,4,138,192,131,178,130,210], [166,33,205,92,23,223,56,0,186,238,190,10,183,237,176,222,131,174,77,53,55,49,89,106,33,112,202],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([201,30,149,120,202,107,97,120,115,5,120,23,58,113,250,158,108,3,41,33,149,76,189,59,206,45,218,184,5,225,213,127], [251,239,92,246,243,52,33,27,200,73,192,35,213,160,64,4,12,83,203,129,125,78,210,85,198,37,57,3,158,193,77,41,66,234,143,67,29,39,8,115,239,239,27,106,70,22,208,71,78,154,184,123,196,56,218,46,233,166,23,189,216,237,167,229,133],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([23,45,22,72,165,10,245,204,215,250,52,38,78,85,170,240,211,15,218,125,132,206,3,51,46,26,27,42,11,71,235,205],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([188,80,245,128,165,116,108,153,151,206,195,211,105,47,96,245,59,51,188,73,163,114,6,90,72,48,95,14,84,34,138,160], [174,86,106,69,63,143,211,159,179,217,248,166,59,112,33,150,177,249,34,84,73,156,21,114,50,51,162,75,58,173,212,104],{from: accounts[0]});
  });
});
