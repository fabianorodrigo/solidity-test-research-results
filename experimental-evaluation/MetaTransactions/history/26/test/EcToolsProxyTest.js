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
    let result = await contractProxyEcTools.testrecover([23,222,232,63,145,204,205,105,47,202,168,173,77,21,17,232,15,235,18,157,85,126,252,195,225,147,63,0,28,49,21,180], [181,0,176,176,150,254,199,107,78,247,75,10,189,116,42,103,210,247,52,67,0,1,233,213,64,3,88,30,201,240,203,55,4,200,137,187,119,239,122,210,50,155,23,70,226,132,55,218,101,145,204,74,62,132,139,22,226,227,36,226,136,163,251,189,59,65,91,43,129,174,122,9,242,218,61,201,25,222,19,226,47,175,179,123,209,236,119,165,209,204,155,172,71,200,16,191],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([218,233,187,96,134,96,163,104,71,208,66,94,114,77,89,230,158,12,104,199,11,44,155,227,132,239,118,129,249,207,205,88], [222,56,186,68,93,157,218,251,218,223,192,237,29,60,184,123,139,177,241,79,189,167,251,18,7,167,125,176,165,26,109,64,101,150,217,231,36,195,169,90,1,147,49,140,210,23,49,11,236,42,31,188,166,3,239,78,186,188,129,11,97,113,133,101,133],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([254,108,196,47,99,225,38,61,93,170,45,246,14,114,196,89,84,213,69,60,24,174,236,130,167,142,215,194,7,93,221,145],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([52,81,33,255,26,137,249,41,32,244,126,223,62,178,7,217,224,108,184,177,207,11,52,47,0,171,46,4,45,226,99,247], [100,55,242,206,53,100,78,176,103,6,232,111,96,44,96,8,69,214,160,74,193,183,188,137,26,207,100,95,10,58,54,162],{from: accounts[0]});
  });
});
