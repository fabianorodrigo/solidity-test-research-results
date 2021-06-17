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
    let result = await contractProxyEcTools.testrecover([162,8,126,250,73,154,27,8,9,61,140,253,228,185,232,16,133,212,245,197,83,19,253,123,124,150,247,33,78,60,253,193], [43,69,181,21,147,139,235,250,115,197,83,156,20,42,181,214,50,151,213,81,241,221,30,15,57,43,193,249,64,17,172,190,86,104,194,9,247,49,59,200,94,45,53,255,214,232,70,159,97,216,65,191,18,25,93,165,239,157,71,164,72,32,170,254],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([35,211,27,128,26,133,102,173,210,153,182,54,154,28,57,181,157,86,51,170,251,121,135,81,197,223,72,105,73,232,109,240], [10,4,82,53,49,21,8,244,111,78,193,235,123,240,177,114,205,207,4,10,212,249,144,57,81,249,245,91,183,83,3,52,199,161,30,58,47,34,150,55,79,253,240,40,248,87,153,127,78,71,207,207,23,121,11,192,250,4,84,211,9,162,191,96,172],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([169,113,121,181,114,121,123,224,27,171,51,14,82,86,67,80,101,113,75,73,90,195,149,221,141,105,249,81,247,181,113,24],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([176,203,19,189,20,62,218,220,193,216,220,9,160,180,39,59,245,168,134,188,154,8,146,69,237,118,19,157,183,32,32,131], [65,40,152,241,98,22,138,3,58,116,112,79,155,136,30,126,225,56,133,29,26,176,105,104,48,177,163,10,48,200,72,55],{from: accounts[0]});
  });
});
