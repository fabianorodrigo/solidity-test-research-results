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
    let result = await contractProxyEcTools.testrecover([40,24,165,223,245,240,250,168,119,43,227,116,56,64,180,215,174,183,34,100,218,234,216,17,119,243,117,186,191,41,40,228], [250,215,230,225,50,254,17,13,100,188,14,153,87,243,90,2,133,190,168,65,230,125,42,198,54,227,186,240],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([60,150,217,197,15,116,50,26,28,156,169,2,2,203,212,59,225,96,250,236,41,152,65,116,247,124,231,156,216,0,208,47], [232,105,149,187,104,153,221,131,196,4,19,30,250,154,189,46,75,27,175,120,68,246,174,81,150,228,142,202,137,79,190,234,45,237,19,23,198,228,200,195,163,58,227,166,226,186,18,138,97,152,184,163,207,37,194,89,159,208,119,236,108,68,76,46,243],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([19,228,185,126,50,192,192,246,11,216,39,60,127,207,98,77,76,121,158,231,166,212,143,25,195,194,81,115,190,83,5,90],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([173,196,5,65,217,150,126,60,3,253,139,6,3,90,2,91,36,210,43,76,157,159,253,178,221,211,120,235,170,157,223,51], [44,146,18,192,11,234,37,67,246,160,146,124,206,160,9,193,42,40,224,39,142,22,140,227,42,177,30,63,212,86,103,139],{from: accounts[0]});
  });
});
