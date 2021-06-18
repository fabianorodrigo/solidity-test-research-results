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
    let result = await contractProxyEcTools.testrecover([204,119,113,135,222,66,20,254,79,32,18,70,26,88,238,202,22,182,190,80,101,250,105,178,32,238,210,68,61,26,230,105], [190,146,141],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([135,47,3,254,173,96,203,35,68,74,126,145,119,221,88,174,113,193,156,67,65,248,126,135,74,225,20,197,73,142,104,110], [26,35,6,163,92,25,101,135,137,43,68,70,70,48,37,91,89,161,40,167,84,184,199,21,110,135,32,45,177,129,7,24,14,227,135,124,237,193,41,171,236,74,179,102,253,144,126,165,30,49,60,107,128,25,188,124,194,173,164,168,18,104,214,223,81],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([31,161,227,70,132,23,34,204,124,98,223,141,199,1,239,26,56,51,110,144,162,63,188,34,103,51,199,28,214,65,170,123],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([146,187,70,166,113,217,199,4,106,46,65,63,250,43,25,79,132,112,195,127,66,163,200,143,23,22,211,64,203,144,44,97], [216,129,132,185,226,105,188,141,200,75,38,132,99,91,66,48,207,5,96,151,41,49,241,28,200,242,216,230,75,69,12,144],{from: accounts[0]});
  });
});
