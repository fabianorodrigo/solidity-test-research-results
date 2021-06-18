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
    let result = await contractProxyEcTools.testrecover([48,231,6,185,163,152,216,231,95,254,164,51,39,148,77,94,168,2,18,131,89,146,63,253,176,46,249,154,128,218,20,57], [61],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([93,65,118,201,126,108,26,155,83,119,102,59,125,115,74,133,109,80,230,39,197,108,86,189,164,246,189,156,27,162,191,1], [231,212,241,61,24,129,8,199,6,100,241,148,240,52,160,18,242,234,73,0,103,107,220,35,156,58,255,216,80,47,233,99,111,217,13,28,17,183,70,22,190,42,109,158,143,139,143,21,237,166,255,65,239,0,187,27,253,216,49,196,102,177,254,201,26],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([38,198,236,208,64,236,68,218,89,133,219,253,75,253,201,15,6,228,24,235,116,96,207,156,192,18,178,216,88,221,37,3],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([27,23,207,203,113,207,212,233,121,187,88,18,121,161,200,232,47,98,205,82,232,183,59,236,59,238,185,127,85,245,99,202], [107,8,87,137,29,247,7,20,152,167,36,103,232,216,22,46,184,197,81,38,80,182,181,243,71,254,96,202,148,122,113,89],{from: accounts[0]});
  });
});
