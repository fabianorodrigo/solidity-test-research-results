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
    let result = await contractProxyEcTools.testrecover([168,28,81,187,48,150,105,212,51,165,140,109,237,255,12,145,160,221,6,79,65,231,39,129,117,212,152,144,82,74,236,223], [],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([4,134,180,30,12,117,174,218,25,103,120,219,248,207,29,186,122,168,26,57,231,200,25,166,129,253,176,50,161,103,214,161], [134,172,102,115,43,203,147,3,135,226,99,187,67,93,13,242,104,204,107,101,200,49,106,214,13,196,26,200,142,250,101,123,124,229,163,44,129,95,216,247,107,60,65,132,71,97,139,188,102,203,177,192,14,236,82,234,40,217,120,120,5,109,216,57,227],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([32,198,60,134,240,11,33,229,184,111,70,158,94,218,253,29,205,239,25,169,65,255,33,44,219,73,241,245,12,38,96,186],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([168,85,186,26,19,86,41,119,7,52,75,170,120,24,149,254,111,126,226,89,222,88,55,142,25,90,7,63,18,209,82,42], [62,197,85,248,115,26,85,10,245,25,241,175,158,112,29,153,184,229,32,25,209,144,97,132,147,107,129,105,81,17,183,17],{from: accounts[0]});
  });
});
