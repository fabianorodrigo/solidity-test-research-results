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
    let result = await contractProxyEcTools.testrecover([48,109,55,162,67,168,1,75,239,30,73,159,40,48,54,114,175,10,147,197,187,112,125,77,100,176,130,87,252,68,153,222], [204,9,164,128,75,178,149,2,25,12,83,176,191,95,2,111,129,173,0,119,77,224,116,94,36,27,70,192,46,0,101,92,157,105,172,97,59,31,167,126,62,21,134,212,41,188,117,58,212,10,19,169,98,90,118,90,251,175,210,183,61,20,11,246],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([2,18,144,76,245,167,169,1,253,97,114,94,18,251,134,141,105,158,92,129,80,204,65,182,49,23,133,94,17,98,22,154], [215,39,85,169,227,53,2,78,163,135,87,211,87,51,128,203,8,58,255,31,122,146,7,25,156,116,228,198,204,172,228,194,23,253,11,117,56,243,244,2,221,139,31,158,254,15,248,80,195,242,220,7,107,56,227,154,133,36,94,136,163,185,36,48,103],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([104,143,235,68,222,7,146,157,150,222,178,29,90,186,24,233,51,34,232,125,9,140,68,150,139,251,70,186,131,197,88,31],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([122,124,164,149,173,142,198,7,50,20,103,183,66,33,98,122,155,197,221,142,123,29,190,188,217,204,95,58,137,159,213,126], [201,46,226,239,172,231,161,242,69,56,58,82,136,80,209,90,127,30,107,171,240,226,223,41,134,219,106,206,85,182,138,247],{from: accounts[0]});
  });
});
