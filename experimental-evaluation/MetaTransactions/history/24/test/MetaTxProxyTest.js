const truffleAssert = require('truffle-assertions');
const EcTools = artifacts.require("EcTools");
const ExternalContract = artifacts.require("ExternalContract");
const MetaTxProxy = artifacts.require("MetaTxProxy");
const ProxyEcTools = artifacts.require("ProxyEcTools");

contract("MetaTxProxy",(accounts)=>{
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
  });
  
  it('Should execute fallback()', async () => {
    let result = await contractMetaTxProxy.sendTransaction({from: accounts[0]});
  });
  it('Should execute getTransactionHashNonce(bytes32)', async () => {
    let result = await contractMetaTxProxy.getTransactionHashNonce([118,126,46,143,194,61,154,26,227,47,76,182,47,106,62,209,85,117,173,183,14,141,25,1,79,233,168,171,56,222,255,29],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[0], 0, [104,205,205,182,126,170,65,181,71,25,31,65,214,140,138,6,17,232,30,25,189,35,216,175,44,221,227,19,84,227,111,89], 97,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([72,181,234,46,42,209,136,196,109,187,224,64,217,195,69,151,155,143,138,66,228,210,61,251,220,51,129,80,116,85,6,134], [150,56,110,32,125,68,23,104,120,221,72,103,123,172,188,255,38,25,183,251,248,97,217,216,115,229,108,226,140,66,153,251],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[9], 3, [212,230,111,116,232,172,16,36,165,205,157,192,193,39,77,29,137,184,227,227,56,113,221,137,64,20,234,96,240,27,142,242], 65, 2, [134,144,206,127,150,25,142,207,21,179,34,246,99,253,145,89,3,152,205,46,169,18,141,132,200,65,65,15,75,214,213,203],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[2], 66, [246,131,134,216,25,46,216,10,59,157,95,79,186,145,55,110,24,135,152,49,0,182,157,40,230,70,161,164,249,229,28,230], 1532892064, [152,30,84,127,142,125,250,224,186,145,203,157,72,96,63,146,176,12,45,244,12,129,54,183,63,254,249,149,131,205,130,171],{from: accounts[0]});
  });
});
