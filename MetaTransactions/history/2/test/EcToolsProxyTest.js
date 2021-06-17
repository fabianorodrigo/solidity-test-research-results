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
    let result = await contractProxyEcTools.testrecover([208,96,64,228,28,20,206,8,167,236,37,12,51,94,151,11,77,250,32,129,118,147,18,82,88,151,236,217,135,227,212,134], [170,12,75,14,70,151,77,147,73,28,161,218,50,26,245,21,106,85,191,104,22,108,166,225,52,45,128,237],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([59,14,164,251,55,235,156,97,210,68,209,101,109,122,18,239,150,233,14,3,221,197,46,95,56,21,217,231,100,2,4,194], [17,173,243,157,112,215,154,132,149,144,56,70,102,68,11,0,49,68,62,103,219,232,108,75,75,243,213,142,224,74,157,104,232,166,183,22,52,65,216,178,222,203,113,255,88,172,82,75,219,32,239,41,196,46,102,45,100,13,110,194,177,145,179,20,147],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([53,197,96,127,101,121,157,110,25,118,187,242,110,217,196,241,189,21,74,159,25,120,148,39,246,241,254,147,27,120,240,235],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([63,44,170,79,108,7,109,67,58,90,193,61,203,220,171,248,113,179,227,238,86,196,117,54,11,235,65,170,148,118,86,153], [101,57,254,49,24,103,211,193,42,33,132,91,80,17,103,176,192,123,26,192,170,129,213,64,44,29,10,23,214,232,33,29],{from: accounts[0]});
  });
});
