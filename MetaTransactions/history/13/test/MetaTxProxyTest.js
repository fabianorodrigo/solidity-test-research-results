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
    let result = await contractMetaTxProxy.getTransactionHashNonce([76,89,18,185,120,76,9,235,13,43,15,100,31,33,156,116,105,204,12,95,134,219,118,101,225,42,15,171,238,36,230,55],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[9], 5, [204,65,30,126,198,230,145,173,13,120,225,84,67,150,45,25,237,231,29,2,188,135,162,229,80,132,38,13,32,155,233,13], 2,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([42,125,106,44,34,125,11,244,107,213,239,49,23,0,54,243,113,228,183,9,191,95,244,239,93,197,133,184,213,151,104,221], [31,188,252,65,122,21,139,189,39,168,170,94,31,215,214,111,221,25,4,195,43,138,142,50,43,11,31,102,155,85,237,210],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[3], 97, [171,98,91,58,38,195,102,241,160,144,43,74,0,136,4,53,89,211,65,4,235,80,81,169,237,31,1,218,142,13,207,206], 97, 1532892062, [49,232,230,82,120,239,89,108,154,231,207,249,177,146,97,165,42,49,241,107,152,245,140,155,132,42,155,172,76,25,242,179],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[5], 1, [72,93,82,146,203,223,85,173,250,106,129,42,45,139,38,69,146,146,15,38,40,188,41,39,53,21,67,31,99,0,187,42], 97, [148,11,7,83,153,225,45,33,175,156,254,17,138,251,141,63,137,80,172,236,242,120,190,47,46,252,217,127,254,139,210,64],{from: accounts[0]});
  });
});
