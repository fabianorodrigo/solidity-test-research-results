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
    let result = await contractProxyEcTools.testrecover([8,161,82,72,28,42,140,175,171,21,147,183,252,63,207,133,231,24,47,106,1,250,244,173,32,27,76,226,231,147,222,138], [],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([71,242,182,88,73,50,40,28,79,79,16,154,148,101,60,214,70,129,119,88,13,0,131,175,255,84,237,247,204,143,221,242], [234,99,118,53,229,83,72,31,101,47,149,57,15,148,86,101,148,158,97,175,42,51,153,65,3,124,137,158,238,85,67,97,230,229,234,202,215,160,78,210,201,164,72,252,202,206,72,197,154,31,5,152,171,139,199,248,248,229,167,13,101,204,185,95,17],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([20,219,2,234,101,175,66,188,86,240,92,153,177,173,121,219,36,3,8,66,81,96,87,27,109,219,113,164,146,130,41,56],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([200,37,244,8,188,60,18,158,106,153,215,63,192,63,14,141,59,247,165,156,63,17,6,218,97,26,11,128,224,12,47,191], [225,191,80,44,62,131,1,119,201,65,77,72,166,247,75,219,158,133,141,16,15,202,7,148,81,36,87,248,28,30,251,63],{from: accounts[0]});
  });
});
