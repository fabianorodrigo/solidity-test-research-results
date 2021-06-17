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
    let result = await contractProxyEcTools.testrecover([106,169,252,236,55,61,234,249,186,246,54,234,218,96,98,50,252,214,244,62,104,147,237,147,128,50,78,131,209,119,114,189], [144,65,140,117,60,133,139,204,208,77,60,178,1,169,245,141,251,218,227,58,165,0,77,239,145,115,162],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([92,158,177,236,178,211,81,75,0,167,240,35,65,142,221,172,22,197,178,76,111,95,84,171,185,159,89,120,209,123,71,20], [210,179,170,40,133,236,72,172,84,249,179,205,209,52,118,104,145,191,145,9,36,25,188,172,121,51,202,242,181,228,150,238,49,24,39,27,175,36,144,142,133,33,142,27,53,224,24,181,39,107,40,237,18,43,9,123,233,90,83,244,105,210,110,98,161],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([58,60,202,134,28,201,223,93,187,85,72,226,104,129,120,71,45,8,165,190,238,136,183,241,40,196,199,173,173,131,233,41],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([164,29,87,72,145,232,153,210,15,101,227,24,242,34,180,172,59,84,253,57,212,70,8,242,110,170,92,32,150,58,105,205], [197,229,22,65,247,18,7,39,20,199,107,155,186,181,199,143,97,124,207,160,57,172,194,110,129,82,18,43,53,116,249,39],{from: accounts[0]});
  });
});
