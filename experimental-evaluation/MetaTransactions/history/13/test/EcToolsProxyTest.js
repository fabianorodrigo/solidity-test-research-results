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
    let result = await contractProxyEcTools.testrecover([136,35,207,38,100,202,100,150,77,222,10,77,49,24,60,35,90,114,110,105,105,130,249,2,12,109,3,52,68,103,64,130], [68,18,165,112],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([111,20,169,241,69,7,212,16,45,52,213,177,40,222,45,166,185,108,117,96,235,30,64,248,110,112,46,96,123,247,203,232], [118,89,196,55,201,213,213,125,215,54,185,195,111,162,25,250,52,40,242,190,137,5,40,247,4,58,54,55,70,133,160,137,45,236,86,241,166,73,224,190,121,205,249,212,210,106,99,65,120,146,96,215,130,172,189,113,210,20,220,127,52,102,252,188,146],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([249,7,71,0,197,30,148,83,7,57,253,241,17,254,140,87,73,211,115,110,11,76,209,15,132,0,44,156,111,200,93,49],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([59,9,178,134,70,64,81,71,27,101,189,28,35,41,83,25,106,234,160,223,77,248,88,184,29,120,243,207,236,199,151,44], [135,84,70,37,243,146,171,51,45,24,213,29,63,0,112,252,185,249,40,179,36,76,155,229,165,158,5,179,130,9,25,122],{from: accounts[0]});
  });
});
