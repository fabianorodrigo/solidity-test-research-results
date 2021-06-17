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
    let result = await contractProxyEcTools.testrecover([135,224,1,59,62,42,26,133,85,143,140,225,174,159,8,45,244,196,251,241,234,186,79,72,63,141,67,82,182,180,68,138], [175,198,39,171,227,35,95,15,216,30,85,170,186,26,130,65,207,112,83,154,70,134,61,38,72,222,159,36],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([26,79,196,20,106,17,17,57,35,92,40,175,171,77,46,20,166,219,155,69,212,43,135,179,3,218,221,121,64,137,41,36], [34,32,215,11,99,88,193,111,12,104,4,35,128,195,55,74,154,153,126,245,142,148,202,179,220,102,11,99,16,25,207,176,137,62,254,97,184,41,112,100,77,168,100,10,13,7,228,199,219,183,45,61,162,37,251,45,5,139,208,126,83,192,211,21,114],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([131,40,11,75,206,118,125,28,59,174,74,97,125,96,15,31,192,155,68,106,41,149,120,163,39,105,45,18,8,108,192,208],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([70,170,110,8,94,225,93,59,226,47,136,15,58,68,187,11,45,212,89,74,150,244,235,190,14,151,23,188,47,12,155,91], [80,34,62,36,118,146,192,137,168,75,125,77,181,96,215,254,32,131,160,112,61,74,13,242,126,68,225,194,221,31,53,233],{from: accounts[0]});
  });
});
