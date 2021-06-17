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
    let result = await contractProxyEcTools.testrecover([125,195,8,183,72,130,26,57,226,216,241,177,111,143,176,148,187,152,27,86,1,9,159,55,32,203,64,235,205,235,30,190], [17,220,46,191,148,93,247,231,132,103,105,226,238,133,88,66,49,61,31,221,211,211,116,117,144,198,205],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([41,183,206,113,95,198,223,238,56,135,59,104,199,178,86,205,127,194,8,74,17,193,169,251,234,173,65,17,187,100,243,57], [47,74,147,135,102,84,74,157,245,157,132,182,165,159,54,80,202,95,172,154,239,45,44,243,110,176,4,245,20,10,64,56,129,137,196,38,85,27,69,146,247,239,203,199,191,203,70,157,32,175,181,62,125,39,51,164,66,5,163,146,17,155,137,220,88],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([115,142,10,119,123,26,140,193,111,244,55,163,234,226,155,18,195,163,90,143,105,17,236,73,202,79,46,225,44,4,200,247],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([29,234,175,135,95,27,157,66,135,217,210,7,34,212,21,13,4,194,164,176,15,251,99,169,167,134,44,123,83,54,190,110], [144,19,163,101,0,77,24,189,185,126,183,40,213,79,247,198,100,43,142,35,122,106,206,173,157,108,24,169,135,166,217,196],{from: accounts[0]});
  });
});
