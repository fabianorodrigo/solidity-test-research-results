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
    let result = await contractProxyEcTools.testrecover([132,251,43,117,88,114,120,101,159,59,225,202,63,143,31,13,231,240,38,54,77,26,24,127,220,247,6,14,159,114,178,159], [189,72,163,130,142,102,10,81,3,122,140,226,204,223,90,88,250,227,199,25,99,177,177,44,145,127,84],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([167,190,16,95,168,107,131,72,252,106,37,84,3,187,209,188,249,233,47,212,122,213,205,35,37,78,114,164,168,197,103,118], [169,193,39,94,209,168,180,212,85,210,97,63,146,199,210,98,22,69,48,41,247,172,117,118,182,255,69,64,174,54,137,240,194,28,23,186,54,174,132,13,151,247,93,126,17,165,157,147,119,237,167,199,45,169,160,166,14,228,226,140,4,141,12,53,193],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([125,74,102,138,202,154,48,201,196,39,27,154,238,69,115,206,107,96,152,123,57,187,100,19,167,172,138,201,233,85,184,104],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([231,32,143,236,24,66,113,217,122,59,51,248,92,215,169,36,218,123,29,53,66,57,254,136,176,247,7,120,251,166,192,20], [59,236,205,170,65,65,54,67,8,20,163,53,78,40,87,59,80,172,17,43,219,23,2,208,63,215,112,56,97,209,146,252],{from: accounts[0]});
  });
});
