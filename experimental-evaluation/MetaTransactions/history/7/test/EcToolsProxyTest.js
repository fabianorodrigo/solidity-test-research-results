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
    let result = await contractProxyEcTools.testrecover([116,55,115,122,233,210,234,34,161,59,179,192,216,106,163,50,136,1,230,233,49,87,190,241,186,149,14,229,206,179,55,84], [87,93,60,184],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([175,217,45,127,205,214,214,140,110,227,175,236,112,62,243,224,28,106,244,43,211,7,238,104,197,30,78,32,176,48,105,159], [186,201,188,170,124,215,108,165,33,69,168,152,199,43,58,34,12,163,241,245,173,76,196,3,248,11,181,16,254,208,39,22,250,242,124,201,62,24,131,145,53,82,20,162,153,196,27,226,225,183,75,88,148,159,91,61,139,17,190,115,126,192,197,182,142],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([206,255,16,114,151,67,29,11,212,205,24,145,220,28,126,240,170,21,196,65,146,214,201,64,224,250,165,6,165,204,181,74],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([233,131,132,46,32,232,189,159,1,28,18,9,43,220,85,179,183,240,66,225,168,115,142,151,178,184,146,184,249,33,87,229], [158,160,125,73,89,40,174,25,248,47,121,115,236,132,22,227,162,135,215,189,14,46,10,68,146,43,159,44,162,120,166,252],{from: accounts[0]});
  });
});
