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
    let result = await contractProxyEcTools.testrecover([204,29,153,201,117,109,209,37,232,59,1,168,163,132,236,246,227,212,106,189,30,81,16,23,73,249,154,227,245,93,7,78], [237,165],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([181,95,169,156,125,153,27,43,26,216,43,48,233,129,116,132,170,82,131,167,160,109,228,246,69,244,119,157,61,34,201,112], [75,84,176,230,4,172,30,159,222,31,133,71,75,112,159,176,36,80,70,227,26,100,56,139,151,72,141,147,14,31,180,76,138,109,104,84,233,83,15,110,32,13,212,87,224,69,35,110,163,149,18,163,87,241,61,29,16,195,86,246,208,35,106,63,171],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([246,217,223,29,53,80,204,88,116,216,234,101,175,182,43,98,126,79,19,241,137,65,11,138,147,2,109,145,65,151,10,245],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([69,28,94,210,182,88,212,78,208,212,90,234,143,215,177,77,84,124,240,151,175,75,217,175,66,252,21,134,134,17,70,143], [9,202,167,232,143,28,143,129,32,215,159,249,75,13,175,180,163,182,203,114,68,232,61,170,228,68,60,223,155,7,66,117],{from: accounts[0]});
  });
});
