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
    let result = await contractProxyEcTools.testrecover([233,150,55,158,57,7,63,92,29,68,210,240,252,144,74,222,130,128,163,207,112,13,133,78,233,40,166,120,21,82,218,114], [142,165,202,158,85,181,112,212,93,198,82,240,173,45,195,246,40,157,225,80,159,141,156,177,227,204,244,66,110],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([188,219,27,214,53,153,107,24,128,13,88,127,193,30,24,87,99,240,38,247,2,213,17,144,152,21,1,0,148,10,99,223], [95,59,102,239,15,71,157,245,251,10,25,176,154,134,239,194,229,190,129,209,236,76,194,77,246,231,158,102,72,226,145,212,250,24,127,161,140,206,116,70,68,77,126,231,240,63,109,235,161,102,17,60,164,115,198,147,50,174,173,213,105,7,91,16,181],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([231,239,251,47,43,84,156,56,19,164,159,138,23,216,78,180,127,63,125,16,177,103,101,219,183,37,183,123,92,179,142,173],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([122,39,58,109,7,122,19,243,251,118,86,128,245,176,208,23,38,215,225,64,171,118,34,23,120,149,254,186,68,135,104,181], [153,184,229,23,236,56,59,197,175,137,15,148,189,224,99,22,22,59,49,170,184,58,178,76,162,239,144,208,79,98,48,154],{from: accounts[0]});
  });
});
