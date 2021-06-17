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
    let result = await contractMetaTxProxy.getTransactionHashNonce([236,137,204,108,31,35,119,84,34,24,19,26,1,159,203,250,96,9,174,186,230,131,99,159,62,35,191,16,249,24,173,183],{from: accounts[0]});
  });
  it('Should execute getTransactionHash(address,uint256,bytes,uint256)', async () => {
    let result = await contractMetaTxProxy.getTransactionHash(accounts[0], 66, [247,170,41,75,175,89,181,134,48,237,147,203,205,209,54,118,5,25,236,1,108,72,188,47,201,15,80,242,57,45,80,0], 1532892062,{from: accounts[0]});
  });
  it('Should execute getSigner(bytes32,bytes)', async () => {
    let result = await contractMetaTxProxy.getSigner([120,59,143,23,89,135,83,122,248,236,224,39,140,148,102,17,210,107,85,129,237,0,74,92,145,95,74,187,153,140,85,229], [247,14,183,168,158,164,113,215,4,168,124,130,75,36,170,74,184,165,192,122,48,126,186,117,83,181,54,203,131,96,249,108],{from: accounts[0]});
  });
  it('Should execute executeTransaction(address,uint256,bytes,uint256,uint256,bytes)', async () => {
    let result = await contractMetaTxProxy.executeTransaction(accounts[8], 1532892062, [48,228,117,26,141,46,87,84,228,184,138,120,136,191,219,80,100,164,14,40,47,84,236,130,27,12,102,53,207,94,3,221], 66, 26, [147,134,214,27,32,223,141,80,210,162,32,220,207,45,149,3,177,81,10,89,78,154,55,129,81,71,65,91,225,228,120,104],{from: accounts[0]});
  });
  it('Should execute verifySignature(address,uint256,bytes,uint256,bytes) WHEN signer==_signer', async () => {
    let result = await contractMetaTxProxy.verifySignature(accounts[4], 1532892062, [27,39,130,230,145,221,46,232,231,214,105,212,117,131,1,221,65,35,35,174,233,176,139,194,25,186,103,115,83,245,15,84], 5, [192,247,112,99,32,0,126,135,106,179,105,157,56,82,212,151,118,106,180,59,141,30,119,187,5,156,1,103,59,48,192,249],{from: accounts[0]});
  });
});
