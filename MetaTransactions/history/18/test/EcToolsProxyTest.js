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
    let result = await contractProxyEcTools.testrecover([230,113,116,30,197,39,71,20,176,114,228,26,228,119,1,6,119,109,150,63,129,253,226,80,56,120,192,138,70,64,252,150], [109,97,102,186],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([181,247,127,166,253,208,109,56,204,93,192,95,214,61,13,140,107,177,72,201,192,76,188,133,157,121,161,190,36,181,185,93], [99,5,132,178,78,181,24,94,90,161,104,80,247,155,159,70,248,45,61,29,68,57,118,30,45,60,167,92,161,230,60,116,208,220,105,214,82,57,24,238,24,21,112,166,204,126,218,11,26,197,165,187,225,232,134,247,67,6,95,171,79,227,13,171,205],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([101,101,111,7,170,202,78,111,213,40,246,170,170,149,215,224,23,133,79,87,87,147,186,140,123,68,117,142,166,138,231,215],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([165,248,111,168,193,160,61,232,253,223,251,45,107,219,29,230,207,227,152,235,40,183,158,219,147,17,89,117,24,131,189,244], [109,81,73,4,84,129,78,120,89,249,177,63,226,126,126,207,167,234,26,201,40,202,67,223,168,234,250,193,115,90,149,203],{from: accounts[0]});
  });
});
