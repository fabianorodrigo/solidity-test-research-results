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
    let result = await contractProxyEcTools.testrecover([114,179,82,229,21,21,147,22,15,246,192,237,58,32,157,122,157,147,137,194,220,54,199,174,234,171,0,150,4,175,128,158], [],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([143,241,113,164,255,165,70,104,243,173,22,220,18,68,90,35,223,11,44,205,67,203,94,206,75,13,2,208,244,116,120,204], [54,209,29,228,119,89,13,17,68,203,62,179,190,125,96,247,72,230,110,86,116,22,119,97,76,65,3,192,58,1,205,150,3,80,39,30,255,193,135,2,182,120,174,84,86,39,77,237,56,166,68,237,72,237,255,112,221,38,43,75,166,118,231,25,112],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([221,74,83,96,110,62,102,45,22,196,30,103,134,41,95,227,127,50,157,233,23,105,135,16,19,70,170,112,73,54,235,159],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([69,39,166,82,68,105,93,145,236,30,146,201,244,120,174,112,171,237,133,132,229,225,127,162,110,27,60,39,164,148,117,202], [86,13,104,141,58,41,131,5,47,106,90,218,201,168,157,15,198,189,128,207,185,28,170,79,134,229,153,184,205,205,165,216],{from: accounts[0]});
  });
});
