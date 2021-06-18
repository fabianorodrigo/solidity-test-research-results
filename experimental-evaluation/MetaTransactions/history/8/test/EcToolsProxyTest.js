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
    let result = await contractProxyEcTools.testrecover([100,206,171,163,80,8,225,218,252,13,213,159,25,109,6,112,26,72,121,186,213,144,218,88,130,245,45,148,2,101,94,67], [20,248],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([146,94,209,103,229,34,76,118,234,182,75,170,56,253,20,175,226,101,236,205,200,249,146,133,31,244,35,161,6,34,154,85], [75,100,240,236,119,46,64,229,177,168,184,86,184,70,102,46,121,53,55,166,98,173,137,243,63,18,221,159,189,75,158,60,228,218,44,152,18,68,231,196,104,91,142,231,88,48,32,134,131,252,74,230,64,107,231,121,208,237,72,215,25,8,35,189,251],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([148,243,6,41,176,217,170,243,1,83,151,156,61,65,225,173,57,198,183,128,164,22,30,196,140,185,32,62,99,188,36,237],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([184,201,232,240,22,54,28,40,8,179,70,204,172,72,185,3,113,192,134,72,65,118,226,228,202,20,71,240,255,113,153,200], [214,27,66,0,118,214,82,26,179,243,46,104,17,174,231,58,210,65,232,84,7,208,169,34,41,157,173,216,160,176,16,185],{from: accounts[0]});
  });
});
