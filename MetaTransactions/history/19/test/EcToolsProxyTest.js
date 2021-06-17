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
    let result = await contractProxyEcTools.testrecover([144,22,160,50,6,196,218,206,51,249,177,220,132,0,2,114,234,109,132,82,102,158,1,88,151,44,182,10,254,208,88,54], [107,155,213,203,129,66,21,244,182,17,7,192,4,220,38,147,15,18,211,179,108,105,66,22,133,11],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([80,235,181,201,205,110,248,70,186,43,31,8,108,230,74,29,58,14,162,188,42,34,196,92,177,231,189,77,37,110,1,230], [53,139,33,167,2,149,221,8,177,135,98,223,169,7,106,16,1,206,94,54,113,183,4,102,176,112,140,35,39,101,241,43,150,180,209,181,181,39,13,12,114,9,59,191,38,194,172,15,232,192,145,113,25,173,49,223,152,94,118,16,152,54,89,84,146],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([252,218,251,132,101,242,81,207,133,6,149,141,111,72,16,238,17,224,201,157,25,221,228,141,31,99,174,120,165,242,233,20],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([13,139,71,235,72,168,98,179,203,132,85,79,163,215,59,194,214,248,134,136,170,203,67,194,191,137,135,175,255,246,75,237], [80,131,193,246,73,61,230,156,126,129,62,228,122,173,203,90,133,120,215,238,102,232,15,122,135,170,109,72,10,191,81,236],{from: accounts[0]});
  });
});
