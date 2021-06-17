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
    let result = await contractProxyEcTools.testrecover([192,181,183,145,162,162,6,15,74,114,12,139,167,8,29,197,233,166,138,207,134,62,51,89,175,218,164,124,165,246,93,130], [90,129],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([207,172,244,151,101,202,59,88,147,69,250,10,191,21,185,154,113,63,233,107,26,189,18,66,184,219,20,152,220,213,87,125], [2,111,38,144,204,222,148,190,69,94,89,100,184,8,190,211,170,78,44,118,194,169,106,190,161,166,120,247,68,66,46,134,4,151,232,104,69,143,36,80,146,126,10,247,147,122,59,175,100,141,132,194,5,217,240,195,137,198,163,173,224,138,68,128,30],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([123,135,133,22,141,165,116,164,202,20,189,118,35,161,223,158,150,87,16,193,65,60,70,212,141,28,241,155,15,235,12,230],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([243,72,25,210,206,242,235,182,97,30,66,191,231,16,216,206,50,158,226,234,216,75,244,170,179,81,248,147,141,118,243,201], [241,6,156,246,72,252,148,232,34,211,204,114,20,206,122,64,244,221,214,12,131,120,155,142,126,54,44,52,24,208,41,204],{from: accounts[0]});
  });
});
