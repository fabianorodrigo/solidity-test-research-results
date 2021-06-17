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
    let result = await contractProxyEcTools.testrecover([44,47,119,132,32,29,49,35,40,241,36,202,245,23,23,102,212,141,156,59,151,48,160,249,144,14,206,176,75,108,32,203], [135,47,14,65,213,47,58,147,183,157,149,49,255,204,61,7,185,179,170,139,3,188,223,165,225,65,20,106,10],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([124,176,223,191,206,36,218,60,186,227,192,204,38,74,119,35,161,19,100,225,169,9,173,100,249,155,211,128,191,30,103,218], [24,215,216,103,205,248,179,152,226,160,42,67,160,99,224,38,62,235,212,189,129,239,159,207,171,174,176,37,31,31,70,84,204,22,248,84,33,150,131,200,205,153,28,239,101,88,216,12,244,6,141,66,104,152,2,213,100,84,115,33,177,172,183,11,209],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([234,87,186,214,188,169,64,101,71,132,54,65,170,38,192,124,164,0,4,249,213,239,152,42,155,181,194,224,77,72,125,242],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([233,219,15,99,154,158,77,141,87,243,99,174,138,47,24,110,74,13,151,49,213,117,249,24,249,44,124,106,34,99,85,40], [96,192,136,76,209,29,135,26,158,109,207,209,134,51,216,68,67,132,15,207,44,88,93,237,47,100,227,216,148,9,48,243],{from: accounts[0]});
  });
});
