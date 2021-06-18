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
    let result = await contractProxyEcTools.testrecover([90,173,45,49,174,153,249,152,152,87,56,30,62,214,60,101,10,119,28,165,224,232,90,30,239,39,205,158,95,57,55,111], [251,245,210,79,98,161,228,248,140,63,67,41,243,193,217,109,48,92,173,188,135,164,221,173,217,179,214,241],{from: accounts[0]});
  });
  it('Should execute testrecover(bytes32,bytes) WHEN signedMessage.length==65', async () => {
    let result = await contractProxyEcTools.testrecover([132,19,67,29,167,7,79,115,212,153,172,57,229,2,143,114,127,211,225,86,143,214,166,243,101,200,101,27,22,224,96,20], [224,104,228,193,152,176,234,118,196,83,249,208,31,228,6,33,186,2,157,47,6,89,126,214,122,13,127,215,191,183,139,135,206,94,19,206,70,241,71,52,101,234,48,197,250,188,148,138,229,49,101,121,157,21,92,200,180,230,116,244,52,98,147,222,158],{from: accounts[0]});
  });
  it('Should execute testtoEthereumSignedMessage(bytes32)', async () => {
    let result = await contractProxyEcTools.testtoEthereumSignedMessage([244,18,3,101,215,38,246,61,212,34,81,102,197,149,59,183,242,242,120,63,46,231,176,11,214,221,9,79,247,53,174,54],{from: accounts[0]});
  });
  it('Should execute testprefixedRecover(bytes32,bytes)', async () => {
    let result = await contractProxyEcTools.testprefixedRecover([224,43,13,163,31,159,140,216,189,160,225,11,28,143,185,170,223,189,246,153,96,139,188,115,243,235,172,89,22,89,14,24], [248,204,9,254,218,239,51,63,238,2,164,217,148,159,186,63,191,243,57,129,71,198,62,60,232,246,189,147,25,29,83,193],{from: accounts[0]});
  });
});
